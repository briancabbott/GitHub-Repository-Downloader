// Actor
// Represents an object which can take actions on GitHub. Typically a User or Bot.

// Implemented by
// Bot
// Organization
// User
// Fields
// avatarUrl (URI!)
// A URL pointing to the actor's public avatar.

// Argument	Type	Description
// size	Int	
// The size of the resulting square image.

// login (String!)
// The username of the actor.

// resourcePath (URI!)
// The HTTP path for this actor.

// url (URI!)
// The HTTP URL for this actor.

export interface Actor {

    // A URL pointing to the actor's public avatar.
    //    - Argument	Type	Description
    //    - size	    Int	    The size of the resulting square image.
    avatarUrl: URL

    // The username of the actor.
    login: string

    // The HTTP path for this actor.
    resourcePath: URL

    // The HTTP URL for this actor.
    url: URL
}