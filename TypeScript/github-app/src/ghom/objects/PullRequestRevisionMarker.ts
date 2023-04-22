import { Commit } from "./Commit";
import { PullRequest } from "./PullRequest";

// PullRequestRevisionMarker
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Issues Preview preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// Represents the latest point in the pull request timeline for which the viewer has seen the pull request's commits.

// Fields
// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// lastSeenCommit (Commit!)
// The last commit the viewer has seen.

// pullRequest (PullRequest!)
// The pull request to which the marker belongs.



// Represents the latest point in the pull request timeline for which the viewer has seen the pull request's commits.
export class PullRequestRevisionMarker {

    // Fields

    // Identifies the date and time when the object was created.
    createdAt: Date

    // The last commit the viewer has seen.
    lastSeenCommit: Commit

    // The pull request to which the marker belongs.
    pullRequest: PullRequest
}