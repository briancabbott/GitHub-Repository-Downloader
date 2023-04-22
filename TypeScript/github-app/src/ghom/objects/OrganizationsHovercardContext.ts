import { HovercardContext } from "../interfaces/HovercardContext";

// OrganizationsHovercardContext
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Hovercards preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// An organization list hovercard context

// Implements
// HovercardContext
// Connections
// relevantOrganizations (OrganizationConnection!)
// Organizations this user is a member of that are relevant

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

// totalOrganizationCount (Int!)
// The total number of organizations this user is in



// An organization list hovercard context
export class OrganizationsHovercardContext implements HovercardContext {

    // Connections
    //
    // relevantOrganizations (OrganizationConnection!)
    // Organizations this user is a member of that are relevant
    // 
    // Argument	    Type	        Description
    // after	    String	        Returns the elements in the list that come after the specified cursor.
    // before	    String	        Returns the elements in the list that come before the specified cursor.
    // first	    Int	            Returns the first n elements from the list.
    // last	        Int	            Returns the last n elements from the list.

    // Fields

    // A string describing this context
    message: string

    // An octicon to accompany this context
    octicon: string

    // The total number of organizations this user is in
    totalOrganizationCount: number
}
