import { Actor } from "../../interfaces/Actor";

// HeadRefRestoredEvent
// Represents a 'head_ref_restored' event on a given pull request.

// Implements
// Node
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// id (ID!)
// pullRequest (PullRequest!)
// PullRequest referenced by event.



// Represents a 'head_ref_restored' event on a given pull request.
export interface HeadRefRestoredEvent extends Node {
    
    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // PullRequest referenced by event.
    pullRequest: PullRequest

}