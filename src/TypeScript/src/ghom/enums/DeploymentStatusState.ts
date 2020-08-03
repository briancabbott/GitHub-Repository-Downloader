// DeploymentStatusState
// The possible states for a deployment status.

// Values
// ERROR
// The deployment experienced an error.

// FAILURE
// The deployment has failed.

// INACTIVE
// The deployment is inactive.

// PENDING
// The deployment is pending.

// SUCCESS
// The deployment was successful.



// The possible states for a deployment status.
export enum DeploymentStatusState {
    // The deployment experienced an error.
    ERROR,

    // The deployment has failed.
    FAILURE,

    // The deployment is inactive.
    INACTIVE,

    // The deployment is pending.
    PENDING,

    // The deployment was successful.
    SUCCESS
}