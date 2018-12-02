import { RepositoryList, Repository } from "./model";
import * as fs from "fs";
import { GitCloneTemp, GitCloneTemp_CommandInfo } from "./git_cli/git_clone_temp";
import { join } from "path";

export class Downloader {
    githubToken: string
    downloadDirectory: string; 
    cloneCommandResults = new Array<GitCloneTemp_CommandInfo>();

    constructor(githubToken: string, downloadDirectory: string) {
        this.githubToken = githubToken;
        this.downloadDirectory = downloadDirectory;
    }

    public downloadRepositories(reposList: RepositoryList): Array<GitCloneTemp_CommandInfo> {
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
        let repoDownloadLocation = join(this.downloadDirectory, repository.name);
        gitClone.execute(repository.url, repoDownloadLocation, (commandInfo) => {
            commandInfo.writeToFile(repoDownloadLocation);
            this.cloneCommandResults.push(commandInfo);
        });
        console.log("Finished cloning repository: " + repository.name);
    }

    // Use internal messages from ChildProcess's
    public verifyDownloadSuccess(orgName: string, repository: Repository) {
        let repoLoc = this.downloadDirectory + "\\" + repository.name;
        if (!fs.existsSync(repoLoc)) {
            return;
        }
    } 

    public verifySuccessFromLogFiles() {
        let dirs = fs.readdirSync(this.downloadDirectory);
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