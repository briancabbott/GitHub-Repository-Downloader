import { UniformResourceLocatable } from "../interfaces/UniformResourceLocatable";
import { ID } from "../scalars/Id";
import { PullRequest } from "./PullRequest";
import { Commit } from "./Commit";
import { Node } from "../interfaces/Node";

// PullRequestCommit
// Represents a Git commit part of a pull request.

// Implements
// Node
// UniformResourceLocatable
// Fields
// commit (Commit!)
// The Git commit object

// id (ID!)
// pullRequest (PullRequest!)
// The pull request this commit belongs to

// resourcePath (URI!)
// The HTTP path for this pull request commit

// url (URI!)
// The HTTP URL for this pull request commit





// Represents a Git commit part of a pull request.
export class PullRequestCommit implements Node, UniformResourceLocatable {
    // Fields

    // The Git commit object
    commit: Commit

    id: ID

    // The pull request this commit belongs to
    pullRequest: PullRequest

    // The HTTP path for this pull request commit
    resourcePath: URL

    // The HTTP URL for this pull request commit
    url: URL
}
