import { Repository } from "../../model";
import { ID } from "../scalars/Id";
import { Actor } from "../interfaces/Actor";
import { CommentAuthorAssociation } from "../enums/CommentAuthorAssociation";
import { Commit } from "./Commit";
import { CommentCannotUpdateReason } from "../enums/CommentCannotUpdateReason";
import { Deletable } from "../interfaces/Deletable";
import { Minimizable } from "../interfaces/Minimizable";
import { Reactable } from "../interfaces/Reactable";
import { RepositoryNode } from "../interfaces/RepositoryNode";
import { Updatable } from "../interfaces/Updatable";
import { UpdatableComment } from "../interfaces/UpdatableComment";
import { Comment } from "../interfaces/Comment";
import { Node } from "../interfaces/Node";

// CommitComment
// Represents a comment on a given Commit.

// Implements
// Comment
// Deletable
// Minimizable
// Node
// Reactable
// RepositoryNode
// Updatable
// UpdatableComment
// Connections
// reactions (ReactionConnection!)
// A list of Reactions left on the Issue.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// content	ReactionContent	
// Allows filtering Reactions by emoji.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// orderBy	ReactionOrder	
// Allows specifying the order in which reactions are returned.

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
// Identifies the comment body.

// bodyHTML (HTML!)
// Identifies the comment body rendered to HTML.

// bodyText (String!)
// The body rendered to text.

// commit (Commit)
// Identifies the commit associated with the comment, if the commit exists.

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

// isMinimized (Boolean!)
// Returns whether or not a comment has been minimized.

// lastEditedAt (DateTime)
// The moment the editor made the last edit

// minimizedReason (String)
// Returns why the comment was minimized.

// path (String)
// Identifies the file path associated with the comment.

// position (Int)
// Identifies the line position associated with the comment.

// publishedAt (DateTime)
// Identifies when the comment was published at.

// reactionGroups ([ReactionGroup!])
// A list of reactions grouped by content left on the subject.

// repository (Repository!)
// The repository associated with this node.

// resourcePath (URI!)
// The HTTP path permalink for this commit comment.

// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.

// url (URI!)
// The HTTP URL permalink for this commit comment.

// viewerCanDelete (Boolean!)
// Check if the current viewer can delete this object.

// viewerCanMinimize (Boolean!)
// Check if the current viewer can minimize this object.

// viewerCanReact (Boolean!)
// Can user react to this subject

// viewerCanUpdate (Boolean!)
// Check if the current viewer can update this object.

// viewerCannotUpdateReasons ([CommentCannotUpdateReason!]!)
// Reasons why the current viewer can not update this comment.

// viewerDidAuthor (Boolean!)
// Did the viewer author this comment.


















// Represents a comment on a given Commit.
export class CommitComment implements Comment, Deletable, Minimizable, Node, Reactable, RepositoryNode, Updatable, UpdatableComment {


// Connections
// reactions (ReactionConnection!)
// A list of Reactions left on the Issue.

// Argument	    Type	            Description
// after	        String              Returns the elements in the list that come after the specified cursor.
// before	        String	            Returns the elements in the list that come before the specified cursor.
// content	        ReactionContent	    Allows filtering Reactions by emoji.
// first	        Int	                Returns the first n elements from the list.
// last	        Int	                Returns the last n elements from the list.
// orderBy	        ReactionOrder	    Allows specifying the order in which reactions are returned.

// userContentEdits (UserContentEditConnection)
// A list of edits to this content.

// Argument	    Type	            Description
// after	        String	            Returns the elements in the list that come after the specified cursor.
// before	        String	            Returns the elements in the list that come before the specified cursor.
// first	        Int	                Returns the first n elements from the list.
// last	        Int	                Returns the last n elements from the list.

    // The actor who authored the comment.
    author: Actor

    // Author's association with the subject of the comment.
    authorAssociation: CommentAuthorAssociation

    // Identifies the comment body.
    body: string

    // Identifies the comment body rendered to HTML.
    bodyHTML: string

    // The body rendered to text.
    bodyText: string

    // Identifies the commit associated with the comment, if the commit exists.
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

    // Returns whether or not a comment has been minimized.
    isMinimized: boolean

    // The moment the editor made the last edit
    lastEditedAt: Date

    // Returns why the comment was minimized.
    minimizedReason: string

    // Identifies the file path associated with the comment.
    path: String

    // Identifies the line position associated with the comment.
    position: number

    // Identifies when the comment was published at.
    publishedAt: Date

    // A list of reactions grouped by content left on the subject.
    reactionGroups: Array<ReactionGroup>

    // The repository associated with this node.
    repository: Repository

    // The HTTP path permalink for this commit comment.
    resourcePath: URL

    // Identifies the date and time when the object was last updated.
    updatedAt: Date

    // The HTTP URL permalink for this commit comment.
    url: URL

    // Check if the current viewer can delete this object.
    viewerCanDelete: boolean

    // Check if the current viewer can minimize this object.
    viewerCanMinimize: boolean

    // Can user react to this subject
    viewerCanReact: boolean

    // Check if the current viewer can update this object.
    viewerCanUpdate: boolean

    // Reasons why the current viewer can not update this comment.
    viewerCannotUpdateReasons: Array<CommentCannotUpdateReason>

    // Did the viewer author this comment.
    viewerDidAuthor: boolean
}