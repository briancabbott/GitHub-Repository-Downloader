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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongRunningDownloader = exports.Downloader = void 0;
const fs = __importStar(require("fs"));
const git_clone_temp_1 = require("./git_cli/git_clone_temp");
const path_1 = require("path");
var fsext = require("fs-extra");
class Downloader {
    constructor(downloadOp, organization) {
        this.downloadOp = downloadOp;
        this.organization = organization;
    }
    setupDirectories() {
        this.organization.makeNameAckro();
        this.organization.downloadOpDirectory = this.downloadOp.makeDownloadDirectoryPath(this.organization.shortNameAckro);
        fsext.ensureDirSync(this.organization.downloadOpDirectory);
    }
    // reposList.repositories.forEach((repository) => {
    //     this.downloadRepository(reposList.organizationName, repository);
    // });
    async downloadRepositories(reposList) {
        const p = new Promise((resolve, rejected) => {
            const cloneCommandResults = new Array();
            // Make sure the output directory is there.
            this.setupDirectories();
            console.log("Starting downloads... ");
            let it = reposList.repositories.entries();
            let nxt = () => {
                let ir = it.next();
                if (!ir.done) {
                    this.downloadRepository(cloneCommandResults, reposList.organizationName, ir.value[1], nxt);
                }
            };
            let n = it.next();
            if (n !== undefined && n.value !== undefined) {
                this.downloadRepository(cloneCommandResults, reposList.organizationName, n.value[1], nxt);
            }
            resolve(cloneCommandResults);
        });
        return p;
    }
    downloadRepository(cloneCommandResults, orgName, repository, nextFn) {
        console.log("Downloading: " + repository.url);
        let gitClone = new git_clone_temp_1.GitCloneTemp();
        let repoDownloadLocation = (0, path_1.join)(this.organization.downloadOpDirectory, repository.name);
        gitClone.execute(repository.url, repoDownloadLocation, (commandInfo) => {
            commandInfo.writeToFile(repoDownloadLocation);
            cloneCommandResults.push(commandInfo);
            if (nextFn) {
                nextFn();
            }
        });
        console.log("Finished cloning repository: " + repository.name);
    }
    // Use internal messages from ChildProcess's
    verifyDownloadSuccess(orgName, repository) {
        let repoLoc = this.organization.downloadOpDirectory + "\\" + repository.name;
        if (!fs.existsSync(repoLoc)) {
            return false;
        }
        return true;
    }
    verifySuccessFromLogFiles() {
        let dirs = fs.readdirSync(this.organization.downloadOpDirectory);
        dirs.forEach((dir) => console.log(dir));
    }
    verifyDownloadSuccessFromListFile(listQueryLogFile, downloadsDir) {
        let jsonContent = fs.readFileSync(listQueryLogFile).toString();
        let reposList = JSON.parse(jsonContent);
        let dirEntries = new Array();
        let dirEntriesRead = fs.readdirSync(downloadsDir, { encoding: "utf8" });
        dirEntriesRead.forEach((dirEntry) => {
            let stats = fs.statSync((0, path_1.join)(downloadsDir, dirEntry));
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
class LongRunningDownloader extends Downloader {
    constructor(downloadOp, organization) {
        super(downloadOp, organization);
        console.log(`resuming long running. DownloadOp is: ${this.downloadOp}`);
    }
    getRepositoryListFromRecord() {
        let buf = fs.readFileSync(this.downloadOp.repositoryListFilesMap.get(this.organization.name));
        let repositoryList = JSON.parse(buf.toString());
        return repositoryList;
    }
    getAlreadyDownloaded() {
        // this.downloadOp.repositoryListFilesMap.get(this.organization.name)
        let repositoryList = this.getRepositoryListFromRecord();
        let downloaded = new Array();
        repositoryList.repositories.forEach(r => {
            if (this.verifyDownloadSuccess(this.organization.name, r)) {
                downloaded.push(r);
            }
        });
        return downloaded;
    }
    // public hasDownloadInited(): boolean {
    //     this.setupDirectories();
    //     this.organization.shortNameAckro
    // }
    resumeLongRunningOperation() {
        const cloneCommandResults = new Array();
        console.log(`RESUMING LONG RUNNING FOR: ${this.downloadOp}`);
        console.log(`RESUMING LONG RUNNING FOR: ${this.organization}`);
        let repos = this.getRepositoryListFromRecord();
        let downloadedRepositories = this.getAlreadyDownloaded();
        repos.repositories.forEach(r => {
            if (!downloadedRepositories.includes(r)) {
                console.log(`RESUMING LONG RUNNING FOR: ${r.name}`);
                this.downloadRepository(cloneCommandResults, this.organization.name, r, null);
            }
        });
        return cloneCommandResults;
    }
}
exports.LongRunningDownloader = LongRunningDownloader;
