// MergeableState
// Whether or not a PullRequest can be merged.

// Values
// CONFLICTING
// The pull request cannot be merged due to merge conflicts.

// MERGEABLE
// The pull request can be merged.

// UNKNOWN
// The mergeability of the pull request is still being calculated.


// Whether or not a PullRequest can be merged.
export enum MergeableState {
    // The pull request cannot be merged due to merge conflicts.
    CONFLICTING,

    // The pull request can be merged.
    MERGEABLE,

    // The mergeability of the pull request is still being calculated.
    UNKNOWN
}