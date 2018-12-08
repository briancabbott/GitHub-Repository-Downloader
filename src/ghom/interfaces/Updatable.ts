// Updatable
// Entities that can be updated.

// Implemented by
// CommitComment
// GistComment
// Issue
// IssueComment
// Project
// PullRequest
// PullRequestReview
// PullRequestReviewComment
// TeamDiscussion
// TeamDiscussionComment
// Fields
// viewerCanUpdate (Boolean!)
// Check if the current viewer can update this object.


// Entities that can be updated.
export interface Updatable {
    // Check if the current viewer can update this object.
    viewerCanUpdate: boolean
}