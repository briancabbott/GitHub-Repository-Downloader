// MergeStateStatus
// Detailed status information about a pull request merge.

// Values
// BEHIND
// The head ref is out of date.

// BLOCKED
// The merge is blocked.

// CLEAN
// Mergeable and passing commit status.

// DIRTY
// The merge commit cannot be cleanly created.

// HAS_HOOKS
// Mergeable with passing commit status and pre-recieve hooks.

// UNKNOWN
// The state cannot currently be determined.

// UNSTABLE
// Mergeable with non-passing commit status.


// Detailed status information about a pull request merge.
export enum MergeStateStatus {

    // The head ref is out of date.
    BEHIND,

    // The merge is blocked.
    BLOCKED,

    // Mergeable and passing commit status.
    CLEAN,

    // The merge commit cannot be cleanly created.
    DIRTY,

    // Mergeable with passing commit status and pre-recieve hooks.
    HAS_HOOKS,

    // The state cannot currently be determined.
    UNKNOWN,

    // Mergeable with non-passing commit status.
    UNSTABLE
}