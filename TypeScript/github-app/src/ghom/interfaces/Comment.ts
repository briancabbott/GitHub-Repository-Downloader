import { Actor } from "./Actor";
import { CommentAuthorAssociation } from "../enums/CommentAuthorAssociation";

// Comment
// Represents a comment.

// Implemented by
// CommitComment
// GistComment
// Issue
// IssueComment
// PullRequest
// PullRequestReview
// PullRequestReviewComment
// TeamDiscussion
// TeamDiscussionComment
// Fields
// author (Actor)
// The actor who authored the comment.

// authorAssociation (CommentAuthorAssociation!)
// Author's association with the subject of the comment.

// body (String!)
// The body as Markdown.

// bodyHTML (HTML!)
// The body rendered to HTML.

// bodyText (String!)
// The body rendered to text.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// createdViaEmail (Boolean!)
// Check if this comment was created via an email reply.

// editor (Actor)
// The actor who edited the comment.

// id (ID!)
// includesCreatedEdit (Boolean!)
// Check if this comment was edited and includes an edit with the creation data

// lastEditedAt (DateTime)
// The moment the editor made the last edit

// publishedAt (DateTime)
// Identifies when the comment was published at.

// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.

// viewerDidAuthor (Boolean!)
// Did the viewer author this comment.


// Represents a comment.
export interface Comment {

    // The actor who authored the comment.
    author: Actor

    // Author's association with the subject of the comment.
    authorAssociation: CommentAuthorAssociation

    // The body as Markdown.
    body: string

    // The body rendered to HTML.
    // bodyHTML (HTML!)

    // The body rendered to text.
    bodyText: string

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Check if this comment was created via an email reply.
    createdViaEmail: boolean

    // The actor who edited the comment.
    editor: Actor

    // Check if this comment was edited and includes an edit with the creation data
    includesCreatedEdit: boolean

    // The moment the editor made the last edit
    lastEditedAt: Date

    // Identifies when the comment was published at.
    publishedAt: Date

    // Identifies the date and time when the object was last updated.
    updatedAt: Date

    // Did the viewer author this comment.
    viewerDidAuthor: boolean
}