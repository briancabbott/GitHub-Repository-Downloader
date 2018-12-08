import { ID } from "../scalars/Id";
import { Node } from "../interfaces/Node";

// DeployKey
// A repository deploy key.

// Implements
// Node
// Fields
// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// id (ID!)
// key (String!)
// The deploy key.

// readOnly (Boolean!)
// Whether or not the deploy key is read only.

// title (String!)
// The deploy key title.

// verified (Boolean!)
// Whether or not the deploy key has been verified.


// A repository deploy key.
export class DeployKey implements Node {
    // Identifies the date and time when the object was created.
    createdAt: Date
    
    id: ID
    
    // The deploy key.
    key: string
    
    // Whether or not the deploy key is read only.
    readOnly: boolean
    
    // The deploy key title.
    title: string
    
    // Whether or not the deploy key has been verified.
    verified: boolean
}