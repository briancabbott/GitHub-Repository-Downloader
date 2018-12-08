import { Actor } from "../../interfaces/Actor";
import { Project } from "../Project";
import { ProjectCard } from "../ProjectCard";
import { Node } from "../../interfaces/Node";



// AddedToProjectEvent
// Represents a 'added_to_project' event on a given issue or pull request.

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

// projectCard (ProjectCard)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Project Event Details preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// Project card referenced by this project event.

// projectColumnName (String!)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Project Event Details preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// Column name referenced by this project event.


export interface AddedToProjectEvent extends Node {
    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the primary key from the database.
    databaseId: number

    // id (ID!)

    // Project referenced by event.
    project: Project


    // Project card referenced by this project event.
    projectCard: ProjectCard


    // Column name referenced by this project event.
    projectColumnName: string
}