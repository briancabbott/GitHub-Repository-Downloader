// import gql from 'graphql-tag';
// import * as fs from "fs";
// import * as path from "path";
// import { Repository, OrganizationRepositoriesList, RepositoryDownloadOperation, Organization } from "./model";
// import { ApolloLink, GraphQLRequest, execute, FetchResult, toPromise } from "apollo-link";
// import { createHttpLink } from 'apollo-link-http';
// import fetch from 'cross-fetch';
// export class RepositoryLister {
//     getRepositoriesForOrganization = gql`
//             query GetRepositoriesForOrganization($organizationName: String!, $cursor: String) {
//                 viewer {
//                     login
//                 }
//                 organization(login: $organizationName) {
//                     name
//                     id
//                     repositories(first: 100, after: $cursor) {
//                         totalCount
//                         edges {
//                             node {
//                                 url
//                                 id
//                                 createdAt
//                                 description
//                                 diskUsage
//                                 homepageUrl
//                                 name
//                                 pushedAt
//                             }
//                             cursor
//                         }
//                         pageInfo {
//                             hasNextPage
//                             endCursor
//                         }
//                     }
//                 }
//             }
//     `;
//     totalRepositories: number = -1;
//     authorizedLink: ApolloLink;
//     downloadOp: RepositoryDownloadOperation;
//     constructor(downloadOp: RepositoryDownloadOperation) {
//         this.downloadOp = downloadOp;
//     }
//     public async generateList(organization: Organization, writeFile: boolean = false): Promise<OrganizationRepositoriesList> {
//         console.log("organization: ", organization);
//         const operation = {
//             query: this.getRepositoriesForOrganization,
//             variables: { organizationName: organization.name },
//             operationName: "",
//             context: {},
//             extensions: {}
//         };
//         const middlewareLink = new ApolloLink((o, f) => {
//             o.setContext({
//                 headers: {
//                     authorization: `Bearer ${this.downloadOp.githubConfiguration.authorizationToken.trim()}`
//                 }
//             });
//             if (f != undefined) {
//                 return f(o);
//             } else {
//                 return undefined;
//             }
//         });
//         let githubGraphqlEndpoint = createHttpLink({uri: "https://api.github.com/graphql", fetch: fetch});
//         this.authorizedLink = middlewareLink.concat(githubGraphqlEndpoint);
//         let repositoryList = new OrganizationRepositoriesList(organization.name, new Date(), new Array<Repository>());
//         let repositoriesList = await this.executeRequest(repositoryList, organization, writeFile, this.authorizedLink, operation);
//         return repositoryList;
//     }
//     private async executeRequest(repositoryList: OrganizationRepositoriesList, organization: Organization, writeToFile: boolean, link: ApolloLink, operation: GraphQLRequest): Promise<OrganizationRepositoriesList> {
//         execute(link, operation).subscribe()
//             .then((data)=> {
//                 if (!data.errors) {
//                     this.totalRepositories = data.data.organization.repositories.totalCount;
//                     this.captureRepositories(repositoryList, organization, writeToFile, data, 
//                         (arr: Repository[]) =>{
//                             repositoryList.repositories.push(...arr);
//                             this.sort(repositoryList);
//                         });
//                 }
//             }).finally(() => {
//                 if (this.totalRepositories === repositoryList.repositories.length) {
//                     this.sort(repositoryList);
//                     if (writeToFile) {
//                         this.writeToFile(organization, repositoryList);
//                     }
//                 }
//                 return repositoryList;           
//             });
//         return repositoryList;
//     }
//     private async captureRepositories(repositoryList: OrganizationRepositoriesList, organization: Organization, writeToFile: boolean, fetch: FetchResult, nextFn: (data: Repository[])=>void) {
//         console.log("captureRepositories()");
//         let repos = new Array<Repository>();
//         fetch.data.organization.repositories.edges.forEach((e) => {
//             repos.push(new Repository(
//                 e.node.url, 
//                 e.node.id, 
//                 e.node.createdAt, 
//                 e.node.description, 
//                 e.node.diskUsage, 
//                 e.node.url.homepageUrl, 
//                 e.node.name, 
//                 e.node.pushedAt));
//         });
//         nextFn(repos);
//         if (fetch.data.organization.repositories.pageInfo.hasNextPage) {
//             let cursor = fetch.data.organization.repositories.edges[fetch.data.organization.repositories.edges.length -1].cursor;
//             let operation = {
//                 query: this.getRepositoriesForOrganization,
//                 variables: {
//                     organizationName: organization.name,
//                     cursor: cursor
//                 },
//                 operationName: "",
//                 context: {},
//                 extensions: {}
//             }
//             await this.executeRequest(repositoryList, organization, writeToFile, this.authorizedLink, operation);
//         }
//     }
//     public sort(list: OrganizationRepositoriesList) {
//         if (list.repositories && list.repositories.length > 0) {
//             list.repositories.sort((repository1, repository2) => {
//                 if (repository1.name > repository2.name) {
//                     return 1;
//                 }
//                 if (repository1.name < repository2.name) {
//                     return -1;
//                 }
//                 return 0;
//             });
//         }
//     }
//     public writeToFile(organization: Organization, list: OrganizationRepositoriesList): string {
//         console.log("RepositoryLister.writeToFile()")
//         let filename = "repoList--" + organization.name + ".json";
//         let _writeFilename = path.join(this.downloadOp.globalStoreDirectory || process.cwd(), filename);
//         let jsonContent = JSON.stringify(list, undefined, 4);
//         try {
//             fs.writeFileSync(_writeFilename, jsonContent);
//         } catch (e) {
//             console.log("Exception occured during writing the repository list. Error was: " + e);
//         }
//         console.log("RETURNING WRITE FILENAME FROM WRITETOFILE()");
//         return _writeFilename;
//     }
// }
