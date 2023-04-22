import { Node } from "../interfaces/Node";
import { ID } from "../scalars/Id";
import { PullRequest } from "./PullRequest";
import { Repository } from "../../model";
import { User } from "./User";

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
export class PullRequestReviewThread implements Node {


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

    //
    // Fields
    //

    id: ID

    // Whether this thread has been resolved
    isResolved: boolean

    // Identifies the pull request associated with this thread.
    pullRequest: PullRequest

    // Identifies the repository associated with this thread.
    repository: Repository

    // The user who resolved this thread
    resolvedBy: User

    // Whether or not the viewer can resolve this thread
    viewerCanResolve: boolean

    // Whether or not the viewer can unresolve this thread
    viewerCanUnresolve: boolean
}