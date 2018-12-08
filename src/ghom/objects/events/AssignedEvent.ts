import { Actor } from "../../interfaces/Actor";
import { Assignable } from "../../interfaces/Assignable";
import { User } from "../User";
import { Node } from "../../interfaces/Node";

// AssignedEvent
// Represents an 'assigned' event on any assignable object.

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
// Identifies the user who was assigned.



export interface AssignedEvent extends Node { 

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the assignable associated with the event.
    assignable: Assignable

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the user who was assigned.
    user: User
}