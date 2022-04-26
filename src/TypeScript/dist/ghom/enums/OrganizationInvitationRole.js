"use strict";
// OrganizationInvitationRole
// The possible organization invitation roles.
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationInvitationRole = void 0;
// Values
// ADMIN
// The user is invited to be an admin of the organization.
// BILLING_MANAGER
// The user is invited to be a billing manager of the organization.
// DIRECT_MEMBER
// The user is invited to be a direct member of the organization.
// REINSTATE
// The user's previous role will be reinstated.
// The possible organization invitation roles.
var OrganizationInvitationRole;
(function (OrganizationInvitationRole) {
    // The user is invited to be an admin of the organization.
    OrganizationInvitationRole[OrganizationInvitationRole["ADMIN"] = 0] = "ADMIN";
    // The user is invited to be a billing manager of the organization.
    OrganizationInvitationRole[OrganizationInvitationRole["BILLING_MANAGER"] = 1] = "BILLING_MANAGER";
    // The user is invited to be a direct member of the organization.
    OrganizationInvitationRole[OrganizationInvitationRole["DIRECT_MEMBER"] = 2] = "DIRECT_MEMBER";
    // The user's previous role will be reinstated.
    OrganizationInvitationRole[OrganizationInvitationRole["REINSTATE"] = 3] = "REINSTATE";
})(OrganizationInvitationRole = exports.OrganizationInvitationRole || (exports.OrganizationInvitationRole = {}));
