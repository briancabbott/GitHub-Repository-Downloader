import { Node } from "../../interfaces/Node";
import { ID } from "../../scalars/Id";
import { Actor } from "../../interfaces/Actor";
import { Commit } from "../Commit";
import { PullRequest } from "../PullRequest";
import { Ref } from "../Ref";

// Represents a 'base_ref_force_pushed' event on a given pull request.

// Implements
// Node
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// afterCommit (Commit)
// Identifies the after commit SHA for the 'base_ref_force_pushed' event.

// beforeCommit (Commit)
// Identifies the before commit SHA for the 'base_ref_force_pushed' event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// id (ID!)
// pullRequest (PullRequest!)
// PullRequest referenced by event.

// ref (Ref)
// Identifies the fully qualified ref name for the 'base_ref_force_pushed' event.











// BaseRefForcePushedEvent
// Represents a 'base_ref_force_pushed' event on a given pull request.
export interface BaseRefForcePushedEvent extends Node {
    id: ID

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the after commit SHA for the 'base_ref_force_pushed' event.
    afterCommit: Commit

    // Identifies the before commit SHA for the 'base_ref_force_pushed' event.
    beforeCommit: Commit

    // Identifies the date and time when the object was created.
    createdAt: Date

    // PullRequest referenced by event.
    pullRequest: PullRequest

    // Identifies the fully qualified ref name for the 'base_ref_force_pushed' event.
    ref: Ref
}