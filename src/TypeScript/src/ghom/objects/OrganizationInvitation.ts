import { ID } from "../scalars/Id";
import { OrganizationInvitationType } from "../enums/OrganizationInvitationType";
import { User } from "./User";
import { Organization } from "./Organization";
import { OrganizationInvitationRole } from "../enums/OrganizationInvitationRole";
import { Node } from "../interfaces/Node";

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
export class OrganizationInvitation implements Node {
    
    // Fields

    // Identifies the date and time when the object was created.
    createdAt: Date

    // The email address of the user invited to the organization.
    email: String

    id: ID

    // The type of invitation that was sent (e.g. email, user).
    invitationType: OrganizationInvitationType

    // The user who was invited to the organization.
    invitee: User

    // The user who created the invitation.
    inviter: User

    // The organization the invite is for
    organization: Organization

    // The user's pending role in the organization (e.g. member, owner).
    role: OrganizationInvitationRole
}