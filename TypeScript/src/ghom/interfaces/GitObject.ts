import { ID } from "../scalars/Id";
import { Repository } from "../../model";
import { GitObjectID } from "../scalars/GitObjectID";


// GitObject
// Represents a Git object.

// Implemented by
// Blob
// Commit
// Tag
// Tree
// 
// Fields
// abbreviatedOid (String!)
// An abbreviated version of the Git object ID

// commitResourcePath (URI!)
// The HTTP path for this Git object

// commitUrl (URI!)
// The HTTP URL for this Git object

// id (ID!)
// oid (GitObjectID!)
// The Git object ID

// repository (Repository!)
// The Repository the Git object belongs to


// Represents a Git object.
export interface GitObject {
    // An abbreviated version of the Git object ID
    abbreviatedOid: string

    // The HTTP path for this Git object
    commitResourcePath: URL

    // The HTTP URL for this Git object
    commitUrl: URL

    id: ID

    // The Git object ID
    oid: GitObjectID

    // The Repository the Git object belongs to
    repository: Repository
}