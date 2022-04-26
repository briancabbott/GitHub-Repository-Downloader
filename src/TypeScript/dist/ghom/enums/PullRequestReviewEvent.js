"use strict";
// PullRequestReviewEvent
// The possible events to perform on a pull request review.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PullRequestReviewEvent = void 0;
// Values
// APPROVE
// Submit feedback and approve merging these changes.
// COMMENT
// Submit general feedback without explicit approval.
// DISMISS
// Dismiss review so it now longer effects merging.
// REQUEST_CHANGES
// Submit feedback that must be addressed before merging.
// The possible events to perform on a pull request review.
var PullRequestReviewEvent;
(function (PullRequestReviewEvent) {
    // Submit feedback and approve merging these changes.
    PullRequestReviewEvent[PullRequestReviewEvent["APPROVE"] = 0] = "APPROVE";
    // Submit general feedback without explicit approval.
    PullRequestReviewEvent[PullRequestReviewEvent["COMMENT"] = 1] = "COMMENT";
    // Dismiss review so it now longer effects merging.
    PullRequestReviewEvent[PullRequestReviewEvent["DISMISS"] = 2] = "DISMISS";
    // Submit feedback that must be addressed before merging.
    PullRequestReviewEvent[PullRequestReviewEvent["REQUEST_CHANGES"] = 3] = "REQUEST_CHANGES";
})(PullRequestReviewEvent = exports.PullRequestReviewEvent || (exports.PullRequestReviewEvent = {}));
