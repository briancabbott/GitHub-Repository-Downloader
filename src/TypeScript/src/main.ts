import { RepositoryLister } from "./list_repositories";
import * as fs from "fs";
import { OrganizationRepositoriesList, RepositoryDownloadOperation, RepositoryDownloadNewReposOperation, Organization, GitHubConfiguration } from "./model";
import { Downloader, LongRunningDownloader } from "./download";
import crypto from 'crypto';

import path from 'path';
import { GitCloneTemp_CommandInfo } from "./git_cli/git_clone_temp";


// "auth-token-briancabbott-github-app.tk"
export interface OperationConfig {
    tokenFile: string;
    token: string;
    organizations: Array<string>;
    workingDirectory: string;
    globalStoreDirectory: string;
    organizationDownloadPath: string;
    isLongRunningDownloadOperation: boolean;
}

export function performOperationSetup(opConfig: OperationConfig): RepositoryDownloadOperation | RepositoryDownloadNewReposOperation {

    if (opConfig.token != null && opConfig.tokenFile != null || opConfig.token == null && opConfig.tokenFile == null) {
        throw new Error('A token value or token-file containing a valid token must be provided.');
    }

    let tok: string;
    if (opConfig.token != null) {
        tok = <string>opConfig.token;
    } else if (opConfig.tokenFile != null) {
      tok = fs.readFileSync(<string>opConfig.tokenFile).toString();
    }
    let gitHubConfig = new GitHubConfiguration(tok);

    // Setup the "global" download-operation
    let downloadOp = new RepositoryDownloadOperation();
    downloadOp.githubConfiguration = gitHubConfig;
    downloadOp.globalStoreDirectory = opConfig.globalStoreDirectory;
    downloadOp.applicationWorkingDirectory = opConfig.workingDirectory;
    downloadOp.globalOperationStartTime = new Date();
    downloadOp.isLongRunningDownloadOperation = opConfig.isLongRunningDownloadOperation;

    //
    // Now perform active operations for preparing derived/generated values/artifacts from
    // download-op settings (i.e. create dirs, set calculated values, etc).

    // add requested organizations...
    opConfig.organizations.forEach((org) => {
        let organization = new Organization();
        organization.name = org;

        let orgHash = crypto.createHash('sha256').update(organization.name, 'utf8').digest();
        let namHsh = orgHash.toString(undefined, 0, 8);
        organization.nameHash = organization.name.substr(0, 5) + namHsh;

        downloadOp.organizations.push(organization);
    });

    return downloadOp;

    // downloadOp.organizations.forEach((org) => {
    //     let instanceDir = -downloadOp.operationUUID;
    //     downloadOp.workingDirectory = path.join(".\\ops_working_dirs", instanceDir);
    // }
    // let cloneOperationFailures = new Array<GitCloneTemp_CommandInfo>();
}

// listPromise.then((list: RepositoryList) => {
//     listQueryLogFile = listGen.writeToFile(organization, list);
//     orgRepoListMap.set(organization.name, listQueryLogFile);
//
//     console.log("Wrote RepoList file to: " + listQueryLogFile);
// }).catch((reason) => {
//     console.error("Error occured processing requests. Error was: " + reason);
// });



//
// Do List-Initialization
//
export async function performListRetrieval(downloadOp: RepositoryDownloadOperation): Promise<string[]> {
    return new Promise((resolve, reject) => {
        console.log("performListRetrieval()");
    
        const orgsByNameMap = new Map<string, Organization>();
        const orgsRepoList: Array<OrganizationRepositoriesList> = new Array<OrganizationRepositoriesList>();
        const listGen = new RepositoryLister(downloadOp);
        
        for (let organization of downloadOp.organizations) {
            orgsByNameMap.set(organization.name, organization);
            const listPromise = listGen.generateList(organization, true);
            listPromise.then((v) => orgsRepoList.push(v));
        }
    
        const repoFiles = new Array<string>();
        orgsRepoList.forEach((orgRepositories) => {
            let org = orgsByNameMap.get(orgRepositories.organizationName);
            const listQueryLogFile = listGen.writeToFile(org, orgRepositories);
            
            repoFiles.push(listQueryLogFile);
            
            downloadOp.repositoryListFilesMap.set(org.name, listQueryLogFile);
            console.log("Wrote Org-Repo-List (for: " + org.name + ") file to: " + listQueryLogFile);
        });
    
        repoFiles.forEach(f => console.log("rf: ", f));
        
        resolve(repoFiles);    
    });
}

export function performLocalListGeneration(downloadOp: RepositoryDownloadNewReposOperation): Promise<RepositoryDownloadNewReposOperation> {
    if ( downloadOp.organizationDownloadPath  ) {
      // arg: string | null | undefined
        fs.readdirSync(downloadOp.organizationDownloadPath).forEach(file => {
            console.log(file);
        });
    }
    return Promise.any([new RepositoryDownloadNewReposOperation()]);
}

//
// Perform download
//
export async function performRepositoryDownloads(downloadOp: RepositoryDownloadOperation): Promise<Array<GitCloneTemp_CommandInfo>> {
    console.log("performRepositoryDownloads()....  ");

    const cloneCommands: Array<GitCloneTemp_CommandInfo> = new Array<GitCloneTemp_CommandInfo>();

    // let repositories = await performListRetrieval(downloadOp);
    for (let organization of downloadOp.organizations) {
        console.log("download for org: " + organization.name);

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
