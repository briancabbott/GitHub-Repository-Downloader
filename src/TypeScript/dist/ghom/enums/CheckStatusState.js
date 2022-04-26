"use strict";
// CheckStatusState
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Checks preview for more details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckStatusState = void 0;
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// The possible states for a check suite or run status.
// Values
// COMPLETED
// The check suite or run has been completed.
// IN_PROGRESS
// The check suite or run is in progress.
// QUEUED
// The check suite or run has been queued.
// REQUESTED
// The check suite or run has been requested.
// The possible states for a check suite or run status.
var CheckStatusState;
(function (CheckStatusState) {
    // The check suite or run has been completed.
    CheckStatusState[CheckStatusState["COMPLETED"] = 0] = "COMPLETED";
    // The check suite or run is in progress.
    CheckStatusState[CheckStatusState["IN_PROGRESS"] = 1] = "IN_PROGRESS";
    // The check suite or run has been queued.
    CheckStatusState[CheckStatusState["QUEUED"] = 2] = "QUEUED";
    // The check suite or run has been requested.
    CheckStatusState[CheckStatusState["REQUESTED"] = 3] = "REQUESTED";
})(CheckStatusState = exports.CheckStatusState || (exports.CheckStatusState = {}));
