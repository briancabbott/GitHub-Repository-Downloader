"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PullRequestReviewThread = void 0;
// PullRequestReviewThread
// A threaded list of comments for a given pull request.
// Implements
// Node
// Connections
// comments (PullRequestReviewCommentConnection!)
// A list of pull request comments associated with the thread.
// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.
// before	String	
// Returns the elements in the list that come before the specified cursor.
// first	Int	
// Returns the first n elements from the list.
// last	Int	
// Returns the last n elements from the list.
// Fields
// id (ID!)
// isResolved (Boolean!)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Resolvable Threads Preview preview for more details.
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// Whether this thread has been resolved
// pullRequest (PullRequest!)
// Identifies the pull request associated with this thread.
// repository (Repository!)
// Identifies the repository associated with this thread.
// resolvedBy (User)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Resolvable Threads Preview preview for more details.
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// The user who resolved this thread
// viewerCanResolve (Boolean!)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Resolvable Threads Preview preview for more details.
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// Whether or not the viewer can resolve this thread
// viewerCanUnresolve (Boolean!)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Resolvable Threads Preview preview for more details.
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// Whether or not the viewer can unresolve this thread
// A threaded list of comments for a given pull request.
class PullRequestReviewThread {
}
exports.PullRequestReviewThread = PullRequestReviewThread;
