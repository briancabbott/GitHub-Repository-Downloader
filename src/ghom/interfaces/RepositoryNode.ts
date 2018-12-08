import { Repository } from "../../model";

// RepositoryNode
// Represents a object that belongs to a repository.

// Implemented by
// CommitComment
// CommitCommentThread
// Issue
// IssueComment
// PullRequest
// PullRequestCommitCommentThread
// PullRequestReview
// PullRequestReviewComment
// RepositoryVulnerabilityAlert
// Fields
// repository (Repository!)
// The repository associated with this node.


// Represents a object that belongs to a repository.
export interface RepositoryNode {
    // The repository associated with this node.
    repository: Repository
}