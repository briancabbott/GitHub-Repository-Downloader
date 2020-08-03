import { Project } from "../objects/Project";

// ProjectOwner
// Represents an owner of a Project.

// Implemented by
// Organization
// Repository
// Fields
// id (ID!)
// project (Project)
// Find project by number.

// Argument	Type	Description
// number	Int!	
// The project number to find.

// projectsResourcePath (URI!)
// The HTTP path listing owners projects

// projectsUrl (URI!)
// The HTTP URL listing owners projects

// viewerCanCreateProjects (Boolean!)
// Can the current viewer create new projects on this owner.



// Represents an owner of a Project.
export interface ProjectOwner {

    // Find project by number.
    project: Project

    // Argument	    Type	    Description
    // number	    Int!	    The project number to find.

    // The HTTP path listing owners projects
    projectsResourcePath: URL

    // The HTTP URL listing owners projects
    projectsUrl: URL

    // Can the current viewer create new projects on this owner.
    viewerCanCreateProjects: boolean
}