"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
// Project
// Projects manage issues, pull requests and notes within a project owner.
// Implements
// Closable
// Node
// Updatable
// Connections
// columns (ProjectColumnConnection!)
// List of columns in the project
// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.
// before	String	
// Returns the elements in the list that come before the specified cursor.
// first	Int	
// Returns the first n elements from the list.
// last	Int	
// Returns the last n elements from the list.
// pendingCards (ProjectCardConnection!)
// List of pending cards in this project
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
// body (String)
// The project's description body.
// bodyHTML (HTML!)
// The projects description body rendered to HTML.
// closed (Boolean!)
// true if the object is closed (definition of closed may depend on type)
// closedAt (DateTime)
// Identifies the date and time when the object was closed.
// createdAt (DateTime!)
// Identifies the date and time when the object was created.
// creator (Actor)
// The actor who originally created the project.
// databaseId (Int)
// Identifies the primary key from the database.
// id (ID!)
// name (String!)
// The project's name.
// number (Int!)
// The project's number.
// owner (ProjectOwner!)
// The project's owner. Currently limited to repositories and organizations.
// resourcePath (URI!)
// The HTTP path for this project
// state (ProjectState!)
// Whether the project is open or closed.
// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.
// url (URI!)
// The HTTP URL for this project
// viewerCanUpdate (Boolean!)
// Check if the current viewer can update this object.
// Projects manage issues, pull requests and notes within a project owner.
class Project {
}
exports.Project = Project;
