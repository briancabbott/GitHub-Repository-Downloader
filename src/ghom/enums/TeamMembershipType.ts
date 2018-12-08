// TeamMembershipType
// Defines which types of team members are included in the returned list. Can be one of IMMEDIATE, CHILD_TEAM or ALL.

// Values
// ALL
// Includes immediate and child team members for the team.

// CHILD_TEAM
// Includes only child team members for the team.

// IMMEDIATE
// Includes only immediate members of the team.



// Defines which types of team members are included in the returned list. Can be one of IMMEDIATE, CHILD_TEAM or ALL.
export enum TeamMembershipType {
    // Includes immediate and child team members for the team.
    ALL,

    // Includes only child team members for the team.
    CHILD_TEAM,

    // Includes only immediate members of the team.
    IMMEDIATE
}