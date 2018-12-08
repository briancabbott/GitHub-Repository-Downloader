import { Actor } from "../interfaces/Actor";
import { Node } from "../interfaces/Node";
import { RegistryPackageOwner } from "../interfaces/RegistryPackageOwner";
import { RepositoryOwner } from "../interfaces/RepositoryOwner";
import { UniformResourceLocatable } from "../interfaces/UniformResourceLocatable";
import { RegistryPackageSearch } from "../interfaces/RegistryPackageSearch";
import { HTMLString } from "../scalars/HTMLString";
import { ID } from "../scalars/Id";
import { Hovercard } from "./Hovercard";
import { Organization } from "./Organization";
import { Repository } from "../../model";
import { URL } from "url";
import { Gist } from "./Gist";
import { ContributionsCollection } from "./ContributionsCollection";

// User
// A user is an individual's account on GitHub that owns repositories and can make new content.

// Implements
// Actor
// Node
// RegistryPackageOwner
// RegistryPackageSearch
// RepositoryOwner
// UniformResourceLocatable
// Connections
// commitComments (CommitCommentConnection!)
// A list of commit comments made by this user.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// followers (FollowerConnection!)
// A list of users the given user is followed by.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// following (FollowingConnection!)
// A list of users the given user is following.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// gistComments (GistCommentConnection!)
// A list of gist comments made by this user.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// gists (GistConnection!)
// A list of the Gists the user has created.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// orderBy	GistOrder	
// Ordering options for gists returned from the connection

// privacy	GistPrivacy	
// Filters Gists according to privacy.

// issueComments (IssueCommentConnection!)
// A list of issue comments made by this user.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// issues (IssueConnection!)
// A list of issues associated with this user.

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

// organizations (OrganizationConnection!)
// A list of organizations the user belongs to.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// pinnedRepositories (RepositoryConnection!)
// A list of repositories this user has pinned to their profile

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

// publicKeys (PublicKeyConnection!)
// A list of public keys associated with this user.

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
// A list of pull requests associated with this user.

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

// repositories (RepositoryConnection!)
// A list of repositories that the user owns.

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

// isFork	Boolean	
// If non-null, filters repositories according to whether they are forks of another repository

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

// repositoriesContributedTo (RepositoryConnection!)
// A list of repositories that the user recently contributed to.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// contributionTypes	[RepositoryContributionType]	
// If non-null, include only the specified types of contributions. The GitHub.com UI uses [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]

// first	Int	
// Returns the first n elements from the list.

// includeUserRepositories	Boolean	
// If true, include user repositories

// isLocked	Boolean	
// If non-null, filters repositories according to whether they have been locked

// last	Int	
// Returns the last n elements from the list.

// orderBy	RepositoryOrder	
// Ordering options for repositories returned from the connection

// privacy	RepositoryPrivacy	
// If non-null, filters repositories according to privacy

// starredRepositories (StarredRepositoryConnection!)
// Repositories the user has starred.

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

// ownedByViewer	Boolean	
// Filters starred repositories to only return repositories owned by the viewer.

// watching (RepositoryConnection!)
// A list of repositories the given user is watching.

// Argument	Type	Description
// affiliations	[RepositoryAffiliation]	
// Affiliation options for repositories returned from the connection

// The default value is ["OWNER", "COLLABORATOR", "ORGANIZATION_MEMBER"].

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

// Fields
// avatarUrl (URI!)
// A URL pointing to the user's public avatar.

// Argument	Type	Description
// size	Int	
// The size of the resulting square image.

// bio (String)
// The user's public profile bio.

// bioHTML (HTML!)
// The user's public profile bio as HTML.

// company (String)
// The user's public profile company.

// companyHTML (HTML!)
// The user's public profile company as HTML.

// contributionsCollection (ContributionsCollection!)
// The collection of contributions this user has made to different repositories.

// Argument	Type	Description
// from	DateTime	
// Only contributions made at this time or later will be counted. If omitted, defaults to a year ago.

// organizationID	ID	
// The ID of the organization used to filter contributions.

// to	DateTime	
// Only contributions made before and up to and including this time will be counted. If omitted, defaults to the current time.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// databaseId (Int)
// Identifies the primary key from the database.

// email (String!)
// The user's publicly visible profile email.

// gist (Gist)
// Find gist by repo name.

// Argument	Type	Description
// name	String!	
// The gist name to find.

// hovercard (Hovercard!)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Hovercards preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// The hovercard information for this user in a given context

// Argument	Type	Description
// primarySubjectId	ID	
// The ID of the subject to get the hovercard in the context of

