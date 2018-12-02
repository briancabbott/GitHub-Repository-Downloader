import * as fs from "fs";
const path = require('path');
import shortUUID from 'short-uuid';
import { createFileFolderSuffix } from "./utils";

export class RepositoryList {

    organizationName: string;
    generationTime: Date;
    repositories: Array<Repository>;


    constructor(organizationName: string, generationTime: Date, repositories: Array<Repository>) {
        this.organizationName = organizationName;
        this.generationTime = generationTime;
        this.repositories = repositories;
    }

    public sort() {
        if (this.repositories && this.repositories.length > 0) {
            this.repositories.sort((repository1, repository2) => {
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

    public writeToFile(dir?: string, globalOperationId?: string): string {

        if (globalOperationId == null) {
            globalOperationId = this.organizationName;
        }

        let filename = "repositories_for_org--" + globalOperationId + "--" + this.generationTime.getTime() + ".json";
        let _writeFilename = path.join(dir || process.cwd(), filename); 
        
        let jsonContent = JSON.stringify(this, undefined, 4);

        try {
            fs.writeFileSync(_writeFilename, jsonContent, {flag: "a+"}); 
        } catch (e) {
            console.log("Exception occured during writing the repository list. Error was: " + e);
        }

        // , (err) => {
        //     if (err) {
        //         console.error(err);
        //         throw new Error("Unable to write repository-list query results file. Error was: " + err);
        //     };
        //     console.log("File has been created");
        // });

        return _writeFilename;
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


export class Organization { 
    name: string;
    shortNameAckro: string; 

    constructor(name: string, shortNameAckro: string) {
        this.name = name;
        this.shortNameAckro = shortNameAckro; 
    }
} 

// 
// var translator = short(); // Defaults to flickrBase58
// var decimalTranslator = short("0123456789"); // Provide a specific alphabet for translation
// var cookieTranslator = short(short.constants.cookieBase90); // Use a constant for translation
 
// // Generate a shortened v4 UUID
// translator.new();
 
// // Generate plain UUIDs
// short.uuid(); // From the constructor without creating a translator

export class RepositoryDownloadOperation {
    operationUUID: string;
    globalOperationTimestamp: Date;
    globalOperationStartTime: Date;
    globalOperationEndingTime: Date;
    
    workingDirectory: string;
    downloadDirectory: string;

    githubConfiguration: GitHubConfiguration;
    organizations: Array<Organization>;
    logToStdOut: boolean; 

    constructor(operationUUID?: string, globalOperationTimestamp?: Date, 
        globalOperationStartTime?: Date, globalOperationEndingTime?: Date, 
        workingDirectory?: string, downloadDirectory?: string, githubConfiguration?: GitHubConfiguration,
        organizations?: Array<Organization>) {
            let shortUUIDv = shortUUID().fromUUID(shortUUID.uuid());

        this.operationUUID = operationUUID || shortUUIDv;
        this.globalOperationTimestamp = globalOperationTimestamp || new Date();
        this.globalOperationStartTime = globalOperationStartTime || null;
        this.globalOperationEndingTime = globalOperationEndingTime || null;
        this.workingDirectory = workingDirectory  || null;
        this.downloadDirectory = downloadDirectory || null;
        this.githubConfiguration = githubConfiguration || null;
        this.organizations = organizations || new Array<Organization>();
    }

    public makeDownloadDirectoryPath(organizationName: string): string {
        return `C:\\GRD\\GCP--${createFileFolderSuffix(this.globalOperationTimestamp, this.operationUUID)}`;
    }
}

export class GitHubConfiguration {
    authorizationToken: string;

    constructor(authorizationToken: string) {
        this.authorizationToken = authorizationToken;
    }
}