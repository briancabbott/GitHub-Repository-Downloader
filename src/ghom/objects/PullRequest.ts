import { Assignable } from "../interfaces/Assignable";
import { Closable } from "../interfaces/Closable";
import { Labelable } from "../interfaces/Labelable";
import { Lockable } from "../interfaces/Lockable";
import { Reactable } from "../interfaces/Reactable";
import { RepositoryNode } from "../interfaces/RepositoryNode";
import { Subscribable } from "../interfaces/Subscribable";
import { UniformResourceLocatable } from "../interfaces/UniformResourceLocatable";
import { Updatable } from "../interfaces/Updatable";
import { UpdatableComment } from "../interfaces/UpdatableComment";
import { ID } from "../scalars/Id";
import { LockReason } from "../enums/LockReason";
import { Actor } from "../interfaces/Actor";
import { CommentAuthorAssociation } from "../enums/CommentAuthorAssociation";
import { Ref } from "./Ref";
import { GitObjectID } from "../scalars/GitObjectID";
import { HTMLString } from "../scalars/HTMLString";
import { Repository } from "../../model";
import { RepositoryOwner } from "../interfaces/RepositoryOwner";
import { MergeStateStatus } from "../enums/MergeStateStatus";
import { Commit } from "./Commit";
import { MergeableState } from "../enums/MergeableState";
import { Milestone } from "./Milestone";
import { PullRequestState } from "../enums/PullRequestState";
import { CommentCannotUpdateReason } from "../enums/CommentCannotUpdateReason";
import { SubscriptionState } from "../enums/SubscriptionState";
import { Comment } from "../interfaces/Comment";
import { Node } from "../interfaces/Node";

// PullRequest
// A repository pull request.

// Implements
// Assignable
// Closable
// Comment
// Labelable
// Lockable
// Node
// Reactable
// RepositoryNode
// Subscribable
// UniformResourceLocatable
// Updatable
// UpdatableComment
// Connections
// assignees (UserConnection!)
// A list of Users assigned to this object.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// comments (IssueCommentConnection!)
// A list of comments associated with the pull request.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// commits (PullRequestCommitConnection!)
// A list of commits present in this pull request's head branch not present in the base branch.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// files (PullRequestChangedFileConnection)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Pull Requests Preview preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// Lists the files changed within this pull request.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// labels (LabelConnection)
// A list of labels associated with the object.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// participants (UserConnection!)
// A list of Users that are participating in the Pull Request conversation.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// projectCards (ProjectCardConnection!)
// List of project cards associated with this pull request.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// archivedStates	[ProjectCardArchivedState]	
// A list of archived states to filter the cards by

// The default value is ["ARCHIVED", "NOT_ARCHIVED"].

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

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

// reviewRequests (ReviewRequestConnection)
// A list of review requests associated with the pull request.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// reviews (PullRequestReviewConnection)
// A list of reviews associated with the pull request.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// author	String	
// Filter by author of the review.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// states	[PullRequestReviewState!]	
// A list of states to filter the reviews.

// timeline (PullRequestTimelineConnection!)
// A list of events, comments, commits, etc. associated with the pull request.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// since	DateTime	
// Allows filtering timeline events by a since timestamp.

// timelineItems (PullRequestTimelineItemsConnection!)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Issues Preview preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// A list of events, comments, commits, etc. associated with the pull request.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// itemTypes	[PullRequestTimelineItemsItemType!]	
// Filter timeline items by type.

// last	Int	
// Returns the last n elements from the list.

// since	DateTime	
// Filter timeline items by a since timestamp.

// skip	Int	
// Skips the first n elements in the list.

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
// activeLockReason (LockReason)
// Reason that the conversation was locked.

// additions (Int!)
// The number of additions in this pull request.

// author (Actor)
// The actor who authored the comment.

// authorAssociation (CommentAuthorAssociation!)
// Author's association with the subject of the comment.

// baseRef (Ref)
// Identifies the base Ref associated with the pull request.

// baseRefName (String!)
// Identifies the name of the base Ref associated with the pull request, even if the ref has been deleted.

// baseRefOid (GitObjectID!)
// Identifies the oid of the base ref associated with the pull request, even if the ref has been deleted.

// body (String!)
// The body as Markdown.

// bodyHTML (HTML!)
// The body rendered to HTML.

// bodyText (String!)
// The body rendered to text.

// canBeRebased (Boolean!)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the MergeInfoPreview - More detailed information about a pull request's merge state. preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// Whether or not the pull request is rebaseable.

// changedFiles (Int!)
// The number of changed files in this pull request.

// closed (Boolean!)
// true if the pull request is closed

// closedAt (DateTime)
// Identifies the date and time when the object was closed.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// createdViaEmail (Boolean!)
// Check if this comment was created via an email reply.

// databaseId (Int)
// Identifies the primary key from the database.

// deletions (Int!)
// The number of deletions in this pull request.

// editor (Actor)
// The actor who edited this pull request's body.

