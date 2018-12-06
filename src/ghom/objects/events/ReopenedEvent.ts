import { Actor } from "../../interfaces/Actor";

// ReopenedEvent
// Represents a 'reopened' event on any Closable.

// Implements
// Node
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// closable (Closable!)
// Object that was reopened.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// id (ID!)


// Represents a 'reopened' event on any Closable.
export interface ReopenedEvent extends Node {

    // Identifies the actor who performed the event.
    actor: Actor

    // Object that was reopened.
    closable: Closable

    // Identifies the date and time when the object was created.
    createdAt: Date
}