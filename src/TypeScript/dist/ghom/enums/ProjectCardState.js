"use strict";
// ProjectCardState
// Various content states of a ProjectCard
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCardState = void 0;
// Values
// CONTENT_ONLY
// The card has content only.
// NOTE_ONLY
// The card has a note only.
// REDACTED
// The card is redacted.
// Various content states of a ProjectCard
var ProjectCardState;
(function (ProjectCardState) {
    // The card has content only.
    ProjectCardState[ProjectCardState["CONTENT_ONLY"] = 0] = "CONTENT_ONLY";
    // The card has a note only.
    ProjectCardState[ProjectCardState["NOTE_ONLY"] = 1] = "NOTE_ONLY";
    // The card is redacted.
    ProjectCardState[ProjectCardState["REDACTED"] = 2] = "REDACTED";
})(ProjectCardState = exports.ProjectCardState || (exports.ProjectCardState = {}));
