"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_link_1 = require("apollo-link");
const model_1 = require("./model");
const apollo_link_http_1 = require("apollo-link-http");
const node_fetch_1 = __importDefault(require("node-fetch"));
const graphql_tag_1 = __importDefault(require("graphql-tag"));
class RepositoryLister {
    constructor(githubToken) {
        this.getRepositoriesForOrganization = graphql_tag_1.default `
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
        this.totalRepositories = -1;
        this.githubToken = githubToken;
    }
    generateList(organization, writeFile = false) {
        this.organization = organization;
        const operation = {
            query: this.getRepositoriesForOrganization,
            variables: { organizationName: this.organization },
            operationName: "",
            context: {},
            extensions: {}
        };
        const middlewareLink = new apollo_link_1.ApolloLink((o, f) => {
            o.setContext({
                headers: {
                    authorization: `Bearer ${this.githubToken}`
                }
            });
            if (f != undefined) {
                return f(o);
            }
            else {
                return undefined;
            }
        });
        let githubGraphqlEndpoint = apollo_link_http_1.createHttpLink({ uri: "https://api.github.com/graphql", fetch: node_fetch_1.default });
        this.authorizedLink = middlewareLink.concat(githubGraphqlEndpoint);
        let p = new Promise((resolve, reject) => {
            let repositoryList = new model_1.RepositoryList(this.organization, new Date(), new Array());
            this.executeRequest(this.authorizedLink, operation, (arr) => {
                console.log("nextFn(): " + arr.length);
                repositoryList.repositories.push(...arr);
            }, () => {
                if (this.totalRepositories === repositoryList.repositories.length) {
                    repositoryList.sort();
                    if (writeFile) {
                        repositoryList.writeToFile();
                    }
                    console.log("promise.executeRequest() complete");
                    resolve(repositoryList);
                }
            });
        });
        return p;
    }
    executeRequest(link, operation, nextFn, compFn) {
        console.log("executeRequest()...");
        apollo_link_1.execute(link, operation).subscribe({
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
        });
    }
    captureRepositories(fetch, nextFn, compFn) {
        console.log("captureRepositories()...");
        let repos = new Array();
        fetch.data.organization.repositories.edges.forEach((e) => {
            repos.push(new model_1.Repository(e.node.url, e.node.id, e.node.createdAt, e.node.description, e.node.diskUsage, e.node.url.homepageUrl, e.node.name, e.node.pushedAt));
        });
        nextFn(repos);
        if (fetch.data.organization.repositories.pageInfo.hasNextPage) {
            let cursor = fetch.data.organization.repositories.edges[fetch.data.organization.repositories.edges.length - 1].cursor;
            let operation = {
                query: this.getRepositoriesForOrganization,
                variables: {
                    organizationName: this.organization,
                    cursor: cursor
                },
                operationName: "",
                context: {},
                extensions: {}
            };
            this.executeRequest(this.authorizedLink, operation, nextFn, compFn);
        }
    }
}
exports.RepositoryLister = RepositoryLister;