// headRef (Ref)
// Identifies the head Ref associated with the pull request.

// headRefName (String!)
// Identifies the name of the head Ref associated with the pull request, even if the ref has been deleted.

// headRefOid (GitObjectID!)
// Identifies the oid of the head ref associated with the pull request, even if the ref has been deleted.

// headRepository (Repository)
// The repository associated with this pull request's head Ref.

// headRepositoryOwner (RepositoryOwner)
// The owner of the repository associated with this pull request's head Ref.

// id (ID!)
// includesCreatedEdit (Boolean!)
// Check if this comment was edited and includes an edit with the creation data

// isCrossRepository (Boolean!)
// The head and base repositories are different.

// lastEditedAt (DateTime)
// The moment the editor made the last edit

// locked (Boolean!)
// true if the pull request is locked

// maintainerCanModify (Boolean!)
// Indicates whether maintainers can modify the pull request.

// mergeCommit (Commit)
// The commit that was created when this pull request was merged.

// mergeStateStatus (MergeStateStatus!)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the MergeInfoPreview - More detailed information about a pull request's merge state. preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// Detailed information about the current pull request merge state status.

// mergeable (MergeableState!)
// Whether or not the pull request can be merged based on the existence of merge conflicts.

// merged (Boolean!)
// Whether or not the pull request was merged.

// mergedAt (DateTime)
// The date and time that the pull request was merged.

// mergedBy (Actor)
// The actor who merged the pull request.

// milestone (Milestone)
// Identifies the milestone associated with the pull request.

// number (Int!)
// Identifies the pull request number.

// permalink (URI!)
// The permalink to the pull request.

// potentialMergeCommit (Commit)
// The commit that GitHub automatically generated to test if this pull request could be merged. This field will not return a value if the pull request is merged, or if the test merge commit is still being generated. See the mergeable field for more details on the mergeability of the pull request.

// publishedAt (DateTime)
// Identifies when the comment was published at.

// reactionGroups ([ReactionGroup!])
// A list of reactions grouped by content left on the subject.

// repository (Repository!)
// The repository associated with this node.

// resourcePath (URI!)
// The HTTP path for this pull request.

// revertResourcePath (URI!)
// The HTTP path for reverting this pull request.

// revertUrl (URI!)
// The HTTP URL for reverting this pull request.

// state (PullRequestState!)
// Identifies the state of the pull request.

// suggestedReviewers ([SuggestedReviewer]!)
// A list of reviewer suggestions based on commit history and past review comments.

// title (String!)
// Identifies the pull request title.

// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.

// url (URI!)
// The HTTP URL for this pull request.

// viewerCanApplySuggestion (Boolean!)
// Whether or not the viewer can apply suggestion.

// viewerCanReact (Boolean!)
// Can user react to this subject

// viewerCanSubscribe (Boolean!)
// Check if the viewer is able to change their subscription status for the repository.

// viewerCanUpdate (Boolean!)
// Check if the current viewer can update this object.

// viewerCannotUpdateReasons ([CommentCannotUpdateReason!]!)
// Reasons why the current viewer can not update this comment.

// viewerDidAuthor (Boolean!)
// Did the viewer author this comment.

// viewerSubscription (SubscriptionState)
// Identifies if the viewer is watching, not watching, or ignoring the subscribable entity.
















































