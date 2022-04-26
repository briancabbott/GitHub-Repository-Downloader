"use strict";
// CheckConclusionState
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Checks preview for more details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckConclusionState = void 0;
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// The possible states for a check suite or run conclusion.
// Values
// ACTION_REQUIRED
// The check suite or run requires action.
// CANCELLED
// The check suite or run has been cancelled.
// FAILURE
// The check suite or run has failed.
// NEUTRAL
// The check suite or run was neutral.
// SUCCESS
// The check suite or run has succeeded.
// TIMED_OUT
// The check suite or run has timed out.
// The possible states for a check suite or run conclusion.
var CheckConclusionState;
(function (CheckConclusionState) {
    // The check suite or run requires action.
    CheckConclusionState[CheckConclusionState["ACTION_REQUIRED"] = 0] = "ACTION_REQUIRED";
    // The check suite or run has been cancelled.
    CheckConclusionState[CheckConclusionState["CANCELLED"] = 1] = "CANCELLED";
    // The check suite or run has failed.
    CheckConclusionState[CheckConclusionState["FAILURE"] = 2] = "FAILURE";
    // The check suite or run was neutral.
    CheckConclusionState[CheckConclusionState["NEUTRAL"] = 3] = "NEUTRAL";
    // The check suite or run has succeeded.
    CheckConclusionState[CheckConclusionState["SUCCESS"] = 4] = "SUCCESS";
    // The check suite or run has timed out.
    CheckConclusionState[CheckConclusionState["TIMED_OUT"] = 5] = "TIMED_OUT";
})(CheckConclusionState = exports.CheckConclusionState || (exports.CheckConclusionState = {}));
