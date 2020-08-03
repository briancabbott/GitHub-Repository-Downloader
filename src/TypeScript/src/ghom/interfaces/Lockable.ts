import { LockReason } from "../enums/LockReason";

// Lockable
// An object that can be locked.

// Implemented by
// Issue
// PullRequest
// Fields
// activeLockReason (LockReason)
// Reason that the conversation was locked.

// locked (Boolean!)
// true if the object is locked


// An object that can be locked.
export interface Lockable {
    //  Reason that the conversation was locked.
    activeLockReason: LockReason
    
    // true if the object is locked
    locked: boolean
}