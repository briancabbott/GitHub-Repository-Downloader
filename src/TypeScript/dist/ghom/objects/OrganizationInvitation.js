"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationInvitation = void 0;
// OrganizationInvitation
// An Invitation for a user to an organization.
// Implements
// Node
// Fields
// createdAt (DateTime!)
// Identifies the date and time when the object was created.
// email (String)
// The email address of the user invited to the organization.
// id (ID!)
// invitationType (OrganizationInvitationType!)
// The type of invitation that was sent (e.g. email, user).
// invitee (User)
// The user who was invited to the organization.
// inviter (User!)
// The user who created the invitation.
// organization (Organization!)
// The organization the invite is for
// role (OrganizationInvitationRole!)
// The user's pending role in the organization (e.g. member, owner).
// An Invitation for a user to an organization.
class OrganizationInvitation {
}
exports.OrganizationInvitation = OrganizationInvitation;
