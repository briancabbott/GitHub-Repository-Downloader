import { RepositoryLister } from "./list_repositories";
import * as fs from "fs";
import { RepositoryList } from "./model";
import { Downloader } from "./download";
import { GitCloneTemp_CommandInfo } from "./git_cli/git_clone_temp";

let tok = fs.readFileSync("auth-token-briancabbott-github-app.tk").toString();

let listGen = new RepositoryLister(tok);
let downloader = new Downloader(tok);

let cloneOperationFailures = new Array<GitCloneTemp_CommandInfo>();
let listQueryLogFile: string = undefined;

let organizationName = "GoogleCloudPlatform";

let listPromise = listGen.generateList(organizationName, true);
listPromise.then((list: RepositoryList) => { 
    listQueryLogFile = list.writeToFile();
    
    list.repositories.forEach((r) => console.log(r.url)) 
    let cloneCommandResults = downloader.downloadRepositories(list);
    
    cloneCommandResults.forEach((cci) => {
        cci.determineFailureStatus();
        if (cci.cloneOperationFailed) {
            cloneOperationFailures.push(cci);
        }
    });

    downloader.verifyDownloadSuccessFromListFile(listQueryLogFile, "C:\\GRD3\\" + organizationName);
    downloader.verifyDownloadSuccessFromLogFile(list.organizationName, listQueryLogFile);

}).catch((reason) => {
    console.error("Error occured processing requests. Error was: " + reason);
    process.exit(1);
});

console.log("The following repos exited with failure conditions.");
cloneOperationFailures.forEach((cci) => { console.log(cci.repo) });
let jsonContent = JSON.stringify(cloneOperationFailures, undefined, 4);
fs.writeFile("clone-failures --- " + listQueryLogFile, jsonContent, (err) => {
    if (err) {
        console.error(err);
        throw new Error("Unable to write repository-list query results file. Error was: " + err);
    };
    console.log("File has been created");
});

// let downloader = new Downloader(tok);
// listPromise.then((list: RepositoryList) => { 
//     list.repositories.forEach((r) => {
//         downloader.verifyDownloadSuccess(list.organizationName, r); 
//     });
// });
