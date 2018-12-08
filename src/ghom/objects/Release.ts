import { Node } from "../interfaces/Node";
import { UniformResourceLocatable } from "../interfaces/UniformResourceLocatable";
import { User } from "./User";
import { ID } from "../scalars/Id";
import { Ref } from "./Ref";

// Release
// A release contains the content for a release.

// Implements
// Node
// UniformResourceLocatable
// Connections
// releaseAssets (ReleaseAssetConnection!)
// List of releases assets which are dependent on this release.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// name	String	
// A list of names to filter the assets by.

// Fields
// author (User)
// The author of the release

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// description (String)
// Identifies the description of the release.

// id (ID!)
// isDraft (Boolean!)
// Whether or not the release is a draft

// isPrerelease (Boolean!)
// Whether or not the release is a prerelease

// name (String)
// Identifies the title of the release.

// publishedAt (DateTime)
// Identifies the date and time when the release was created.

// resourcePath (URI!)
// The HTTP path for this issue

// tag (Ref)
// The Git tag the release points to

// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.

// url (URI!)
// The HTTP URL for this issue






// A release contains the content for a release.
export class Release implements Node, UniformResourceLocatable {

    // Connections
    
    // releaseAssets (ReleaseAssetConnection!)
    // List of releases assets which are dependent on this release.

    // Argument	Type	Description
    // after	String	
    // Returns the elements in the list that come after the specified cursor.

    // before	String	
    // Returns the elements in the list that come before the specified cursor.

    // first	Int	
    // Returns the first n elements from the list.

    // last	Int	
    // Returns the last n elements from the list.

    // name	String	
    // A list of names to filter the assets by.

    // 
    // Fields
    //

    // The author of the release
    author: User

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the description of the release.
    description: string

    id: ID

    // Whether or not the release is a draft
    isDraft: boolean

    // Whether or not the release is a prerelease
    isPrerelease: boolean

    // Identifies the title of the release.
    name: string

    // Identifies the date and time when the release was created.
    publishedAt: Date

    // The HTTP path for this issue
    resourcePath: URL

    // The Git tag the release points to
    tag: Ref

    // Identifies the date and time when the object was last updated.
    updatedAt: Date

    // The HTTP URL for this issue
    url: URL
}
