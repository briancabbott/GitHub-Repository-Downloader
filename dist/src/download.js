"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const git_clone_temp_1 = require("./git_cli/git_clone_temp");
const path_1 = require("path");
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
    verifyDownloadSuccessFromListFile(listQueryLogFile, downloadsDir) {
        let jsonContent = fs_1.readFileSync(listQueryLogFile).toString();
        let reposList = JSON.parse(jsonContent);
        let dirEntries = new Array();
        let dirEntriesRead = fs_1.readdirSync(downloadsDir, { encoding: "utf8" });
        dirEntriesRead.forEach((dirEntry) => {
            let stats = fs_1.statSync(path_1.join(downloadsDir, dirEntry));
            if (stats.isDirectory()) {
                dirEntries.push(dirEntry);
            }
        });
        let repoNames = new Map(reposList.repositories.map((r) => [r.name, r]));
        let failedRepositories = new Array();
        repoNames.forEach((r, name) => {
            if (!dirEntries.includes(name)) {
                failedRepositories.push(r);
            }
        });
        return failedRepositories;
    }
}
exports.Downloader = Downloader;
