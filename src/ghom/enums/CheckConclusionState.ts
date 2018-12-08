// CheckConclusionState
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Checks preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// The possible states for a check suite or run conclusion.

// Values
// ACTION_REQUIRED
// The check suite or run requires action.

// CANCELLED
// The check suite or run has been cancelled.

// FAILURE
// The check suite or run has failed.

// NEUTRAL
// The check suite or run was neutral.

// SUCCESS
// The check suite or run has succeeded.

// TIMED_OUT
// The check suite or run has timed out.


// The possible states for a check suite or run conclusion.
export enum CheckConclusionState {
    // The check suite or run requires action.
    ACTION_REQUIRED,

    // The check suite or run has been cancelled.
    CANCELLED,

    // The check suite or run has failed.
    FAILURE,

    // The check suite or run was neutral.
    NEUTRAL,

    // The check suite or run has succeeded.
    SUCCESS,

    // The check suite or run has timed out.
    TIMED_OUT
}