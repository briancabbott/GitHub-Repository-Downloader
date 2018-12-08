import { URL } from "url";
import { User } from "./User";

// GitActor
// Represents an actor in a Git commit (ie. an author or committer).

// Fields
// avatarUrl (URI!)
// A URL pointing to the author's public avatar.

// Argument	Type	Description
// size	Int	
// The size of the resulting square image.

// date (GitTimestamp)
// The timestamp of the Git action (authoring or committing).

// email (String)
// The email in the Git commit.

// name (String)
// The name in the Git commit.

// user (User)
// The GitHub user corresponding to the email field. Null if no such user exists.





// Represents an actor in a Git commit (ie. an author or committer).
export class GitActor {
    // A URL pointing to the author's public avatar.
    avatarUrl: URL

    // Argument	    Type	    Description
    // size	        Int	        The size of the resulting square image.

    // The timestamp of the Git action (authoring or committing).
    date: GitTimestamp

    // The email in the Git commit.
    email: string

    // The name in the Git commit.
    name: string

    // The GitHub user corresponding to the email field. Null if no such user exists.
    user: User
}