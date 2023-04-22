// Team
// A team of users in an organization.
//
// Implements
// Node
// Subscribable
// Connections
// ancestors (TeamConnection!)
// A list of teams that are ancestors of this team.
//
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
//
// before	String
// Returns the elements in the list that come before the specified cursor.
//
// first	Int
// Returns the first n elements from the list.
//
// last	Int
// Returns the last n elements from the list.
//
// childTeams (TeamConnection!)
// List of child teams belonging to this team
//
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
//
// before	String
// Returns the elements in the list that come before the specified cursor.
//
// first	Int
// Returns the first n elements from the list.
//
// immediateOnly	Boolean
// Whether to list immediate child teams or all descendant child teams.
//
// The default value is true.
//
// last	Int
// Returns the last n elements from the list.
//
// orderBy	TeamOrder
// Order for connection
//
// userLogins	[String!]
// User logins to filter by
//
// discussions (TeamDiscussionConnection!)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Team discussions preview for more details.
//
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
//
// A list of team discussions.
//
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
//
// before	String
// Returns the elements in the list that come before the specified cursor.
//
// first	Int
// Returns the first n elements from the list.
//
// isPinned	Boolean
// If provided, filters discussions according to whether or not they are pinned.
//
// last	Int
// Returns the last n elements from the list.
//
// orderBy	TeamDiscussionOrder
// Order for connection
//
// invitations (OrganizationInvitationConnection)
// A list of pending invitations for users to this team
//
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
//
// before	String
// Returns the elements in the list that come before the specified cursor.
//
// first	Int
// Returns the first n elements from the list.
//
// last	Int
// Returns the last n elements from the list.
//
// members (TeamMemberConnection!)
// A list of users who are members of this team.
//
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
//
// before	String
// Returns the elements in the list that come before the specified cursor.
//
// first	Int
// Returns the first n elements from the list.
//
// last	Int
// Returns the last n elements from the list.
//
// membership	TeamMembershipType
// Filter by membership type
//
// The default value is ALL.
//
// orderBy	TeamMemberOrder
// Order for the connection.
//
// query	String
// The search string to look for.
//
// role	TeamMemberRole
// Filter by team member role
//
// repositories (TeamRepositoryConnection!)
// A list of repositories this team has access to.
//
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
//
// before	String
// Returns the elements in the list that come before the specified cursor.
//
// first	Int
// Returns the first n elements from the list.
//
// last	Int
// Returns the last n elements from the list.
//
// orderBy	TeamRepositoryOrder
// Order for the connection.
//
// query	String
// The search string to look for.
//
// Fields
// avatarUrl (URI)
// A URL pointing to the team's avatar.
//
// Argument	Type	Description
// size	Int
// The size in pixels of the resulting square image.
//
// The default value is 400.
//
// combinedSlug (String!)
// The slug corresponding to the organization and team.
//
// createdAt (DateTime!)
// Identifies the date and time when the object was created.
//
// description (String)
// The description of the team.
//
// discussion (TeamDiscussion)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Team discussions preview for more details.
//
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
//
// Find a team discussion by its number.
//
// Argument	Type	Description
// number	Int!
// The sequence number of the discussion to find.
//
// discussionsResourcePath (URI!)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Team discussions preview for more details.
//
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
//
// The HTTP path for team discussions
//
// discussionsUrl (URI!)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Team discussions preview for more details.
//
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
//
// The HTTP URL for team discussions
//
// editTeamResourcePath (URI!)
// The HTTP path for editing this team
//
// editTeamUrl (URI!)
// The HTTP URL for editing this team
//
// id (ID!)
// membersResourcePath (URI!)
// The HTTP path for the team' members
//
// membersUrl (URI!)
// The HTTP URL for the team' members
//
// name (String!)
// The name of the team.
//
// newTeamResourcePath (URI!)
// The HTTP path creating a new team
//
// newTeamUrl (URI!)
// The HTTP URL creating a new team
//
// organization (Organization!)
// The organization that owns this team.
//
// parentTeam (Team)
// The parent team of the team.
//
// privacy (TeamPrivacy!)
// The level of privacy the team has.
//
// repositoriesResourcePath (URI!)
// The HTTP path for this team's repositories
//
// repositoriesUrl (URI!)
// The HTTP URL for this team's repositories
//
// resourcePath (URI!)
// The HTTP path for this team
//
// slug (String!)
// The slug corresponding to the team.
//
// teamsResourcePath (URI!)
// The HTTP path for this team's teams
//
// teamsUrl (URI!)
// The HTTP URL for this team's teams
//
// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.
//
// url (URI!)
// The HTTP URL for this team
//
// viewerCanAdminister (Boolean!)
// Team is adminable by the viewer.
//
// viewerCanSubscribe (Boolean!)
// Check if the viewer is able to change their subscription status for the repository.
//
// viewerSubscription (SubscriptionState)
// Identifies if the viewer is watching, not watching, or ignoring the subscribable entity.
