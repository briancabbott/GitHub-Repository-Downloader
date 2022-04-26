"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCard = void 0;
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
class ProjectCard {
}
exports.ProjectCard = ProjectCard;
