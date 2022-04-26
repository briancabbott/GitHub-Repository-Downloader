"use strict";
// CheckAnnotationLevel
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Checks preview for more details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAnnotationLevel = void 0;
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
var CheckAnnotationLevel;
(function (CheckAnnotationLevel) {
    // An annotation indicating an inescapable error.
    CheckAnnotationLevel[CheckAnnotationLevel["FAILURE"] = 0] = "FAILURE";
    // An annotation indicating some information.
    CheckAnnotationLevel[CheckAnnotationLevel["NOTICE"] = 1] = "NOTICE";
    // An annotation indicating an ignorable error.
    CheckAnnotationLevel[CheckAnnotationLevel["WARNING"] = 2] = "WARNING";
})(CheckAnnotationLevel = exports.CheckAnnotationLevel || (exports.CheckAnnotationLevel = {}));
