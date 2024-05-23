
import crypto from 'crypto';
import path from 'path';
import * as fs from "fs";

import { RepositoryLister } from "./list_repositories";
import { 
    OrganizationRepositoriesList, 
    OrganizationRepositoriesLatestCommitsList,
    RepositoryDownloadOperation, 
    RepositoryDownloadNewReposOperation, 
    RepositoryListOperation,
    Organization, 
    User,
    GitHubConfiguration, 
    Operation,
    UserRepositoriesList,
    Repository
} from "./model";
import { Downloader, LongRunningDownloader } from "./download";
import { GitCloneTemp_CommandInfo } from "./git_cli/git_clone_temp";

export class Runtime {
    constructor() {
        // Node Running Directory:

    }

    static setupRuntimeVars() { 
        let cwd = process.cwd();
        let execPath = process.execPath
        let env = process.env;
    }

    static getDefault(key: string) {
        if (key === "DEFAULT_ORGANIZATION_DOWNLOAD_PATH") {
            return "./organizations";
        } else {
            throw new Error("Unknown default-configuration key: " + key);
        }
    }
}

export enum TokenSourceType {
    String,
    File
}

export class OperationConfig {
    constructor() {

    }
}


export class CommonOperationConfig extends OperationConfig {
    private _tokenFile: string;
    private _token: string;
    private _usedTokenSource: TokenSourceType;
    private _workingDirectory: string;
    private _globalStoreDirectory: string;

    constructor(tokenFile?: string, token?: string, _usedTokenSource?: TokenSourceType, 
            workingDirectory?: string, globalStoreDirectory?: string) {
        super();
        this.tokenFile = tokenFile;
        this.token = token;
        this.usedTokenSource = _usedTokenSource;
        this.workingDirectory = workingDirectory;
        this.globalStoreDirectory = globalStoreDirectory;   
    }

    public get tokenFile(): string {
        return this._tokenFile;
    }
    public set tokenFile(value) {
        this._tokenFile = value;
    }
    public get token(): string {
        return this._token;
    }
    public set token(value) {
        this._token = value;
    }

    public get usedTokenSource(): TokenSourceType {
        return this._usedTokenSource;
    }
    public set usedTokenSource(value: TokenSourceType) {
        this._usedTokenSource = value;
    }

    public get workingDirectory() {
        return this._workingDirectory;
    }
    public set workingDirectory(value) {
        this._workingDirectory = value;
    }
    
    public get globalStoreDirectory() {
        return this._globalStoreDirectory;
    }
    public set globalStoreDirectory(value) {
        this._globalStoreDirectory = value;
    }
}

export class ListOperationConfig extends CommonOperationConfig {
    private _users: Array<string>
    private _organizations: Array<string>
    private _organizationDownloadPath: string; 
    
    constructor(tokenFile?: string, token?: string, tokenSourceType?: TokenSourceType, workingDirectory?: string, globalStoreDirectory?: string, 
        users?: Array<string>, 
        organizations?: Array<string>, organizationDownloadPath?: string, isLongRunningDownloadOperation?: boolean) {
        super(tokenFile, token, tokenSourceType, workingDirectory, globalStoreDirectory);
        this.users = users;
        this.organizations = organizations;
        this.organizationDownloadPath = organizationDownloadPath;
    }

    get users(): Array<string> {
        if (this._users == null) {
            this._users = new Array<string>();
        }
        return this._users;
    }
    set users(value) {
        if (this._users == null) {
            this._users = new Array<string>();
        }
        this._users = value;
    }
    get organizations(): Array<string> {
        if (this._organizations == null) {
            this._organizations = new Array<string>();
        }
        return this._organizations;
    }
    set organizations(value) {
        if (this._organizations == null) {
            this._organizations = new Array<string>();
        }
        this._organizations = value;
    }
    get organizationDownloadPath() {
        if (this._organizationDownloadPath == null || this._organizationDownloadPath == undefined || this._organizationDownloadPath == "") {
            this._organizationDownloadPath = Runtime.getDefault("DEFAULT_ORGANIZATION_DOWNLOAD_PATH");
        }
        return this._organizationDownloadPath;
    }
    set organizationDownloadPath(value) {
        if (value == null || value == undefined || value == "") {
            this._organizationDownloadPath = Runtime.getDefault("DEFAULT_ORGANIZATION_DOWNLOAD_PATH");
        }
        this._organizationDownloadPath = value;
    }

}

export class DownloadOperationConfig extends CommonOperationConfig {
    private _users: Array<string>
    private _organizations: Array<string>
    private _organizationDownloadPath: string; 
    private _isLongRunningDownloadOperation: boolean;

