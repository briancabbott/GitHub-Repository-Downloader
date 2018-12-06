import { Actor } from "../../interfaces/Actor";

// DeployedEvent
// Represents a 'deployed' event on a given pull request.

// Implements
// Node
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// databaseId (Int)
// Identifies the primary key from the database.

// deployment (Deployment!)
// The deployment associated with the 'deployed' event.

// id (ID!)
// pullRequest (PullRequest!)
// PullRequest referenced by event.

// ref (Ref)
// The ref associated with the 'deployed' event.


// Represents a 'deployed' event on a given pull request.
export interface DeployedEvent extends Node {

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the primary key from the database.
    databaseId: number

    // The deployment associated with the 'deployed' event.
    deployment: Deployment

    // PullRequest referenced by event.
    pullRequest: PullRequest

    // The ref associated with the 'deployed' event.
    ref: Ref
}