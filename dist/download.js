"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const git_clone_temp_1 = require("./git_cli/git_clone_temp");
class Downloader {
    constructor(githubToken) {
        this.cloneCommandResults = new Array();
        this.githubToken = githubToken;
    }
    downloadRepositories(reposList) {
        this.downloadLocation = "C:\\GRD3\\" + reposList.organizationName;
        console.log("Starting downloads... ");
        reposList.repositories.forEach((r) => console.log(r.name));
        reposList.repositories.forEach((repository) => {
            this.downloadRepository(reposList.organizationName, repository);
        });
        return this.cloneCommandResults;
    }
    downloadRepository(orgName, repository) {
        if (!fs_1.existsSync(this.downloadLocation)) {
            fs_1.mkdirSync(this.downloadLocation);
        }
        console.log("Downloading: " + repository.url);
        let gitClone = new git_clone_temp_1.GitCloneTemp();
        gitClone.execute(repository.url, this.downloadLocation + "\\" + repository.name, (commandInfo) => {
            console.log("command info results...: " + commandInfo);
            this.cloneCommandResults.push(commandInfo);
        });
        console.log("Finished cloning repository: " + repository.name);
    }
    // Use internal messages from ChildProcess's
    verifyDownloadSuccess(orgName, repository) {
        let repoLoc = "C:\\GRD3\\" + orgName + "\\" + repository.name;
        if (!fs_1.existsSync(repoLoc)) {
            return;
        }
    }
    verifyDownloadSuccessFromLogFile(organizationName, listQueryLogFile) {
    }
}
exports.Downloader = Downloader;
