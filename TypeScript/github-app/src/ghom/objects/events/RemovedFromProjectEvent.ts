import { Actor } from "../../interfaces/Actor";
import { Project } from "../Project";
import { Node } from "../../interfaces/Node";

// RemovedFromProjectEvent
// Represents a 'removed_from_project' event on a given issue or pull request.

// Implements
// Node
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// databaseId (Int)
// Identifies the primary key from the database.

// id (ID!)
// project (Project)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Project Event Details preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// Project referenced by event.

// projectColumnName (String!)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Project Event Details preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// Column name referenced by this project event.







// Represents a 'removed_from_project' event on a given issue or pull request.
export interface RemovedFromProjectEvent extends Node {

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the primary key from the database.
    databaseId: number

    // Project referenced by event.
    project: Project

    // Column name referenced by this project event.
    projectColumnName: string
}
