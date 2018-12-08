import { GitObject } from "../interfaces/GitObject";
import { Subscribable } from "../interfaces/Subscribable";
import { UniformResourceLocatable } from "../interfaces/UniformResourceLocatable";
import { Node } from "../interfaces/Node";
import { SubscriptionState } from "../enums/SubscriptionState";
import { ID } from "../scalars/Id";
import { URL } from "url";
import { Blame } from "./Blame";
import { GitActor } from "./GitActor";
import { GitObjectID } from "../scalars/GitObjectID";
import { Repository } from "../../model";
import { GitSignature } from "../interfaces/GitSignature";

// Commit
// Represents a Git commit.

// Implements
// GitObject
// Node
// Subscribable
// UniformResourceLocatable
// Connections
// checkSuites (CheckSuiteConnection)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Checks preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// The check suites associated with a commit.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// filterBy	CheckSuiteFilter	
// Filters the check suites by this type.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// comments (CommitCommentConnection!)
// Comments made on the commit.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// history (CommitHistoryConnection!)
// The linear commit history starting from (and including) this commit, in the same order as `git log`.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// author	CommitAuthor	
// If non-null, filters history to only show commits with matching authorship.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// path	String	
// If non-null, filters history to only show commits touching files under this path.

// since	GitTimestamp	
// Allows specifying a beginning time or date for fetching commits.

// until	GitTimestamp	
// Allows specifying an ending time or date for fetching commits.

// parents (CommitConnection!)
// The parents of a commit.

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
// abbreviatedOid (String!)
// An abbreviated version of the Git object ID

// additions (Int!)
// The number of additions in this commit.

// author (GitActor)
// Authorship details of the commit.

// authoredByCommitter (Boolean!)
// Check if the committer and the author match.

// authoredDate (DateTime!)
// The datetime when this commit was authored.

// blame (Blame!)
// Fetches git blame information.

// Argument	Type	Description
// path	String!	
// The file whose Git blame information you want.

// changedFiles (Int!)
// The number of changed files in this commit.

// commitResourcePath (URI!)
// The HTTP path for this Git object

// commitUrl (URI!)
// The HTTP URL for this Git object

// committedDate (DateTime!)
// The datetime when this commit was committed.

// committedViaWeb (Boolean!)
// Check if commited via GitHub web UI.

// committer (GitActor)
// Committership details of the commit.

// deletions (Int!)
// The number of deletions in this commit.

// id (ID!)
// message (String!)
// The Git commit message

// messageBody (String!)
// The Git commit message body

// messageBodyHTML (HTML!)
// The commit message body rendered to HTML.

// messageHeadline (String!)
// The Git commit message headline

// messageHeadlineHTML (HTML!)
// The commit message headline rendered to HTML.

// oid (GitObjectID!)
// The Git object ID

// pushedDate (DateTime)
// The datetime when this commit was pushed.

// repository (Repository!)
// The Repository this commit belongs to

// resourcePath (URI!)
// The HTTP path for this commit

// signature (GitSignature)
// Commit signing information, if present.

// status (Status)
// Status information for this commit

// tarballUrl (URI!)
// Returns a URL to download a tarball archive for a repository. Note: For private repositories, these links are temporary and expire after five minutes.

// tree (Tree!)
// Commit's root Tree

// treeResourcePath (URI!)
// The HTTP path for the tree of this commit

// treeUrl (URI!)
// The HTTP URL for the tree of this commit

// url (URI!)
// The HTTP URL for this commit

// viewerCanSubscribe (Boolean!)
// Check if the viewer is able to change their subscription status for the repository.

// viewerSubscription (SubscriptionState)
// Identifies if the viewer is watching, not watching, or ignoring the subscribable entity.

// zipballUrl (URI!)
// Returns a URL to download a zipball archive for a repository. Note: For private repositories, these links are temporary and expire after five minutes.






// Represents a Git commit.
export class Commit implements GitObject, Node, Subscribable, UniformResourceLocatable {


    // Connections
    // checkSuites (CheckSuiteConnection)

    // The check suites associated with a commit.

