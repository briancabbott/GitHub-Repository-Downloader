// LockReason
// The possible reasons that an issue or pull request was locked.

// Values
// OFF_TOPIC
// The issue or pull request was locked because the conversation was off-topic.

// RESOLVED
// The issue or pull request was locked because the conversation was resolved.

// SPAM
// The issue or pull request was locked because the conversation was spam.

// TOO_HEATED
// The issue or pull request was locked because the conversation was too heated.




// The possible reasons that an issue or pull request was locked.
export enum LockReason {
    // The issue or pull request was locked because the conversation was off-topic.
    OFF_TOPIC,

    // The issue or pull request was locked because the conversation was resolved.
    RESOLVED,

    // The issue or pull request was locked because the conversation was spam.
    SPAM,

    // The issue or pull request was locked because the conversation was too heated.
    TOO_HEATED
}