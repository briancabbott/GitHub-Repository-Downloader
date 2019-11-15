// RepositoryContributionType
// The reason a repository is listed as 'contributed'.

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
export enum RepositoryContributionType {
    // Created a commit
    COMMIT,

    // Created an issue
    ISSUE,

    // Created a pull request
    PULL_REQUEST,

    // Reviewed a pull request
    PULL_REQUEST_REVIEW,

    // Created the repository
    REPOSITORY
}