"use strict";
// PullRequestReviewState
// The possible states of a pull request review.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PullRequestReviewState = void 0;
// Values
// APPROVED
// A review allowing the pull request to merge.
// CHANGES_REQUESTED
// A review blocking the pull request from merging.
// COMMENTED
// An informational review.
// DISMISSED
// A review that has been dismissed.
// PENDING
// A review that has not yet been submitted.
// The possible states of a pull request review.
var PullRequestReviewState;
(function (PullRequestReviewState) {
    // A review allowing the pull request to merge.
    PullRequestReviewState[PullRequestReviewState["APPROVED"] = 0] = "APPROVED";
    // A review blocking the pull request from merging.
    PullRequestReviewState[PullRequestReviewState["CHANGES_REQUESTED"] = 1] = "CHANGES_REQUESTED";
    // An informational review.
    PullRequestReviewState[PullRequestReviewState["COMMENTED"] = 2] = "COMMENTED";
    // A review that has been dismissed.
    PullRequestReviewState[PullRequestReviewState["DISMISSED"] = 3] = "DISMISSED";
    // A review that has not yet been submitted.
    PullRequestReviewState[PullRequestReviewState["PENDING"] = 4] = "PENDING";
})(PullRequestReviewState = exports.PullRequestReviewState || (exports.PullRequestReviewState = {}));
