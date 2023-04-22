import { Actor } from "../../interfaces/Actor";
import { Node } from "../../interfaces/Node";

// DemilestonedEvent
// Represents a 'demilestoned' event on a given issue or pull request.

// Implements
// Node
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// id (ID!)
// milestoneTitle (String!)
// Identifies the milestone title associated with the 'demilestoned' event.

// subject (MilestoneItem!)
// Object referenced by event.


// Represents a 'demilestoned' event on a given issue or pull request.
export interface DemilestonedEvent extends Node {

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the milestone title associated with the 'demilestoned' event.
    milestoneTitle: string

    // Object referenced by event.
    // subject: MilestoneItem
}