// id (ID!)
// isBountyHunter (Boolean!)
// Whether or not this user is a participant in the GitHub Security Bug Bounty.

// isCampusExpert (Boolean!)
// Whether or not this user is a participant in the GitHub Campus Experts Program.

// isDeveloperProgramMember (Boolean!)
// Whether or not this user is a GitHub Developer Program member.

// isEmployee (Boolean!)
// Whether or not this user is a GitHub employee.

// isHireable (Boolean!)
// Whether or not the user has marked themselves as for hire.

// isSiteAdmin (Boolean!)
// Whether or not this user is a site administrator.

// isViewer (Boolean!)
// Whether or not this user is the viewing user.

// location (String)
// The user's public profile location.

// login (String!)
// The username used to login.

// name (String)
// The user's public profile name.

// organization (Organization)
// Find an organization by its login that the user belongs to.

// Argument	Type	Description
// login	String!	
// The login of the organization to find.

// repository (Repository)
// Find Repository.

// Argument	Type	Description
// name	String!	
// Name of Repository to find.

// resourcePath (URI!)
// The HTTP path for this user

// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.

// url (URI!)
// The HTTP URL for this user

// viewerCanFollow (Boolean!)
// Whether or not the viewer is able to follow the user.

// viewerIsFollowing (Boolean!)
// Whether or not this user is followed by the viewer.

// websiteUrl (URI)
// A URL pointing to the user's public website/blog.





// A user is an individual's account on GitHub that owns repositories and can make new content.
export class User implements Actor, Node, RegistryPackageOwner, RegistryPackageSearch, RepositoryOwner, UniformResourceLocatable {

    // Connections

    // commitComments (CommitCommentConnection!)
    // A list of commit comments made by this user.
    // 
    // Argument	        Type	        Description
    // after	        String	        Returns the elements in the list that come after the specified cursor.
    // before	        String	        Returns the elements in the list that come before the specified cursor.
    // first	        Int	            Returns the first n elements from the list.
    // last	            Int	            Returns the last n elements from the list.

    // followers (FollowerConnection!)
    // A list of users the given user is followed by.
    // 
    // Argument	        Type	        Description
    // after	        String	        Returns the elements in the list that come after the specified cursor.
    // before	        String	        Returns the elements in the list that come before the specified cursor.
    // first	        Int	            Returns the first n elements from the list.
    // last	            Int	            Returns the last n elements from the list.

    // following (FollowingConnection!)
    // A list of users the given user is following.
    // 
    // Argument	        Type	        Description
    // after	        String	        Returns the elements in the list that come after the specified cursor.
    // before	        String	        Returns the elements in the list that come before the specified cursor.
    // first	        Int	            Returns the first n elements from the list.
    // last	            Int	            Returns the last n elements from the list.

    // gistComments (GistCommentConnection!)
    // A list of gist comments made by this user.
    //
    // Argument	        Type	        Description
    // after	        String	        Returns the elements in the list that come after the specified cursor.
    // before	        String	    	Returns the elements in the list that come before the specified cursor.
    // first	        Int	            Returns the first n elements from the list.
    // last	            Int	            Returns the last n elements from the list.

    // gists (GistConnection!)
    // A list of the Gists the user has created.
    //
    // Argument	        Type	        Description
    // after	        String	        Returns the elements in the list that come after the specified cursor.
    // before	        String          Returns the elements in the list that come before the specified cursor.
    // first	        Int	            Returns the first n elements from the list.
    // last	            Int             Returns the last n elements from the list.
    // orderBy	        GistOrder	    Ordering options for gists returned from the connection
    // privacy	        GistPrivacy	    Filters Gists according to privacy.

    // issueComments (IssueCommentConnection!)
    // A list of issue comments made by this user.
    // 
    // Argument	        Type	        Description
    // after	        String	        Returns the elements in the list that come after the specified cursor.
    // before	        String	        Returns the elements in the list that come before the specified cursor.
    // first	        Int	            Returns the first n elements from the list.
    // last	            Int	            Returns the last n elements from the list.

    // issues (IssueConnection!)
    // A list of issues associated with this user.
    //
    // Argument	        Type	        Description
    // after	        String	        Returns the elements in the list that come after the specified cursor.
    // before	        String	        Returns the elements in the list that come before the specified cursor.
    // filterBy	        IssueFilters	Filtering options for issues returned from the connection.
    // first	        Int	            Returns the first n elements from the list.
    // labels	        [String!]	    A list of label names to filter the pull requests by.
    // last	            Int	            Returns the last n elements from the list.
    // orderBy	        IssueOrder      Ordering options for issues returned from the connection.
    // states	        [IssueState!]	A list of states to filter the issues by.

