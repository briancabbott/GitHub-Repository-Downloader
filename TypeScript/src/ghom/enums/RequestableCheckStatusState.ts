// RequestableCheckStatusState
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Checks preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// The possible states that can be requested when creating a check run.

// Values
// COMPLETED
// The check suite or run has been completed.

// IN_PROGRESS
// The check suite or run is in progress.

// QUEUED
// The check suite or run has been queued.


// The possible states that can be requested when creating a check run.
export enum RequestableCheckStatusState {

    // The check suite or run has been completed.
    COMPLETED,

    // The check suite or run is in progress.
    IN_PROGRESS,

    // The check suite or run has been queued.
    QUEUED
}