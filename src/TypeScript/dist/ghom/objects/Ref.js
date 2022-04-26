"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ref = void 0;
// Ref
// Represents a Git reference.
// Implements
// Node
// Connections
// associatedPullRequests (PullRequestConnection!)
// A list of pull requests with this ref as the head ref.
// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.
// baseRefName	String	
// The base ref name to filter the pull requests by.
// before	String	
// Returns the elements in the list that come before the specified cursor.
// first	Int	
// Returns the first n elements from the list.
// headRefName	String	
// The head ref name to filter the pull requests by.
// labels	[String!]	
// A list of label names to filter the pull requests by.
// last	Int	
// Returns the last n elements from the list.
// orderBy	IssueOrder	
// Ordering options for pull requests returned from the connection.
// states	[PullRequestState!]	
// A list of states to filter the pull requests by.
// Fields
// id (ID!)
// name (String!)
// The ref name.
// prefix (String!)
// The ref's prefix, such as refs/heads/ or refs/tags/.
// repository (Repository!)
// The repository the ref belongs to.
// target (GitObject!)
// The object the ref points to.
// Represents a Git reference.
class Ref {
}
exports.Ref = Ref;
