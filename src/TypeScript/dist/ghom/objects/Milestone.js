"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Milestone = void 0;
// Milestone
// Represents a Milestone object on a given repository.
// Implements
// Closable
// Node
// UniformResourceLocatable
// Connections
// issues (IssueConnection!)
// A list of issues associated with the milestone.
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
// A list of pull requests associated with the milestone.
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
// closed (Boolean!)
// true if the object is closed (definition of closed may depend on type)
// closedAt (DateTime)
// Identifies the date and time when the object was closed.
// createdAt (DateTime!)
// Identifies the date and time when the object was created.
// creator (Actor)
// Identifies the actor who created the milestone.
// description (String)
// Identifies the description of the milestone.
// dueOn (DateTime)
// Identifies the due date of the milestone.
// id (ID!)
// number (Int!)
// Identifies the number of the milestone.
// repository (Repository!)
// The repository associated with this milestone.
// resourcePath (URI!)
// The HTTP path for this milestone
// state (MilestoneState!)
// Identifies the state of the milestone.
// title (String!)
// Identifies the title of the milestone.
// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.
// url (URI!)
// The HTTP URL for this milestone
// Represents a Milestone object on a given repository.
class Milestone {
}
exports.Milestone = Milestone;
