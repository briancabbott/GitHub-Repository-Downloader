"use strict";
// MilestoneState
// The possible states of a milestone.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MilestoneState = void 0;
// Values
// CLOSED
// A milestone that has been closed.
// OPEN
// A milestone that is still open.
// The possible states of a milestone.
var MilestoneState;
(function (MilestoneState) {
    // A milestone that has been closed.
    MilestoneState[MilestoneState["CLOSED"] = 0] = "CLOSED";
    // A milestone that is still open.
    MilestoneState[MilestoneState["OPEN"] = 1] = "OPEN";
})(MilestoneState = exports.MilestoneState || (exports.MilestoneState = {}));
