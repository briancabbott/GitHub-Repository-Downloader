import { ID } from "../scalars/Id";
import { Repository } from "../../model";

// RepositoryOwner
// Represents an owner of a Repository.

// Implemented by
// Organization
// User
// Fields
// avatarUrl (URI!)
// A URL pointing to the owner's public avatar.

// Argument	Type	Description
// size	Int	
// The size of the resulting square image.

// id (ID!)
// login (String!)
// The username used to login.

// repository (Repository)
// Find Repository.

// Argument	Type	Description
// name	String!	
// Name of Repository to find.

// resourcePath (URI!)
// The HTTP URL for the owner.

// url (URI!)
// The HTTP URL for the owner.




// Represents an owner of a Repository.
export interface RepositoryOwner {
    // A URL pointing to the owner's public avatar.
    avatarUrl: URL

    // Argument	    Type	Description
    // size	        Int	    The size of the resulting square image.

    id: ID

    // The username used to login.
    login: string

    // Find Repository.
    repository: Repository

    // Argument	    Type	    Description
    // name	        String!	    Name of Repository to find.

    // The HTTP URL for the owner.
    resourcePath: URL

    // The HTTP URL for the owner.
    url: URL
}