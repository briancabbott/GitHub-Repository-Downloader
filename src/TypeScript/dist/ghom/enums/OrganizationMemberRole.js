"use strict";
// OrganizationMemberRole
// The possible roles within an organization for its members.
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationMemberRole = void 0;
// Values
// ADMIN
// The user is an administrator of the organization.
// MEMBER
// The user is a member of the organization.
// The possible roles within an organization for its members.
var OrganizationMemberRole;
(function (OrganizationMemberRole) {
    // The user is an administrator of the organization.
    OrganizationMemberRole[OrganizationMemberRole["ADMIN"] = 0] = "ADMIN";
    // The user is a member of the organization.
    OrganizationMemberRole[OrganizationMemberRole["MEMBER"] = 1] = "MEMBER";
})(OrganizationMemberRole = exports.OrganizationMemberRole || (exports.OrganizationMemberRole = {}));
