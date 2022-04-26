"use strict";
// MergeStateStatus
// Detailed status information about a pull request merge.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergeStateStatus = void 0;
// Values
// BEHIND
// The head ref is out of date.
// BLOCKED
// The merge is blocked.
// CLEAN
// Mergeable and passing commit status.
// DIRTY
// The merge commit cannot be cleanly created.
// HAS_HOOKS
// Mergeable with passing commit status and pre-recieve hooks.
// UNKNOWN
// The state cannot currently be determined.
// UNSTABLE
// Mergeable with non-passing commit status.
// Detailed status information about a pull request merge.
var MergeStateStatus;
(function (MergeStateStatus) {
    // The head ref is out of date.
    MergeStateStatus[MergeStateStatus["BEHIND"] = 0] = "BEHIND";
    // The merge is blocked.
    MergeStateStatus[MergeStateStatus["BLOCKED"] = 1] = "BLOCKED";
    // Mergeable and passing commit status.
    MergeStateStatus[MergeStateStatus["CLEAN"] = 2] = "CLEAN";
    // The merge commit cannot be cleanly created.
    MergeStateStatus[MergeStateStatus["DIRTY"] = 3] = "DIRTY";
    // Mergeable with passing commit status and pre-recieve hooks.
    MergeStateStatus[MergeStateStatus["HAS_HOOKS"] = 4] = "HAS_HOOKS";
    // The state cannot currently be determined.
    MergeStateStatus[MergeStateStatus["UNKNOWN"] = 5] = "UNKNOWN";
    // Mergeable with non-passing commit status.
    MergeStateStatus[MergeStateStatus["UNSTABLE"] = 6] = "UNSTABLE";
})(MergeStateStatus = exports.MergeStateStatus || (exports.MergeStateStatus = {}));
