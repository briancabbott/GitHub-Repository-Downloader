// PullRequestReviewEvent
// The possible events to perform on a pull request review.

// Values
// APPROVE
// Submit feedback and approve merging these changes.

// COMMENT
// Submit general feedback without explicit approval.

// DISMISS
// Dismiss review so it now longer effects merging.

// REQUEST_CHANGES
// Submit feedback that must be addressed before merging.


// The possible events to perform on a pull request review.
export enum PullRequestReviewEvent {
    // Submit feedback and approve merging these changes.
    APPROVE,

    // Submit general feedback without explicit approval.
    COMMENT,

    // Dismiss review so it now longer effects merging.
    DISMISS,

    // Submit feedback that must be addressed before merging.
    REQUEST_CHANGES
}