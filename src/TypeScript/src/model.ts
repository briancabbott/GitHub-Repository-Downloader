
import shortUUID from 'short-uuid';
import { LockReason } from './ghom/enums/LockReason';
import { License } from './ghom/objects/License';
import { createFileFolderSuffix } from "./utils";


export class OrganizationRepositoriesLatestCommitsList {
    filename: string;
    organizationName: string;
    generationTime: Date;
    repositoryCommitTimeMap: Map<Repository, any>;
    
    constructor(organizationName: string, generationTime: Date, repositoryCommitTimeMap: Map<Repository, any>) {
        this.filename = null;
        this.organizationName = organizationName;
        this.generationTime = generationTime;
        this.repositoryCommitTimeMap = repositoryCommitTimeMap;
    }
}

export class OrganizationRepositoriesList {
    filename: string;
    organizationName: string;
    generationTime: Date;
    repositories: Array<Repository>;
    
    constructor(organizationName: string, generationTime: Date, repositories: Array<Repository>) {
        this.filename = null;
        this.organizationName = organizationName;
        this.generationTime = generationTime;
        this.repositories = repositories;
    }
}

export class RepositoryOwner {
    avatarUrl: string;
    size: number;
    id: number;
    login: string;
    name: string;
    resourcePath: string;
    url: string;

    constructor(avatarUrl: string, size: number, id: number, login: string, name: string, resourcePath: string, url: string) {
        this.avatarUrl = avatarUrl;
        this.size = size;
        this.id = id;
        this.login = login;
        this.name = name;
        this.resourcePath = resourcePath;
        this.url = url;
    }
}

export class Repository {
    url: string;
    id: string;
    createdAt: string;
    description: string;

    /** The number of kilobytes this repository occupies on disk. */
    diskUsage: string;
    homepageUrl: string;
    name: string;
    pushedAt: string;


    descriptionHTML: string;
    forkCount: number;
    hasIssuesEnabled: boolean;
    hasWikiEnabled: boolean;
    isArchived: boolean;
    isFork: boolean;
    isLocked: boolean;
    isMirror: boolean;
    isPrivate: boolean;
    // licenseInfo: License
    // lockReason: RepositoryLockReason;
    mirrorUrl: string;
    resourcePath: string;
    shortDescriptionHTML: string;
    updatedAt: Date;

    constructor(url: string, id: string, createdAt: string, description: string, diskUsage: string, homepageUrl: string, 
            name: string, 
            pushedAt: string, 
            
            descriptionHTML: string,
            forkCount: number,
            hasIssuesEnabled: boolean,
            hasWikiEnabled: boolean,
            isArchived: boolean,
            isFork: boolean,
            isLocked: boolean,
            isMirror: boolean,
            isPrivate: boolean,
            licenseInfo: License,
            lockReason: LockReason,
            mirrorUrl: string,
            owner: RepositoryOwner, 
            resourcePath: string,
            shortDescriptionHTML: string, 
            updatedAt: Date) {
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


export class Organization {
    name: string;
    shortNameAckro: string;
    nameHash: string;
    downloadOpDirectory: string;

    constructor(name?: string, shortNameAckro?: string, downloadOpDirectory?: string) {
        this.name = name || null;
        this.shortNameAckro = shortNameAckro || null;
        this.downloadOpDirectory = downloadOpDirectory || null;
    }

    public makeNameAckro() {
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
                } else {
                    this.shortNameAckro = this.name;
                }
            } else {
                this.shortNameAckro = akroName;
            }
        }
    }
}

//
// var translator = short(); // Defaults to flickrBase58
// var decimalTranslator = short("0123456789"); // Provide a specific alphabet for translation
// var cookieTranslator = short(short.constants.cookieBase90); // Use a constant for translation

// // Generate a shortened v4 UUID
// translator.new();

// // Generate plain UUIDs
// short.uuid(); // From the constructor without creating a translator

export class RepositoryDownloadOperation {
    operationUUID: string; // | unknown;
    operationName: string; // | unknown;
    operationSysName: string; // | unknown;

    globalOperationTimestamp: Date;
    globalOperationStartTime: Date | unknown;
    globalOperationEndingTime: Date | unknown;

    // TODO: default this to repo-store/_grd-meta
    globalStoreDirectory: string; // | unknown;

    applicationWorkingDirectory: string | unknown;

    githubConfiguration: GitHubConfiguration;
    organizations: Array<Organization>;
    logToStdOut: boolean | unknown;

    repositoryListFilesMap: Map<string, string>;
    isLongRunningDownloadOperation: boolean; 

