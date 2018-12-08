import { Node } from "../interfaces/Node";
import { ReactionContent } from "../enums/ReactionContent";
import { ID } from "../scalars/Id";
import { Reactable } from "../interfaces/Reactable";
import { User } from "./User";

// Reaction
// An emoji reaction to a particular piece of content.

// Implements
// Node
// Fields
// content (ReactionContent!)
// Identifies the emoji reaction.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// databaseId (Int)
// Identifies the primary key from the database.

// id (ID!)
// reactable (Reactable!)
// The reactable piece of content

// user (User)
// Identifies the user who created this reaction.




// An emoji reaction to a particular piece of content.
export class Reaction implements Node {
    
    // Fields
    
    // Identifies the emoji reaction.
    content: ReactionContent

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the primary key from the database.
    databaseId: number

    id: ID

    // The reactable piece of content
    reactable: Reactable

    // Identifies the user who created this reaction.
    user: User
}