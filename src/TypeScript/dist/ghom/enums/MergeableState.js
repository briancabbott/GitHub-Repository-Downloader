"use strict";
// MergeableState
// Whether or not a PullRequest can be merged.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergeableState = void 0;
// Values
// CONFLICTING
// The pull request cannot be merged due to merge conflicts.
// MERGEABLE
// The pull request can be merged.
// UNKNOWN
// The mergeability of the pull request is still being calculated.
// Whether or not a PullRequest can be merged.
var MergeableState;
(function (MergeableState) {
    // The pull request cannot be merged due to merge conflicts.
    MergeableState[MergeableState["CONFLICTING"] = 0] = "CONFLICTING";
    // The pull request can be merged.
    MergeableState[MergeableState["MERGEABLE"] = 1] = "MERGEABLE";
    // The mergeability of the pull request is still being calculated.
    MergeableState[MergeableState["UNKNOWN"] = 2] = "UNKNOWN";
})(MergeableState = exports.MergeableState || (exports.MergeableState = {}));
