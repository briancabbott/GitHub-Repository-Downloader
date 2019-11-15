import { Actor } from "../../interfaces/Actor";
import { UniformResourceLocatable } from "../../interfaces/UniformResourceLocatable";
import { Node } from "../../interfaces/Node";
import { Closable } from "../../interfaces/Closable";

// ClosedEvent
// Represents a 'closed' event on any Closable.

// Implements
// Node
// UniformResourceLocatable
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// closable (Closable!)
// Object that was closed.

// closer (Closer)
// Object which triggered the creation of this event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// id (ID!)
// resourcePath (URI!)
// The HTTP path for this closed event.

// url (URI!)
// The HTTP URL for this closed event.


// Represents a 'closed' event on any Closable.
export interface ClosedEvent extends Node, UniformResourceLocatable {

    // Identifies the actor who performed the event.
    actor: Actor

    // Object that was closed.
    closable: Closable

    // Object which triggered the creation of this event.
    // closer: Closer

    // Identifies the date and time when the object was created.
    createdAt: Date

    // The HTTP path for this closed event.
    resourcePath: URL

    // The HTTP URL for this closed event.
    url: URL
}
