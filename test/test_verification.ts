import { Downloader } from "../src/download";
import { readFileSync } from "fs";
// import { RepositoryList } from "../src/model";


let organizationName = "GoogleCloudPlatform";
let listQueryLogFile = "repositories_for_organization--GoogleCloudPlatform--function valueOf() { [native code] }.json";

let tok = readFileSync("auth-token-briancabbott-github-app.tk").toString();

let downloader = new Downloader(tok);
let failedRepos = downloader.verifyDownloadSuccessFromListFile(listQueryLogFile, "C:\\GRD3\\" + organizationName);

if (failedRepos.length > 0) {
    console.log("Failed repositories where found. The following repositories failed to download (" + failedRepos.length + "): ");
    failedRepos.forEach((r) => {
        console.log("github repo url: " + r.url);
    });

    // let reposList = new RepositoryList(organizationName, new Date(), failedRepos);
    // let commandInfo = downloader.downloadRepositories(reposList);
    // commandInfo.forEach((ci) => {
    //     console.log("cloned repo: " + ci.repo);    
    // });
} else {
    console.log(" All repositories downloaded. ");
}