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
const download_1 = require("./download");
let tok = fs.readFileSync("auth-token-briancabbott-github-app.tk").toString();
let listGen = new list_repositories_1.RepositoryLister(tok);
let downloader = new download_1.Downloader(tok);
let cloneOperationFailures = new Array();
let listQueryLogFile = undefined;
let listPromise = listGen.generateList("GoogleCloudPlatform", true);
listPromise.then((list) => {
    listQueryLogFile = list.writeToFile();
    list.repositories.forEach((r) => console.log(r.url));
    let cloneCommandResults = downloader.downloadRepositories(list);
    cloneCommandResults.forEach((cci) => {
        cci.determineFailureStatus();
        if (cci.cloneOperationFailed) {
            cloneOperationFailures.push(cci);
        }
    });
    // downloader.verifyDownloadSuccessFromLogFile(list.organizationName, listQueryLogFile);
}).catch((reason) => {
    console.error("Error occured processing requests. Error was: " + reason);
    process.exit(1);
});
console.log("The following repos exited with failure conditions.");
cloneOperationFailures.forEach((cci) => { console.log(cci.repo); });
let jsonContent = JSON.stringify(cloneOperationFailures, undefined, 4);
fs.writeFile("clone-failures --- " + listQueryLogFile, jsonContent, (err) => {
    if (err) {
        console.error(err);
        throw new Error("Unable to write repository-list query results file. Error was: " + err);
    }
    ;
    console.log("File has been created");
});
// let downloader = new Downloader(tok);
// listPromise.then((list: RepositoryList) => { 
//     list.repositories.forEach((r) => {
//         downloader.verifyDownloadSuccess(list.organizationName, r); 
//     });
// });
