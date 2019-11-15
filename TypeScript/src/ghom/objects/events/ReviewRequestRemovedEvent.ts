import { Actor } from "../../interfaces/Actor";
import { PullRequest } from "../PullRequest";

// ReviewRequestRemovedEvent
// Represents an 'review_request_removed' event on a given pull request.

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
// Identifies the reviewer whose review request was removed.


// Represents an 'review_request_removed' event on a given pull request.
export interface ReviewRequestRemovedEvent extends Node {

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // PullRequest referenced by event.
    pullRequest: PullRequest

    // Identifies the reviewer whose review request was removed.
    // requestedReviewer: RequestedReviewer

}
