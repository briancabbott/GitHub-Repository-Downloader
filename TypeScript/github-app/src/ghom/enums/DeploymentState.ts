// DeploymentState
// The possible states in which a deployment can be.

// Values
// ABANDONED
// The pending deployment was not updated after 30 minutes.

// ACTIVE
// The deployment is currently active.

// DESTROYED
// An inactive transient deployment.

// ERROR
// The deployment experienced an error.

// FAILURE
// The deployment has failed.

// INACTIVE
// The deployment is inactive.

// IN_PROGRESS
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Deployments preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// The deployment is in progress.

// PENDING
// The deployment is pending.

// QUEUED
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Deployments preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// The deployment has queued


// The possible states in which a deployment can be.
export enum DeploymentState{
    // The pending deployment was not updated after 30 minutes.
    ABANDONED,

    // The deployment is currently active.
    ACTIVE,

    // An inactive transient deployment.
    DESTROYED,

    // The deployment experienced an error.
    ERROR,

    // The deployment has failed.
    FAILURE,

    // The deployment is inactive.
    INACTIVE,

    // The deployment is in progress.
    IN_PROGRESS,

    // The deployment is pending.
    PENDING,

    // The deployment has queued
    QUEUED
}