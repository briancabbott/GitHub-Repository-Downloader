"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const git_clone_temp_1 = require("./git_cli/git_clone_temp");
const path_1 = require("path");
class Downloader {
    constructor(githubToken, downloadDirectory) {
        this.cloneCommandResults = new Array();
        this.githubToken = githubToken;
        this.downloadDirectory = downloadDirectory;
    }
    downloadRepositories(reposList) {
        // Make sure the output directory is there.
        console.log("Starting downloads... ");
        reposList.repositories.forEach((repository) => {
            this.downloadRepository(reposList.organizationName, repository);
        });
        return this.cloneCommandResults;
    }
    downloadRepository(orgName, repository) {
        console.log("Downloading: " + repository.url);
        let gitClone = new git_clone_temp_1.GitCloneTemp();
        let repoDownloadLocation = path_1.join(this.downloadDirectory, repository.name);
        gitClone.execute(repository.url, repoDownloadLocation, (commandInfo) => {
            commandInfo.writeToFile(repoDownloadLocation);
            this.cloneCommandResults.push(commandInfo);
        });
        console.log("Finished cloning repository: " + repository.name);
    }
    // Use internal messages from ChildProcess's
    verifyDownloadSuccess(orgName, repository) {
        let repoLoc = this.downloadDirectory + "\\" + repository.name;
        if (!fs.existsSync(repoLoc)) {
            return;
        }
    }
    verifySuccessFromLogFiles() {
        let dirs = fs.readdirSync(this.downloadDirectory);
        dirs.forEach((dir) => console.log(dir));
    }
    verifyDownloadSuccessFromListFile(listQueryLogFile, downloadsDir) {
        let jsonContent = fs.readFileSync(listQueryLogFile).toString();
        let reposList = JSON.parse(jsonContent);
        let dirEntries = new Array();
        let dirEntriesRead = fs.readdirSync(downloadsDir, { encoding: "utf8" });
        dirEntriesRead.forEach((dirEntry) => {
            let stats = fs.statSync(path_1.join(downloadsDir, dirEntry));
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
