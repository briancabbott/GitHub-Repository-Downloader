// CheckAnnotationLevel
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Checks preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// Represents an annotation's information level.

// Values
// FAILURE
// An annotation indicating an inescapable error.

// NOTICE
// An annotation indicating some information.

// WARNING
// An annotation indicating an ignorable error.



// Represents an annotation's information level.
export enum CheckAnnotationLevel {

    // An annotation indicating an inescapable error.
    FAILURE,

    // An annotation indicating some information.
    NOTICE,

    // An annotation indicating an ignorable error.
    WARNING
}
