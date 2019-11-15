import { Node } from "../interfaces/Node";
import { Actor } from "../interfaces/Actor";
import { ID } from "../scalars/Id";
import { Project } from "./Project";
import { ProjectCardState } from "../enums/ProjectCardState";
import { ProjectColumn } from "./ProjectColumn";

// ProjectCard
// A card in a project.

// Implements
// Node
// Fields
// column (ProjectColumn)
// The project column this card is associated under. A card may only belong to one project column at a time. The column field will be null if the card is created in a pending state and has yet to be associated with a column. Once cards are associated with a column, they will not become pending in the future.

// content (ProjectCardItem)
// The card content item

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// creator (Actor)
// The actor who created this card

// databaseId (Int)
// Identifies the primary key from the database.

// id (ID!)
// isArchived (Boolean!)
// Whether the card is archived

// note (String)
// The card note

// project (Project!)
// The project that contains this card.

// resourcePath (URI!)
// The HTTP path for this card

// state (ProjectCardState)
// The state of ProjectCard

// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.

// url (URI!)
// The HTTP URL for this card


// A card in a project.
export class ProjectCard implements Node {

    // The project column this card is associated under. A card may only belong to one project column at a time. The column field will be null if the card is created in a pending state and has yet to be associated with a column. Once cards are associated with a column, they will not become pending in the future.
    column: ProjectColumn

    // The card content item
    // content: ProjectCardItem

    // Identifies the date and time when the object was created.
    createdAt: Date

    // The actor who created this card
    creator: Actor

    // Identifies the primary key from the database.
    databaseId: number

    id: ID

    // Whether the card is archived
    isArchived: boolean

    // The card note
    note: string

    // The project that contains this card.
    project: Project

    // The HTTP path for this card
    resourcePath: URL

    // The state of ProjectCard
    state: ProjectCardState

    // Identifies the date and time when the object was last updated.
    updatedAt: Date

    // The HTTP URL for this card
    url: URL
}
