"use strict";
// TeamMemberRole
// The possible team member roles; either 'maintainer' or 'member'.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberRole = void 0;
// Values
// MAINTAINER
// A team maintainer has permission to add and remove team members.
// MEMBER
// A team member has no administrative permissions on the team.
// The possible team member roles; either 'maintainer' or 'member'.
var TeamMemberRole;
(function (TeamMemberRole) {
    // A team maintainer has permission to add and remove team members.
    TeamMemberRole[TeamMemberRole["MAINTAINER"] = 0] = "MAINTAINER";
    // A team member has no administrative permissions on the team.
    TeamMemberRole[TeamMemberRole["MEMBER"] = 1] = "MEMBER";
})(TeamMemberRole = exports.TeamMemberRole || (exports.TeamMemberRole = {}));
