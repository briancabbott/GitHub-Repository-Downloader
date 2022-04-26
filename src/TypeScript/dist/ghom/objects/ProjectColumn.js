"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectColumn = void 0;
// ProjectColumn
// A column inside a project.
// Implements
// Node
// Connections
// cards (ProjectCardConnection!)
// List of cards in the column
// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.
// archivedStates	[ProjectCardArchivedState]	
// A list of archived states to filter the cards by
// The default value is ["ARCHIVED", "NOT_ARCHIVED"].
// before	String	
// Returns the elements in the list that come before the specified cursor.
// first	Int	
// Returns the first n elements from the list.
// last	Int	
// Returns the last n elements from the list.
// Fields
// createdAt (DateTime!)
// Identifies the date and time when the object was created.
// databaseId (Int)
// Identifies the primary key from the database.
// id (ID!)
// name (String!)
// The project column's name.
// project (Project!)
// The project that contains this column.
// purpose (ProjectColumnPurpose)
// The semantic purpose of the column
// resourcePath (URI!)
// The HTTP path for this project column
// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.
// url (URI!)
// The HTTP URL for this project column
// A column inside a project.
class ProjectColumn {
}
exports.ProjectColumn = ProjectColumn;
