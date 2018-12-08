import { Actor } from "../interfaces/Actor";
import { Node } from "../interfaces/Node";
import { ProjectOwner } from "../interfaces/ProjectOwner";
import { RegistryPackageOwner } from "../interfaces/RegistryPackageOwner";
import { RegistryPackageSearch } from "../interfaces/RegistryPackageSearch";
import { RepositoryOwner } from "../interfaces/RepositoryOwner";
import { UniformResourceLocatable } from "../interfaces/UniformResourceLocatable";
import { ID } from "../scalars/Id";
import { Repository } from "../../model";
import { Project } from "./Project";
import { OrganizationIdentityProvider } from "./OrganizationIdentityProvider";

// Organization
// An account on GitHub, with one or more owners, that has repositories, members and teams.

// Implements
// Actor
// Node
// ProjectOwner
// RegistryPackageOwner
// RegistryPackageSearch
// RepositoryOwner
// UniformResourceLocatable
// Connections
// members (UserConnection!)
// A list of users who are members of this organization.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// membersWithRole (OrganizationMemberConnection!)
// A list of users who are members of this organization.

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

// teams (TeamConnection!)
// A list of teams in this organization.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// ldapMapped	Boolean	
// If true, filters teams that are mapped to an LDAP Group (Enterprise only)

// orderBy	TeamOrder	
// Ordering options for teams returned from the connection

// privacy	TeamPrivacy	
// If non-null, filters teams according to privacy

// query	String	
// If non-null, filters teams with query on team name and team slug

// role	TeamRole	
// If non-null, filters teams according to whether the viewer is an admin or member on team

// rootTeamsOnly	Boolean	
// If true, restrict to only root teams

// The default value is false.

// userLogins	[String!]	
// User logins to filter by

// Fields
// avatarUrl (URI!)
// A URL pointing to the organization's public avatar.

// Argument	Type	Description
// size	Int	
// The size of the resulting square image.

// databaseId (Int)
// Identifies the primary key from the database.

// description (String)
// The organization's public profile description.

// email (String)
// The organization's public email.

// id (ID!)
// isVerified (Boolean!)
// Whether the organization has verified its profile email and website.

// location (String)
// The organization's public profile location.

// login (String!)
// The organization's login name.

// name (String)
// The organization's public profile name.

// newTeamResourcePath (URI!)
// The HTTP path creating a new team

// newTeamUrl (URI!)
// The HTTP URL creating a new team

// organizationBillingEmail (String)
// The billing email for the organization.

// project (Project)
// Find project by number.

// Argument	Type	Description
// number	Int!	
// The project number to find.

// projectsResourcePath (URI!)
// The HTTP path listing organization's projects

// projectsUrl (URI!)
// The HTTP URL listing organization's projects

// repository (Repository)
// Find Repository.

// Argument	Type	Description
// name	String!	
// Name of Repository to find.

// requiresTwoFactorAuthentication (Boolean)
// When true the organization requires all members, billing managers, and outside collaborators to enable two-factor authentication.

// resourcePath (URI!)
// The HTTP path for this organization.

// samlIdentityProvider (OrganizationIdentityProvider)
// The Organization's SAML Identity Providers

// team (Team)
// Find an organization's team by its slug.

// Argument	Type	Description
// slug	String!	
// The name or slug of the team to find.

// teamsResourcePath (URI!)
// The HTTP path listing organization's teams

// teamsUrl (URI!)
// The HTTP URL listing organization's teams

// url (URI!)
// The HTTP URL for this organization.

// viewerCanAdminister (Boolean!)
// Organization is adminable by the viewer.

// viewerCanCreateProjects (Boolean!)
// Can the current viewer create new projects on this owner.

// viewerCanCreateRepositories (Boolean!)
// Viewer can create repositories on this organization

// viewerCanCreateTeams (Boolean!)
// Viewer can create teams on this organization.

// viewerIsAMember (Boolean!)
// Viewer is an active member of this organization.

// websiteUrl (URI)
// The organization's public profile URL.






