"use strict";
// IssueTimelineItemsItemType
// The possible item types found in a timeline.
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueTimelineItemsItemType = void 0;
// Values
// ADDED_TO_PROJECT_EVENT
// Represents a 'added_to_project' event on a given issue or pull request.
// ASSIGNED_EVENT
// Represents an 'assigned' event on any assignable object.
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
// ISSUE_COMMENT
// Represents a comment on an Issue.
// LABELED_EVENT
// Represents a 'labeled' event on a given issue or pull request.
// LOCKED_EVENT
// Represents a 'locked' event on a given issue or pull request.
// MENTIONED_EVENT
// Represents a 'mentioned' event on a given issue or pull request.
// MILESTONED_EVENT
// Represents a 'milestoned' event on a given issue or pull request.
// MOVED_COLUMNS_IN_PROJECT_EVENT
// Represents a 'moved_columns_in_project' event on a given issue or pull request.
// REFERENCED_EVENT
// Represents a 'referenced' event on a given ReferencedSubject.
// REMOVED_FROM_PROJECT_EVENT
// Represents a 'removed_from_project' event on a given issue or pull request.
// RENAMED_TITLE_EVENT
// Represents a 'renamed' event on a given issue or pull request
// REOPENED_EVENT
// Represents a 'reopened' event on any Closable.
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
var IssueTimelineItemsItemType;
(function (IssueTimelineItemsItemType) {
    // Represents a 'added_to_project' event on a given issue or pull request.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["ADDED_TO_PROJECT_EVENT"] = 0] = "ADDED_TO_PROJECT_EVENT";
    // Represents an 'assigned' event on any assignable object.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["ASSIGNED_EVENT"] = 1] = "ASSIGNED_EVENT";
    // Represents a 'closed' event on any Closable.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["CLOSED_EVENT"] = 2] = "CLOSED_EVENT";
    // Represents a 'comment_deleted' event on a given issue or pull request.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["COMMENT_DELETED_EVENT"] = 3] = "COMMENT_DELETED_EVENT";
    // Represents a 'converted_note_to_issue' event on a given issue or pull request.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["CONVERTED_NOTE_TO_ISSUE_EVENT"] = 4] = "CONVERTED_NOTE_TO_ISSUE_EVENT";
    // Represents a mention made by one issue or pull request to another.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["CROSS_REFERENCED_EVENT"] = 5] = "CROSS_REFERENCED_EVENT";
    // Represents a 'demilestoned' event on a given issue or pull request.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["DEMILESTONED_EVENT"] = 6] = "DEMILESTONED_EVENT";
    // Represents a comment on an Issue.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["ISSUE_COMMENT"] = 7] = "ISSUE_COMMENT";
    // Represents a 'labeled' event on a given issue or pull request.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["LABELED_EVENT"] = 8] = "LABELED_EVENT";
    // Represents a 'locked' event on a given issue or pull request.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["LOCKED_EVENT"] = 9] = "LOCKED_EVENT";
    // Represents a 'mentioned' event on a given issue or pull request.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["MENTIONED_EVENT"] = 10] = "MENTIONED_EVENT";
    // Represents a 'milestoned' event on a given issue or pull request.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["MILESTONED_EVENT"] = 11] = "MILESTONED_EVENT";
    // Represents a 'moved_columns_in_project' event on a given issue or pull request.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["MOVED_COLUMNS_IN_PROJECT_EVENT"] = 12] = "MOVED_COLUMNS_IN_PROJECT_EVENT";
    // Represents a 'referenced' event on a given ReferencedSubject.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["REFERENCED_EVENT"] = 13] = "REFERENCED_EVENT";
    // Represents a 'removed_from_project' event on a given issue or pull request.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["REMOVED_FROM_PROJECT_EVENT"] = 14] = "REMOVED_FROM_PROJECT_EVENT";
    // Represents a 'renamed' event on a given issue or pull request
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["RENAMED_TITLE_EVENT"] = 15] = "RENAMED_TITLE_EVENT";
    // Represents a 'reopened' event on any Closable.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["REOPENED_EVENT"] = 16] = "REOPENED_EVENT";
    // Represents a 'subscribed' event on a given Subscribable.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["SUBSCRIBED_EVENT"] = 17] = "SUBSCRIBED_EVENT";
    // Represents a 'transferred' event on a given issue or pull request.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["TRANSFERRED_EVENT"] = 18] = "TRANSFERRED_EVENT";
    // Represents an 'unassigned' event on any assignable object.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["UNASSIGNED_EVENT"] = 19] = "UNASSIGNED_EVENT";
    // Represents an 'unlabeled' event on a given issue or pull request.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["UNLABELED_EVENT"] = 20] = "UNLABELED_EVENT";
    // Represents an 'unlocked' event on a given issue or pull request.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["UNLOCKED_EVENT"] = 21] = "UNLOCKED_EVENT";
    // Represents an 'unsubscribed' event on a given Subscribable.
    IssueTimelineItemsItemType[IssueTimelineItemsItemType["UNSUBSCRIBED_EVENT"] = 22] = "UNSUBSCRIBED_EVENT";
})(IssueTimelineItemsItemType = exports.IssueTimelineItemsItemType || (exports.IssueTimelineItemsItemType = {}));
