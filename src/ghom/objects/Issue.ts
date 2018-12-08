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
import { Actor } from "../interfaces/Actor";
import { ID } from "../scalars/Id";
import { Repository } from "../../model";
import { IssueState } from "../enums/IssueState";
import { CommentCannotUpdateReason } from "../enums/CommentCannotUpdateReason";
import { SubscriptionState } from "../enums/SubscriptionState";
import { CommentAuthorAssociation } from "../enums/CommentAuthorAssociation";
import { LockReason } from "../enums/LockReason";
import { Comment } from "../interfaces/Comment";
import { Node } from "../interfaces/Node";

// Issue
// An Issue is a place to discuss ideas, enhancements, tasks, and bugs for a project.

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
// A list of comments associated with the Issue.

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
// A list of Users that are participating in the Issue conversation.

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
// List of project cards associated with this issue.

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

// timeline (IssueTimelineConnection!)
// A list of events, comments, commits, etc. associated with the issue.

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

// timelineItems (IssueTimelineItemsConnection!)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Issues Preview preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// A list of events, comments, commits, etc. associated with the issue.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// itemTypes	[IssueTimelineItemsItemType!]	
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

// author (Actor)
// The actor who authored the comment.

// authorAssociation (CommentAuthorAssociation!)
// Author's association with the subject of the comment.

// body (String!)
// Identifies the body of the issue.

// bodyHTML (HTML!)
// Identifies the body of the issue rendered to HTML.

// bodyText (String!)
// Identifies the body of the issue rendered to text.

// closed (Boolean!)
// true if the object is closed (definition of closed may depend on type)

// closedAt (DateTime)
// Identifies the date and time when the object was closed.

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

// locked (Boolean!)
// true if the object is locked

// milestone (Milestone)
// Identifies the milestone associated with the issue.

// number (Int!)
// Identifies the issue number.

// publishedAt (DateTime)
// Identifies when the comment was published at.

// reactionGroups ([ReactionGroup!])
// A list of reactions grouped by content left on the subject.

// repository (Repository!)
// The repository associated with this node.

// resourcePath (URI!)
// The HTTP path for this issue

// state (IssueState!)
// Identifies the state of the issue.

// title (String!)
// Identifies the issue title.

// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.

// url (URI!)
// The HTTP URL for this issue

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









