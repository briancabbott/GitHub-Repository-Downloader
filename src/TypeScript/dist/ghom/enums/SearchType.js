"use strict";
// SearchType
// Represents the individual results of a search.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchType = void 0;
// Values
// ISSUE
// Returns results matching issues in repositories.
// REPOSITORY
// Returns results matching repositories.
// USER
// Returns results matching users and organizations on GitHub.
// Represents the individual results of a search.
var SearchType;
(function (SearchType) {
    // Returns results matching issues in repositories.
    SearchType[SearchType["ISSUE"] = 0] = "ISSUE";
    // Returns results matching repositories.
    SearchType[SearchType["REPOSITORY"] = 1] = "REPOSITORY";
    // Returns results matching users and organizations on GitHub.
    SearchType[SearchType["USER"] = 2] = "USER";
})(SearchType = exports.SearchType || (exports.SearchType = {}));
