// PullRequestTimelineItemsItemType
// The possible item types found in a timeline.

// Values
// ADDED_TO_PROJECT_EVENT
// Represents a 'added_to_project' event on a given issue or pull request.

// ASSIGNED_EVENT
// Represents an 'assigned' event on any assignable object.

// BASE_REF_CHANGED_EVENT
// Represents a 'base_ref_changed' event on a given issue or pull request.

// BASE_REF_FORCE_PUSHED_EVENT
// Represents a 'base_ref_force_pushed' event on a given pull request.

// CLOSED_EVENT
// Represents a 'closed' event on any Closable.

// COMMENT_DELETED_EVENT
// Represents a 'comment_deleted' event on a given issue or pull request.

// CONVERTED_NOTE_TO_ISSUE_EVENT
// Represents a 'converted_note_to_issue' event on a given issue or pull request.

// CROSS_REFERENCED_EVENT
// Represents a mention made by one issue or pull request to another.

// DEMILESTONED_EVENT
// Represents a 'demilestoned' event on a given issue or pull request.

// DEPLOYED_EVENT
// Represents a 'deployed' event on a given pull request.

// DEPLOYMENT_ENVIRONMENT_CHANGED_EVENT
// Represents a 'deployment_environment_changed' event on a given pull request.

// HEAD_REF_DELETED_EVENT
// Represents a 'head_ref_deleted' event on a given pull request.

// HEAD_REF_FORCE_PUSHED_EVENT
// Represents a 'head_ref_force_pushed' event on a given pull request.

// HEAD_REF_RESTORED_EVENT
// Represents a 'head_ref_restored' event on a given pull request.

// ISSUE_COMMENT
// Represents a comment on an Issue.

// LABELED_EVENT
// Represents a 'labeled' event on a given issue or pull request.

// LOCKED_EVENT
// Represents a 'locked' event on a given issue or pull request.

// MENTIONED_EVENT
// Represents a 'mentioned' event on a given issue or pull request.

// MERGED_EVENT
// Represents a 'merged' event on a given pull request.

// MILESTONED_EVENT
// Represents a 'milestoned' event on a given issue or pull request.

// MOVED_COLUMNS_IN_PROJECT_EVENT
// Represents a 'moved_columns_in_project' event on a given issue or pull request.

// PULL_REQUEST_COMMIT
// Represents a Git commit part of a pull request.

// PULL_REQUEST_COMMIT_COMMENT_THREAD
// Represents a commit comment thread part of a pull request.

// PULL_REQUEST_REVIEW
// A review object for a given pull request.

// PULL_REQUEST_REVIEW_THREAD
// A threaded list of comments for a given pull request.

// PULL_REQUEST_REVISION_MARKER
// Represents the latest point in the pull request timeline for which the viewer has seen the pull request's commits.

// REFERENCED_EVENT
// Represents a 'referenced' event on a given ReferencedSubject.

// REMOVED_FROM_PROJECT_EVENT
// Represents a 'removed_from_project' event on a given issue or pull request.

// RENAMED_TITLE_EVENT
// Represents a 'renamed' event on a given issue or pull request

// REOPENED_EVENT
// Represents a 'reopened' event on any Closable.

// REVIEW_DISMISSED_EVENT
// Represents a 'review_dismissed' event on a given issue or pull request.

// REVIEW_REQUESTED_EVENT
// Represents an 'review_requested' event on a given pull request.

// REVIEW_REQUEST_REMOVED_EVENT
// Represents an 'review_request_removed' event on a given pull request.

// SUBSCRIBED_EVENT
// Represents a 'subscribed' event on a given Subscribable.

// TRANSFERRED_EVENT
// Represents a 'transferred' event on a given issue or pull request.

// UNASSIGNED_EVENT
// Represents an 'unassigned' event on any assignable object.

// UNLABELED_EVENT
// Represents an 'unlabeled' event on a given issue or pull request.

// UNLOCKED_EVENT
// Represents an 'unlocked' event on a given issue or pull request.

// UNSUBSCRIBED_EVENT
// Represents an 'unsubscribed' event on a given Subscribable.


