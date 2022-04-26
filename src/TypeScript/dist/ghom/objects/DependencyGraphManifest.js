"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyGraphManifest = void 0;
// DependencyGraphManifest
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Access to a Repositories Dependency Graph preview for more details.
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// Dependency manifest for a repository
// Implements
// Node
// Connections
// dependencies (DependencyGraphDependencyConnection)
// A list of manifest dependencies
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
// blobPath (String!)
// Path to view the manifest file blob
// dependenciesCount (Int)
// The number of dependencies listed in the manifest
// exceedsMaxSize (Boolean!)
// Is the manifest too big to parse?
// filename (String!)
// Fully qualified manifest filename
// id (ID!)
// parseable (Boolean!)
// Were we able to parse the manifest?
// repository (Repository!)
// The repository containing the manifest
// Dependency manifest for a repository
class DependencyGraphManifest {
}
exports.DependencyGraphManifest = DependencyGraphManifest;
