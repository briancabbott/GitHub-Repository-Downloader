// OrganizationInvitationRole
// The possible organization invitation roles.

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
export enum OrganizationInvitationRole {
    // The user is invited to be an admin of the organization.
    ADMIN,

    // The user is invited to be a billing manager of the organization.
    BILLING_MANAGER,

    // The user is invited to be a direct member of the organization.
    DIRECT_MEMBER,

    // The user's previous role will be reinstated.
    REINSTATE
}