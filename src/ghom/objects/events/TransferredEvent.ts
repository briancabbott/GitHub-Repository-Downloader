import { Actor } from "../../interfaces/Actor";

// TransferredEvent
// Represents a 'transferred' event on a given issue or pull request.

// Implements
// Node
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// fromRepository (Repository)
// The repository this came from

// id (ID!)
// issue (Issue!)
// Identifies the issue associated with the event.


// Represents a 'transferred' event on a given issue or pull request.
export interface TransferredEvent extends Node {

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // The repository this came from
    fromRepository: Repository

    // Identifies the issue associated with the event.
    issue: Issue
}