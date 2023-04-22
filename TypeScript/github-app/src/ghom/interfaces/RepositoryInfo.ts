import { HTMLString } from "../scalars/HTMLString";
import { License } from "../objects/License";
import { RepositoryLockReason } from "../enums/RepositoryLockReason";
import { RepositoryOwner } from "./RepositoryOwner";

// RepositoryInfo
// A subset of repository info.

// Implemented by
// Repository
// Fields
// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// description (String)
// The description of the repository.

// descriptionHTML (HTML!)
// The description of the repository rendered to HTML.

// forkCount (Int!)
// Returns how many forks there are of this repository in the whole network.

// hasIssuesEnabled (Boolean!)
// Indicates if the repository has issues feature enabled.

// hasWikiEnabled (Boolean!)
// Indicates if the repository has wiki feature enabled.

// homepageUrl (URI)
// The repository's URL.

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

// licenseInfo (License)
// The license associated with the repository

// lockReason (RepositoryLockReason)
// The reason the repository has been locked.

// mirrorUrl (URI)
// The repository's original mirror URL.

// name (String!)
// The name of the repository.

// nameWithOwner (String!)
// The repository's name with owner.

// owner (RepositoryOwner!)
// The User owner of the repository.

// pushedAt (DateTime)
// Identifies when the repository was last pushed to.

// resourcePath (URI!)
// The HTTP path for this repository

// shortDescriptionHTML (HTML!)
// A description of the repository, rendered to HTML without any links in it.

// Argument	Type	Description
// limit	Int	
// How many characters to return.

// The default value is 200.

// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.

// url (URI!)
// The HTTP URL for this repository




// A subset of repository info.
export interface RepositoryInfo {

    // Identifies the date and time when the object was created.
    createdAt: Date

    // The description of the repository.
    description: string

    // The description of the repository rendered to HTML.
    descriptionHTML: HTMLString

    // Returns how many forks there are of this repository in the whole network.
    forkCount: number

    // Indicates if the repository has issues feature enabled.
    hasIssuesEnabled: boolean

    // Indicates if the repository has wiki feature enabled.
    hasWikiEnabled: boolean

    // The repository's URL.
    homepageUrl: URL

    // Indicates if the repository is unmaintained.
    isArchived: boolean

    // Identifies if the repository is a fork.
    isFork: boolean

    // Indicates if the repository has been locked or not.
    isLocked: boolean

    // Identifies if the repository is a mirror.
    isMirror: boolean

    // Identifies if the repository is private.
    isPrivate: boolean

    // The license associated with the repository
    licenseInfo: License

    // The reason the repository has been locked.
    lockReason: RepositoryLockReason

    // The repository's original mirror URL.
    mirrorUrl: URL

    // The name of the repository.
    name: string

    // The repository's name with owner.
    nameWithOwner: string

    // The User owner of the repository.
    owner: RepositoryOwner

    // Identifies when the repository was last pushed to.
    pushedAt: Date

    // The HTTP path for this repository
    resourcePath: URL

    // A description of the repository, rendered to HTML without any links in it.
    shortDescriptionHTML: HTMLString

    // Argument	Type	Description
    // limit	Int	
    // How many characters to return.
    // The default value is 200.

    // Identifies the date and time when the object was last updated.
    updatedAt: Date

    // The HTTP URL for this repository
    url: URL
}