    // organizations (OrganizationConnection!)
    // A list of organizations the user belongs to.
    //
    // Argument	        Type	        Description
    // after	        String	        Returns the elements in the list that come after the specified cursor.
    // before	        String	        Returns the elements in the list that come before the specified cursor.
    // first	        Int	            Returns the first n elements from the list.
    // last	            Int	            Returns the last n elements from the list.

    // pinnedRepositories (RepositoryConnection!)
    // A list of repositories this user has pinned to their profile
    //
    // Argument	        Type	        Description
    // affiliations	[RepositoryAffiliation]	Array of viewer's affiliation options for repositories returned from the connection. For example, OWNER will include only repositories that the current viewer owns.
    // The default value is ["OWNER", "COLLABORATOR"].
    // after	        String	        Returns the elements in the list that come after the specified cursor.
    // before	        String          Returns the elements in the list that come before the specified cursor.
    // first	        Int	            Returns the first n elements from the list.
    // isLocked	        Boolean         If non-null, filters repositories according to whether they have been locked
    // last	            Int	            Returns the last n elements from the list.
    // orderBy	        RepositoryOrder	Ordering options for repositories returned from the connection
    // ownerAffiliations  [RepositoryAffiliation]	Array of owner's affiliation options for repositories returned from the connection. For example, OWNER will include only repositories that the organization or user being viewed owns.
    // The default value is ["OWNER", "COLLABORATOR"].

    // privacy	        RepositoryPrivacy	    If non-null, filters repositories according to privacy

    // publicKeys (PublicKeyConnection!)
    // A list of public keys associated with this user.
    //
    // Argument	        Type	        Description
    // after	        String	        Returns the elements in the list that come after the specified cursor.
    // before	        String	        Returns the elements in the list that come before the specified cursor.
    // first	        Int	            Returns the first n elements from the list.
    // last	            Int             Returns the last n elements from the list.

    // pullRequests (PullRequestConnection!)
    // A list of pull requests associated with this user.
    //
    // Argument	        Type	        Description
    // after	        String	        Returns the elements in the list that come after the specified cursor.
    // baseRefName	    String	        The base ref name to filter the pull requests by.
    // before	        String	        Returns the elements in the list that come before the specified cursor.
    // first	        Int	            Returns the first n elements from the list.
    // headRefName	    String	        The head ref name to filter the pull requests by.
    // labels	        [String!]       A list of label names to filter the pull requests by.
    // last	            Int	            Returns the last n elements from the list.
    // orderBy	        IssueOrder	    Ordering options for pull requests returned from the connection.
    // states	        [PullRequestState!]	    A list of states to filter the pull requests by.

    // repositories (RepositoryConnection!)
    // A list of repositories that the user owns.
    ///
    // Argument	        Type	        Description
    // affiliations	    [RepositoryAffiliation]         Array of viewer's affiliation options for repositories returned from the connection. For example, OWNER will include only repositories that the current viewer owns.
    // The default value is ["OWNER", "COLLABORATOR"].
    // after	        String	        Returns the elements in the list that come after the specified cursor.
    // before	        String	        Returns the elements in the list that come before the specified cursor.
    // first	        Int	            Returns the first n elements from the list.
    // isFork	        Boolean         If non-null, filters repositories according to whether they are forks of another repository
    // isLocked	        Boolean	        If non-null, filters repositories according to whether they have been locked
    // last	            Int	            Returns the last n elements from the list.
    // orderBy	        RepositoryOrder	Ordering options for repositories returned from the connection

    // ownerAffiliations   [RepositoryAffiliation]	Array of owner's affiliation options for repositories returned from the connection. For example, OWNER will include only repositories that the organization or user being viewed owns.

    // The default value is ["OWNER", "COLLABORATOR"].

    // privacy	        RepositoryPrivacy   If non-null, filters repositories according to privacy

    // repositoriesContributedTo (RepositoryConnection!)
    // A list of repositories that the user recently contributed to.

    // Argument	        Type	        Description
    // after	        String	        Returns the elements in the list that come after the specified cursor.
    // before	        String	        Returns the elements in the list that come before the specified cursor.
    // contributionTypes	[RepositoryContributionType]    If non-null, include only the specified types of contributions. The GitHub.com UI uses [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]
    // first	        Int	            Returns the first n elements from the list.

