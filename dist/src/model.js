"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = require('path');
const short_uuid_1 = __importDefault(require("short-uuid"));
const utils_1 = require("./utils");
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
    writeToFile(dir, globalOperationId) {
        if (globalOperationId == null) {
            globalOperationId = this.organizationName;
        }
        let filename = "repositories_for_org--" + globalOperationId + "--" + this.generationTime.getTime() + ".json";
        let _writeFilename = path.join(dir || process.cwd(), filename);
        let jsonContent = JSON.stringify(this, undefined, 4);
        try {
            fs.writeFileSync(_writeFilename, jsonContent, { flag: "a+" });
        }
        catch (e) {
            console.log("Exception occured during writing the repository list. Error was: " + e);
        }
        // , (err) => {
        //     if (err) {
        //         console.error(err);
        //         throw new Error("Unable to write repository-list query results file. Error was: " + err);
        //     };
        //     console.log("File has been created");
        // });
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
class Organization {
    constructor(name, shortNameAckro) {
        this.name = name;
        this.shortNameAckro = shortNameAckro;
    }
}
exports.Organization = Organization;
// 
// var translator = short(); // Defaults to flickrBase58
// var decimalTranslator = short("0123456789"); // Provide a specific alphabet for translation
// var cookieTranslator = short(short.constants.cookieBase90); // Use a constant for translation
// // Generate a shortened v4 UUID
// translator.new();
// // Generate plain UUIDs
// short.uuid(); // From the constructor without creating a translator
class RepositoryDownloadOperation {
    constructor(operationUUID, globalOperationTimestamp, globalOperationStartTime, globalOperationEndingTime, workingDirectory, downloadDirectory, githubConfiguration, organizations) {
        let shortUUIDv = short_uuid_1.default().fromUUID(short_uuid_1.default.uuid());
        this.operationUUID = operationUUID || shortUUIDv;
        this.globalOperationTimestamp = globalOperationTimestamp || new Date();
        this.globalOperationStartTime = globalOperationStartTime || null;
        this.globalOperationEndingTime = globalOperationEndingTime || null;
        this.workingDirectory = workingDirectory || null;
        this.downloadDirectory = downloadDirectory || null;
        this.githubConfiguration = githubConfiguration || null;
        this.organizations = organizations || new Array();
    }
    makeDownloadDirectoryPath(organizationName) {
        return `C:\\GRD\\GCP--${utils_1.createFileFolderSuffix(this.globalOperationTimestamp, this.operationUUID)}`;
    }
}
exports.RepositoryDownloadOperation = RepositoryDownloadOperation;
class GitHubConfiguration {
    constructor(authorizationToken) {
        this.authorizationToken = authorizationToken;
    }
}
exports.GitHubConfiguration = GitHubConfiguration;
