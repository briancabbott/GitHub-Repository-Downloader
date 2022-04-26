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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.performRepositoryDownloads = exports.performLocalListGeneration = exports.performListRetrieval = exports.performOperationSetup = void 0;
const list_repositories_1 = require("./list_repositories");
const fs = __importStar(require("fs"));
const model_1 = require("./model");
const download_1 = require("./download");
const crypto_1 = __importDefault(require("crypto"));
function performOperationSetup(opConfig) {
    if (opConfig.token != null && opConfig.tokenFile != null || opConfig.token == null && opConfig.tokenFile == null) {
        throw new Error('A token value or token-file containing a valid token must be provided.');
    }
    let tok;
    if (opConfig.token != null) {
        tok = opConfig.token;
    }
    else if (opConfig.tokenFile != null) {
        tok = fs.readFileSync(opConfig.tokenFile).toString();
    }
    let gitHubConfig = new model_1.GitHubConfiguration(tok);
    // Setup the "global" download-operation
    let downloadOp = new model_1.RepositoryDownloadOperation();
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
        let organization = new model_1.Organization();
        organization.name = org;
        let orgHash = crypto_1.default.createHash('sha256').update(organization.name, 'utf8').digest();
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
exports.performOperationSetup = performOperationSetup;
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
async function performListRetrieval(downloadOp) {
    console.log("performListRetrieval()");
    const orgsRepoList = new Array();
    const listGen = new list_repositories_1.RepositoryLister(downloadOp);
    for (let organization of downloadOp.organizations) {
        const org = await listGen.generateList_ApolloClient(organization, true);
        orgsRepoList.push(org);
    }
    return orgsRepoList;
}
exports.performListRetrieval = performListRetrieval;
function performLocalListGeneration(downloadOp) {
    if (downloadOp.organizationDownloadPath) {
        // arg: string | null | undefined
        fs.readdirSync(downloadOp.organizationDownloadPath).forEach(file => {
            console.log(file);
        });
    }
    return Promise.any([new model_1.RepositoryDownloadNewReposOperation()]);
}
exports.performLocalListGeneration = performLocalListGeneration;
//
// Perform download
//
async function performRepositoryDownloads(downloadOp) {
    console.log("performRepositoryDownloads()....  ");
    const cloneCommands = new Array();
    // let repositories = await performListRetrieval(downloadOp);
    for (let organization of downloadOp.organizations) {
        console.log("download for org: " + organization.name);
        if (downloadOp.repositoryListFilesMap.has(organization.name)) {
            let buf = fs.readFileSync(downloadOp.repositoryListFilesMap.get(organization.name));
            let repositoryList = JSON.parse(buf.toString());
            console.log(JSON.stringify(repositoryList, undefined, 4));
            if (!downloadOp.isLongRunningDownloadOperation) {
                let downloader = new download_1.Downloader(downloadOp, organization);
                let cloneCommandResults = await downloader.downloadRepositories(repositoryList);
                cloneCommandResults.forEach((cci) => {
                    console.log("CloneCommand Print-Out: " + cci.commandLogFilePath);
                });
                cloneCommands.push(...cloneCommandResults);
            }
            else {
                let downloader = new download_1.LongRunningDownloader(downloadOp, organization);
                let cloneCommandResults = downloader.resumeLongRunningOperation();
                cloneCommandResults.forEach((cci) => {
                    console.log("CloneCommand Print-Out: " + cci.commandLogFilePath);
                });
            }
        }
    }
    return Promise.resolve(cloneCommands);
}
exports.performRepositoryDownloads = performRepositoryDownloads;
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
