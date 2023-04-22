// UniformResourceLocatable
// Represents a type that can be retrieved by a URL.

// Implemented by
// Bot
// CheckRun
// ClosedEvent
// Commit
// CrossReferencedEvent
// Issue
// MergedEvent
// Milestone
// Organization
// PullRequest
// PullRequestCommit
// Release
// Repository
// RepositoryTopic
// ReviewDismissedEvent
// TeamDiscussion
// TeamDiscussionComment
// User
// Fields
// resourcePath (URI!)
// The HTML path to this resource.

// url (URI!)
// The URL to this resource.


// Represents a type that can be retrieved by a URL.
export interface UniformResourceLocatable {
    // The HTML path to this resource.
    resourcePath: URL

    // The URL to this resource.
    url: URL
}