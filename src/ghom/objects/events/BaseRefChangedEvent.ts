import { Actor } from "../../interfaces/Actor";

// BaseRefChangedEvent
// Represents a 'base_ref_changed' event on a given issue or pull request.

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


// Represents a 'base_ref_changed' event on a given issue or pull request.
export interface BaseRefChangedEvent extends Node {
    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the primary key from the database.
    databaseId: number
}