    constructor(operationUUID?: string,
            globalOperationTimestamp?: Date,
            globalOperationStartTime?: Date,
            globalOperationEndingTime?: Date,
            globalStoreDirectory?: string,
            workingDirectory?: string,
            githubConfiguration?: GitHubConfiguration,
            organizations?: Array<Organization>,
            isLongRunningDownloadOperation?: boolean) {

        this.operationUUID = operationUUID;
        this.globalOperationTimestamp = globalOperationTimestamp || new Date();
        this.globalOperationStartTime = globalOperationStartTime || null;
        this.globalOperationEndingTime = globalOperationEndingTime || null;

        this.globalStoreDirectory = globalStoreDirectory || null;
        this.applicationWorkingDirectory = workingDirectory  || null;

        this.organizations = organizations || new Array<Organization>();
        this.isLongRunningDownloadOperation = isLongRunningDownloadOperation || false;

        this.repositoryListFilesMap = new Map<string, string>();
        this.githubConfiguration = githubConfiguration || null;

        if (this.operationUUID == null) {
            this.operationUUID = shortUUID().fromUUID(shortUUID.uuid());
        }
    }

    public makeDownloadDirectoryPath(organizationName: string): string {
        return `${this.globalStoreDirectory}\\${organizationName}--${createFileFolderSuffix(this.globalOperationTimestamp, <string>this.operationUUID)}`;
    }
}

export class RepositoryDownloadNewReposOperation extends RepositoryDownloadOperation {
    organizationDownloadPath: string; // | unknown;

    constructor(operationUUID?: string,
                globalOperationTimestamp?: Date,
                globalOperationStartTime?: Date,
                globalOperationEndingTime?: Date,
                globalStoreDirectory?: string,
                workingDirectory?: string,
                githubConfiguration?: GitHubConfiguration,
                organizations?: Array<Organization>,
                organizationDownloadPath?: string) {
        super(operationUUID, globalOperationTimestamp,
              globalOperationStartTime, globalOperationEndingTime, globalStoreDirectory,
              workingDirectory, githubConfiguration, organizations);
        this.organizationDownloadPath = organizationDownloadPath;
    }
}

export class GitHubConfiguration {
    authorizationToken: string;
    authorizationTokenFile: string;

    constructor(authorizationToken?: string, authorizationTokenFile?: string) {
        this.authorizationToken = authorizationToken;
    }
}


export class Ref {
    // associatedPullRequests;
    // branchProtectionRule;
    name: string;
    prefix: string;
    // refUpdateRule;
    
    constructor(
            // associatedPullRequests: , 
            // branchProtectionRule: , 
            name: string, 
            prefix: string 
            // refUpdateRule
            ) {
        // this.associatedPullRequests = e.node.associatedPullRequests 
        // this.branchProtectionRule = e.node.branchProtectionRule 
        this.name = name
        this.prefix = prefix
        // this.refUpdateRule = e.node.refUpdateRule
    }
}

export class BranchProtectionRule {
    allowsDeletions: boolean; 
    // (Boolean!) // Can this branch be deleted.
    allowsForcePushes: boolean; 
    // (Boolean!) // Are force pushes allowed on this branch.
    blocksCreations: boolean; 
    // (Boolean!) // Is branch creation a protected operation.
    branchProtectionRuleConflicts: Array<BranchProtectionRuleConflict>; 
    // (BranchProtectionRuleConflictConnection!) // A list of conflicts matching branches protection rule and other branch protection rules.
    bypassForcePushAllowances: Array<BypassForcePushAllowance>; 
    // (BypassForcePushAllowanceConnection!) // A list of actors able to force push for this branch protection rule.
    bypassPullRequestAllowances: BypassPullRequestAllowance; 
    // (BypassPullRequestAllowanceConnection!)
    creator: Actor; 
    // (Actor)  // The actor who created this branch protection rule.
    databaseId: number; 
    // (Int) // Identifies the primary key from the database.
    dismissesStaleReviews: boolean; 
    // (Boolean!) // Will new commits pushed to matching branches dismiss pull request review approvals.
    isAdminEnforced: boolean; 
    // (Boolean!) // Can admins overwrite branch protection.
    matchingRefs: Array<Ref>; 
    // (RefConnection!) // Repository refs that are protected by this rule.
    pattern: string; 
    // (String!) // Identifies the protection rule pattern.
    pushAllowances: Array<PushAllowance>; 
    // (PushAllowanceConnection!) // A list push allowances for this branch protection rule.
    repository: Repository; 
    // (Repository)  // The repository associated with this branch protection rule.
    requiredApprovingReviewCount: number; 
    // (Int) // Number of approving reviews required to update matching branches.
    requiredStatusCheckContexts: Array<string>; 
    //([String]) // List of required status check contexts that must pass for commits to be accepted to matching branches.
    requiredStatusChecks: Array<RequiredStatusCheckDescription>; 
    // ([RequiredStatusCheckDescription!]) // List of required status checks that must pass for commits to be accepted to matching branches.
    requiresApprovingReviews: boolean; 
    // (Boolean!)   // Are approving reviews required to update matching branches.
    requiresCodeOwnerReviews: boolean; 
    // (Boolean!) // Are reviews from code owners required to update matching branches.
    requiresCommitSignatures: boolean; 
    // (Boolean!) // Are commits required to be signed.
    requiresConversationResolution: boolean; 
    // (Boolean!) // Are conversations required to be resolved before merging.
    requiresLinearHistory: boolean; 
    // (Boolean!)  // Are merge commits prohibited from being pushed to this branch.
    requiresStatusChecks: boolean; 
    // (Boolean!) // Are status checks required to update matching branches.
    requiresStrictStatusChecks: boolean; 
    // (Boolean!) // Are branches required to be up to date before merging.
    restrictsPushes: boolean; 
    // (Boolean!) // Is pushing to matching branches restricted.
    restrictsReviewDismissals: boolean; 
    // (Boolean!) // Is dismissal of pull request reviews restricted.
    reviewDismissalAllowances: Array<ReviewDismissalAllowance>; 
    // (ReviewDismissalAllowanceConnection!) // A list review dismissal allowances for this branch protection ru

