import { Closable } from "../interfaces/Closable";
import { Updatable } from "../interfaces/Updatable";
import { HTMLString } from "../scalars/HTMLString";
import { Actor } from "../interfaces/Actor";
import { ID } from "../scalars/Id";
import { ProjectOwner } from "../interfaces/ProjectOwner";
import { ProjectState } from "../enums/ProjectState";
import { Node } from "../interfaces/Node";

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
export class Project implements Closable, Node, Updatable {

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

    // The project's description body.
    body: string

    // The projects description body rendered to HTML.
    bodyHTML: HTMLString

    // true if the object is closed (definition of closed may depend on type)
    closed: boolean

    // Identifies the date and time when the object was closed.
    closedAt: Date

    // Identifies the date and time when the object was created.
    createdAt: Date

    // The actor who originally created the project.
    creator: Actor

    // Identifies the primary key from the database.
    databaseId: number

    id: ID

    // The project's name.
    name: string

    // The project's number.
    number: number

    // The project's owner. Currently limited to repositories and organizations.
    owner: ProjectOwner

    // The HTTP path for this project
    resourcePath: URL

    // Whether the project is open or closed.
    state: ProjectState

    // Identifies the date and time when the object was last updated.
    updatedAt: Date

    // The HTTP URL for this project
    url: URL

    // Check if the current viewer can update this object.
    viewerCanUpdate: boolean

}