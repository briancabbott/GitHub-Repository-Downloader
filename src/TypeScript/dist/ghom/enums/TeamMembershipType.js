"use strict";
// TeamMembershipType
// Defines which types of team members are included in the returned list. Can be one of IMMEDIATE, CHILD_TEAM or ALL.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMembershipType = void 0;
// Values
// ALL
// Includes immediate and child team members for the team.
// CHILD_TEAM
// Includes only child team members for the team.
// IMMEDIATE
// Includes only immediate members of the team.
// Defines which types of team members are included in the returned list. Can be one of IMMEDIATE, CHILD_TEAM or ALL.
var TeamMembershipType;
(function (TeamMembershipType) {
    // Includes immediate and child team members for the team.
    TeamMembershipType[TeamMembershipType["ALL"] = 0] = "ALL";
    // Includes only child team members for the team.
    TeamMembershipType[TeamMembershipType["CHILD_TEAM"] = 1] = "CHILD_TEAM";
    // Includes only immediate members of the team.
    TeamMembershipType[TeamMembershipType["IMMEDIATE"] = 2] = "IMMEDIATE";
})(TeamMembershipType = exports.TeamMembershipType || (exports.TeamMembershipType = {}));
