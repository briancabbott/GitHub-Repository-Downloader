import { ID } from "../scalars/Id";
import { GitObject } from "../interfaces/GitObject";
import { Node } from "../interfaces/Node";
import { GitObjectID } from "../scalars/GitObjectID";
import { Repository } from "../../model";

// Blob
// Represents a Git blob.

// Implements
// GitObject
// Node
// Fields
// abbreviatedOid (String!)
// An abbreviated version of the Git object ID

// byteSize (Int!)
// Byte size of Blob object

// commitResourcePath (URI!)
// The HTTP path for this Git object

// commitUrl (URI!)
// The HTTP URL for this Git object

// id (ID!)
// isBinary (Boolean!)
// Indicates whether the Blob is binary or text

// isTruncated (Boolean!)
// Indicates whether the contents is truncated

// oid (GitObjectID!)
// The Git object ID

// repository (Repository!)
// The Repository the Git object belongs to

// text (String)
// UTF8 text data or null if the Blob is binary



// Represents a Git blob.
export class Blob implements GitObject, Node {
    // An abbreviated version of the Git object ID
    abbreviatedOid: string

    // Byte size of Blob object
    byteSize: number

    // The HTTP path for this Git object
    commitResourcePath: URL

    // The HTTP URL for this Git object
    commitUrl: URL

    id: ID

    // Indicates whether the Blob is binary or text
    isBinary: boolean

    // Indicates whether the contents is truncated
    isTruncated: boolean

    // The Git object ID
    oid: GitObjectID

    // The Repository the Git object belongs to
    repository: Repository

    // UTF8 text data or null if the Blob is binary
    text: string

}