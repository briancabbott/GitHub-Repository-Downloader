import { ID } from "../scalars/Id";

// Reactable
// Represents a subject that can be reacted on.

// Implemented by
// CommitComment
// Issue
// IssueComment
// PullRequest
// PullRequestReviewComment
// TeamDiscussion
// TeamDiscussionComment
// Fields
// databaseId (Int)
// Identifies the primary key from the database.

// id (ID!)
// reactionGroups ([ReactionGroup!])
// A list of reactions grouped by content left on the subject.

// viewerCanReact (Boolean!)
// Can user react to this subject


// Represents a subject that can be reacted on.
export interface Reactable {

    // Identifies the primary key from the database.
    databaseId: number;

    id: ID;

    // A list of reactions grouped by content left on the subject.
    // reactionGroups: Array<ReactionGroup>;

    // Can user react to this subject
    viewerCanReact: boolean;
}
