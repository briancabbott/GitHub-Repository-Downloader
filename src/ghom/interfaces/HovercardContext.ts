// HovercardContext
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Hovercards preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// An individual line of a hovercard

// Implemented by
// GenericHovercardContext
// OrganizationTeamsHovercardContext
// OrganizationsHovercardContext
// Fields
// message (String!)
// A string describing this context

// octicon (String!)
// An octicon to accompany this context



// An individual line of a hovercard
export interface HovercardContext {
    // A string describing this context
    message: string

    // An octicon to accompany this context
    octicon: string
}