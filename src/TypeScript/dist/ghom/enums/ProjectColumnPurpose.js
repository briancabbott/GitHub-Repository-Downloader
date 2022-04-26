"use strict";
// ProjectColumnPurpose
// The semantic purpose of the column - todo, in progress, or done.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectColumnPurpose = void 0;
// Values
// DONE
// The column contains cards which are complete
// IN_PROGRESS
// The column contains cards which are currently being worked on
// TODO
// The column contains cards still to be worked on
// The semantic purpose of the column - todo, in progress, or done.
var ProjectColumnPurpose;
(function (ProjectColumnPurpose) {
    // The column contains cards which are complete
    ProjectColumnPurpose[ProjectColumnPurpose["DONE"] = 0] = "DONE";
    // The column contains cards which are currently being worked on
    ProjectColumnPurpose[ProjectColumnPurpose["IN_PROGRESS"] = 1] = "IN_PROGRESS";
    // The column contains cards still to be worked on
    ProjectColumnPurpose[ProjectColumnPurpose["TODO"] = 2] = "TODO";
})(ProjectColumnPurpose = exports.ProjectColumnPurpose || (exports.ProjectColumnPurpose = {}));
