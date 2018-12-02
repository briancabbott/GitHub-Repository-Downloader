import { RepositoryLister } from "./list_repositories";
import * as fs from "fs";
import { RepositoryList, RepositoryDownloadOperation, Organization, GitHubConfiguration } from "./model";
import { Downloader } from "./download";
// import { GitCloneTemp_CommandInfo } from "./git_cli/git_clone_temp";
import * as path from "path";
var fsext = require("fs-extra");

let tok = fs.readFileSync("auth-token-briancabbott-github-app.tk").toString();
let gitHubConfig = new GitHubConfiguration(tok);

let globalDownloadOp = new RepositoryDownloadOperation();
globalDownloadOp.githubConfiguration = gitHubConfig;
globalDownloadOp.organizations.push(new Organization("GoogleCloudPlatform", "GCP"));
globalDownloadOp.downloadDirectory = globalDownloadOp.makeDownloadDirectoryPath("GCP");
fsext.ensureDirSync(globalDownloadOp.downloadDirectory);

let instanceDir = `${globalDownloadOp.organizations[0].shortNameAckro}-${globalDownloadOp.operationUUID}`;
globalDownloadOp.workingDirectory = path.join(".\\ops_working_dirs", instanceDir);

let listGen = new RepositoryLister(tok);
let downloader = new Downloader(tok, globalDownloadOp.downloadDirectory);

// let cloneOperationFailures = new Array<GitCloneTemp_CommandInfo>();

// 
// Do List-Initialization
//
let listQueryLogFile: string = undefined;
let listPromise = listGen.generateList(globalDownloadOp.organizations[0].name, true);
listPromise.then((list: RepositoryList) => {
    listQueryLogFile = list.writeToFile(globalDownloadOp.downloadDirectory, globalDownloadOp.operationUUID);
    console.log("Wrote RepoList file to: " + listQueryLogFile);
}).catch((reason) => {
    console.error("Error occured processing requests. Error was: " + reason);
    process.exit(1);
});

// 
// Perform download
//
let buf = fs.readFileSync(listQueryLogFile);
let repositoryList = JSON.parse(buf.toString());
let cloneCommandResults = downloader.downloadRepositories(repositoryList);
cloneCommandResults.forEach((cci) => { 
    console.log("CloneCommand Print-Out: " + cci.commandLogFilePath);
});

// 
// Perform download
//
cloneCommandResults.forEach((cci) => {
    cci.commandLogFilePath
});

// downloader.verifyDownloadSuccessFromListFile(listQueryLogFile, globalDownloadOp.downloadDirectory);
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

// let downloader = new Downloader(tok);
// listPromise.then((list: RepositoryList) => { 
//     list.repositories.forEach((r) => {
//         downloader.verifyDownloadSuccess(list.organizationName, r); 
//     });
// });