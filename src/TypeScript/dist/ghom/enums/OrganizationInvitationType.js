"use strict";
// OrganizationInvitationType
// The possible organization invitation types.
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationInvitationType = void 0;
// Values
// EMAIL
// The invitation was to an email address.
// USER
// The invitation was to an existing user.
// The possible organization invitation types.
var OrganizationInvitationType;
(function (OrganizationInvitationType) {
    // The invitation was to an email address.
    OrganizationInvitationType[OrganizationInvitationType["EMAIL"] = 0] = "EMAIL";
    // The invitation was to an existing user.
    OrganizationInvitationType[OrganizationInvitationType["USER"] = 1] = "USER";
})(OrganizationInvitationType = exports.OrganizationInvitationType || (exports.OrganizationInvitationType = {}));
