"use strict";
// IssueState
// The possible states of an issue.
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueState = void 0;
// Values
// CLOSED
// An issue that has been closed
// OPEN
// An issue that is still open
// The possible states of an issue.
var IssueState;
(function (IssueState) {
    // An issue that has been closed
    IssueState[IssueState["CLOSED"] = 0] = "CLOSED";
    // An issue that is still open
    IssueState[IssueState["OPEN"] = 1] = "OPEN";
})(IssueState = exports.IssueState || (exports.IssueState = {}));
