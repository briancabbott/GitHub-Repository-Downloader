"use strict";
// PullRequestState
// The possible states of a pull request.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PullRequestState = void 0;
// Values
// CLOSED
// A pull request that has been closed without being merged.
// MERGED
// A pull request that has been closed by being merged.
// OPEN
// A pull request that is still open.
// The possible states of a pull request.
var PullRequestState;
(function (PullRequestState) {
    // A pull request that has been closed without being merged.
    PullRequestState[PullRequestState["CLOSED"] = 0] = "CLOSED";
    // A pull request that has been closed by being merged.
    PullRequestState[PullRequestState["MERGED"] = 1] = "MERGED";
    // A pull request that is still open.
    PullRequestState[PullRequestState["OPEN"] = 2] = "OPEN";
})(PullRequestState = exports.PullRequestState || (exports.PullRequestState = {}));