    constructor(allowsDeletions: boolean, 
                allowsForcePushes: boolean, 
                blocksCreations: boolean, 
                branchProtectionRuleConflicts: Array<BranchProtectionRuleConflict>, 
                bypassForcePushAllowances: Array<BypassForcePushAllowance>, 
                bypassPullRequestAllowances: BypassPullRequestAllowance, 
                creator: Actor, 
                databaseId: number, 
                dismissesStaleReviews: boolean, 
                isAdminEnforced: boolean, 
                matchingRefs: Array<Ref>, 
                pattern: string, 
                pushAllowances: Array<PushAllowance>, 
                repository: Repository, 
                requiredApprovingReviewCount: number, 
                requiredStatusCheckContexts: Array<string>, 
                requiredStatusChecks: Array<RequiredStatusCheckDescription>, 
                requiresApprovingReviews: boolean, 
                requiresCodeOwnerReviews: boolean, 
                requiresCommitSignatures: boolean, 
                requiresConversationResolution: boolean, 
                requiresLinearHistory: boolean, 
                requiresStatusChecks: boolean, 
                requiresStrictStatusChecks: boolean, 
                restrictsPushes: boolean, 
                restrictsReviewDismissals: boolean, 
                reviewDismissalAllowances: Array<ReviewDismissalAllowance>) {

        this.allowsDeletions = allowsDeletions;
        this.allowsForcePushes = allowsForcePushes;
        this.blocksCreations = blocksCreations;
        this.branchProtectionRuleConflicts = branchProtectionRuleConflicts;
        this.bypassForcePushAllowances = bypassForcePushAllowances;
        this.bypassPullRequestAllowances = bypassPullRequestAllowances;
        this.creator = creator;
        this.databaseId = databaseId;
        this.dismissesStaleReviews = dismissesStaleReviews;
        this.isAdminEnforced = isAdminEnforced;
        this.matchingRefs = matchingRefs;
        this.pattern = pattern;
        this.pushAllowances = pushAllowances;
        this.repository = repository;
        this.requiredApprovingReviewCount = requiredApprovingReviewCount;
        this.requiredStatusCheckContexts = requiredStatusCheckContexts;
        this.requiredStatusChecks = requiredStatusChecks;
        this.requiresApprovingReviews = requiresApprovingReviews;
        this.requiresCodeOwnerReviews = requiresCodeOwnerReviews;
        this.requiresCommitSignatures = requiresCommitSignatures;
        this.requiresConversationResolution = requiresConversationResolution;
        this.requiresLinearHistory = requiresLinearHistory;
        this.requiresStatusChecks = requiresStatusChecks;
        this.requiresStrictStatusChecks = requiresStrictStatusChecks;
        this.restrictsPushes = restrictsPushes;
        this.restrictsReviewDismissals = restrictsReviewDismissals;
        this.reviewDismissalAllowances = reviewDismissalAllowances;
    }
}

export class BranchProtectionRuleConflict {

}

export class BypassForcePushAllowance {

}

export class BypassPullRequestAllowance {

}

export class Actor {

}

export class PushAllowance {

}

export class RequiredStatusCheckDescription {

}

export class ReviewDismissalAllowance {
    
}