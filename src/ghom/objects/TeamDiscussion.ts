TeamDiscussion
This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Team discussions preview for more details.

Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

A team discussion.

Implements
Comment
Deletable
Node
Reactable
Subscribable
UniformResourceLocatable
Updatable
UpdatableComment
Connections
comments (TeamDiscussionCommentConnection!)
A list of comments on this discussion.

Argument	Type	Description
after	String	
Returns the elements in the list that come after the specified cursor.

before	String	
Returns the elements in the list that come before the specified cursor.

first	Int	
Returns the first n elements from the list.

fromComment	Int	
When provided, filters the connection such that results begin with the comment with this number.

last	Int	
Returns the last n elements from the list.

orderBy	TeamDiscussionCommentOrder	
Order for connection

reactions (ReactionConnection!)
A list of Reactions left on the Issue.

Argument	Type	Description
after	String	
Returns the elements in the list that come after the specified cursor.

before	String	
Returns the elements in the list that come before the specified cursor.

content	ReactionContent	
Allows filtering Reactions by emoji.

first	Int	
Returns the first n elements from the list.

last	Int	
Returns the last n elements from the list.

orderBy	ReactionOrder	
Allows specifying the order in which reactions are returned.

userContentEdits (UserContentEditConnection)
A list of edits to this content.

Argument	Type	Description
after	String	
Returns the elements in the list that come after the specified cursor.

before	String	
Returns the elements in the list that come before the specified cursor.

first	Int	
Returns the first n elements from the list.

last	Int	
Returns the last n elements from the list.

Fields
author (Actor)
The actor who authored the comment.

authorAssociation (CommentAuthorAssociation!)
Author's association with the discussion's team.

body (String!)
The body as Markdown.

bodyHTML (HTML!)
The discussion body rendered to HTML.

bodyText (String!)
The body rendered to text.

bodyVersion (String!)
Identifies the discussion body hash.

commentsResourcePath (URI!)
The HTTP path for discussion comments

commentsUrl (URI!)
The HTTP URL for discussion comments

createdAt (DateTime!)
Identifies the date and time when the object was created.

createdViaEmail (Boolean!)
Check if this comment was created via an email reply.

databaseId (Int)
Identifies the primary key from the database.

editor (Actor)
The actor who edited the comment.

id (ID!)
includesCreatedEdit (Boolean!)
Check if this comment was edited and includes an edit with the creation data

isPinned (Boolean!)
Whether or not the discussion is pinned.

isPrivate (Boolean!)
Whether or not the discussion is only visible to team members and org admins.

lastEditedAt (DateTime)
The moment the editor made the last edit

number (Int!)
Identifies the discussion within its team.

publishedAt (DateTime)
Identifies when the comment was published at.

reactionGroups ([ReactionGroup!])
A list of reactions grouped by content left on the subject.

resourcePath (URI!)
The HTTP path for this discussion

team (Team!)
The team that defines the context of this discussion.

title (String!)
The title of the discussion

updatedAt (DateTime!)
Identifies the date and time when the object was last updated.

url (URI!)
The HTTP URL for this discussion

viewerCanDelete (Boolean!)
Check if the current viewer can delete this object.

viewerCanPin (Boolean!)
Whether or not the current viewer can pin this discussion.

viewerCanReact (Boolean!)
Can user react to this subject

viewerCanSubscribe (Boolean!)
Check if the viewer is able to change their subscription status for the repository.

viewerCanUpdate (Boolean!)
Check if the current viewer can update this object.

viewerCannotUpdateReasons ([CommentCannotUpdateReason!]!)
Reasons why the current viewer can not update this comment.

viewerDidAuthor (Boolean!)
Did the viewer author this comment.

viewerSubscription (SubscriptionState)
Identifies if the viewer is watching, not watching, or ignoring the subscribable entity.