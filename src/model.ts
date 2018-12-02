
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
    nameHash: string;
    downloadOpDirectory: string;

    constructor(name?: string, shortNameAckro?: string, downloadOpDirectory?: string) {
        this.name = name || null;
        this.shortNameAckro = shortNameAckro || null; 
        this.downloadOpDirectory = downloadOpDirectory || null;
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
    operationName: string;
    operationSysName: string;

    globalOperationTimestamp: Date;
    globalOperationStartTime: Date;
    globalOperationEndingTime: Date;
    
    // TODO: default this to repo-store/_grd-meta
    globalStoreDirectory: string;
    applicationWorkingDirectory: string;

    githubConfiguration: GitHubConfiguration;
    organizations: Array<Organization>;
    logToStdOut: boolean; 

    repositoryListFilesMap: Map<string, string>;

    constructor(operationUUID?: string, globalOperationTimestamp?: Date, 
        globalOperationStartTime?: Date, globalOperationEndingTime?: Date, globalStoreDirectory?: string,
        workingDirectory?: string, downloadDirectory?: string, githubConfiguration?: GitHubConfiguration,
        organizations?: Array<Organization>) {
        
        this.operationUUID = operationUUID;
        this.globalOperationTimestamp = globalOperationTimestamp || new Date();
        this.organizations = organizations || new Array<Organization>();
        
        this.repositoryListFilesMap = new Map<string, string>();

        this.globalOperationStartTime = globalOperationStartTime || null;
        this.globalOperationEndingTime = globalOperationEndingTime || null;

        this.globalStoreDirectory = globalStoreDirectory || null;
        this.applicationWorkingDirectory = workingDirectory  || null;
        this.githubConfiguration = githubConfiguration || null;

        if (this.operationUUID == null) {
            this.operationUUID = shortUUID().fromUUID(shortUUID.uuid());
        }
    }

    public makeDownloadDirectoryPath(organizationName: string): string {
        return `C:\\GRD\\GCP--${createFileFolderSuffix(this.globalOperationTimestamp, this.operationUUID)}`;
    }
}

export class GitHubConfiguration {
    authorizationToken: string;
    authorizationTokenFile: string;

    constructor(authorizationToken?: string, authorizationTokenFile?: string) {
        this.authorizationToken = authorizationToken;
    }
}