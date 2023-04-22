
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

import { 
    Repository, 
    OrganizationRepositoriesLatestCommitsList, 
    OrganizationRepositoriesList, 
    Organization, 
    RepositoryOwner, 
    Ref,
    RepositoryListOperation
} from "./model";
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

    getLatestCommitsForRepository = gql`
        query GetLatestCommitsForRepository($repositoryName: String!, $owner: String!) {
            viewer { 
                login
            }
            rateLimit {
                limit
                cost
                remaining
                resetAt
            }
            repository(owner: $owner, name: $repositoryName) {
                refs(refPrefix: "refs/heads/", orderBy: {direction: DESC, field: TAG_COMMIT_DATE}, first: 100) {
                    edges {
                        node {
                            ... on Ref {
                                name
                                prefix
                                target {
                                    ... on Commit {
                                        history(first: 2) {
                                            edges {
                                                node {
                                                    committedDate
                                                    message
                                                    changedFiles
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    totalRepositories: number = -1;
    authorizedLink: ApolloLink;
    listOp: RepositoryListOperation;
    client: ApolloClient<NormalizedCacheObject>;
    repos: Repository[] = new Array<Repository>();

    constructor(listOp: RepositoryListOperation) {
        this.listOp = listOp;
    }

    public async generateList_ApolloClient(organization: Organization, writeFile: boolean = false): Promise<OrganizationRepositoriesList> {
        console.log("generateList_ApolloClient");
        console.log(this.listOp);

        const middlewareLink = new ApolloLink((o, f) => {
            o.setContext({
                headers: {
                    authorization: `Bearer ${this.listOp.githubConfiguration.authorizationToken.trim()}`
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
                authorization: `Bearer ${this.listOp.githubConfiguration.authorizationToken.trim()}`
            },
        };

        let apclient = new ApolloClient<NormalizedCacheObject>(clientOptions);
        let wq = apclient.watchQuery(queryOptions);
        const opts = {
            query: this.getRepositoriesForOrganization, 
            variables: { 
                organizationName: organization.name 
            }
        };
        await this.getNexts(wq, organization, this.repos, opts);

        const orl = new OrganizationRepositoriesList(organization.name, new Date(), this.repos);

        this.sort(orl);
        console.log(JSON.stringify(orl, undefined, "  "))
        return orl;
    }

    public async getNexts(wq: ObservableQuery<any, OperationVariables>, organization: Organization, repos: Repository[], options): Promise<{file: string, orl: OrganizationRepositoriesList}> {        
        const p: Promise<ApolloQueryResult<any>> = wq.fetchMore(options);
        let val = null;
        const pp = await p.then(async (result) => {
            result.data.organization.repositories.edges.forEach((e) => { 
                console.log(e.node.name);
                console.log(e.node.url);
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

    
    public async generateListLatestCommits_ApolloClient(organization: Organization, writeFile: boolean = false): Promise<OrganizationRepositoriesLatestCommitsList> {
        console.log("generateListLatestCommits_ApolloClient");
        
        let reposList = await this.generateList_ApolloClient(organization)
        console.log("generateListLatestCommits_ApolloClient reposList.length: ");
        const middlewareLink = new ApolloLink((o, f) => {
            o.setContext({
                headers: {
                    authorization: `Bearer ${this.listOp.githubConfiguration.authorizationToken.trim()}`
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
        const clientOptions: ApolloClientOptions<NormalizedCacheObject> = {
            uri: 'https://api.github.com/graphql',
            link: middlewareLink.concat(httpLink),
            cache: new InMemoryCache(),
            headers: {
                authorization: `Bearer ${this.listOp.githubConfiguration.authorizationToken.trim()}`
            },
        };
        let apclient = new ApolloClient<NormalizedCacheObject>(clientOptions);


        let repositoryCommitTimes: OrganizationRepositoriesLatestCommitsList = 
            new OrganizationRepositoriesLatestCommitsList(organization.name, new Date(), new Map<Repository, any>());
        
        
        // console.log("rateLimit");
        // console.log(rateLimit)

        for (let repository of reposList.repositories) {
            try {
                console.log("doing repository: " + repository.name);

                if (!repositoryCommitTimes.repositoryCommitTimeMap.has(repository)) {
                    repositoryCommitTimes.repositoryCommitTimeMap.set(repository, new Array<any>());
                }

                const queryOptions: QueryOptions = {
                    query: this.getLatestCommitsForRepository,
                    variables: { 
                        repositoryName: repository.name!, 
                        owner: organization.name!
                    },
                    fetchPolicy: 'network-only',
                    errorPolicy: "all",
                };
                
                let wq = await apclient.watchQuery(queryOptions);
                const p: Promise<ApolloQueryResult<any>> = wq.fetchMore(queryOptions)
                const pp = await p.then(async (result) => {
                    console.log(result.error);
                    console.log(result.networkStatus);
                    
                    // const rateLimit = {
                    //     limit: result.data.rateLimit.limit,
                    //     cost: result.data.rateLimit.cost,
                    //     remaining: result.data.rateLimit.remaining,
                    //     resetAt: result.data.rateLimit.resetAt
                    // };
                    // console.log(result.partial);

                    if (result.errors != undefined) {
                        console.log("result.errors: " + JSON.stringify(result.errors));
                    }
                    if (result.data != undefined) {
                        result.data.repository.refs.edges.forEach(async (e: any) => {
                            // let associatedPullRequests = e.node.associatedPullRequests 
                            // let branchProtectionRule = e.node.branchProtectionRule 
                            let name = e.node.name
                            let prefix = e.node.prefix
                            // let refUpdateRule = e.node.refUpdateRule

                            let ref = new Ref(name, prefix);

                            e.node.target.history.edges.forEach(async (ee) => {
                                try {
                                    const commitObj = {
                                        committedDate: ee.node.committedDate, 
                                        message: ee.node.message,
                                        changedFiles: ee.node.changedFiles
                                    };
                                    repositoryCommitTimes.repositoryCommitTimeMap.get(repository).push(commitObj);
                                } catch (e) {
                                    console.log("error 1: ", e);
                                }
                            });
                        });
                    } else {
                        console.log("result.data is undefined");
                    }
                }).catch(async (e) => {
                    console.log("error2: " + e);
                });
            } catch (error) {
                console.log("error3: " + error);
            }
        }
        console.log("returning!!!!");
        return repositoryCommitTimes;
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
        let filename = "repoList--" + list.organizationName + "--" + this.listOp.globalOperationTimestamp.getTime() + ".json";
        let _writeFilename = path.join(this.listOp.globalStoreDirectory || process.cwd(), filename);

        let jsonContent = JSON.stringify(list, undefined, 4);

        try {
            fs.writeFileSync(_writeFilename, jsonContent, {flag: "a+"});
        } catch (e) {
            console.log("Exception occured during writing the repository list. Error was: " + e);
        }

        return _writeFilename;
    }
}

function onNext(onNext: any, arg1: (result: any) => Promise<void>) {
    throw new Error("Function not implemented.");
}
