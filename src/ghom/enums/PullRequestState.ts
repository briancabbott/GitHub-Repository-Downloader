// PullRequestState
// The possible states of a pull request.

// Values
// CLOSED
// A pull request that has been closed without being merged.

// MERGED
// A pull request that has been closed by being merged.

// OPEN
// A pull request that is still open.



// The possible states of a pull request.
export enum PullRequestState {
    // A pull request that has been closed without being merged.
    CLOSED,

    // A pull request that has been closed by being merged.
    MERGED,

    // A pull request that is still open.
    OPEN
}