import { Actor } from "../../interfaces/Actor";
import { URL } from "url";
import { Node } from "../../interfaces/Node";
import { UniformResourceLocatable } from "../../interfaces/UniformResourceLocatable";
import { HTMLString } from "../../scalars/HTMLString";
import { PullRequestReviewState } from "../../enums/PullRequestReviewState";
import { PullRequest } from "../PullRequest";
import { PullRequestCommit } from "../PullRequestCommit";
import { PullRequestReview } from "../PullRequestReview";

// ReviewDismissedEvent
// Represents a 'review_dismissed' event on a given issue or pull request.

// Implements
// Node
// UniformResourceLocatable
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// databaseId (Int)
// Identifies the primary key from the database.

// id (ID!)
// message (String!)
// Identifies the message associated with the 'review_dismissed' event.

// messageHtml (HTML!)
// The message associated with the event, rendered to HTML.

// previousReviewState (PullRequestReviewState!)
// Identifies the previous state of the review with the 'review_dismissed' event.

// pullRequest (PullRequest!)
// PullRequest referenced by event.

// pullRequestCommit (PullRequestCommit)
// Identifies the commit which caused the review to become stale.

// resourcePath (URI!)
// The HTTP path for this review dismissed event.

// review (PullRequestReview)
// Identifies the review associated with the 'review_dismissed' event.

// url (URI!)
// The HTTP URL for this review dismissed event.









// Represents a 'review_dismissed' event on a given issue or pull request.
export interface ReviewDismissedEvent extends Node, UniformResourceLocatable {

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the primary key from the database.
    databaseId: number

    // Identifies the message associated with the 'review_dismissed' event.
    message: string

    // The message associated with the event, rendered to HTML.
    messageHtml: HTMLString

    // Identifies the previous state of the review with the 'review_dismissed' event.
    previousReviewState: PullRequestReviewState

    // PullRequest referenced by event.
    pullRequest: PullRequest

    // Identifies the commit which caused the review to become stale.
    pullRequestCommit: PullRequestCommit

    // The HTTP path for this review dismissed event.
    resourcePath: URL

    // Identifies the review associated with the 'review_dismissed' event.
    review: PullRequestReview

    // The HTTP URL for this review dismissed event.
    url: URL
}
