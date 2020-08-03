import { Actor } from "../../interfaces/Actor";
import { Node } from "../../interfaces/Node";
import { Label } from "../Label";
import { Labelable } from "../../interfaces/Labelable";

// LabeledEvent
// Represents a 'labeled' event on a given issue or pull request.

// Implements
// Node
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// id (ID!)
// label (Label!)
// Identifies the label associated with the 'labeled' event.

// labelable (Labelable!)
// Identifies the Labelable associated with the event.


// Represents a 'labeled' event on a given issue or pull request.
export interface LabeledEvent extends Node {

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date


    // Identifies the label associated with the 'labeled' event.
    label: Label

    // Identifies the Labelable associated with the event.
    labelable: Labelable
}