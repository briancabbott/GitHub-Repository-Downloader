import { Node } from "../interfaces/Node";
import { ID } from "../scalars/Id";
import { Release } from "./Release";
import { User } from "./User";

// ReleaseAsset
// A release asset contains the content for a release asset.

// Implements
// Node
// Fields
// contentType (String!)
// The asset's content-type

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// downloadCount (Int!)
// The number of times this asset was downloaded

// downloadUrl (URI!)
// Identifies the URL where you can download the release asset via the browser.

// id (ID!)
// name (String!)
// Identifies the title of the release asset.

// release (Release)
// Release that the asset is associated with

// size (Int!)
// The size (in bytes) of the asset

// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.

// uploadedBy (User!)
// The user that performed the upload

// url (URI!)
// Identifies the URL of the release asset.





// A release asset contains the content for a release asset.
export class ReleaseAsset implements Node {

    // 
    // Fields
    // 

    // The asset's content-type
    contentType: string

    // Identifies the date and time when the object was created.
    createdAt: Date

    // The number of times this asset was downloaded
    downloadCount: number

    // Identifies the URL where you can download the release asset via the browser.
    downloadUrl: URL

    id: ID

    // Identifies the title of the release asset.
    name: string

    // Release that the asset is associated with
    release: Release

    // The size (in bytes) of the asset
    size: number

    // Identifies the date and time when the object was last updated.
    updatedAt: Date

    // The user that performed the upload
    uploadedBy: User

    // Identifies the URL of the release asset.
    url: URL
}