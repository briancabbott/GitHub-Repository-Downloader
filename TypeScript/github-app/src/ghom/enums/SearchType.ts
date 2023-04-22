// SearchType
// Represents the individual results of a search.

// Values
// ISSUE
// Returns results matching issues in repositories.

// REPOSITORY
// Returns results matching repositories.

// USER
// Returns results matching users and organizations on GitHub.



// Represents the individual results of a search.
export enum SearchType {
    // Returns results matching issues in repositories.
    ISSUE,

    // Returns results matching repositories.
    REPOSITORY,

    // Returns results matching users and organizations on GitHub.
    USER
}