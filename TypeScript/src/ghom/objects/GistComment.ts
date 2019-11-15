import { ID } from "../scalars/Id";
import { CommentAuthorAssociation } from "../enums/CommentAuthorAssociation";
import { Actor } from "../interfaces/Actor";
import { Gist } from "./Gist";
import { CommentCannotUpdateReason } from "../enums/CommentCannotUpdateReason";
import { Deletable } from "../interfaces/Deletable";
import { Minimizable } from "../interfaces/Minimizable";
import { Updatable } from "../interfaces/Updatable";
import { UpdatableComment } from "../interfaces/UpdatableComment";
import { Node } from "../interfaces/Node";
import { Comment } from "../interfaces/Comment";

// GistComment
// Represents a comment on an Gist.

// Implements
// Comment
// Deletable
// Minimizable
// Node
// Updatable
// UpdatableComment
// Connections
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
// Author's association with the gist.

// body (String!)
// Identifies the comment body.

// bodyHTML (HTML!)
// The comment body rendered to HTML.

// bodyText (String!)
// The body rendered to text.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// createdViaEmail (Boolean!)
// Check if this comment was created via an email reply.

// databaseId (Int)
// Identifies the primary key from the database.

// editor (Actor)
// The actor who edited the comment.

// gist (Gist!)
// The associated gist.

// id (ID!)
// includesCreatedEdit (Boolean!)
// Check if this comment was edited and includes an edit with the creation data

// isMinimized (Boolean!)
// Returns whether or not a comment has been minimized.

// lastEditedAt (DateTime)
// The moment the editor made the last edit

// minimizedReason (String)
// Returns why the comment was minimized.

// publishedAt (DateTime)
// Identifies when the comment was published at.

// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.

// viewerCanDelete (Boolean!)
// Check if the current viewer can delete this object.

// viewerCanMinimize (Boolean!)
// Check if the current viewer can minimize this object.

// viewerCanUpdate (Boolean!)
// Check if the current viewer can update this object.

// viewerCannotUpdateReasons ([CommentCannotUpdateReason!]!)
// Reasons why the current viewer can not update this comment.

// viewerDidAuthor (Boolean!)
// Did the viewer author this comment.


// Represents a comment on an Gist.
export class GistComment implements Comment, Deletable, Minimizable, Node, Updatable, UpdatableComment {

    // Connections
    // userContentEdits (UserContentEditConnection)
    // A list of edits to this content.
    // Argument	    Type	    Description
    // after	    String	    Returns the elements in the list that come after the specified cursor.
    // before	    String	    Returns the elements in the list that come before the specified cursor.
    // first	    Int	        Returns the first n elements from the list.
    // last	        Int	        Returns the last n elements from the list.

    // The actor who authored the comment.
    author: Actor

    // Author's association with the gist.
    authorAssociation: CommentAuthorAssociation

    // Identifies the comment body.
    body: string

    // The comment body rendered to HTML.
    bodyHTML: string

    // The body rendered to text.
    bodyText: string

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Check if this comment was created via an email reply.
    createdViaEmail: boolean

    // Identifies the primary key from the database.
    databaseId: number

    // The actor who edited the comment.
    editor: Actor

    // The associated gist.
    gist: Gist

    id: ID

    // Check if this comment was edited and includes an edit with the creation data
    includesCreatedEdit: boolean

    // Returns whether or not a comment has been minimized.
    isMinimized: boolean

    // The moment the editor made the last edit
    lastEditedAt: Date

    // Returns why the comment was minimized.
    minimizedReason: string

    // Identifies when the comment was published at.
    publishedAt: Date

    // Identifies the date and time when the object was last updated.
    updatedAt: Date

    // Check if the current viewer can delete this object.
    viewerCanDelete: boolean

    // Check if the current viewer can minimize this object.
    viewerCanMinimize: boolean

    // Check if the current viewer can update this object.
    viewerCanUpdate: boolean

    // Reasons why the current viewer can not update this comment.
    viewerCannotUpdateReasons: Array<CommentCannotUpdateReason>

    // Did the viewer author this comment.
    viewerDidAuthor: boolean
}
