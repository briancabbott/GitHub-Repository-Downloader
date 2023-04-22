import { CommentCannotUpdateReason } from "../enums/CommentCannotUpdateReason";

// UpdatableComment
// Comments that can be updated.

// Implemented by
// CommitComment
// GistComment
// Issue
// IssueComment
// PullRequest
// PullRequestReview
// PullRequestReviewComment
// TeamDiscussion
// TeamDiscussionComment
// Fields
// viewerCannotUpdateReasons ([CommentCannotUpdateReason!]!)
// Reasons why the current viewer can not update this comment.


// Comments that can be updated.
export interface UpdatableComment {
    // Reasons why the current viewer can not update this comment.
    viewerCannotUpdateReasons: Array<CommentCannotUpdateReason>
}
