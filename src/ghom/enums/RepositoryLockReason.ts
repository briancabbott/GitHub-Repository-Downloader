// RepositoryLockReason
// The possible reasons a given repository could be in a locked state.

// Values
// BILLING
// The repository is locked due to a billing related reason.

// MIGRATING
// The repository is locked due to a migration.

// MOVING
// The repository is locked due to a move.

// RENAME
// The repository is locked due to a rename.





// The possible reasons a given repository could be in a locked state.
export enum RepositoryLockReason {
    // The repository is locked due to a billing related reason.
    BILLING,

    // The repository is locked due to a migration.
    MIGRATING,

    // The repository is locked due to a move.
    MOVING,

    // The repository is locked due to a rename.
    RENAME
} 