// An Issue is a place to discuss ideas, enhancements, tasks, and bugs for a project.
export class Issue implements Assignable, Closable, Comment, Labelable, Lockable, Node, 
    Reactable, RepositoryNode, Subscribable, UniformResourceLocatable, Updatable, UpdatableComment {


    // Connections
    // assignees (UserConnection!)
    // A list of Users assigned to this object.
    // Argument	Type	Description
    // after	String	Returns the elements in the list that come after the specified cursor.
    // before	String	Returns the elements in the list that come before the specified cursor.
    // first	Int	    Returns the first n elements from the list.
    // last	    Int	    Returns the last n elements from the list.


    // comments (IssueCommentConnection!)
    // A list of comments associated with the Issue.
    // Argument	Type	Description
    // after	String	Returns the elements in the list that come after the specified cursor.
    // before	String	Returns the elements in the list that come before the specified cursor.
    // first	Int	    Returns the first n elements from the list.
    // last	    Int     Returns the last n elements from the list.


    // A list of labels associated with the object.
    // labels (LabelConnection)
    // Argument	    Type	    Description
    // after	    String	    Returns the elements in the list that come after the specified cursor.
    // before	    String	    Returns the elements in the list that come before the specified cursor.
    // first	    Int	        Returns the first n elements from the list.
    // last	        Int	        Returns the last n elements from the list.


    // participants (UserConnection!)
    // A list of Users that are participating in the Issue conversation.
    // Argument	    Type	    Description
    // after	    String	    Returns the elements in the list that come after the specified cursor.
    // before	    String	    Returns the elements in the list that come before the specified cursor.
    // first	    Int	        Returns the first n elements from the list.
    // last	        Int         Returns the last n elements from the list.


    // projectCards (ProjectCardConnection!)
    // List of project cards associated with this issue.
    // Argument	    Type	    Description
    // after	    String      Returns the elements in the list that come after the specified cursor.


    // archivedStates	[ProjectCardArchivedState]	
    // A list of archived states to filter the cards by
    // The default value is ["ARCHIVED", "NOT_ARCHIVED"].
    // before	    String	    Returns the elements in the list that come before the specified cursor.
    // first	    Int	        Returns the first n elements from the list.
    // last	        Int	        Returns the last n elements from the list.


    // reactions (ReactionConnection!)
    // A list of Reactions left on the Issue.
    // Argument	    Type	    Description
    // after	    String	    Returns the elements in the list that come after the specified cursor.
    // before	    String	    Returns the elements in the list that come before the specified cursor.
    // content	    ReactionContent	Allows filtering Reactions by emoji.
    // first	    Int	        Returns the first n elements from the list.
    // last	        Int	        Returns the last n elements from the list.
    // orderBy	    ReactionOrder   Allows specifying the order in which reactions are returned.


    // timeline (IssueTimelineConnection!)
    // A list of events, comments, commits, etc. associated with the issue.
    // Argument	    Type	    Description
    // after	    String	    Returns the elements in the list that come after the specified cursor.
    // before	    String	    Returns the elements in the list that come before the specified cursor.
    // first	    Int         Returns the first n elements from the list.
    // last	        Int	        Returns the last n elements from the list.
    // since	    DateTime	Allows filtering timeline events by a since timestamp.


    // timelineItems (IssueTimelineItemsConnection!)
    // This part of the schema is currently available for developers to preview. During this preview 
    // period, the API may change without any advance notice. Please see the Issues Preview preview 
    // for more details.

    // Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

    // A list of events, comments, commits, etc. associated with the issue.

    // Argument	    Type	    Description
    // after	    String	    Returns the elements in the list that come after the specified cursor.
    // before	    String      Returns the elements in the list that come before the specified cursor.
    // first	    Int	        Returns the first n elements from the list.

    // itemTypes	[IssueTimelineItemsItemType!]	
    // Filter timeline items by type.

    // last	        Int	        Returns the last n elements from the list.
    // since	    DateTime    Filter timeline items by a since timestamp.
    // skip	        Int	        Skips the first n elements in the list.

    // userContentEdits (UserContentEditConnection)
    // A list of edits to this content.

    // Argument	    Type	    Description
    // after	    String	    Returns the elements in the list that come after the specified cursor.
    // before	    String      Returns the elements in the list that come before the specified cursor.
    // first	    Int	        Returns the first n elements from the list.
    // last	        Int	        Returns the last n elements from the list.


    // Reason that the conversation was locked.
    activeLockReason: LockReason;

    // The actor who authored the comment.
    author: Actor

    // Author's association with the subject of the comment.
    authorAssociation: CommentAuthorAssociation

    // Identifies the body of the issue.
    body: String

    // Identifies the body of the issue rendered to HTML.
    bodyHTML: string

    // Identifies the body of the issue rendered to text.
    bodyText: string

    // true if the object is closed (definition of closed may depend on type)
    closed: boolean

    // Identifies the date and time when the object was closed.
    closedAt: Date

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

    // true if the object is locked
    locked: boolean

    // Identifies the milestone associated with the issue.
    milestone: Milestone

    // Identifies the issue number.
    number: number

    // Identifies when the comment was published at.
    publishedAt: Date

    // A list of reactions grouped by content left on the subject.
    reactionGroups: Array<ReactionGroup>
    
    // The repository associated with this node.
    repository: Repository

    // The HTTP path for this issue
    resourcePath: URL

    // Identifies the state of the issue.
    state: IssueState

    // Identifies the issue title.
    title: String

    // Identifies the date and time when the object was last updated.
    updatedAt: Date

    // The HTTP URL for this issue
    url: URL

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
