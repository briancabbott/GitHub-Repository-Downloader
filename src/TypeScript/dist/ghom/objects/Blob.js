"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blob = void 0;
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
class Blob {
}
exports.Blob = Blob;
