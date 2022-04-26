"use strict";
// IssueOrderField
// Properties by which issue connections can be ordered.
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueOrderField = void 0;
// Values
// COMMENTS
// Order issues by comment count
// CREATED_AT
// Order issues by creation time
// UPDATED_AT
// Order issues by update time
// Properties by which issue connections can be ordered.
var IssueOrderField;
(function (IssueOrderField) {
    // Order issues by comment count
    IssueOrderField[IssueOrderField["COMMENTS"] = 0] = "COMMENTS";
    // Order issues by creation time
    IssueOrderField[IssueOrderField["CREATED_AT"] = 1] = "CREATED_AT";
    // Order issues by update time
    IssueOrderField[IssueOrderField["UPDATED_AT"] = 2] = "UPDATED_AT";
})(IssueOrderField = exports.IssueOrderField || (exports.IssueOrderField = {}));
