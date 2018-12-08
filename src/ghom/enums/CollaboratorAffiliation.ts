


// CollaboratorAffiliation
// Collaborators affiliation level with a subject.
// Values
// ALL
// All collaborators the authenticated user can see.
// DIRECT
// All collaborators with permissions to an organization-owned subject, 
// regardless of organization membership status.
// OUTSIDE
// All outside collaborators of an organization-owned subject.


// Collaborators affiliation level with a subject.
export enum CollaboratorAffiliation {
    // All collaborators the authenticated user can see.
    ALL,

    // All collaborators with permissions to an organization-owned 
    // subject, regardless of organization membership status.
    DIRECT,

    // All outside collaborators of an organization-owned subject.
    OUTSIDE
}