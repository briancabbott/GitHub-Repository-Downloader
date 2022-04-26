"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PullRequestReviewComment = void 0;
// PullRequestReviewComment
// A review comment associated with a given repository pull request.
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
// The comment body of this review comment.
// bodyHTML (HTML!)
// The comment body of this review comment rendered to HTML.
// bodyText (String!)
// The comment body of this review comment rendered as plain text.
// commit (Commit!)
// Identifies the commit associated with the comment.
// createdAt (DateTime!)
// Identifies when the comment was created.
// createdViaEmail (Boolean!)
// Check if this comment was created via an email reply.
// databaseId (Int)
// Identifies the primary key from the database.
// diffHunk (String!)
// The diff hunk to which the comment applies.
// draftedAt (DateTime!)
// Identifies when the comment was created in a draft state.
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
// originalCommit (Commit)
// Identifies the original commit associated with the comment.
// originalPosition (Int!)
// The original line index in the diff to which the comment applies.
// outdated (Boolean!)
// Identifies when the comment body is outdated
// path (String!)
// The path to which the comment applies.
// position (Int)
// The line index in the diff to which the comment applies.
// publishedAt (DateTime)
// Identifies when the comment was published at.
// pullRequest (PullRequest!)
// The pull request associated with this review comment.
// pullRequestReview (PullRequestReview)
// The pull request review associated with this review comment.
// reactionGroups ([ReactionGroup!])
// A list of reactions grouped by content left on the subject.
// replyTo (PullRequestReviewComment)
// The comment this is a reply to.
// repository (Repository!)
// The repository associated with this node.
// resourcePath (URI!)
// The HTTP path permalink for this review comment.
// state (PullRequestReviewCommentState!)
// Identifies the state of the comment.
// updatedAt (DateTime!)
// Identifies when the comment was last updated.
// url (URI!)
// The HTTP URL permalink for this review comment.
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
// A review comment associated with a given repository pull request.
class PullRequestReviewComment {
}
exports.PullRequestReviewComment = PullRequestReviewComment;
