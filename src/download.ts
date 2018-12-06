import { RepositoryList, Repository, RepositoryDownloadOperation, Organization } from "./model";
import * as fs from "fs";
import { GitCloneTemp, GitCloneTemp_CommandInfo } from "./git_cli/git_clone_temp";
import { join } from "path";
var fsext = require("fs-extra");


export class Downloader {
    cloneCommandResults = new Array<GitCloneTemp_CommandInfo>();
    
    downloadOp: RepositoryDownloadOperation;
    organization: Organization
    
    constructor(downloadOp: RepositoryDownloadOperation, organization: Organization) {
        this.downloadOp = downloadOp;
        this.organization = organization;
    }

    public downloadRepositories(reposList: RepositoryList): Array<GitCloneTemp_CommandInfo> {

        this.organization.makeNameAckro();
        this.organization.downloadOpDirectory = this.downloadOp.makeDownloadDirectoryPath(this.organization.shortNameAckro);
        fsext.ensureDirSync(this.organization.downloadOpDirectory);
    

        // Make sure the output directory is there.
        console.log("Starting downloads... "); 
        reposList.repositories.forEach((repository) => {
            this.downloadRepository(reposList.organizationName, repository);
        });

        return this.cloneCommandResults;
    }
    
    private downloadRepository(orgName: string, repository: Repository) {
        console.log("Downloading: " + repository.url);

        let gitClone = new GitCloneTemp();
        let repoDownloadLocation = join(this.organization.downloadOpDirectory, repository.name);
        gitClone.execute(repository.url, repoDownloadLocation, (commandInfo) => {
            commandInfo.writeToFile(repoDownloadLocation);
            this.cloneCommandResults.push(commandInfo);
        });
        console.log("Finished cloning repository: " + repository.name);
    }

    // Use internal messages from ChildProcess's
    public verifyDownloadSuccess(orgName: string, repository: Repository) {
        let repoLoc = this.organization.downloadOpDirectory + "\\" + repository.name;
        if (!fs.existsSync(repoLoc)) {
            return;
        }
    } 

    public verifySuccessFromLogFiles() {
        let dirs = fs.readdirSync(this.organization.downloadOpDirectory);
        dirs.forEach((dir) => console.log(dir));
    }

    public verifyDownloadSuccessFromListFile(listQueryLogFile: string, downloadsDir: string): Array<Repository> {
        let jsonContent = fs.readFileSync(listQueryLogFile).toString();
        let reposList: RepositoryList = JSON.parse(jsonContent);

        let dirEntries: Array<string> = new Array<string>();
        let dirEntriesRead: Array<string> = fs.readdirSync(downloadsDir, { encoding: "utf8"});
        dirEntriesRead.forEach((dirEntry) => {
            let stats = fs.statSync(join(downloadsDir, dirEntry));
            if (stats.isDirectory()) {
                dirEntries.push(dirEntry);
            }
        });

        let repoNames = new Map<string, Repository>(reposList.repositories.map<[string, Repository]>((r: Repository) => [r.name, r]));
        let failedRepositories: Array<Repository> = new Array<Repository>();

        repoNames.forEach((r, name) => { 
            if (!dirEntries.includes(name)) {
                failedRepositories.push(r);
            }
        });

        return failedRepositories;
    }
}