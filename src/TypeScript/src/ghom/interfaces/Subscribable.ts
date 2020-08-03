import { ID } from "../scalars/Id";
import { SubscriptionState } from "../enums/SubscriptionState";

// Subscribable
// Entities that can be subscribed to for web and email notifications.

// Implemented by
// Commit
// Issue
// PullRequest
// Repository
// Team
// TeamDiscussion
// Fields
// id (ID!)
// viewerCanSubscribe (Boolean!)
// Check if the viewer is able to change their subscription status for the repository.

// viewerSubscription (SubscriptionState)
// Identifies if the viewer is watching, not watching, or ignoring the subscribable entity.


// Entities that can be subscribed to for web and email notifications.
export interface Subscribable {
    id: ID

    // Check if the viewer is able to change their subscription status for the repository.
    viewerCanSubscribe: boolean

    // Identifies if the viewer is watching, not watching, or ignoring the subscribable entity.
    viewerSubscription: SubscriptionState
}