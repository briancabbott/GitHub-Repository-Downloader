import { ApolloLink, GraphQLRequest, execute, FetchResult } from "apollo-link";
import { Repository, RepositoryList, RepositoryDownloadOperation, Organization } from "./model";
import { createHttpLink } from "apollo-link-http";
import gql from 'graphql-tag';
import * as fs from "fs";
import * as path from "path";

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
                                homepageUrl
                                name
                                pushedAt
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

    constructor(downloadOp: RepositoryDownloadOperation) {
        this.downloadOp = downloadOp;
        console.log("downloadOp: ", downloadOp);
    }

    public generateList(organization: Organization, writeFile: boolean = false): Promise<RepositoryList> {
        console.log("organization: ", organization);
        const operation = {
            query: this.getRepositoriesForOrganization,
            variables: { organizationName: organization.name },
            operationName: "",
            context: {},
            extensions: {}
        };

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

        let githubGraphqlEndpoint = createHttpLink({ uri: "https://api.github.com/graphql", fetch: fetch });
        this.authorizedLink = middlewareLink.concat(githubGraphqlEndpoint);

        console.log("authorizedLink: ", this.authorizedLink);

        let p = new Promise<RepositoryList>((resolve, reject) => {
            let repositoryList = new RepositoryList(organization.name, new Date(), new Array<Repository>());
            this.executeRequest(
                organization,
                this.authorizedLink,
                operation,
                (arr: Repository[]) =>{
                    console.log("arr: ", arr);
                    repositoryList.repositories.push(...arr);
                },
                ()=>{
                    if (this.totalRepositories === repositoryList.repositories.length) {
                        this.sort(repositoryList);
                        if (writeFile) {
                            this.writeToFile(organization, repositoryList);
                        }
                        resolve(repositoryList);
                    }
                }
            );
        })
        return p;
    }

    private executeRequest(organization: Organization, link: ApolloLink, operation: GraphQLRequest, nextFn: (data: Repository[])=>void, compFn: ()=>void) {
        execute(link, operation).subscribe({
            next: data => {
              console.log("data: ", data);

                if (!data.errors) {
                    console.log("data: ", data);

                    this.totalRepositories = data.data.organization.repositories.totalCount;
                    this.captureRepositories(organization, data, nextFn, compFn);
                }
            },
            error: error => console.log(`received error ${error}`),
            complete: () => {
                compFn();
            }
        })
    }

    private captureRepositories(organization: Organization, fetch: FetchResult, nextFn: (data: Repository[])=>void, compFn: () => void) {
        let repos = new Array<Repository>();
        fetch.data.organization.repositories.edges.forEach((e) => {
            repos.push(new Repository(e.node.url, e.node.id, e.node.createdAt, e.node.description, e.node.diskUsage, e.node.url.homepageUrl, e.node.name, e.node.pushedAt));
        });
        nextFn(repos);

        if (fetch.data.organization.repositories.pageInfo.hasNextPage) {
            let cursor = fetch.data.organization.repositories.edges[fetch.data.organization.repositories.edges.length -1].cursor;
            let operation = {
                query: this.getRepositoriesForOrganization,
                variables: {
                    organizationName: organization.name,
                    cursor: cursor
                },
                operationName: "",
                context: {},
                extensions: {}
            }
            this.executeRequest(organization, this.authorizedLink, operation, nextFn, compFn);
        }
    }

    public sort(list: RepositoryList) {
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

    public writeToFile(organization: Organization, list: RepositoryList): string {
        let filename = "repoList--" + organization.name + "--" + this.downloadOp.globalOperationTimestamp.getTime() + ".json";
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
