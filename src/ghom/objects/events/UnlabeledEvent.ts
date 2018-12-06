import { Actor } from "../../interfaces/Actor";

// UnlabeledEvent
// Represents an 'unlabeled' event on a given issue or pull request.

// Implements
// Node
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// id (ID!)
// label (Label!)
// Identifies the label associated with the 'unlabeled' event.

// labelable (Labelable!)
// Identifies the Labelable associated with the event.




// Represents an 'unlabeled' event on a given issue or pull request.
export interface UnlabeledEvent {

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the label associated with the 'unlabeled' event.
    label: Label

    // Identifies the Labelable associated with the event.
    labelable: Labelable

}