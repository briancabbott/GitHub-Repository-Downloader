




import { 
    OrganizationRepositoriesList, 
    Repository, RepositoryDownloadOperation, Organization, UserRepositoriesList, User, Entity 
} from "./model";
import * as fs from "fs";
import { GitCloneTemp, GitCloneTemp_CommandInfo } from "./git_cli/git_clone_temp";
import { join } from "path";

var fsext = require("fs-extra");


export class Downloader {    
    downloadOp: RepositoryDownloadOperation;
    entity: Organization | User;
    
    constructor(downloadOp: RepositoryDownloadOperation, entity: Entity) {
        this.downloadOp = downloadOp;
        this.entity = entity;
    }

    protected setupDirectories() {
        this.entity.makeNameAckro();
        this.entity.downloadOpDirectory = this.downloadOp.makeDownloadDirectoryPath(this.entity.shortNameAckro);
        fsext.ensureDirSync(this.entity.downloadOpDirectory);
    }

    // reposList.repositories.forEach((repository) => {
    //     this.downloadRepository(reposList.organizationName, repository);
    // });

    public async downloadRepositories(reposList: UserRepositoriesList | OrganizationRepositoriesList): Promise<GitCloneTemp_CommandInfo[]> {
        console.log("Downloading repositories...!!!!")
        console.log(reposList)

        const p = new Promise<GitCloneTemp_CommandInfo[]>((resolve, rejected) => {
            const cloneCommandResults = new Array<GitCloneTemp_CommandInfo>();

            // Make sure the output directory is there.
            this.setupDirectories();
            console.log("Starting downloads... "); 
            let it = reposList.repositories.entries();
            let nxt = () => {
                let ir = it.next()
                if (!ir.done) {
                    this.downloadRepository(cloneCommandResults, reposList.entityName, ir.value[1], nxt);
                }
            }             
            let n = it.next();
            if (n !== undefined && n.value !== undefined) {
                this.downloadRepository(cloneCommandResults, reposList.entityName, n.value[1], nxt); 
            }
            resolve(cloneCommandResults);
        });
        return p;
    }
    

    protected downloadRepository(cloneCommandResults: GitCloneTemp_CommandInfo[], name: string, repository: Repository, nextFn?: () => void) {
        console.log("Downloading: " + repository.url);

        let gitClone = new GitCloneTemp();
        let repoDownloadLocation = join(this.entity.downloadOpDirectory, repository.name);
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
    public verifyDownloadSuccess(orgName: string, repository: Repository): boolean {
        let repoLoc = this.entity.downloadOpDirectory + "\\" + repository.name;
        if (!fs.existsSync(repoLoc)) {
            return false;
        }
        return true;
    } 

    public verifySuccessFromLogFiles() {
        let dirs = fs.readdirSync(this.entity.downloadOpDirectory);
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
        let buf = fs.readFileSync(this.downloadOp.repositoryListFilesMap.get(this.entity.name));
        let repositoryList: OrganizationRepositoriesList = <OrganizationRepositoriesList>JSON.parse(buf.toString());
        return repositoryList;
    }

    private getAlreadyDownloaded(): Array<Repository> {
        // this.downloadOp.repositoryListFilesMap.get(this.organization.name)
        
        let repositoryList: OrganizationRepositoriesList = this.getRepositoryListFromRecord();
        let downloaded: Array<Repository> = new Array<Repository>();
        repositoryList.repositories.forEach(r => {
            if (this.verifyDownloadSuccess(this.entity.name, r)) {
                downloaded.push(r);
            }
        });
        return downloaded;
    }

    // public hasDownloadInited(): boolean {
    //     this.setupDirectories();
    //     this.organization.shortNameAckro
    // }

    public resumeLongRunningOperation(): GitCloneTemp_CommandInfo[] {
        const cloneCommandResults: Array<GitCloneTemp_CommandInfo> = new Array<GitCloneTemp_CommandInfo>();

        console.log(`RESUMING LONG RUNNING FOR: ${this.downloadOp}`);
        console.log(`RESUMING LONG RUNNING FOR: ${this.entity}`);


        let repos = this.getRepositoryListFromRecord();
        let downloadedRepositories: Array<Repository> = this.getAlreadyDownloaded();
        repos.repositories.forEach(r => {
            if (!downloadedRepositories.includes(r)) {
                console.log(`RESUMING LONG RUNNING FOR: ${r.name}`);
                this.downloadRepository(cloneCommandResults, this.entity.name, r, null);
            }
        });
        return cloneCommandResults;
    }
}