import { Actor } from "../../interfaces/Actor";
import { Node } from "../../interfaces/Node";
import { UniformResourceLocatable } from "../../interfaces/UniformResourceLocatable";
import { Commit } from "../Commit";
import { Ref } from "../Ref";
import { PullRequest } from "../PullRequest";

// MergedEvent
// Represents a 'merged' event on a given pull request.

// Implements
// Node
// UniformResourceLocatable
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// commit (Commit)
// Identifies the commit associated with the merge event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// id (ID!)
// mergeRef (Ref)
// Identifies the Ref associated with the merge event.

// mergeRefName (String!)
// Identifies the name of the Ref associated with the merge event.

// pullRequest (PullRequest!)
// PullRequest referenced by event.

// resourcePath (URI!)
// The HTTP path for this merged event.

// url (URI!)
// The HTTP URL for this merged event.


// Represents a 'merged' event on a given pull request.
export interface MergedEvent extends Node, UniformResourceLocatable {
    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the commit associated with the merge event.
    commit: Commit

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the Ref associated with the merge event.
    mergeRef: Ref

    // Identifies the name of the Ref associated with the merge event.
    mergeRefName: String

    // PullRequest referenced by event.
    pullRequest: PullRequest

    // The HTTP path for this merged event.
    resourcePath: URL

    // The HTTP URL for this merged event.
    url: URL
}