
import * as fs from "fs";
import * as path from "path";
import {
    ApolloClient,
    ApolloLink,
    ApolloClientOptions,
    gql,
    InMemoryCache,
    NormalizedCacheObject,
    QueryOptions,
    ApolloQueryResult,
    createHttpLink,
    FetchMoreQueryOptions,
    ObservableQuery,
    OperationVariables
  } from '@apollo/client';

import { Repository, OrganizationRepositoriesList, RepositoryDownloadOperation, Organization, RepositoryOwner } from "./model";
import { License } from "./ghom/objects/License";

const fetch = require("node-fetch");

export class RepositoryLister {
    getRepositoriesForOrganization = gql`
            query GetRepositoriesForOrganization($organizationName: String!, $cursor: String) {
                viewer {
                    login
                }
                organization(login: $organizationName) {
                    name
                    id
                    repositories(first: 100, after: $cursor) {
                        totalCount
                        edges {
                            node {
                                url
                                id
                                createdAt
                                description
                                diskUsage
                                name
                                nameWithOwner
                            
                                pushedAt
                                descriptionHTML
                                forkCount
                                hasIssuesEnabled
                                hasWikiEnabled
                                homepageUrl
                                isArchived
                                isFork
                                isLocked
                                isMirror
                                isPrivate
                                licenseInfo {
                                    body
                                }
                                lockReason
                                mirrorUrl
                                owner {
                                    avatarUrl
                                    id
                                    login
                                    resourcePath
                                    url
                                }
                                pushedAt
                                resourcePath
                                shortDescriptionHTML
                                updatedAt
                            }
                            cursor
                        }
                        pageInfo {
                            hasNextPage
                            endCursor
                        }
                    }
                }
            }
    `;

    totalRepositories: number = -1;
    authorizedLink: ApolloLink;
    downloadOp: RepositoryDownloadOperation;
    client: ApolloClient<NormalizedCacheObject>;

    constructor(downloadOp: RepositoryDownloadOperation) {
        this.downloadOp = downloadOp;
    }

    public async generateList_ApolloClient(organization: Organization, writeFile: boolean = false): Promise<OrganizationRepositoriesList> {
        const middlewareLink = new ApolloLink((o, f) => {
            o.setContext({
                headers: {
                    authorization: `Bearer ${this.downloadOp.githubConfiguration.authorizationToken.trim()}`
                }
            });
            if (f != undefined) {
                return f(o);
            } else {
                return undefined;
            }
        });
        const httpLink = createHttpLink({
            uri: "https://api.github.com/graphql",
            fetch: fetch,
        });
        const queryOptions: QueryOptions = {
            query: this.getRepositoriesForOrganization,
            variables: { organizationName: organization.name },
            fetchPolicy: 'network-only',
            errorPolicy: "all"
        };
        const clientOptions: ApolloClientOptions<NormalizedCacheObject> = {
            uri: 'https://api.github.com/graphql',
            link: middlewareLink.concat(httpLink),
            cache: new InMemoryCache(),
            headers: {
                authorization: `Bearer ${this.downloadOp.githubConfiguration.authorizationToken.trim()}`
            },
        };

        let apclient = new ApolloClient<NormalizedCacheObject>(clientOptions);
        let wq = apclient.watchQuery(queryOptions);
        const repos: Repository[] = new Array<Repository>();
        const opts = {
            query: this.getRepositoriesForOrganization, 
            variables: { 
                organizationName: organization.name 
            }
        };
        await this.getNexts(wq, organization, repos, opts);

        const orl = new OrganizationRepositoriesList(organization.name, new Date(), repos);
        this.sort(orl);
        return orl;
    }

    public async getNexts(wq: ObservableQuery<any, OperationVariables>, organization: Organization, repos: Repository[], options): Promise<{file: string, orl: OrganizationRepositoriesList}> {        
        const p: Promise<ApolloQueryResult<any>> = wq.fetchMore(options);
        let val = null;
        const pp = await p.then(async (result) => {
            result.data.organization.repositories.edges.forEach((e) => { 
                let r = new Repository(
                    e.node.url,
                    e.node.id,
                    e.node.createdAt,
                    e.node.description,
                    e.node.diskUsage,
                    e.node.homepageUrl,
                    e.node.name,
                    e.node.pushedAt,

                    e.node.descriptionHTML,
                    e.node.forkCount,
                    e.node.hasIssuesEnabled,
                    e.node.hasWikiEnabled,
                    e.node.isArchived,
                    e.node.isFork,
                    e.node.isLocked,
                    e.node.isMirror,
                    e.node.isPrivate,
                    e.node.licenseInfo,
                    e.node.lockReason,
                    e.node.mirrorUrl,
                    new RepositoryOwner(
                        e.node.owner.avatarUrl,
                        e.node.owner.size,
                        e.node.owner.id,
                        e.node.owner.login,
                        e.node.owner.name,
                        e.node.owner.resourcePath,
                        e.node.owner.url),
                    e.node.resourcePath,
                    e.node.shortDescriptionHTML,
                    e.node.updatedAt);
                    
                //     descriptionHTML
                // : HTMLString
                // forkCount
                // : number
                // hasIssuesEnabled
                // : boolean
                // hasWikiEnabled
                // : boolean
                // homepageUrl
                // : URL
                // isArchived
                // : boolean
                // isFork
                // : boolean
                // isLocked
                // : boolean
                // isMirror
                // : boolean
                // isPrivate
                // : boolean
                // licenseInfo
                // : License
                // lockReason
                // : RepositoryLockReason
                // mirrorUrl
                // : URL
                // owner
                // : RepositoryOwner
                // pushedAt
                // : Date
                // resourcePath
                // : URL
                // shortDescriptionHTML
                // : HTMLString
                // updatedAt
                // : Date
                repos.push(r);
            });
            if (result.data.organization.repositories.pageInfo.hasNextPage) {
                const cursor = result.data.organization.repositories
                    .edges[result.data.organization.repositories.edges.length -1].cursor;
                const options = {
                    query: this.getRepositoriesForOrganization, 
                    variables: { 
                        organizationName: organization.name,
                        cursor: cursor
                    }
                }
                await this.getNexts(wq, organization, repos, options);
            }
        });
        return val;
    }

    public sort(list: OrganizationRepositoriesList) {
        if (list.repositories && list.repositories.length > 0) {
            list.repositories.sort((repository1, repository2) => {
                if (repository1.name > repository2.name) {
                    return 1;
                }
                if (repository1.name < repository2.name) {
                    return -1;
                }
                return 0;
            });
        }
    }

    public writeToFile(list: OrganizationRepositoriesList): string {
        let filename = "repoList--" + list.organizationName + "--" + this.downloadOp.globalOperationTimestamp.getTime() + ".json";
        let _writeFilename = path.join(this.downloadOp.globalStoreDirectory || process.cwd(), filename);

        let jsonContent = JSON.stringify(list, undefined, 4);

        try {
            fs.writeFileSync(_writeFilename, jsonContent, {flag: "a+"});
        } catch (e) {
            console.log("Exception occured during writing the repository list. Error was: " + e);
        }

        return _writeFilename;
    }
}