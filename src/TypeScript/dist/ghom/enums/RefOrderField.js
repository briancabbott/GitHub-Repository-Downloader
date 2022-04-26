"use strict";
// RefOrderField
// Properties by which ref connections can be ordered.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefOrderField = void 0;
// Values
// ALPHABETICAL
// Order refs by their alphanumeric name
// TAG_COMMIT_DATE
// Order refs by underlying commit date if the ref prefix is refs/tags/
// Properties by which ref connections can be ordered.
var RefOrderField;
(function (RefOrderField) {
    // Order refs by their alphanumeric name
    RefOrderField[RefOrderField["ALPHABETICAL"] = 0] = "ALPHABETICAL";
    // Order refs by underlying commit date if the ref prefix is refs/tags/
    RefOrderField[RefOrderField["TAG_COMMIT_DATE"] = 1] = "TAG_COMMIT_DATE";
})(RefOrderField = exports.RefOrderField || (exports.RefOrderField = {}));
