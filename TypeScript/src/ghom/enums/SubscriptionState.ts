// SubscriptionState
// The possible states of a subscription.

// Values
// IGNORED
// The User is never notified.

// SUBSCRIBED
// The User is notified of all conversations.

// UNSUBSCRIBED
// The User is only notified when participating or @mentioned.


// The possible states of a subscription.
export enum SubscriptionState {
    // The User is never notified.
    IGNORED, 

    // The User is notified of all conversations.
    SUBSCRIBED,

    // The User is only notified when participating or @mentioned.
    UNSUBSCRIBED
}