    constructor(tokenFile?: string, token?: string, tokenSourceType?: TokenSourceType, workingDirectory?: string, globalStoreDirectory?: string, 
        users?: Array<string>, 
        organizations?: Array<string>, organizationDownloadPath?: string, isLongRunningDownloadOperation?: boolean) {
        super(tokenFile, token, tokenSourceType, workingDirectory, globalStoreDirectory);
        this.users = users;
        this.organizations = organizations;
        this.organizationDownloadPath = organizationDownloadPath;
        this.isLongRunningDownloadOperation = isLongRunningDownloadOperation;
    }
  get users(): Array<string> {
        if (this._users == null) {
            this._users = new Array<string>();
        }
        return this._users;
    }
    set users(value) {
        if (this._users == null) {
            this._users = new Array<string>();
        }
        this._users = value;
    }
    get organizations(): Array<string> {
        if (this._organizations == null) {
            this._organizations = new Array<string>();
        }
        return this._organizations;
    }
    set organizations(value) {
        if (this._organizations == null) {
            this._organizations = new Array<string>();
        }
        this._organizations = value;
    }
    get organizationDownloadPath() {
        if (this._organizationDownloadPath == null || this._organizationDownloadPath == undefined || this._organizationDownloadPath == "") {
            this._organizationDownloadPath = Runtime.getDefault("DEFAULT_ORGANIZATION_DOWNLOAD_PATH");
        }
        return this._organizationDownloadPath;
    }
    set organizationDownloadPath(value) {
        if (value == null || value == undefined || value == "") {
            this._organizationDownloadPath = Runtime.getDefault("DEFAULT_ORGANIZATION_DOWNLOAD_PATH");
        }
        this._organizationDownloadPath = value;
    }

    get isLongRunningDownloadOperation() {
        if (this._isLongRunningDownloadOperation == null || this._isLongRunningDownloadOperation == undefined) {
            this._isLongRunningDownloadOperation = false;
        }
        return this._isLongRunningDownloadOperation;
    }
    set isLongRunningDownloadOperation(value) {
        if (this._isLongRunningDownloadOperation == null || this._isLongRunningDownloadOperation == undefined) {
            this._isLongRunningDownloadOperation = false;
        }
        this._isLongRunningDownloadOperation = value;
    }
}

export function PerformOperationSetup<T1 extends Operation | RepositoryListOperation | RepositoryDownloadOperation >
    (opConfig: CommonOperationConfig | ListOperationConfig | DownloadOperationConfig): T1 {
    let gitHubConfig: GitHubConfiguration = undefined;

    // TODO: validate the token (one or the other setting, etc)...
    if (opConfig.token == null && opConfig.tokenFile == null) {
        throw new Error('A token value or token-file containing a valid token must be provided.');
    }

    let tok: string;
    let tokSource: TokenSourceType
    if (opConfig.token != null) {
        tok = <string>opConfig.token;
        tokSource = TokenSourceType.String;
    } else if (opConfig.tokenFile != null) {
        tok = fs.readFileSync(<string>opConfig.tokenFile).toString();
        tokSource = TokenSourceType.File;
    }
    gitHubConfig = new GitHubConfiguration(tok, opConfig.tokenFile, tokSource);

    if (opConfig instanceof ListOperationConfig) {
        const listOp: RepositoryListOperation = new RepositoryListOperation();
        listOp.githubConfiguration = gitHubConfig;
        listOp.globalStoreDirectory = opConfig.globalStoreDirectory;
        listOp.applicationWorkingDirectory = opConfig.workingDirectory;
        listOp.globalOperationStartTime = new Date();
        // add requested organizations...
        opConfig.organizations.forEach((org) => {
            let organization = new Organization();
            organization.name = org;

            let orgHash = crypto.createHash('sha256').update(organization.name, 'utf8').digest();
            let namHsh = orgHash.toString(undefined, 0, 8);
            organization.nameHash = organization.name.substr(0, 5) + namHsh;

            listOp.organizations.push(organization);
        });

        opConfig.users.forEach((u) => {
            let user = new User();
            user.name = u;

            let orgHash = crypto.createHash('sha256').update(user.name, 'utf8').digest();
            let namHsh = orgHash.toString(undefined, 0, 8);
            user.nameHash = user.name.substr(0, 5) + namHsh;

            listOp.users.push(user);
        });

        return listOp as RepositoryListOperation as T1;
    } 
    if (opConfig instanceof DownloadOperationConfig) { 
        // Setup the "global" download-operation
        const downloadOp = new RepositoryDownloadOperation(); 
        downloadOp.isLongRunningDownloadOperation = opConfig.isLongRunningDownloadOperation;
        downloadOp.githubConfiguration = gitHubConfig;
        downloadOp.globalStoreDirectory = opConfig.globalStoreDirectory;
        downloadOp.applicationWorkingDirectory = opConfig.workingDirectory;
        downloadOp.globalOperationStartTime = new Date();
        // add requested organizations...
        opConfig.organizations.forEach((org) => {
            let organization = new Organization();
            organization.name = org;

            let orgHash = crypto.createHash('sha256').update(organization.name, 'utf8').digest();
            let namHsh = orgHash.toString(undefined, 0, 8);
            organization.nameHash = organization.name.substr(0, 5) + namHsh;

            downloadOp.organizations.push(organization);
        });

        opConfig.users.forEach((u) => {
            let user = new User();
            user.name = u;

            let orgHash = crypto.createHash('sha256').update(user.name, 'utf8').digest();
            let namHsh = orgHash.toString(undefined, 0, 8);
            user.nameHash = user.name.substr(0, 5) + namHsh;

            downloadOp.organizations.push(user);
        });
    
        return downloadOp as RepositoryDownloadOperation as T1;
    }
    let downloadOp = new RepositoryDownloadOperation();
    return downloadOp as T1;
}

