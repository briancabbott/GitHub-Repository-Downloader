


// Closable
// An object that can be closed

// Implemented by
// Issue
// Milestone
// Project
// PullRequest
// Fields
// closed (Boolean!)
// true if the object is closed (definition of closed may depend on type)

// closedAt (DateTime)
// Identifies the date and time when the object was closed.

// An object that can be closed
export interface Closable {

    // true if the object is closed (definition of closed may depend on type)
    closed: boolean

    // Identifies the date and time when the object was closed.
    closedAt: Date
}
