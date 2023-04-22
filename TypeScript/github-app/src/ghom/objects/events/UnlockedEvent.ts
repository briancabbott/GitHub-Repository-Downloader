import { Actor } from "../../interfaces/Actor";
import { Node } from "../../interfaces/Node";
import { Lockable } from "../../interfaces/Lockable";

// UnlockedEvent
// Represents an 'unlocked' event on a given issue or pull request.

// Implements
// Node
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// id (ID!)
// lockable (Lockable!)
// Object that was unlocked.



// Represents an 'unlocked' event on a given issue or pull request.
export interface UnlockedEvent extends Node {

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Object that was unlocked.
    lockable: Lockable
}

