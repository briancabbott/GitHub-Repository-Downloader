import * as fs from "fs";
const path = require('path');

export class RepositoryList {

    organizationName: string;
    generationTime: Date;
    repositories: Array<Repository>;

    constructor(organizationName: string, generationTime: Date, repositories: Array<Repository>) {
        this.organizationName = organizationName;
        this.generationTime = generationTime;
        this.repositories = repositories;
    }

    public sort() {
        if (this.repositories && this.repositories.length > 0) {
            this.repositories.sort((repository1, repository2) => {
                if (repository1.name > repository2.name) {
                    return 1;
                }
                if (repository1.name < repository2.name) {
                    return -1;
                }
                return 0;
            });
        }
    }

    public writeToFile(filename?: string): string {
        let _writeFilename: string = filename;
        if (!_writeFilename) {
            _writeFilename = path.join(process.cwd(), 
                "./repositories_for_organization--" + this.organizationName + "--" + this.generationTime.getMilliseconds() + ".json");
        }


        let jsonContent = JSON.stringify(this, undefined, 4);
        
        fs.writeFile(_writeFilename, jsonContent, (err) => {
            if (err) {
                console.error(err);
                throw new Error("Unable to write repository-list query results file. Error was: " + err);
            };
            console.log("File has been created");
        });

        return _writeFilename;
    }
}

export class Repository {
    url: string;
    id: string;
    createdAt: string;
    description: string;
    diskUsage: string;
    homepageUrl: string;
    name: string;
    pushedAt: string;

    constructor(url: string, id: string, createdAt: string, description: string, diskUsage: string, homepageUrl: string, name: string, pushedAt: string) {
        this.url = url;
        this.id = id;
        this.createdAt = createdAt; 
        this.description = description;
        this.diskUsage = diskUsage; 
        this.homepageUrl = homepageUrl;
        this.name = name; 
        this.pushedAt = pushedAt;
    }
}