    // Argument	    Type	            Description
    // after	    String	            Returns the elements in the list that come after the specified cursor.
    // before	    String	            Returns the elements in the list that come before the specified cursor.
    // filterBy	    CheckSuiteFilter    Filters the check suites by this type.
    // first	    Int	                Returns the first n elements from the list.
    // last	        Int	                Returns the last n elements from the list.


    // Comments made on the commit.
    // comments (CommitCommentConnection!)

    // Argument	    Type	            Description
    // after	    String	            Returns the elements in the list that come after the specified cursor.
    // before	    String	            Returns the elements in the list that come before the specified cursor.
    // first	    Int	                Returns the first n elements from the list.
    // last	        Int                 Returns the last n elements from the list.

    // history (CommitHistoryConnection!)
    // The linear commit history starting from (and including) this commit, in the same order as `git log`.

    // Argument	    Type	            Description
    // after	    String              Returns the elements in the list that come after the specified cursor.
    // author	    CommitAuthor        If non-null, filters history to only show commits with matching authorship.
    // before	    String              Returns the elements in the list that come before the specified cursor.
    // first	    Int	                Returns the first n elements from the list.
    // last	        Int	                Returns the last n elements from the list.
    // path	        String              If non-null, filters history to only show commits touching files under this path.
    // since	    GitTimestamp        Allows specifying a beginning time or date for fetching commits.
    // until	    GitTimestamp	    Allows specifying an ending time or date for fetching commits.

    // parents (CommitConnection!)
    // The parents of a commit.

    // Argument	    Type	            Description
    // after	    String	            Returns the elements in the list that come after the specified cursor.
    // before	    String	            Returns the elements in the list that come before the specified cursor.
    // first	    Int	                Returns the first n elements from the list.
    // last	        Int	                Returns the last n elements from the list.


    // An abbreviated version of the Git object ID
    abbreviatedOid: string

    // The number of additions in this commit.
    additions: number

    // Authorship details of the commit.
    author: GitActor

    // Check if the committer and the author match.
    authoredByCommitter: boolean

    // The datetime when this commit was authored.
    authoredDate: Date

    // Fetches git blame information.
    blame: Blame

    // The number of changed files in this commit.
    // Argument	    Type	            Description
    // path	        String!	            The file whose Git blame information you want.
    changedFiles: number


    // The HTTP path for this Git object
    commitResourcePath: URL

    // The HTTP URL for this Git object
    commitUrl: URL

    // The datetime when this commit was committed.
    committedDate: Date

    // Check if commited via GitHub web UI.
    committedViaWeb: boolean

    // Committership details of the commit.
    committer: GitActor

    // The number of deletions in this commit.
    deletions: number

    id: ID

    // The Git commit message
    message: string

    // The Git commit message body
    messageBody: string

    // The commit message body rendered to HTML.
    messageBodyHTML: string

    // The Git commit message headline
    messageHeadline: string

    // The commit message headline rendered to HTML.
    messageHeadlineHTML: string

    // The Git object ID
    oid: GitObjectID

    // The datetime when this commit was pushed.
    pushedDate: Date

    // The Repository this commit belongs to
    repository: Repository

    // The HTTP path for this commit
    resourcePath: URL

    // Commit signing information, if present.
    signature: GitSignature

    // Status information for this commit
    status: Status

    // Returns a URL to download a tarball archive for a repository. Note: For private repositories, these links are temporary and expire after five minutes.
    tarballUrl: URL

    // Commit's root Tree
    tree: Tree

    // The HTTP path for the tree of this commit
    treeResourcePath: URL

    // The HTTP URL for the tree of this commit
    treeUrl: URL

    // The HTTP URL for this commit
    url: URL

    // Check if the viewer is able to change their subscription status for the repository.
    viewerCanSubscribe: boolean

    // Identifies if the viewer is watching, not watching, or ignoring the subscribable entity.
    viewerSubscription: SubscriptionState

    // Returns a URL to download a zipball archive for a repository. Note: For private repositories, these links are temporary and expire after five minutes.
    zipballUrl: URL
}