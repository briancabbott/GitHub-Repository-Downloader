"use strict";
// SubscriptionState
// The possible states of a subscription.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionState = void 0;
// Values
// IGNORED
// The User is never notified.
// SUBSCRIBED
// The User is notified of all conversations.
// UNSUBSCRIBED
// The User is only notified when participating or @mentioned.
// The possible states of a subscription.
var SubscriptionState;
(function (SubscriptionState) {
    // The User is never notified.
    SubscriptionState[SubscriptionState["IGNORED"] = 0] = "IGNORED";
    // The User is notified of all conversations.
    SubscriptionState[SubscriptionState["SUBSCRIBED"] = 1] = "SUBSCRIBED";
    // The User is only notified when participating or @mentioned.
    SubscriptionState[SubscriptionState["UNSUBSCRIBED"] = 2] = "UNSUBSCRIBED";
})(SubscriptionState = exports.SubscriptionState || (exports.SubscriptionState = {}));
