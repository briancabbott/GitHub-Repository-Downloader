"use strict";
// TeamRole
// The role of a user on a team.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRole = void 0;
// Values
// ADMIN
// User has admin rights on the team.
// MEMBER
// User is a member of the team.
// The role of a user on a team.
var TeamRole;
(function (TeamRole) {
    // User has admin rights on the team.
    TeamRole[TeamRole["ADMIN"] = 0] = "ADMIN";
    // User is a member of the team.
    TeamRole[TeamRole["MEMBER"] = 1] = "MEMBER";
})(TeamRole = exports.TeamRole || (exports.TeamRole = {}));
