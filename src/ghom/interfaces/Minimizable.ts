// Minimizable
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Minimize Comments Preview preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// Entities that can be minimized.

// Implemented by
// CommitComment
// GistComment
// IssueComment
// PullRequestReviewComment
// Fields
// isMinimized (Boolean!)
// Returns whether or not a comment has been minimized.

// minimizedReason (String)
// Returns why the comment was minimized.

// viewerCanMinimize (Boolean!)
// Check if the current viewer can minimize this object.



// Entities that can be minimized.
export interface Minimizable {
    // Returns whether or not a comment has been minimized.
    isMinimized: boolean

    // Returns why the comment was minimized.
    minimizedReason: string

    // Check if the current viewer can minimize this object.
    viewerCanMinimize: boolean
}