// An account on GitHub, with one or more owners, that has repositories, members and teams.
export class Organization implements Actor, Node, ProjectOwner, RegistryPackageOwner, RegistryPackageSearch, RepositoryOwner, UniformResourceLocatable {


// Connections

// members (UserConnection!)
// A list of users who are members of this organization.

// Argument	Type	Description
// after	String	 Returns the elements in the list that come after the specified cursor.
// before	String	Returns the elements in the list that come before the specified cursor.
// first	Int	Returns the first n elements from the list.
// last	Int	Returns the last n elements from the list.

// membersWithRole (OrganizationMemberConnection!)
// A list of users who are members of this organization.

// Argument	Type	Description
// after	String	Returns the elements in the list that come after the specified cursor.

// before	String	Returns the elements in the list that come before the specified cursor.

// first	Int	Returns the first n elements from the list.

// last	Int	 Returns the last n elements from the list.

// pinnedRepositories (RepositoryConnection!)
// A list of repositories this user has pinned to their profile

// Argument	Type	Description
// affiliations	[RepositoryAffiliation]	Array of viewer's affiliation options for repositories returned from the connection. For example, OWNER will include only repositories that the current viewer owns.
// The default value is ["OWNER", "COLLABORATOR"].

// after	String	Returns the elements in the list that come after the specified cursor.

// before	String	Returns the elements in the list that come before the specified cursor.

// first	Int	Returns the first n elements from the list.

// isLocked	Boolean	If non-null, filters repositories according to whether they have been locked

// last	Int	Returns the last n elements from the list.

// orderBy	RepositoryOrder	Ordering options for repositories returned from the connection

// ownerAffiliations	[RepositoryAffiliation]	Array of owner's affiliation options for repositories returned from the connection. For example, OWNER will include only repositories that the organization or user being viewed owns.

// The default value is ["OWNER", "COLLABORATOR"].

// privacy	RepositoryPrivacy	If non-null, filters repositories according to privacy
 
// projects (ProjectConnection!)  A list of projects under the owner.

// Argument	Type	Description
// after	String	Returns the elements in the list that come after the specified cursor.

// before	String	Returns the elements in the list that come before the specified cursor.

// first	Int	Returns the first n elements from the list.

// last	Int	Returns the last n elements from the list.

// orderBy	ProjectOrder	Ordering options for projects returned from the connection

// search	String	Query to search projects by, currently only searching by name.

// states	[ProjectState!]	A list of states to filter the projects by.

// repositories (RepositoryConnection!)   A list of repositories that the user owns.

// Argument	Type	Description
// affiliations	[RepositoryAffiliation]	 Array of viewer's affiliation options for repositories returned from the connection. For example, OWNER will include only repositories that the current viewer owns.
// The default value is ["OWNER", "COLLABORATOR"].

// after	String	 Returns the elements in the list that come after the specified cursor.

// before	String	Returns the elements in the list that come before the specified cursor.

// first	Int	 Returns the first n elements from the list.

// isFork	Boolean	If non-null, filters repositories according to whether they are forks of another repository

// isLocked	Boolean	If non-null, filters repositories according to whether they have been locked

// last	Int	Returns the last n elements from the list.

// orderBy	RepositoryOrder	Ordering options for repositories returned from the connection

// ownerAffiliations	[RepositoryAffiliation]	Array of owner's affiliation options for repositories returned from the connection. For example, OWNER will include only repositories that the organization or user being viewed owns.
// The default value is ["OWNER", "COLLABORATOR"].

// privacy	RepositoryPrivacy	If non-null, filters repositories according to privacy

// teams (TeamConnection!)
// A list of teams in this organization.
//
// Argument	Type	Description
// after	String	Returns the elements in the list that come after the specified cursor.

// before	String	Returns the elements in the list that come before the specified cursor.

// first	Int	Returns the first n elements from the list.

// last	Int	Returns the last n elements from the list.

// ldapMapped	Boolean	If true, filters teams that are mapped to an LDAP Group (Enterprise only)

// orderBy	TeamOrder	Ordering options for teams returned from the connection

// privacy	TeamPrivacy	If non-null, filters teams according to privacy

// query	String	If non-null, filters teams with query on team name and team slug

// role	TeamRole	If non-null, filters teams according to whether the viewer is an admin or member on team

// rootTeamsOnly	Boolean	If true, restrict to only root teams

// The default value is false.

// userLogins	[String!]	User logins to filter by

// 
// Fields
//

    // A URL pointing to the organization's public avatar.
    avatarUrl: URL

    // Argument	Type	Description
    // size	Int	
    // The size of the resulting square image.

    // Identifies the primary key from the database.
    databaseId: number

    // The organization's public profile description.
    description: string

    // The organization's public email.
    email: string

    id: ID

    // Whether the organization has verified its profile email and website.
    isVerified: boolean

    // The organization's public profile location.
    location: string

    // The organization's login name.
    login: string

    // The organization's public profile name.
    name: string

    // The HTTP path creating a new team
    newTeamResourcePath: URL

    // The HTTP URL creating a new team
    newTeamUrl: URL

    // The billing email for the organization.
    organizationBillingEmail: string

    // Find project by number.
    project: Project

    // Argument	Type	Description
    // number	Int!	
    // The project number to find.

    // The HTTP path listing organization's projects
    projectsResourcePath: URL

    // The HTTP URL listing organization's projects
    projectsUrl: URL

    // Find Repository.
    repository: Repository

    // Argument	Type	Description
    // name	String!	
    // Name of Repository to find.

    // When true the organization requires all members, billing managers, and outside collaborators to enable two-factor authentication.
    requiresTwoFactorAuthentication: boolean

    // The HTTP path for this organization.
    resourcePath: URL

    // The Organization's SAML Identity Providers
    samlIdentityProvider: OrganizationIdentityProvider

    // Find an organization's team by its slug.
    team: Team

    // Argument	Type	Description
    // slug	String!	
    // The name or slug of the team to find.

    // The HTTP path listing organization's teams
    teamsResourcePath: URL

    // The HTTP URL listing organization's teams
    teamsUrl: URL

    // The HTTP URL for this organization.
    url: URL

    // Organization is adminable by the viewer.
    viewerCanAdminister: boolean

    // Can the current viewer create new projects on this owner.
    viewerCanCreateProjects: boolean

    // Viewer can create repositories on this organization
    viewerCanCreateRepositories: boolean

    // Viewer can create teams on this organization.
    viewerCanCreateTeams: boolean

    // Viewer is an active member of this organization.
    viewerIsAMember: boolean

    // The organization's public profile URL.
    websiteUrl: URL
}