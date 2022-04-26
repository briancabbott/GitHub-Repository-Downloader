"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PullRequestReview = void 0;
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
class PullRequestReview {
}
exports.PullRequestReview = PullRequestReview;
