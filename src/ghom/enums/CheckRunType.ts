// CheckRunType
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Checks preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// The possible types of check runs.

// Values
// ALL
// Every check run available.

// LATEST
// The latest check run.





// The possible types of check runs.
export enum CheckRunType {
    // Every check run available.
    ALL,

    // The latest check run.
    LATEST
}