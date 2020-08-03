import { Node } from "../../interfaces/Node";
import { Actor } from "../../interfaces/Actor";
import { Ref } from "../Ref";
import { PullRequest } from "../PullRequest";

// HeadRefDeletedEvent
// Represents a 'head_ref_deleted' event on a given pull request.

// Implements
// Node
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// headRef (Ref)
// Identifies the Ref associated with the head_ref_deleted event.

// headRefName (String!)
// Identifies the name of the Ref associated with the head_ref_deleted event.

// id (ID!)
// pullRequest (PullRequest!)
// PullRequest referenced by event.



// Represents a 'head_ref_deleted' event on a given pull request.
export interface HeadRefDeletedEvent extends Node {

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the Ref associated with the head_ref_deleted event.
    headRef: Ref

    // Identifies the name of the Ref associated with the head_ref_deleted event.
    headRefName: string

    // PullRequest referenced by event.
    pullRequest: PullRequest
}