// RepositoryPermission
// The access level to a repository

// Values
// ADMIN
// Can read, clone, push, and add collaborators

// READ
// Can read and clone

// WRITE
// Can read, clone and push


// The access level to a repository
export enum RepositoryPermission {
    // Can read, clone, push, and add collaborators
    ADMIN,

    // Can read and clone
    READ,

    // Can read, clone and push
    WRITE
}