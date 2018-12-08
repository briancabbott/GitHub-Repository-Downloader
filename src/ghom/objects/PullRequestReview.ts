import { Deletable } from "../interfaces/Deletable";
import { RepositoryNode } from "../interfaces/RepositoryNode";
import { Updatable } from "../interfaces/Updatable";
import { UpdatableComment } from "../interfaces/UpdatableComment";
import { Actor } from "../interfaces/Actor";
import { CommentAuthorAssociation } from "../enums/CommentAuthorAssociation";
import { HTMLString } from "../scalars/HTMLString";
import { Commit } from "./Commit";
import { ID } from "../scalars/Id";
import { PullRequest } from "./PullRequest";
import { Repository } from "../../model";
import { PullRequestReviewState } from "../enums/PullRequestReviewState";
import { CommentCannotUpdateReason } from "../enums/CommentCannotUpdateReason";
import { Comment } from "../interfaces/Comment";
import { Node } from "../interfaces/Node";

// PullRequestReview
// A review object for a given pull request.

// Implements
// Comment
// Deletable
// Node
// RepositoryNode
// Updatable
// UpdatableComment
// Connections
// comments (PullRequestReviewCommentConnection!)
// A list of review comments for the current pull request review.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// onBehalfOf (TeamConnection!)
// A list of teams that this review was made on behalf of.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// userContentEdits (UserContentEditConnection)
// A list of edits to this content.

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
// author (Actor)
// The actor who authored the comment.

// authorAssociation (CommentAuthorAssociation!)
// Author's association with the subject of the comment.

// body (String!)
// Identifies the pull request review body.

// bodyHTML (HTML!)
// The body of this review rendered to HTML.

// bodyText (String!)
// The body of this review rendered as plain text.

// commit (Commit)
// Identifies the commit associated with this pull request review.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// createdViaEmail (Boolean!)
// Check if this comment was created via an email reply.

// databaseId (Int)
// Identifies the primary key from the database.

// editor (Actor)
// The actor who edited the comment.

// id (ID!)
// includesCreatedEdit (Boolean!)
// Check if this comment was edited and includes an edit with the creation data

// lastEditedAt (DateTime)
// The moment the editor made the last edit

// publishedAt (DateTime)
// Identifies when the comment was published at.

// pullRequest (PullRequest!)
// Identifies the pull request associated with this pull request review.

// repository (Repository!)
// The repository associated with this node.

// resourcePath (URI!)
// The HTTP path permalink for this PullRequestReview.

// state (PullRequestReviewState!)
// Identifies the current state of the pull request review.

// submittedAt (DateTime)
// Identifies when the Pull Request Review was submitted

// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.

// url (URI!)
// The HTTP URL permalink for this PullRequestReview.

// viewerCanDelete (Boolean!)
// Check if the current viewer can delete this object.

// viewerCanUpdate (Boolean!)
// Check if the current viewer can update this object.

// viewerCannotUpdateReasons ([CommentCannotUpdateReason!]!)
// Reasons why the current viewer can not update this comment.

// viewerDidAuthor (Boolean!)
// Did the viewer author this comment.


// A review object for a given pull request.
export class PullRequestReview implements Comment, Deletable, Node, RepositoryNode, Updatable, UpdatableComment {

    // Connections

    // comments (PullRequestReviewCommentConnection!)
    // A list of review comments for the current pull request review.
    //
    // Argument	        Type	        Description
    // after	        String	        Returns the elements in the list that come after the specified cursor.
    // before	        String	        Returns the elements in the list that come before the specified cursor.
    // first	        Int	            Returns the first n elements from the list.
    // last	            Int	            Returns the last n elements from the list.

    // onBehalfOf (TeamConnection!)
    // A list of teams that this review was made on behalf of.
    //
    // Argument	        Type	        Description
    // after	        String          Returns the elements in the list that come after the specified cursor.
    // before	        String          Returns the elements in the list that come before the specified cursor.
    // first	        Int	            Returns the first n elements from the list.
    // last	            Int	            Returns the last n elements from the list.

    // userContentEdits (UserContentEditConnection)
    // A list of edits to this content.
    //
    // Argument	        Type	        Description
    // after	        String          Returns the elements in the list that come after the specified cursor.
    // before	        String	        Returns the elements in the list that come before the specified cursor.
    // first	        Int	            Returns the first n elements from the list.
    // last	            Int	            Returns the last n elements from the list.

    //
    // Fields
    //

    // The actor who authored the comment.
    author: Actor

    // Author's association with the subject of the comment.
    authorAssociation: CommentAuthorAssociation

    // Identifies the pull request review body.
    body: string

    // The body of this review rendered to HTML.
    bodyHTML: HTMLString

    // The body of this review rendered as plain text.
    bodyText: string

    // Identifies the commit associated with this pull request review.
    commit: Commit

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Check if this comment was created via an email reply.
    createdViaEmail: boolean

    // Identifies the primary key from the database.
    databaseId: number

    // The actor who edited the comment.
    editor: Actor

    id: ID

    // Check if this comment was edited and includes an edit with the creation data
    includesCreatedEdit: boolean

    // The moment the editor made the last edit
    lastEditedAt: Date

    // Identifies when the comment was published at.
    publishedAt: Date

    // Identifies the pull request associated with this pull request review.
    pullRequest: PullRequest

    // The repository associated with this node.
    repository: Repository

    // The HTTP path permalink for this PullRequestReview.
    resourcePath: URL

    // Identifies the current state of the pull request review.
    state: PullRequestReviewState

    // Identifies when the Pull Request Review was submitted
    submittedAt: Date

    // Identifies the date and time when the object was last updated.
    updatedAt: Date

    // The HTTP URL permalink for this PullRequestReview.
    url: URL

    // Check if the current viewer can delete this object.
    viewerCanDelete: boolean

    // Check if the current viewer can update this object.
    viewerCanUpdate: boolean

    // Reasons why the current viewer can not update this comment.
    viewerCannotUpdateReasons: Array<CommentCannotUpdateReason>

    // Did the viewer author this comment.
    viewerDidAuthor: boolean
}