    // includeUserRepositories	    Boolean	            If true, include user repositories
    // isLocked	                    Boolean	            If non-null, filters repositories according to whether they have been locked
    // last	                        Int	                Returns the last n elements from the list.
    // orderBy	                    RepositoryOrder	    Ordering options for repositories returned from the connection
    // privacy	                    RepositoryPrivacy   If non-null, filters repositories according to privacy

    // starredRepositories (StarredRepositoryConnection!)
    // Repositories the user has starred.
    // 
    // Argument	        Type	    Description
    // after	        String	    Returns the elements in the list that come after the specified cursor.
    // before	        String	    Returns the elements in the list that come before the specified cursor.
    // first	        Int	        Returns the first n elements from the list.
    // last	            Int	        Returns the last n elements from the list.
    // orderBy	        StarOrder   Order for connection
    // ownedByViewer	Boolean	    Filters starred repositories to only return repositories owned by the viewer.

    // watching (RepositoryConnection!)
    // A list of repositories the given user is watching.

    // Argument	        Type	    Description
    // affiliations	    [RepositoryAffiliation]	    Affiliation options for repositories returned from the connection
    // The default value is ["OWNER", "COLLABORATOR", "ORGANIZATION_MEMBER"].
    // after            String	    Returns the elements in the list that come after the specified cursor.
    // before	        String      Returns the elements in the list that come before the specified cursor.
    // first	        Int	        Returns the first n elements from the list.
    // isLocked	        Boolean	    If non-null, filters repositories according to whether they have been locked
    // last	            Int	        Returns the last n elements from the list.
    // orderBy	        RepositoryOrder	    Ordering options for repositories returned from the connection
    // ownerAffiliations	[RepositoryAffiliation]	    Array of owner's affiliation options for repositories returned from the connection. For example, OWNER will include only repositories that the organization or user being viewed owns.
    // The default value is ["OWNER", "COLLABORATOR"].
    // privacy	        RepositoryPrivacy	    If non-null, filters repositories according to privacy

    // 
    // Fields
    // 

    // A URL pointing to the user's public avatar.
    avatarUrl: URL

    // Argument	Type	Description
    // size	Int	
    // The size of the resulting square image.

    // The user's public profile bio.
    bio: string

    // The user's public profile bio as HTML.
    bioHTML: HTMLString

    // The user's public profile company.
    company: string

    // The user's public profile company as HTML.
    companyHTML: HTMLString

    // The collection of contributions this user has made to different repositories.
    contributionsCollection: ContributionsCollection

    // Argument	Type	Description
    // from	DateTime	
    // Only contributions made at this time or later will be counted. If omitted, defaults to a year ago.

    // The ID of the organization used to filter contributions.
    organizationID: ID	

    // Only contributions made before and up to and including this time will be counted. If omitted, defaults to the current time.
    to: Date	

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the primary key from the database.
    databaseId: number

    // The user's publicly visible profile email.
    email: string

    // Find gist by repo name.
    gist: Gist

    // Argument	Type	Description
    // The gist name to find.
    name: string	

    // The hovercard information for this user in a given context
    hovercard: Hovercard

    // Argument	Type	Description
    // primarySubjectId	ID	
    // The ID of the subject to get the hovercard in the context of

    id: ID

    // Whether or not this user is a participant in the GitHub Security Bug Bounty.
    isBountyHunter: boolean

    // Whether or not this user is a participant in the GitHub Campus Experts Program.
    isCampusExpert: boolean

    // Whether or not this user is a GitHub Developer Program member.
    isDeveloperProgramMember: boolean

    // Whether or not this user is a GitHub employee.
    isEmployee: boolean

    // Whether or not the user has marked themselves as for hire.
    isHireable: boolean

    // Whether or not this user is a site administrator.
    isSiteAdmin: boolean

    // Whether or not this user is the viewing user.
    isViewer: boolean

    // The user's public profile location.
    location: string

    // The username used to login.
    login: string

    // The user's public profile name.
    // name: string

    // Find an organization by its login that the user belongs to.
    organization: Organization

    // Argument	        Type	    Description
    // login	        String!	    The login of the organization to find.

    // Find Repository.
    repository: Repository

    // Argument	        Type	    Description
    // name	            String!	    Name of Repository to find.

    // The HTTP path for this user
    resourcePath: URL

    // Identifies the date and time when the object was last updated.
    updatedAt: Date

    // The HTTP URL for this user
    url: URL

    // Whether or not the viewer is able to follow the user.
    viewerCanFollow: boolean

    // Whether or not this user is followed by the viewer.
    viewerIsFollowing: boolean

    // A URL pointing to the user's public website/blog.
    websiteUrl: URL
}
