import { Actor } from "../../interfaces/Actor";
import { Project } from "../Project";
import { ProjectCard } from "../ProjectCard";
import { Node } from "../../interfaces/Node";

// MovedColumnsInProjectEvent
// Represents a 'moved_columns_in_project' event on a given issue or pull request.

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
// previousProjectColumnName (String!)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Project Event Details preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// Column name the issue or pull request was moved from.

// project (Project)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Project Event Details preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// Project referenced by event.

// projectCard (ProjectCard)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Project Event Details preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// Project card referenced by this project event.

// projectColumnName (String!)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Project Event Details preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// Column name the issue or pull request was moved to.




// Represents a 'moved_columns_in_project' event on a given issue or pull request.
export interface MovedColumnsInProjectEvent extends Node {

    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the primary key from the database.
    databaseId: number

    // Column name the issue or pull request was moved from.
    previousProjectColumnName: string


    // Project referenced by event.
    project: Project


    // Project card referenced by this project event.
    projectCard: ProjectCard


    // Column name the issue or pull request was moved to.
    projectColumnName: string

    // Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
}