export async function performListLatestCommitsRetrieval(listOp: RepositoryListOperation): Promise<OrganizationRepositoriesLatestCommitsList[]> {
    let list: OrganizationRepositoriesLatestCommitsList[] = new Array<OrganizationRepositoriesLatestCommitsList>();
    const listGen = new RepositoryLister(listOp);
    for (let organization of listOp.organizations) {
        const org = await listGen.generateListLatestCommits_ApolloClient(organization, true);
        list.push(org);
    }
    return list;
}


//
// Do List-Initialization
//
export async function performListRetrieval(listOp: RepositoryListOperation): Promise<Map<string, UserRepositoriesList | OrganizationRepositoriesList>> {
    const listGen = new RepositoryLister(listOp);
    let repositoriesMap = new Map<string, UserRepositoriesList | OrganizationRepositoriesList>();

    for (let organization of listOp.organizations) {
        const orgsRepoList = await listGen.generateList_Organization_ApolloClient(organization, true);
        repositoriesMap.set(organization.name, orgsRepoList);
    }
    
    for (let user of listOp.users) {
        const userList = await listGen.generateList_User_ApolloClient(user, true);
        repositoriesMap.set(user.name, userList);
    }

    return repositoriesMap;
}


export function performLocalListGeneration(downloadOp: RepositoryDownloadNewReposOperation): Promise<RepositoryDownloadNewReposOperation> {
    if ( downloadOp.organizationDownloadPath  ) {
        fs.readdirSync(downloadOp.organizationDownloadPath).forEach(file => {
            console.log(file);
        });
    }
    return Promise.any([new RepositoryDownloadNewReposOperation()]);
}

export async function performRepositoryDownloads(downloadOp: RepositoryDownloadOperation): Promise<Array<GitCloneTemp_CommandInfo>> {
    const cloneCommands: Array<GitCloneTemp_CommandInfo> = new Array<GitCloneTemp_CommandInfo>();

    // let repositories = await performListRetrieval(downloadOp);
    for (let organization of downloadOp.organizations) {
        if (downloadOp.repositoryListFilesMap.has(organization.name)) {
            let buf = fs.readFileSync(downloadOp.repositoryListFilesMap.get(organization.name));
            let repositoryList = JSON.parse(buf.toString());

            console.log(JSON.stringify(repositoryList, undefined, 4));    

            if (!downloadOp.isLongRunningDownloadOperation) {
                let downloader = new Downloader(downloadOp, organization);
                let cloneCommandResults = await downloader.downloadRepositories(repositoryList);
                
                cloneCommandResults.forEach((cci) => {
                    console.log("CloneCommand Print-Out: " + cci.commandLogFilePath);
                });
                cloneCommands.push(...cloneCommandResults);
            } else {
                let downloader = new LongRunningDownloader(downloadOp, organization);
                let cloneCommandResults = downloader.resumeLongRunningOperation();                
                cloneCommandResults.forEach((cci) => {
                    console.log("CloneCommand Print-Out: " + cci.commandLogFilePath);
                });
            }
        }
    }
    return Promise.resolve(cloneCommands);
}

// export function performNewRepositoryDownloads(downloadOp: RepositoryDownloadNewReposOperation): Promise<RepositoryDownloadNewReposOperation> {
//     return performListRetrieval(<RepositoryDownloadNewReposOperation>downloadOp);
//             //  .then((downloadOp) => {
//             //     return performLocalListGeneration(<RepositoryDownloadNewReposOperation>downloadOp);
//             //  });
// }


//
// Perform validation
//
// cloneCommandResults.forEach((cci) => {
//     cci.commandLogFilePath
// });
// downloader.verifyDownloadSuccessFromListFile(listQueryLogFile, downloadOp.downloadDirectory);
// downloader.verifyDownloadSuccessFromLogFile(list.organizationName, listQueryLogFile);
// console.log("The following repos exited with failure conditions.");
// cloneOperationFailures.forEach((cci) => { console.log(cci.repo) });
// let jsonContent = JSON.stringify(cloneOperationFailures, undefined, 4);
// fs.writeFile("clone-failures --- " + listQueryLogFile, jsonContent, (err) => {
//     if (err) {
//         console.error(err);
//         throw new Error("Unable to write repository-list query results file. Error was: " + err);
//     };
//     console.log("File has been created");
// });
//
// let downloader = new Downloader(tok);
// listPromise.then((list: RepositoryList) => {
//     list.repositories.forEach((r) => {
//         downloader.verifyDownloadSuccess(list.organizationName, r);
//     });
// });
