import { OrganizationRepositoriesList, Repository, RepositoryDownloadOperation, Organization } from "./model";
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

    protected setupDirectories() {
        this.organization.makeNameAckro();
        this.organization.downloadOpDirectory = this.downloadOp.makeDownloadDirectoryPath(this.organization.shortNameAckro);
        fsext.ensureDirSync(this.organization.downloadOpDirectory);
    }

    public downloadRepositories(reposList: OrganizationRepositoriesList): Array<GitCloneTemp_CommandInfo> {
        this.setupDirectories();
        // Make sure the output directory is there.
        console.log("Starting downloads... "); 

        // reposList.repositories.
        let it = reposList.repositories.entries();
        let nxt = ()=>{
            let ir = it.next()
            if (!ir.done) {
                this.downloadRepository(reposList.organizationName, ir.value[1], nxt);
            }
        }
        let n = it.next();
        if (n !== undefined && n.value !== undefined) {
            this.downloadRepository(reposList.organizationName, n.value[1], nxt); 
        }
        // reposList.repositories.forEach((repository) => {
        //     this.downloadRepository(reposList.organizationName, repository);
        // });

        return this.cloneCommandResults;
    }
    
    protected downloadRepository(orgName: string, repository: Repository, nextFn: () => void) {
        console.log("Downloading: " + repository.url);

        let gitClone = new GitCloneTemp();
        let repoDownloadLocation = join(this.organization.downloadOpDirectory, repository.name);
        gitClone.execute(repository.url, repoDownloadLocation, (commandInfo) => {
            commandInfo.writeToFile(repoDownloadLocation);
            this.cloneCommandResults.push(commandInfo);
            if (nextFn) {
                nextFn();
            }
        });
        console.log("Finished cloning repository: " + repository.name);
    }

    // Use internal messages from ChildProcess's
    public verifyDownloadSuccess(orgName: string, repository: Repository): boolean {
        let repoLoc = this.organization.downloadOpDirectory + "\\" + repository.name;
        if (!fs.existsSync(repoLoc)) {
            return false;
        }
        return true;
    } 

    public verifySuccessFromLogFiles() {
        let dirs = fs.readdirSync(this.organization.downloadOpDirectory);
        dirs.forEach((dir) => console.log(dir));
    }

    public verifyDownloadSuccessFromListFile(listQueryLogFile: string, downloadsDir: string): Array<Repository> {
        let jsonContent = fs.readFileSync(listQueryLogFile).toString();
        let reposList: OrganizationRepositoriesList = JSON.parse(jsonContent);

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

export class LongRunningDownloader extends Downloader {
    constructor(downloadOp: RepositoryDownloadOperation, organization: Organization) {
        super(downloadOp, organization);

        console.log(`resuming long running. DownloadOp is: ${this.downloadOp}`);
    }

    private getRepositoryListFromRecord(): OrganizationRepositoriesList {
        let buf = fs.readFileSync(this.downloadOp.repositoryListFilesMap.get(this.organization.name));
        let repositoryList: OrganizationRepositoriesList = <OrganizationRepositoriesList>JSON.parse(buf.toString());
        return repositoryList;
    }

    private getAlreadyDownloaded(): Array<Repository> {
        // this.downloadOp.repositoryListFilesMap.get(this.organization.name)
        
        let repositoryList: OrganizationRepositoriesList = this.getRepositoryListFromRecord();
        let downloaded: Array<Repository> = new Array<Repository>();
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

    public resumeLongRunningOperation(): Array<GitCloneTemp_CommandInfo> {
        console.log(`RESUMING LONG RUNNING FOR: ${this.downloadOp}`);
        console.log(`RESUMING LONG RUNNING FOR: ${this.organization}`);


        let repos = this.getRepositoryListFromRecord();
        let downloadedRepositories: Array<Repository> = this.getAlreadyDownloaded();
        repos.repositories.forEach(r => {
            if (!downloadedRepositories.includes(r)) {
                console.log(`RESUMING LONG RUNNING FOR: ${r.name}`);
                this.downloadRepository(this.organization.name, r, null);
            }
        });
        return this.cloneCommandResults;
    }
}