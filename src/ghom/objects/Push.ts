import { Node } from "../interfaces/Node";
import { ID } from "../scalars/Id";
import { GitObjectID } from "../scalars/GitObjectID";
import { URL } from "url";
import { User } from "./User";
import { Repository } from "../../model";

// Push
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Checks preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// A Git push.

// Implements
// Node
// Fields
// id (ID!)
// nextSha (GitObjectID)
// The SHA after the push

// permalink (URI!)
// The permalink for this push.

// previousSha (GitObjectID)
// The SHA before the push

// pusher (User!)
// The user who pushed

// repository (Repository!)
// The repository that was pushed to




// A Git push.
export class Push implements Node {

    // 
    // Fields
    // 

    id: ID

    // The SHA after the push
    nextSha: GitObjectID

    // The permalink for this push.
    permalink: URL

    // The SHA before the push
    previousSha: GitObjectID

    // The user who pushed
    pusher: User

    // The repository that was pushed to
    repository: Repository

}