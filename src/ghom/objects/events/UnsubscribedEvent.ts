import { Actor } from "../../interfaces/Actor";
import { Subscribable } from "../../interfaces/Subscribable";
import { Node } from "../../interfaces/Node";

// UnsubscribedEvent
// Represents an 'unsubscribed' event on a given Subscribable.

// Implements
// Node
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// id (ID!)
// subscribable (Subscribable!)
// Object referenced by event.


// Represents an 'unsubscribed' event on a given Subscribable.
export interface UnsubscribedEvent extends Node {
    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Object referenced by event.
    subscribable: Subscribable
}