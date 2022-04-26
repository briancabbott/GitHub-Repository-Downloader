"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckSuite = void 0;
// CheckSuite
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Checks preview for more details.
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// A check suite.
// Implements
// Node
// Connections
// checkRuns (CheckRunConnection)
// The check runs associated with a check suite.
// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.
// before	String	
// Returns the elements in the list that come before the specified cursor.
// filterBy	CheckRunFilter	
// Filters the check runs by this type.
// first	Int	
// Returns the first n elements from the list.
// last	Int	
// Returns the last n elements from the list.
// matchingPullRequests (PullRequestConnection)
// A list of open pull requests matching the check suite.
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
// app (App)
// The GitHub App which created this check suite.
// branch (Ref)
// The name of the branch for this check suite.
// commit (Commit!)
// The commit for this check suite
// conclusion (CheckConclusionState)
// The conclusion of this check suite.
// createdAt (DateTime!)
// Identifies the date and time when the object was created.
// databaseId (Int)
// Identifies the primary key from the database.
// id (ID!)
// push (Push)
// The push that triggered this check suite.
// repository (Repository!)
// The repository associated with this check suite.
// status (CheckStatusState!)
// The status of this check suite.
// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.
// This part of the schema is currently available for developers to preview. During 
// this preview period, the API may change without any advance notice. Please see the
// Checks preview for more details.
// A check suite.
class CheckSuite {
}
exports.CheckSuite = CheckSuite;
