import { ID } from "../scalars/Id";
import { Project } from "./Project";
import { ProjectColumnPurpose } from "../enums/ProjectColumnPurpose";
import { Node } from "../interfaces/Node";

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
export class ProjectColumn implements Node {

    // Connections
    // 
    // cards (ProjectCardConnection!)
    // List of cards in the column
    //
    // Argument	        Type	    Description
    // after	        String	    Returns the elements in the list that come after the specified cursor.
    // archivedStates	[ProjectCardArchivedState]	A list of archived states to filter the cards by
    // The default value is ["ARCHIVED", "NOT_ARCHIVED"].
    // before	        String	    Returns the elements in the list that come before the specified cursor.
    // first	        Int	        Returns the first n elements from the list.
    // last	            Int	        Returns the last n elements from the list.


    // Fields

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the primary key from the database.
    databaseId: number

    id: ID

    // The project column's name.
    name: string

    // The project that contains this column.
    project: Project

    // The semantic purpose of the column
    purpose: ProjectColumnPurpose

    // The HTTP path for this project column
    resourcePath: URL

    // Identifies the date and time when the object was last updated.
    updatedAt: Date

    // The HTTP URL for this project column
    url: URL
}