"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
// Repository
// A repository contains the content for a project.
// Implements
// Node
// ProjectOwner
// RegistryPackageOwner
// RepositoryInfo
// Starrable
// Subscribable
// UniformResourceLocatable
// Connections
// assignableUsers (UserConnection!)
// A list of users that can be assigned to issues in this repository.
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// first	Int
// Returns the first n elements from the list.
// last	Int
// Returns the last n elements from the list.
// branchProtectionRules (BranchProtectionRuleConnection!)
// A list of branch protection rules for this repository.
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// first	Int
// Returns the first n elements from the list.
// last	Int
// Returns the last n elements from the list.
// collaborators (RepositoryCollaboratorConnection)
// A list of collaborators associated with the repository.
// Argument	Type	Description
// affiliation	CollaboratorAffiliation
// Collaborators affiliation level with a repository.
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// first	Int
// Returns the first n elements from the list.
// last	Int
// Returns the last n elements from the list.
// commitComments (CommitCommentConnection!)
// A list of commit comments associated with the repository.
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// first	Int
// Returns the first n elements from the list.
// last	Int
// Returns the last n elements from the list.
// dependencyGraphManifests (DependencyGraphManifestConnection)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Access to a Repositories Dependency Graph preview for more details.
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// A list of dependency manifests contained in the repository
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// dependenciesAfter	String
// Cursor to paginate dependencies
// dependenciesFirst	Int
// Number of dependencies to fetch
// first	Int
// Returns the first n elements from the list.
// last	Int
// Returns the last n elements from the list.
// withDependencies	Boolean
// Flag to scope to only manifests with dependencies
// deployKeys (DeployKeyConnection!)
// A list of deploy keys that are on this repository.
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// first	Int
// Returns the first n elements from the list.
// last	Int
// Returns the last n elements from the list.
// deployments (DeploymentConnection!)
// Deployments associated with the repository
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// environments	[String!]
// Environments to list deployments for
// first	Int
// Returns the first n elements from the list.
// last	Int
// Returns the last n elements from the list.
// forks (RepositoryConnection!)
// A list of direct forked repositories.
// Argument	Type	Description
// affiliations	[RepositoryAffiliation]
// Array of viewer's affiliation options for repositories returned from the connection. For example, OWNER will include only repositories that the current viewer owns.
// The default value is ["OWNER", "COLLABORATOR"].
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// first	Int
// Returns the first n elements from the list.
// isLocked	Boolean
// If non-null, filters repositories according to whether they have been locked
// last	Int
// Returns the last n elements from the list.
// orderBy	RepositoryOrder
// Ordering options for repositories returned from the connection
// ownerAffiliations	[RepositoryAffiliation]
// Array of owner's affiliation options for repositories returned from the connection. For example, OWNER will include only repositories that the organization or user being viewed owns.
// The default value is ["OWNER", "COLLABORATOR"].
// privacy	RepositoryPrivacy
// If non-null, filters repositories according to privacy
// issues (IssueConnection!)
// A list of issues that have been opened in the repository.
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// filterBy	IssueFilters
// Filtering options for issues returned from the connection.
// first	Int
// Returns the first n elements from the list.
// labels	[String!]
// A list of label names to filter the pull requests by.
// last	Int
// Returns the last n elements from the list.
// orderBy	IssueOrder
// Ordering options for issues returned from the connection.
// states	[IssueState!]
// A list of states to filter the issues by.
// labels (LabelConnection)
// A list of labels associated with the repository.
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// first	Int
// Returns the first n elements from the list.
// last	Int
// Returns the last n elements from the list.
// query	String
// If provided, searches labels by name and description.
// languages (LanguageConnection)
// A list containing a breakdown of the language composition of the repository.
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// first	Int
// Returns the first n elements from the list.
// last	Int
// Returns the last n elements from the list.
// orderBy	LanguageOrder
// Order for connection
// mentionableUsers (UserConnection!)
// A list of Users that can be mentioned in the context of the repository.
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// first	Int
// Returns the first n elements from the list.
// last	Int
// Returns the last n elements from the list.
// milestones (MilestoneConnection)
// A list of milestones associated with the repository.
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// first	Int
// Returns the first n elements from the list.
// last	Int
// Returns the last n elements from the list.
// orderBy	MilestoneOrder
// Ordering options for milestones.
// states	[MilestoneState!]
// Filter by the state of the milestones.
// projects (ProjectConnection!)
// A list of projects under the owner.
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// first	Int
// Returns the first n elements from the list.
// last	Int
// Returns the last n elements from the list.
// orderBy	ProjectOrder
// Ordering options for projects returned from the connection
// search	String
// Query to search projects by, currently only searching by name.
// states	[ProjectState!]
// A list of states to filter the projects by.
// protectedBranches (ProtectedBranchConnection!)
// A list of protected branches that are on this repository.
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// first	Int
// Returns the first n elements from the list.
// last	Int
// Returns the last n elements from the list.
// pullRequests (PullRequestConnection!)
// A list of pull requests that have been opened in the repository.
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
// baseRefName	String
// The base ref name to filter the pull requests by.
// before	String
// Returns the elements in the list that come before the specified cursor.
// first	Int
// Returns the first n elements from the list.
// headRefName	String
// The head ref name to filter the pull requests by.
// labels	[String!]
// A list of label names to filter the pull requests by.
// last	Int
// Returns the last n elements from the list.
// orderBy	IssueOrder
// Ordering options for pull requests returned from the connection.
// states	[PullRequestState!]
// A list of states to filter the pull requests by.
// refs (RefConnection)
// Fetch a list of refs from the repository
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// direction	OrderDirection
// DEPRECATED: use orderBy. The ordering direction.
// first	Int
// Returns the first n elements from the list.
// last	Int
// Returns the last n elements from the list.
// orderBy	RefOrder
// Ordering options for refs returned from the connection.
// refPrefix	String!
// A ref name prefix like refs/heads/, refs/tags/, etc.
// releases (ReleaseConnection!)
// List of releases which are dependent on this repository.
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// first	Int
// Returns the first n elements from the list.
// last	Int
// Returns the last n elements from the list.
// orderBy	ReleaseOrder
// Order for connection
// repositoryTopics (RepositoryTopicConnection!)
// A list of applied repository-topic associations for this repository.
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// first	Int
// Returns the first n elements from the list.
// last	Int
// Returns the last n elements from the list.
// stargazers (StargazerConnection!)
// A list of users who have starred this starrable.
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// first	Int
// Returns the first n elements from the list.
// last	Int
// Returns the last n elements from the list.
// orderBy	StarOrder
// Order for connection
// vulnerabilityAlerts (RepositoryVulnerabilityAlertConnection)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Repository Vulnerability Alerts preview for more details.
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// A list of vulnerability alerts that are on this repository.
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// first	Int
// Returns the first n elements from the list.
// last	Int
// Returns the last n elements from the list.
// watchers (UserConnection!)
// A list of users watching the repository.
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
// codeOfConduct (CodeOfConduct)
// Returns the code of conduct for this repository
// createdAt (DateTime!)
// Identifies the date and time when the object was created.
// databaseId (Int)
// Identifies the primary key from the database.
// defaultBranchRef (Ref)
// The Ref associated with the repository's default branch.
// description (String)
// The description of the repository.
// descriptionHTML (HTML!)
// The description of the repository rendered to HTML.
// diskUsage (Int)
// The number of kilobytes this repository occupies on disk.
// forkCount (Int!)
// Returns how many forks there are of this repository in the whole network.
// hasIssuesEnabled (Boolean!)
// Indicates if the repository has issues feature enabled.
// hasWikiEnabled (Boolean!)
// Indicates if the repository has wiki feature enabled.
// homepageUrl (URI)
// The repository's URL.
// id (ID!)
// isArchived (Boolean!)
// Indicates if the repository is unmaintained.
// isFork (Boolean!)
// Identifies if the repository is a fork.
// isLocked (Boolean!)
// Indicates if the repository has been locked or not.
// isMirror (Boolean!)
// Identifies if the repository is a mirror.
// isPrivate (Boolean!)
// Identifies if the repository is private.
// issue (Issue)
// Returns a single issue from the current repository by number.
// Argument	Type	Description
// number	Int!
// The number for the issue to be returned.
// issueOrPullRequest (IssueOrPullRequest)
// Returns a single issue-like object from the current repository by number.
// Argument	Type	Description
// number	Int!
// The number for the issue to be returned.
// label (Label)
// Returns a single label by name
// Argument	Type	Description
// name	String!
// Label name
// licenseInfo (License)
// The license associated with the repository
// lockReason (RepositoryLockReason)
// The reason the repository has been locked.
// mergeCommitAllowed (Boolean!)
// Whether or not PRs are merged with a merge commit on this repository.
// milestone (Milestone)
// Returns a single milestone from the current repository by number.
// Argument	Type	Description
// number	Int!
// The number for the milestone to be returned.
// mirrorUrl (URI)
// The repository's original mirror URL.
// name (String!)
// The name of the repository.
// nameWithOwner (String!)
// The repository's name with owner.
// object (GitObject)
// A Git object in the repository
// Argument	Type	Description
// expression	String
// A Git revision expression suitable for rev-parse
// oid	GitObjectID
// The Git object ID
// owner (RepositoryOwner!)
// The User owner of the repository.
// parent (Repository)
// The repository parent, if this is a fork.
// primaryLanguage (Language)
// The primary language of the repository's code.
// project (Project)
// Find project by number.
// Argument	Type	Description
// number	Int!
// The project number to find.
// projectsResourcePath (URI!)
// The HTTP path listing the repository's projects
// projectsUrl (URI!)
// The HTTP URL listing the repository's projects
// pullRequest (PullRequest)
// Returns a single pull request from the current repository by number.
// Argument	Type	Description
// number	Int!
// The number for the pull request to be returned.
// pushedAt (DateTime)
// Identifies when the repository was last pushed to.
// rebaseMergeAllowed (Boolean!)
// Whether or not rebase-merging is enabled on this repository.
// ref (Ref)
// Fetch a given ref from the repository
// Argument	Type	Description
// qualifiedName	String!
// The ref to retrieve. Fully qualified matches are checked in order (refs/heads/master) before falling back onto checks for short name matches (master).
// release (Release)
// Lookup a single release given various criteria.
// Argument	Type	Description
// tagName	String!
// The name of the Tag the Release was created from
// resourcePath (URI!)
// The HTTP path for this repository
// shortDescriptionHTML (HTML!)
// A description of the repository, rendered to HTML without any links in it.
// Argument	Type	Description
// limit	Int
// How many characters to return.
// The default value is 200.
// squashMergeAllowed (Boolean!)
// Whether or not squash-merging is enabled on this repository.
// sshUrl (GitSSHRemote!)
// The SSH URL to clone this repository
// tempCloneToken (String)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Temporary Cloning Token for Private Repositories preview for more details.
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// Temporary authentication token for cloning this repository.
// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.
// url (URI!)
// The HTTP URL for this repository
// viewerCanAdminister (Boolean!)
// Indicates whether the viewer has admin permissions on this repository.
// viewerCanCreateProjects (Boolean!)
// Can the current viewer create new projects on this owner.
// viewerCanSubscribe (Boolean!)
// Check if the viewer is able to change their subscription status for the repository.
// viewerCanUpdateTopics (Boolean!)
// Indicates whether the viewer can update the topics of this repository.
// viewerHasStarred (Boolean!)
// Returns a boolean indicating whether the viewing user has starred this starrable.
// viewerPermission (RepositoryPermission)
// The users permission level on the repository. Will return null if authenticated as an GitHub App.
// viewerSubscription (SubscriptionState)
// Identifies if the viewer is watching, not watching, or ignoring the subscribable entity.
// A repository contains the content for a project.
class Repository {
}
exports.Repository = Repository;
