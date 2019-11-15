import { ID } from "../scalars/Id";
import { Node } from "../interfaces/Node";
import { UniformResourceLocatable } from "../interfaces/UniformResourceLocatable";
import { Actor } from "../interfaces/Actor";

// Bot
// A special type of user which takes actions on behalf of GitHub Apps.

// Implements
// Actor
// Node
// UniformResourceLocatable
// Fields
// avatarUrl (URI!)
// A URL pointing to the GitHub App's public avatar.

// Argument	Type	Description
// size	Int	
// The size of the resulting square image.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// databaseId (Int)
// Identifies the primary key from the database.

// id (ID!)
// login (String!)
// The username of the actor.

// resourcePath (URI!)
// The HTTP path for this bot

// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.

// url (URI!)
// The HTTP URL for this bot



// A special type of user which takes actions on behalf of GitHub Apps.
export class Bot implements Actor, Node, UniformResourceLocatable {
    // A URL pointing to the GitHub App's public avatar.
    // 
    // Argument	    Type	    Description
    // size	        Int	        The size of the resulting square image.
    //     
    avatarUrl: URL
 
    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the primary key from the database.
    databaseId: number

    id: ID

    // The username of the actor.
    login: string

    // The HTTP path for this bot
    resourcePath: URL

    // Identifies the date and time when the object was last updated.
    updatedAt: Date

    // The HTTP URL for this bot
    url: URL
}