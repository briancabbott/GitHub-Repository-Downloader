import { ApolloLink, GraphQLRequest, execute, FetchResult } from "apollo-link";
import { Repository, RepositoryList } from "./model";
import { createHttpLink } from "apollo-link-http";

import fetch from "node-fetch";
import gql from 'graphql-tag';

export class RepositoryLister {
    githubToken: string;
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
    organization: string; 

    constructor(githubToken: string) {
        this.githubToken = githubToken;
    }
    
    public generateList(organization: string, writeFile: boolean = false): Promise<RepositoryList> {
        this.organization = organization;


        const operation = {
            query: this.getRepositoriesForOrganization,
            variables: { organizationName: this.organization },
            operationName: "", 
            context: {}, 
            extensions: {} 
        };

        const middlewareLink = new ApolloLink((o, f) => {
            o.setContext({
                headers: {
                    authorization: `Bearer ${this.githubToken}`
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

        let p = new Promise<RepositoryList>((resolve, reject) => {
            let repositoryList = new RepositoryList(this.organization, new Date(), new Array<Repository>()); 
            this.executeRequest(
                this.authorizedLink, 
                operation, 
                (arr: Repository[]) =>{ 
                    console.log("nextFn(): " + arr.length); 
                    repositoryList.repositories.push(...arr); 
                }, 
                ()=>{ 
                    if (this.totalRepositories === repositoryList.repositories.length) {
                        repositoryList.sort();
                        if (writeFile) {
                            repositoryList.writeToFile();
                        }
                        console.log("promise.executeRequest() complete");
                        resolve(repositoryList);
                    }
                }
            );            
        })
        return p;
    }

    private executeRequest(link: ApolloLink, operation: GraphQLRequest, nextFn: (data: Repository[])=>void, compFn: ()=>void) {
        console.log("executeRequest()...");
        execute(link, operation).subscribe({
            next: data => { 
                console.log("executeRequest::execute::next()..."); 

                this.totalRepositories = data.data.organization.repositories.totalCount;
                this.captureRepositories(data, nextFn, compFn);
            },
            error: error => console.log(`received error ${error}`),
            complete: () => {
                console.log("executeRequest::execute::complete()..."); 
                compFn(); 
            }
        })
    }
    
    private captureRepositories(fetch: FetchResult, nextFn: (data: Repository[])=>void, compFn: () => void) {
        console.log("captureRepositories()...");

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
                    organizationName: this.organization, 
                    cursor: cursor
                }, 
                operationName: "",
                context: {}, 
                extensions: {}
            }
            this.executeRequest(this.authorizedLink, operation, nextFn, compFn);
        }    
    }
}