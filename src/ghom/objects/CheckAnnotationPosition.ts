// CheckAnnotationPosition
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Checks preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// A character position in a check annotation.

// Fields
// column (Int)
// Column number (1 indexed).

// line (Int!)
// Line number (1 indexed).


// A character position in a check annotation.
export class CheckAnnotationPosition {
    
    // Column number (1 indexed).
    column: number

    // Line number (1 indexed).
    line: number
}