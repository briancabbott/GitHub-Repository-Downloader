"use strict";
// PullRequestReviewCommentState
// The possible states of a pull request review comment.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PullRequestReviewCommentState = void 0;
// Values
// PENDING
// A comment that is part of a pending review
// SUBMITTED
// A comment that is part of a submitted review
// The possible states of a pull request review comment.
var PullRequestReviewCommentState;
(function (PullRequestReviewCommentState) {
    // A comment that is part of a pending review
    PullRequestReviewCommentState[PullRequestReviewCommentState["PENDING"] = 0] = "PENDING";
    // A comment that is part of a submitted review
    PullRequestReviewCommentState[PullRequestReviewCommentState["SUBMITTED"] = 1] = "SUBMITTED";
})(PullRequestReviewCommentState = exports.PullRequestReviewCommentState || (exports.PullRequestReviewCommentState = {}));
