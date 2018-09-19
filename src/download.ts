import { RepositoryList, Repository } from "./model";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync } from "fs";
import { GitCloneTemp, GitCloneTemp_CommandInfo } from "./git_cli/git_clone_temp";
import { join } from "path";

export class Downloader {

    githubToken: string
    downloadLocation: string; 
    cloneCommandResults = new Array<GitCloneTemp_CommandInfo>();

    constructor(githubToken: string) {
        this.githubToken = githubToken;
    }

    public downloadRepositories(reposList: RepositoryList): Array<GitCloneTemp_CommandInfo> {
        this.downloadLocation = "C:\\GRD3\\" + reposList.organizationName;

        console.log("Starting downloads... "); 
        reposList.repositories.forEach((r) => console.log(r.name));
        reposList.repositories.forEach((repository) => {
            this.downloadRepository(reposList.organizationName, repository);
        });

        return this.cloneCommandResults;
    }
    
    private downloadRepository(orgName: string, repository: Repository) {
        if (!existsSync(this.downloadLocation)) {
            mkdirSync(this.downloadLocation);
        }

        console.log("Downloading: " + repository.url);
        let gitClone = new GitCloneTemp();
        gitClone.execute(repository.url, this.downloadLocation + "\\" + repository.name, (commandInfo)=>{
            console.log("command info results...: " + commandInfo);
            this.cloneCommandResults.push(commandInfo);

        });
        console.log("Finished cloning repository: " + repository.name);
    }

    // Use internal messages from ChildProcess's
    public verifyDownloadSuccess(orgName: string, repository: Repository) {
        let repoLoc = "C:\\GRD3\\" + orgName + "\\" + repository.name;
        if (!existsSync(repoLoc)) {
            return;
        }
    } 

    public verifyDownloadSuccessFromLogFile(organizationName: string, listQueryLogFile: string) {

    }

    public verifyDownloadSuccessFromListFile(listQueryLogFile: string, downloadsDir: string): Array<Repository> {
        let jsonContent = readFileSync(listQueryLogFile).toString();
        let reposList: RepositoryList = JSON.parse(jsonContent);

        let dirEntries: Array<string> = new Array<string>();
        let dirEntriesRead: Array<string> = readdirSync(downloadsDir, { encoding: "utf8"});
        dirEntriesRead.forEach((dirEntry) => {
            let stats = statSync(join(downloadsDir, dirEntry));
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