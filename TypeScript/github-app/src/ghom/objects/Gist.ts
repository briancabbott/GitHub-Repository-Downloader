import { Node } from "../interfaces/Node";
import { Starrable } from "../interfaces/Starrable";
import { ID } from "../scalars/Id";
import { RepositoryOwner } from "../interfaces/RepositoryOwner";

// Gist
// A Gist.

// Implements
// Node
// Starrable
// Connections
// comments (GistCommentConnection!)
// A list of comments associated with the gist

// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.

// before	String
// Returns the elements in the list that come before the specified cursor.

// first	Int
// Returns the first n elements from the list.

// last	Int
// Returns the last n elements from the list.

// stargazers (StargazerConnection!)
// A list of users who have starred this starrable.

// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.

// before	String
// Returns the elements in the list that come before the specified cursor.

// first	Int
// Returns the first n elements from the list.

// last	Int
// Returns the last n elements from the list.

// orderBy	StarOrder
// Order for connection

// Fields
// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// description (String)
// The gist description.

// id (ID!)
// isPublic (Boolean!)
// Whether the gist is public or not.

// name (String!)
// The gist name.

// owner (RepositoryOwner)
// The gist owner.

// pushedAt (DateTime)
// Identifies when the gist was last pushed to.

// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.

// viewerHasStarred (Boolean!)
// Returns a boolean indicating whether the viewing user has starred this starrable.




// A Gist.
export class Gist implements Node, Starrable {

    // Connections
    // comments (GistCommentConnection!)
    // A list of comments associated with the gist
    //
    // Argument	    Type	Description
    // after	    String	Returns the elements in the list that come after the specified cursor.
    // before	    String	Returns the elements in the list that come before the specified cursor.
    // first	    Int	    Returns the first n elements from the list.
    // last	        Int	    Returns the last n elements from the list.
    //
    // stargazers (StargazerConnection!)
    // A list of users who have starred this starrable.
    // Argument	    Type	    Description
    // after	    String	    Returns the elements in the list that come after the specified cursor.
    // before	    String	    Returns the elements in the list that come before the specified cursor.
    // first	    Int	        Returns the first n elements from the list.
    // last	        Int	        Returns the last n elements from the list.

    // Order for connection
    // orderBy: StarOrder


    // Identifies the date and time when the object was created.
    createdAt: Date

    // The gist description.
    description: String

    id: ID

    // Whether the gist is public or not.
    isPublic: boolean

    // The gist name.
    name: string

    // The gist owner.
    owner: RepositoryOwner

    // Identifies when the gist was last pushed to.
    pushedAt: Date

    // Identifies the date and time when the object was last updated.
    updatedAt: Date

    // Returns a boolean indicating whether the viewing user has starred this starrable.
    viewerHasStarred: boolean
}
