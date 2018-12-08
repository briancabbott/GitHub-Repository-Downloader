import { ID } from "../scalars/Id";
import { Repository } from "../../model";
import { Node } from "../interfaces/Node";

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
export class DependencyGraphManifest implements Node {

    // A list of manifest dependencies
    // dependencies (DependencyGraphDependencyConnection)
    
    // Argument	    Type	    Description
    // after	    String      Returns the elements in the list that come after the specified cursor.
    // before	    String      Returns the elements in the list that come before the specified cursor.
    // first	    Int	        Returns the first n elements from the list.
    // last	        Int         Returns the last n elements from the list.

    // Path to view the manifest file blob
    blobPath: string

    // The number of dependencies listed in the manifest
    dependenciesCount: number

    // Is the manifest too big to parse?
    exceedsMaxSize: boolean

    // Fully qualified manifest filename
    filename: string

    id: ID

    // Were we able to parse the manifest?
    parseable: boolean

    // The repository containing the manifest
    repository: Repository
}