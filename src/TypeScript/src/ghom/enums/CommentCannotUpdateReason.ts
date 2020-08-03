// CommentCannotUpdateReason
// The possible errors that will prevent a user from updating a comment.

// Values
// DENIED
// You cannot update this comment

// INSUFFICIENT_ACCESS
// You must be the author or have write access to this repository to update this comment.

// LOCKED
// Unable to create comment because issue is locked.

// LOGIN_REQUIRED
// You must be logged in to update this comment.

// MAINTENANCE
// Repository is under maintenance.

// VERIFIED_EMAIL_REQUIRED
// At least one email address must be verified to update this comment.



// The possible errors that will prevent a user from updating a comment.
export enum CommentCannotUpdateReason {
    // You cannot update this comment
    DENIED,

    // You must be the author or have write access to this repository to update this comment.
    INSUFFICIENT_ACCESS,

    // Unable to create comment because issue is locked.
    LOCKED,

    // You must be logged in to update this comment.
    LOGIN_REQUIRED,

    // Repository is under maintenance.
    MAINTENANCE,

    // At least one email address must be verified to update this comment.
    VERIFIED_EMAIL_REQUIRED
}