// The possible item types found in a timeline.
export enum PullRequestTimelineItemsItemType {
    // Represents a 'added_to_project' event on a given issue or pull request.
    ADDED_TO_PROJECT_EVENT,

    // Represents an 'assigned' event on any assignable object.
    ASSIGNED_EVENT,

    // Represents a 'base_ref_changed' event on a given issue or pull request.
    BASE_REF_CHANGED_EVENT,

    // Represents a 'base_ref_force_pushed' event on a given pull request.
    BASE_REF_FORCE_PUSHED_EVENT,

    // Represents a 'closed' event on any Closable.
    CLOSED_EVENT,

    // Represents a 'comment_deleted' event on a given issue or pull request.
    COMMENT_DELETED_EVENT,

    // Represents a 'converted_note_to_issue' event on a given issue or pull request.
    CONVERTED_NOTE_TO_ISSUE_EVENT,

    // Represents a mention made by one issue or pull request to another.
    CROSS_REFERENCED_EVENT,

    // Represents a 'demilestoned' event on a given issue or pull request.
    DEMILESTONED_EVENT,

    // Represents a 'deployed' event on a given pull request.
    DEPLOYED_EVENT,

    // Represents a 'deployment_environment_changed' event on a given pull request.
    DEPLOYMENT_ENVIRONMENT_CHANGED_EVENT,

    // Represents a 'head_ref_deleted' event on a given pull request.
    HEAD_REF_DELETED_EVENT,

    // Represents a 'head_ref_force_pushed' event on a given pull request.
    HEAD_REF_FORCE_PUSHED_EVENT,

    // Represents a 'head_ref_restored' event on a given pull request.
    HEAD_REF_RESTORED_EVENT,

    // Represents a comment on an Issue.
    ISSUE_COMMENT,

    // Represents a 'labeled' event on a given issue or pull request.
    LABELED_EVENT,

    // Represents a 'locked' event on a given issue or pull request.
    LOCKED_EVENT,

    // Represents a 'mentioned' event on a given issue or pull request.
    MENTIONED_EVENT,

    // Represents a 'merged' event on a given pull request.
    MERGED_EVENT,

    // Represents a 'milestoned' event on a given issue or pull request.
    MILESTONED_EVENT,

    // Represents a 'moved_columns_in_project' event on a given issue or pull request.
    MOVED_COLUMNS_IN_PROJECT_EVENT,

    // Represents a Git commit part of a pull request.
    PULL_REQUEST_COMMIT,

    // Represents a commit comment thread part of a pull request.
    PULL_REQUEST_COMMIT_COMMENT_THREAD,

    // A review object for a given pull request.
    PULL_REQUEST_REVIEW,

    // A threaded list of comments for a given pull request.
    PULL_REQUEST_REVIEW_THREAD,

    // Represents the latest point in the pull request timeline for which the viewer has seen the pull request's commits.
    PULL_REQUEST_REVISION_MARKER,

    // Represents a 'referenced' event on a given ReferencedSubject.
    REFERENCED_EVENT,

    // Represents a 'removed_from_project' event on a given issue or pull request.
    REMOVED_FROM_PROJECT_EVENT,

    // Represents a 'renamed' event on a given issue or pull request
    RENAMED_TITLE_EVENT,

    // Represents a 'reopened' event on any Closable.
    REOPENED_EVENT,

    // Represents a 'review_dismissed' event on a given issue or pull request.
    REVIEW_DISMISSED_EVENT,

    // Represents an 'review_requested' event on a given pull request.
    REVIEW_REQUESTED_EVENT,

    // Represents an 'review_request_removed' event on a given pull request.
    REVIEW_REQUEST_REMOVED_EVENT,

    // Represents a 'subscribed' event on a given Subscribable.
    SUBSCRIBED_EVENT,

    // Represents a 'transferred' event on a given issue or pull request.
    TRANSFERRED_EVENT,

    // Represents an 'unassigned' event on any assignable object.
    UNASSIGNED_EVENT,

    // Represents an 'unlabeled' event on a given issue or pull request.
    UNLABELED_EVENT,

    // Represents an 'unlocked' event on a given issue or pull request.
    UNLOCKED_EVENT,

    // Represents an 'unsubscribed' event on a given Subscribable.
    UNSUBSCRIBED_EVENT

}