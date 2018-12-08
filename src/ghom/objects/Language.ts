import { ID } from "../scalars/Id";
import { Node } from "../interfaces/Node";

// Language
// Represents a given language found in repositories.

// Implements
// Node
// Fields
// color (String)
// The color defined for the current language.

// id (ID!)
// name (String!)
// The name of the current language.



// Represents a given language found in repositories.
export class Language implements Node {
    id: ID

    //  The color defined for the current language.
    color: string

    // The name of the current language.
    name: string
}
