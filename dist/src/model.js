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
const path = require('path');
class RepositoryList {
    constructor(organizationName, generationTime, repositories) {
        this.organizationName = organizationName;
        this.generationTime = generationTime;
        this.repositories = repositories;
    }
    sort() {
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
    writeToFile(filename) {
        let _writeFilename = filename;
        if (!_writeFilename) {
            _writeFilename = path.join(process.cwd(), "./repositories_for_organization--" + this.organizationName + "--" + this.generationTime.getMilliseconds() + ".json");
        }
        let jsonContent = JSON.stringify(this, undefined, 4);
        fs.writeFile(_writeFilename, jsonContent, (err) => {
            if (err) {
                console.error(err);
                throw new Error("Unable to write repository-list query results file. Error was: " + err);
            }
            ;
            console.log("File has been created");
        });
        return _writeFilename;
    }
}
exports.RepositoryList = RepositoryList;
class Repository {
    constructor(url, id, createdAt, description, diskUsage, homepageUrl, name, pushedAt) {
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
exports.Repository = Repository;
