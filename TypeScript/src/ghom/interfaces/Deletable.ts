// Deletable
// Entities that can be deleted.

// Implemented by
// CommitComment
// GistComment
// IssueComment
// PullRequestReview
// PullRequestReviewComment
// TeamDiscussion
// TeamDiscussionComment
// Fields
// viewerCanDelete (Boolean!)
// Check if the current viewer can delete this object.





// Entities that can be deleted.
export interface Deletable {
    
    // Check if the current viewer can delete this object.
    viewerCanDelete: boolean
}