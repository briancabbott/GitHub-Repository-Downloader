import { Actor } from "../../interfaces/Actor";
import { Node } from "../../interfaces/Node";

// RenamedTitleEvent
// Represents a 'renamed' event on a given issue or pull request

// Implements
// Node
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// currentTitle (String!)
// Identifies the current title of the issue or pull request.

// id (ID!)
// previousTitle (String!)
// Identifies the previous title of the issue or pull request.

// subject (RenamedTitleSubject!)
// Subject that was renamed.





// Represents a 'renamed' event on a given issue or pull request
export interface RenamedTitleEvent extends Node {

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the current title of the issue or pull request.
    currentTitle: string

    // Identifies the previous title of the issue or pull request.
    previousTitle: string

    // Subject that was renamed.
    // subject: RenamedTitleSubject
}
