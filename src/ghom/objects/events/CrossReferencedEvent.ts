import { Actor } from "../../interfaces/Actor";

// CrossReferencedEvent
// Represents a mention made by one issue or pull request to another.

// Implements
// Node
// UniformResourceLocatable
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// id (ID!)
// isCrossRepository (Boolean!)
// Reference originated in a different repository.

// referencedAt (DateTime!)
// Identifies when the reference was made.

// resourcePath (URI!)
// The HTTP path for this pull request.

// source (ReferencedSubject!)
// Issue or pull request that made the reference.

// target (ReferencedSubject!)
// Issue or pull request to which the reference was made.

// url (URI!)
// The HTTP URL for this pull request.

// willCloseTarget (Boolean!)
// Checks if the target will be closed when the source is merged.


// Represents a mention made by one issue or pull request to another.
export interface CrossReferencedEvent extends Node, UniformResourceLocatable {

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Reference originated in a different repository.
    isCrossRepository: boolean

    // Identifies when the reference was made.
    referencedAt: Date

    // The HTTP path for this pull request.
    resourcePath: URL

    // Issue or pull request that made the reference.
    source: ReferencedSubject

    // Issue or pull request to which the reference was made.
    target: ReferencedSubject

    // The HTTP URL for this pull request.
    url: URL

    // Checks if the target will be closed when the source is merged.
    willCloseTarget: boolean
}