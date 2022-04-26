"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gist = void 0;
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
class Gist {
}
exports.Gist = Gist;
