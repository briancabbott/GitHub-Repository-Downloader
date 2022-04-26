"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAnnotation = void 0;
// CheckAnnotation
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Checks preview for more details.
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// A single check annotation.
// Fields
// annotationLevel (CheckAnnotationLevel)
// The annotation's severity level.
// blobUrl (URI!)
// The path to the file that this annotation was made on.
// databaseId (Int)
// Identifies the primary key from the database.
// location (CheckAnnotationSpan!)
// The position of this annotation.
// message (String!)
// The annotation's message.
// path (String!)
// The path that this annotation was made on.
// rawDetails (String)
// Additional information about the annotation.
// title (String)
// The annotation's title
// A single check annotation.
class CheckAnnotation {
}
exports.CheckAnnotation = CheckAnnotation;
