import { Actor } from "../../interfaces/Actor";
import { Node } from "../../interfaces/Node";
import { PullRequest } from "../PullRequest";

// ReviewRequestedEvent
// Represents an 'review_requested' event on a given pull request.

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

// requestedReviewer (RequestedReviewer)
// Identifies the reviewer whose review was requested.




// Represents an 'review_requested' event on a given pull request.
export interface ReviewRequestedEvent extends Node {

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // PullRequest referenced by event.
    pullRequest: PullRequest

    // Identifies the reviewer whose review was requested.
    requestedReviewer: RequestedReviewer
}