// A repository pull request.
export class PullRequest implements Assignable, Closable, Comment, Labelable, 
    Lockable, Node, Reactable, RepositoryNode, Subscribable, UniformResourceLocatable, 
    Updatable, UpdatableComment {


// Connections
// assignees (UserConnection!)
// A list of Users assigned to this object.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// comments (IssueCommentConnection!)
// A list of comments associated with the pull request.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// commits (PullRequestCommitConnection!)
// A list of commits present in this pull request's head branch not present in the base branch.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// files (PullRequestChangedFileConnection)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Pull Requests Preview preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// Lists the files changed within this pull request.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// labels (LabelConnection)
// A list of labels associated with the object.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// participants (UserConnection!)
// A list of Users that are participating in the Pull Request conversation.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// projectCards (ProjectCardConnection!)
// List of project cards associated with this pull request.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// archivedStates	[ProjectCardArchivedState]	
// A list of archived states to filter the cards by

// The default value is ["ARCHIVED", "NOT_ARCHIVED"].

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

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

// reviewRequests (ReviewRequestConnection)
// A list of review requests associated with the pull request.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// reviews (PullRequestReviewConnection)
// A list of reviews associated with the pull request.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// author	String	
// Filter by author of the review.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// states	[PullRequestReviewState!]	
// A list of states to filter the reviews.

// timeline (PullRequestTimelineConnection!)
// A list of events, comments, commits, etc. associated with the pull request.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// since	DateTime	
// Allows filtering timeline events by a since timestamp.

// timelineItems (PullRequestTimelineItemsConnection!)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Issues Preview preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// A list of events, comments, commits, etc. associated with the pull request.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// itemTypes	[PullRequestTimelineItemsItemType!]	
// Filter timeline items by type.

// last	Int	
// Returns the last n elements from the list.

// since	DateTime	
// Filter timeline items by a since timestamp.

// skip	Int	
// Skips the first n elements in the list.

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

    //
    // Fields
    //

    // Reason that the conversation was locked.
    activeLockReason: LockReason

    // The number of additions in this pull request.
    additions: number

    // The actor who authored the comment.
    author: Actor

    // Author's association with the subject of the comment.
    authorAssociation: CommentAuthorAssociation

    // Identifies the base Ref associated with the pull request.
    baseRef: Ref

    // Identifies the name of the base Ref associated with the pull request, even if the ref has been deleted.
    baseRefName: String

    // Identifies the oid of the base ref associated with the pull request, even if the ref has been deleted.
    baseRefOid: GitObjectID

    // The body as Markdown.
    body: string

    // The body rendered to HTML.
    bodyHTML: HTMLString

    // The body rendered to text.
    bodyText: string

    // This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the MergeInfoPreview - More detailed information about a pull request's merge state. preview for more details.
    canBeRebased: boolean

    // Whether or not the pull request is rebaseable.

    // The number of changed files in this pull request.
    changedFiles: number

    // true if the pull request is closed
    closed: boolean

    // Identifies the date and time when the object was closed.
    closedAt: Date

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Check if this comment was created via an email reply.
    createdViaEmail: boolean

    // Identifies the primary key from the database.
    databaseId: number

    // The number of deletions in this pull request.
    deletions: number

    // The actor who edited this pull request's body.
    editor: Actor

    // Identifies the head Ref associated with the pull request.
    headRef: Ref

    // Identifies the name of the head Ref associated with the pull request, even if the ref has been deleted.
    headRefName: string

    // Identifies the oid of the head ref associated with the pull request, even if the ref has been deleted.
    headRefOid: GitObjectID

    // The repository associated with this pull request's head Ref.
    headRepository: Repository

    // The owner of the repository associated with this pull request's head Ref.
    headRepositoryOwner: RepositoryOwner

    id: ID

    // Check if this comment was edited and includes an edit with the creation data
    includesCreatedEdit: boolean

    // The head and base repositories are different.
    isCrossRepository: boolean

    // The moment the editor made the last edit
    lastEditedAt: Date

    // true if the pull request is locked
    locked: boolean

    // Indicates whether maintainers can modify the pull request.
    maintainerCanModify: boolean

    // The commit that was created when this pull request was merged.
    mergeCommit: Commit

    // This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the MergeInfoPreview - More detailed information about a pull request's merge state. preview for more details.
    mergeStateStatus: MergeStateStatus

    // Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

    // Detailed information about the current pull request merge state status.

    // Whether or not the pull request can be merged based on the existence of merge conflicts.
    mergeable: MergeableState

    // Whether or not the pull request was merged.
    merged: boolean

    // The date and time that the pull request was merged.
    mergedAt: Date

    // The actor who merged the pull request.
    mergedBy: Actor

    // Identifies the milestone associated with the pull request.
    milestone: Milestone

    // Identifies the pull request number.
    number: number

    // The permalink to the pull request.
    permalink: URL

    // The commit that GitHub automatically generated to test if this pull request could be merged. This field will not return a value if the pull request is merged, or if the test merge commit is still being generated. See the mergeable field for more details on the mergeability of the pull request.
    potentialMergeCommit: Commit

    // Identifies when the comment was published at.
    publishedAt: Date

    // A list of reactions grouped by content left on the subject.
    reactionGroups: Array<ReactionGroup>

    // The repository associated with this node.
    repository: Repository

    // The HTTP path for this pull request.
    resourcePath: URL

    // The HTTP path for reverting this pull request.
    revertResourcePath: URL

    // The HTTP URL for reverting this pull request.
    revertUrl: URL

    // Identifies the state of the pull request.
    state: PullRequestState

    // A list of reviewer suggestions based on commit history and past review comments.
    suggestedReviewers: Array<SuggestedReviewer>

    // Identifies the pull request title.
    title: string

    // Identifies the date and time when the object was last updated.
    updatedAt: Date

    // The HTTP URL for this pull request.
    url: URL

    // Whether or not the viewer can apply suggestion.
    viewerCanApplySuggestion: boolean

    // Can user react to this subject
    viewerCanReact: boolean

    // Check if the viewer is able to change their subscription status for the repository.
    viewerCanSubscribe: boolean

    // Check if the current viewer can update this object.
    viewerCanUpdate: boolean

    // Reasons why the current viewer can not update this comment.
    viewerCannotUpdateReasons: Array<CommentCannotUpdateReason>

    // Did the viewer author this comment.
    viewerDidAuthor: boolean

    // Identifies if the viewer is watching, not watching, or ignoring the subscribable entity.
    viewerSubscription: SubscriptionState

}