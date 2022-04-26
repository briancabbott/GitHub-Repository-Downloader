"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubConfiguration = exports.RepositoryDownloadNewReposOperation = exports.RepositoryDownloadOperation = exports.Organization = exports.Repository = exports.RepositoryOwner = exports.OrganizationRepositoriesList = void 0;
const short_uuid_1 = __importDefault(require("short-uuid"));
const utils_1 = require("./utils");
class OrganizationRepositoriesList {
    constructor(organizationName, generationTime, repositories) {
        this.filename = null;
        this.organizationName = organizationName;
        this.generationTime = generationTime;
        this.repositories = repositories;
    }
}
exports.OrganizationRepositoriesList = OrganizationRepositoriesList;
class RepositoryOwner {
    constructor(avatarUrl, size, id, login, name, resourcePath, url) {
        this.avatarUrl = avatarUrl;
        this.size = size;
        this.id = id;
        this.login = login;
        this.name = name;
        this.resourcePath = resourcePath;
        this.url = url;
    }
}
exports.RepositoryOwner = RepositoryOwner;
class Repository {
    constructor(url, id, createdAt, description, diskUsage, homepageUrl, name, pushedAt, descriptionHTML, forkCount, hasIssuesEnabled, hasWikiEnabled, isArchived, isFork, isLocked, isMirror, isPrivate, licenseInfo, lockReason, mirrorUrl, owner, resourcePath, shortDescriptionHTML, updatedAt) {
        this.url = url;
        this.id = id;
        this.createdAt = createdAt;
        this.description = description;
        this.diskUsage = diskUsage;
        this.homepageUrl = homepageUrl;
        this.name = name;
        this.pushedAt = pushedAt;
        this.descriptionHTML = descriptionHTML;
        this.forkCount = forkCount;
        this.hasIssuesEnabled = hasIssuesEnabled;
        this.hasWikiEnabled = hasWikiEnabled;
        this.isArchived = isArchived;
        this.isFork = isFork;
        this.isLocked = isLocked;
        this.isMirror = isMirror;
        this.isPrivate = isPrivate;
        // this.licenseInfo = licenseInfo;
        // this.lockReason = lockReason;
        this.mirrorUrl = mirrorUrl;
        // new RepositoryOwner(
        //     );
        this.resourcePath = resourcePath;
        this.shortDescriptionHTML = shortDescriptionHTML;
        this.updatedAt = updatedAt;
    }
}
exports.Repository = Repository;
class Organization {
    constructor(name, shortNameAckro, downloadOpDirectory) {
        this.name = name || null;
        this.shortNameAckro = shortNameAckro || null;
        this.downloadOpDirectory = downloadOpDirectory || null;
    }
    makeNameAckro() {
        if (this.shortNameAckro == null || this.shortNameAckro == "") {
            let uppers = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            let akroName = "";
            for (let i = 0; i < this.name.length; i++) {
                if (uppers.includes(this.name.charAt(i))) {
                    akroName += this.name.charAt(i);
                }
            }
            if (akroName.length == 0) {
                if (this.name.length > 4) {
                    this.shortNameAckro = this.name.substring(0, 4);
                }
                else {
                    this.shortNameAckro = this.name;
                }
            }
            else {
                this.shortNameAckro = akroName;
            }
        }
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
    constructor(operationUUID, globalOperationTimestamp, globalOperationStartTime, globalOperationEndingTime, globalStoreDirectory, workingDirectory, githubConfiguration, organizations, isLongRunningDownloadOperation) {
        this.operationUUID = operationUUID;
        this.globalOperationTimestamp = globalOperationTimestamp || new Date();
        this.globalOperationStartTime = globalOperationStartTime || null;
        this.globalOperationEndingTime = globalOperationEndingTime || null;
        this.globalStoreDirectory = globalStoreDirectory || null;
        this.applicationWorkingDirectory = workingDirectory || null;
        this.organizations = organizations || new Array();
        this.isLongRunningDownloadOperation = isLongRunningDownloadOperation || false;
        this.repositoryListFilesMap = new Map();
        this.githubConfiguration = githubConfiguration || null;
        if (this.operationUUID == null) {
            this.operationUUID = (0, short_uuid_1.default)().fromUUID(short_uuid_1.default.uuid());
        }
    }
    makeDownloadDirectoryPath(organizationName) {
        return `${this.globalStoreDirectory}\\${organizationName}--${(0, utils_1.createFileFolderSuffix)(this.globalOperationTimestamp, this.operationUUID)}`;
    }
}
exports.RepositoryDownloadOperation = RepositoryDownloadOperation;
class RepositoryDownloadNewReposOperation extends RepositoryDownloadOperation {
    constructor(operationUUID, globalOperationTimestamp, globalOperationStartTime, globalOperationEndingTime, globalStoreDirectory, workingDirectory, githubConfiguration, organizations, organizationDownloadPath) {
        super(operationUUID, globalOperationTimestamp, globalOperationStartTime, globalOperationEndingTime, globalStoreDirectory, workingDirectory, githubConfiguration, organizations);
        this.organizationDownloadPath = organizationDownloadPath;
    }
}
exports.RepositoryDownloadNewReposOperation = RepositoryDownloadNewReposOperation;
class GitHubConfiguration {
    constructor(authorizationToken, authorizationTokenFile) {
        this.authorizationToken = authorizationToken;
    }
}
exports.GitHubConfiguration = GitHubConfiguration;
