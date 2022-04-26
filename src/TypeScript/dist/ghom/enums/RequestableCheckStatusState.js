"use strict";
// RequestableCheckStatusState
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Checks preview for more details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestableCheckStatusState = void 0;
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// The possible states that can be requested when creating a check run.
// Values
// COMPLETED
// The check suite or run has been completed.
// IN_PROGRESS
// The check suite or run is in progress.
// QUEUED
// The check suite or run has been queued.
// The possible states that can be requested when creating a check run.
var RequestableCheckStatusState;
(function (RequestableCheckStatusState) {
    // The check suite or run has been completed.
    RequestableCheckStatusState[RequestableCheckStatusState["COMPLETED"] = 0] = "COMPLETED";
    // The check suite or run is in progress.
    RequestableCheckStatusState[RequestableCheckStatusState["IN_PROGRESS"] = 1] = "IN_PROGRESS";
    // The check suite or run has been queued.
    RequestableCheckStatusState[RequestableCheckStatusState["QUEUED"] = 2] = "QUEUED";
})(RequestableCheckStatusState = exports.RequestableCheckStatusState || (exports.RequestableCheckStatusState = {}));
