
import { ApolloLink, execute, FetchResult, GraphQLRequest } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';

// import Observable from 'rxjs';

// import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import fetch from "node-fetch";

import fs = require("fs");


// let client = new ApolloClient({
//     link: new HttpLink({ uri: 'https://api.github.com/graphql' }),
//     cache: new InMemoryCache()
// });

const myGithubToken = "a1aff82da94ab6559a0b66735f32d2adf536e649";

const getRepositoriesForOrganization = gql`
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
`



const operation = {
    query: getRepositoriesForOrganization,
    variables: { organizationName: "GoogleCloudPlatform" }, //optional
    operationName: "", //optional
    context: {}, //optional
    extensions: {} //optional
};




const httpLink = createHttpLink({ uri: "https://api.github.com/graphql", fetch: fetch });
const middlewareLink = new ApolloLink((o, f) => {
    o.setContext({
        headers: {
            authorization: `Bearer ${myGithubToken}`
        }
    });

    if (f != undefined) 
        return f(o);
    else 
        return undefined;
});
const link = middlewareLink.concat(httpLink);


// execute returns an Observable so it can be subscribed to

let repositories = new Array();
let totalRepositories = -1; 

executeRequest(link, operation);


console.log("done retreiving repos... repos captured: " + repositories.length);

function executeRequest(link: ApolloLink, operation: GraphQLRequest) {
    execute(link, operation).subscribe({
        next: data => { 
            totalRepositories = data.data.organization.repositories.totalCount;
            captureRepositories(data);
        },
        error: error => console.log(`received error ${error}`),
        complete: () => handleCompletion(),
    })
}

function handleCompletion() {
    console.log(`complete`);
    if (repositories.length === totalRepositories) {
        repositories.sort((r1, r2) => {
            if (r1.name > r2.name) {
                return 1;
            }
            if (r1.name < r2.name) {
                return -1;
            }
            return 0;
        });
        repositories.forEach((r) => {
            console.log(r.name);
        });

        fs.writeFile("./repositories_for_organization.json", JSON.stringify(repositories, undefined, 4), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("File has been created");
        });
    }
}

function captureRepositories(fetch: FetchResult) {
    console.log("Capturing repositories.... number received: " + fetch.data.organization.repositories.edges.length);

    fetch.data.organization.repositories.edges.forEach((e) => {                        
        repositories.push(new Repository(e.node.url, e.node.id, e.node.createdAt, e.node.description, e.node.diskUsage, e.node.url.homepageUrl, e.node.name, e.node.pushedAt));
    });

    if (fetch.data.organization.repositories.pageInfo.hasNextPage) {
        let cursor = fetch.data.organization.repositories.edges[fetch.data.organization.repositories.edges.length -1].cursor;
        let operation = {
            query: getRepositoriesForOrganization,
            variables: { 
                organizationName: "GoogleCloudPlatform", 
                cursor: cursor
            }, 
            operationName: "",
            context: {}, 
            extensions: {}
        }
        executeRequest(link, operation);
        // execute(link, ).subscribe(repos => captureRepositories(repos));
    }

}


export class Repository {
    url: string;
    id: string;
    createdAt: string;
    description: string;
    diskUsage: string;
    homepageUrl: string;
    name: string;
    pushedAt: string;

    constructor(url: string, id: string, createdAt: string, description: string, diskUsage: string, homepageUrl: string, name: string, pushedAt: string) {
        this.url = url;
        this.id = id;
        this.createdAt = createdAt; 
        this.description = description;
        this.diskUsage = diskUsage; 
        this.homepageUrl = homepageUrl;
        this.name = name; 
        this.pushedAt = pushedAt;
    }
}