import { RepositoryNode } from "../interfaces/RepositoryNode";
import { Commit } from "./Commit";
import { ID } from "../scalars/Id";
import { PullRequest } from "./PullRequest";
import { Repository } from "../../model";
import { Node } from "../interfaces/Node";

// PullRequestCommitCommentThread
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Issues Preview preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// Represents a commit comment thread part of a pull request.

// Implements
// Node
// RepositoryNode
// Connections
// comments (CommitCommentConnection!)
// The comments that exist in this thread.

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
// commit (Commit!)
// The commit the comments were made on.

// id (ID!)
// path (String)
// The file the comments were made on.

// position (Int)
// The position in the diff for the commit that the comment was made on.

// pullRequest (PullRequest!)
// The pull request this commit comment thread belongs to

// repository (Repository!)
// The repository associated with this node.









// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Issues Preview preview for more details.
export class PullRequestCommitCommentThread implements Node, RepositoryNode {

    // Connections
    // comments (CommitCommentConnection!)
    // The comments that exist in this thread.

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

    // The commit the comments were made on.
    commit: Commit

    id: ID

    // The file the comments were made on.
    path: string

    // The position in the diff for the commit that the comment was made on.
    position: number

    // The pull request this commit comment thread belongs to
    pullRequest: PullRequest

    // The repository associated with this node.
    repository: Repository
}