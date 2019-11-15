import { Node } from "../../interfaces/Node";
import { Actor } from "../../interfaces/Actor";
import { Commit } from "../Commit";
import { Repository } from "../../../model";

// ReferencedEvent
// Represents a 'referenced' event on a given ReferencedSubject.

// Implements
// Node
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// commit (Commit)
// Identifies the commit associated with the 'referenced' event.

// commitRepository (Repository!)
// Identifies the repository associated with the 'referenced' event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// id (ID!)
// isCrossRepository (Boolean!)
// Reference originated in a different repository.

// isDirectReference (Boolean!)
// Checks if the commit message itself references the subject. Can be false in the case of a commit comment reference.

// subject (ReferencedSubject!)
// Object referenced by event.


// Represents a 'referenced' event on a given ReferencedSubject.
export interface ReferencedEvent extends Node {

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the commit associated with the 'referenced' event.
    commit: Commit

    // Identifies the repository associated with the 'referenced' event.
    commitRepository: Repository

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Reference originated in a different repository.
    isCrossRepository: boolean

    // Checks if the commit message itself references the subject. Can be false in the case of a commit comment reference.
    isDirectReference: boolean

    // Object referenced by event.
    // subject: ReferencedSubject
}
