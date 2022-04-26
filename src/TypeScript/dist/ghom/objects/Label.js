"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
// Label
// A label for categorizing Issues or Milestones with a given Repository.
// Implements
// Node
// Connections
// issues (IssueConnection!)
// A list of issues associated with this label.
// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.
// before	String	
// Returns the elements in the list that come before the specified cursor.
// filterBy	IssueFilters	
// Filtering options for issues returned from the connection.
// first	Int	
// Returns the first n elements from the list.
// labels	[String!]	
// A list of label names to filter the pull requests by.
// last	Int	
// Returns the last n elements from the list.
// orderBy	IssueOrder	
// Ordering options for issues returned from the connection.
// states	[IssueState!]	
// A list of states to filter the issues by.
// pullRequests (PullRequestConnection!)
// A list of pull requests associated with this label.
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
// color (String!)
// Identifies the label color.
// createdAt (DateTime)
// Identifies the date and time when the label was created.
// description (String)
// A brief description of this label.
// id (ID!)
// isDefault (Boolean!)
// Indicates whether or not this is a default label.
// name (String!)
// Identifies the label name.
// repository (Repository!)
// The repository associated with this label.
// resourcePath (URI!)
// The HTTP path for this label.
// updatedAt (DateTime)
// Identifies the date and time when the label was last updated.
// url (URI!)
// The HTTP URL for this label.
// A label for categorizing Issues or Milestones with a given Repository.
class Label {
}
exports.Label = Label;
