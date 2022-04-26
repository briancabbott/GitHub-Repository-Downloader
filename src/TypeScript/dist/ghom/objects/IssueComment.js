"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueComment = void 0;
// IssueComment
// Represents a comment on an Issue.
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
// The body as Markdown.
// bodyHTML (HTML!)
// The body rendered to HTML.
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
// id (ID!)
// includesCreatedEdit (Boolean!)
// Check if this comment was edited and includes an edit with the creation data
// isMinimized (Boolean!)
// Returns whether or not a comment has been minimized.
// issue (Issue!)
// Identifies the issue associated with the comment.
// lastEditedAt (DateTime)
// The moment the editor made the last edit
// minimizedReason (String)
// Returns why the comment was minimized.
// publishedAt (DateTime)
// Identifies when the comment was published at.
// pullRequest (PullRequest)
// Returns the pull request associated with the comment, if this comment was made on a pull request.
// reactionGroups ([ReactionGroup!])
// A list of reactions grouped by content left on the subject.
// repository (Repository!)
// The repository associated with this node.
// resourcePath (URI!)
// The HTTP path for this issue comment
// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.
// url (URI!)
// The HTTP URL for this issue comment
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
// Represents a comment on an Issue.
class IssueComment {
}
exports.IssueComment = IssueComment;
