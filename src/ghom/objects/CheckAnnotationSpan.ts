import { CheckAnnotationPosition } from "./CheckAnnotationPosition";

// CheckAnnotationSpan
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Checks preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// An inclusive pair of positions for a check annotation.

// Fields
// end (CheckAnnotationPosition!)
// End position (inclusive).

// start (CheckAnnotationPosition!)
// Start position (inclusive).





// An inclusive pair of positions for a check annotation.
export class CheckAnnotationSpan {

    // End position (inclusive).
    end: CheckAnnotationPosition

    // Start position (inclusive).
    start: CheckAnnotationPosition
}