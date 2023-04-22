import { ID } from "../scalars/Id";
import { Node } from "../interfaces/Node";

// PublicKey
// A user's public key.

// Implements
// Node
// Fields
// id (ID!)
// key (String!)
// The public key string


// A user's public key.
export class PublicKey implements Node {

    // 
    // Fields
    // 

    id: ID

    // The public key string
    key: string
}
