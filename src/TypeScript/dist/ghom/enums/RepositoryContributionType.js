"use strict";
// RepositoryContributionType
// The reason a repository is listed as 'contributed'.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryContributionType = void 0;
// Values
// COMMIT
// Created a commit
// ISSUE
// Created an issue
// PULL_REQUEST
// Created a pull request
// PULL_REQUEST_REVIEW
// Reviewed a pull request
// REPOSITORY
// Created the repository
// The reason a repository is listed as 'contributed'.
var RepositoryContributionType;
(function (RepositoryContributionType) {
    // Created a commit
    RepositoryContributionType[RepositoryContributionType["COMMIT"] = 0] = "COMMIT";
    // Created an issue
    RepositoryContributionType[RepositoryContributionType["ISSUE"] = 1] = "ISSUE";
    // Created a pull request
    RepositoryContributionType[RepositoryContributionType["PULL_REQUEST"] = 2] = "PULL_REQUEST";
    // Reviewed a pull request
    RepositoryContributionType[RepositoryContributionType["PULL_REQUEST_REVIEW"] = 3] = "PULL_REQUEST_REVIEW";
    // Created the repository
    RepositoryContributionType[RepositoryContributionType["REPOSITORY"] = 4] = "REPOSITORY";
})(RepositoryContributionType = exports.RepositoryContributionType || (exports.RepositoryContributionType = {}));
