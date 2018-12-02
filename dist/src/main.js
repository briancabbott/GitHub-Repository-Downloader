"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const list_repositories_1 = require("./list_repositories");
const fs = __importStar(require("fs"));
const model_1 = require("./model");
const download_1 = require("./download");
// import { GitCloneTemp_CommandInfo } from "./git_cli/git_clone_temp";
const path = __importStar(require("path"));
var fsext = require("fs-extra");
let tok = fs.readFileSync("auth-token-briancabbott-github-app.tk").toString();
let gitHubConfig = new model_1.GitHubConfiguration(tok);
let globalDownloadOp = new model_1.RepositoryDownloadOperation();
globalDownloadOp.githubConfiguration = gitHubConfig;
globalDownloadOp.organizations.push(new model_1.Organization("GoogleCloudPlatform", "GCP"));
globalDownloadOp.downloadDirectory = globalDownloadOp.makeDownloadDirectoryPath("GCP");
fsext.ensureDirSync(globalDownloadOp.downloadDirectory);
let instanceDir = `${globalDownloadOp.organizations[0].shortNameAckro}-${globalDownloadOp.operationUUID}`;
globalDownloadOp.workingDirectory = path.join(".\\ops_working_dirs", instanceDir);
let listGen = new list_repositories_1.RepositoryLister(tok);
let downloader = new download_1.Downloader(tok, globalDownloadOp.downloadDirectory);
// let cloneOperationFailures = new Array<GitCloneTemp_CommandInfo>();
// 
// Do List-Initialization
//
let listQueryLogFile = undefined;
let listPromise = listGen.generateList(globalDownloadOp.organizations[0].name, true);
listPromise.then((list) => {
    listQueryLogFile = list.writeToFile(globalDownloadOp.downloadDirectory, globalDownloadOp.operationUUID);
    console.log("Wrote RepoList file to: " + listQueryLogFile);
}).catch((reason) => {
    console.error("Error occured processing requests. Error was: " + reason);
    process.exit(1);
});
let buf = fs.readFileSync(listQueryLogFile);
let repositoryList = JSON.parse(buf.toString());
let cloneCommandResults = downloader.downloadRepositories(repositoryList);
cloneCommandResults.forEach((cci) => {
    console.log("CloneCommand Print-Out: " + cci.commandLogFilePath);
    // cci.determineFailureStatus();
    // if (cci.cloneOperationFailed) {
    //     cloneOperationFailures.push(cci);
    // }
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
