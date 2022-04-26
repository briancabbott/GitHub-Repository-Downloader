"use strict";
// ProjectState
// State of the project; either 'open' or 'closed'
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectState = void 0;
// Values
// CLOSED
// The project is closed.
// OPEN
// The project is open.
// State of the project; either 'open' or 'closed'
var ProjectState;
(function (ProjectState) {
    // The project is closed.
    ProjectState[ProjectState["CLOSED"] = 0] = "CLOSED";
    // The project is open.
    ProjectState[ProjectState["OPEN"] = 1] = "OPEN";
})(ProjectState = exports.ProjectState || (exports.ProjectState = {}));
