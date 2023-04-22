import { Actor } from "../../interfaces/Actor";
import { Node } from "../../interfaces/Node";
import { LockReason } from "../../enums/LockReason";
import { Lockable } from "../../interfaces/Lockable";

// LockedEvent
// Represents a 'locked' event on a given issue or pull request.

// Implements
// Node
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// id (ID!)
// lockReason (LockReason)
// Reason that the conversation was locked (optional).

// lockable (Lockable!)
// Object that was locked.


// Represents a 'locked' event on a given issue or pull request.
export interface LockedEvent extends Node {

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Reason that the conversation was locked (optional).
    lockReason: LockReason

    // Object that was locked.
    lockable: Lockable
}
