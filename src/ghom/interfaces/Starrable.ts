import { ID } from "../scalars/Id";



// Starrable
// Things that can be starred.

// Implemented by
// Gist
// Repository
// Topic
// Fields
// id (ID!)
// viewerHasStarred (Boolean!)
// Returns a boolean indicating whether the viewing user has starred this starrable.


// Things that can be starred.
export interface Starrable {
    id: ID

    // Returns a boolean indicating whether the viewing user has starred this starrable.
    viewerHasStarred: boolean
}