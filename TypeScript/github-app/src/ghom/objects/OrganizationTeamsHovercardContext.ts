import { HovercardContext } from "../interfaces/HovercardContext";

// OrganizationTeamsHovercardContext
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Hovercards preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// An organization teams hovercard context

// Implements
// HovercardContext
// Connections
// relevantTeams (TeamConnection!)
// Teams in this organization the user is a member of that are relevant

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// Fields
// message (String!)
// A string describing this context

// octicon (String!)
// An octicon to accompany this context

// teamsResourcePath (URI!)
// The path for the full team list for this user

// teamsUrl (URI!)
// The URL for the full team list for this user

// totalTeamCount (Int!)
// The total number of teams the user is on in the organization





// An organization teams hovercard context
export class OrganizationTeamsHovercardContext implements HovercardContext {

    // Connections
    //
    // relevantTeams (TeamConnection!)
    // Teams in this organization the user is a member of that are relevant
    //
    // Argument	    Type	    Description
    // after	    String	    Returns the elements in the list that come after the specified cursor.
    // before	    String	    Returns the elements in the list that come before the specified cursor.
    // first	    Int	        Returns the first n elements from the list.
    // last	        Int	        Returns the last n elements from the list.

    // Fields

    // A string describing this context
    message: string

    // An octicon to accompany this context
    octicon: string

    // The path for the full team list for this user
    teamsResourcePath: URL

    // The URL for the full team list for this user
    teamsUrl: URL

    // The total number of teams the user is on in the organization
    totalTeamCount: number
}