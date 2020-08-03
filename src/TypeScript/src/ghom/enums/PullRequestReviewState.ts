// PullRequestReviewState
// The possible states of a pull request review.

// Values
// APPROVED
// A review allowing the pull request to merge.

// CHANGES_REQUESTED
// A review blocking the pull request from merging.

// COMMENTED
// An informational review.

// DISMISSED
// A review that has been dismissed.

// PENDING
// A review that has not yet been submitted.



// The possible states of a pull request review.
export enum PullRequestReviewState {
    // A review allowing the pull request to merge.
    APPROVED,

    // A review blocking the pull request from merging.
    CHANGES_REQUESTED,

    // An informational review.
    COMMENTED,

    // A review that has been dismissed.
    DISMISSED,

    // A review that has not yet been submitted.
    PENDING
}