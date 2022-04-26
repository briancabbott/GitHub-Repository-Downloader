"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryLister = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const client_1 = require("@apollo/client");
const model_1 = require("./model");
const fetch = require("node-fetch");
class RepositoryLister {
    constructor(downloadOp) {
        this.getRepositoriesForOrganization = (0, client_1.gql) `
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
        this.totalRepositories = -1;
        this.downloadOp = downloadOp;
    }
    async generateList_ApolloClient(organization, writeFile = false) {
        const middlewareLink = new client_1.ApolloLink((o, f) => {
            o.setContext({
                headers: {
                    authorization: `Bearer ${this.downloadOp.githubConfiguration.authorizationToken.trim()}`
                }
            });
            if (f != undefined) {
                return f(o);
            }
            else {
                return undefined;
            }
        });
        const httpLink = (0, client_1.createHttpLink)({
            uri: "https://api.github.com/graphql",
            fetch: fetch,
        });
        const queryOptions = {
            query: this.getRepositoriesForOrganization,
            variables: { organizationName: organization.name },
            fetchPolicy: 'network-only',
            errorPolicy: "all"
        };
        const clientOptions = {
            uri: 'https://api.github.com/graphql',
            link: middlewareLink.concat(httpLink),
            cache: new client_1.InMemoryCache(),
            headers: {
                authorization: `Bearer ${this.downloadOp.githubConfiguration.authorizationToken.trim()}`
            },
        };
        let apclient = new client_1.ApolloClient(clientOptions);
        let wq = apclient.watchQuery(queryOptions);
        const repos = new Array();
        const opts = {
            query: this.getRepositoriesForOrganization,
            variables: {
                organizationName: organization.name
            }
        };
        await this.getNexts(wq, organization, repos, opts);
        const orl = new model_1.OrganizationRepositoriesList(organization.name, new Date(), repos);
        this.sort(orl);
        return orl;
    }
    async getNexts(wq, organization, repos, options) {
        const p = wq.fetchMore(options);
        let val = null;
        const pp = await p.then(async (result) => {
            result.data.organization.repositories.edges.forEach((e) => {
                let r = new model_1.Repository(e.node.url, e.node.id, e.node.createdAt, e.node.description, e.node.diskUsage, e.node.homepageUrl, e.node.name, e.node.pushedAt, e.node.descriptionHTML, e.node.forkCount, e.node.hasIssuesEnabled, e.node.hasWikiEnabled, e.node.isArchived, e.node.isFork, e.node.isLocked, e.node.isMirror, e.node.isPrivate, e.node.licenseInfo, e.node.lockReason, e.node.mirrorUrl, new model_1.RepositoryOwner(e.node.owner.avatarUrl, e.node.owner.size, e.node.owner.id, e.node.owner.login, e.node.owner.name, e.node.owner.resourcePath, e.node.owner.url), e.node.resourcePath, e.node.shortDescriptionHTML, e.node.updatedAt);
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
                    .edges[result.data.organization.repositories.edges.length - 1].cursor;
                const options = {
                    query: this.getRepositoriesForOrganization,
                    variables: {
                        organizationName: organization.name,
                        cursor: cursor
                    }
                };
                await this.getNexts(wq, organization, repos, options);
            }
        });
        return val;
    }
    sort(list) {
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
    writeToFile(list) {
        let filename = "repoList--" + list.organizationName + "--" + this.downloadOp.globalOperationTimestamp.getTime() + ".json";
        let _writeFilename = path.join(this.downloadOp.globalStoreDirectory || process.cwd(), filename);
        let jsonContent = JSON.stringify(list, undefined, 4);
        try {
            fs.writeFileSync(_writeFilename, jsonContent, { flag: "a+" });
        }
        catch (e) {
            console.log("Exception occured during writing the repository list. Error was: " + e);
        }
        return _writeFilename;
    }
}
exports.RepositoryLister = RepositoryLister;
