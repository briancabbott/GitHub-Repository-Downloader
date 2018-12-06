import { Actor } from "../../interfaces/Actor";

// SubscribedEvent
// Represents a 'subscribed' event on a given Subscribable.

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




// Represents a 'subscribed' event on a given Subscribable.
export interface SubscribedEvent {

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Object referenced by event.
    subscribable: Subscribable
}