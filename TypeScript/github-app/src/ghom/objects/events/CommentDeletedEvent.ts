import { Actor } from "../../interfaces/Actor";
import { Node } from "../../interfaces/Node";

// CommentDeletedEvent
// Represents a 'comment_deleted' event on a given issue or pull request.

// Implements
// Node
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// databaseId (Int)
// Identifies the primary key from the database.

// id (ID!)




// Represents a 'comment_deleted' event on a given issue or pull request.
export interface CommentDeletedEvent extends Node {

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the primary key from the database.
    databaseId: number
}