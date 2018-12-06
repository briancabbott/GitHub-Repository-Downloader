import { Actor } from "../../interfaces/Actor";

// UnassignedEvent
// Represents an 'unassigned' event on any assignable object.

// Implements
// Node
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// assignable (Assignable!)
// Identifies the assignable associated with the event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// id (ID!)
// user (User)
// Identifies the subject (user) who was unassigned.



// Represents an 'unassigned' event on any assignable object.
export interface UnassignedEvent extends Node {

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the assignable associated with the event.
    assignable: Assignable

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the subject (user) who was unassigned.
    user: User
}