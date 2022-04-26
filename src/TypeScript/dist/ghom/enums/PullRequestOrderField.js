"use strict";
// PullRequestOrderField
// Properties by which pull_requests connections can be ordered.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PullRequestOrderField = void 0;
// Values
// CREATED_AT
// Order pull_requests by creation time
// UPDATED_AT
// Order pull_requests by update time
// Properties by which pull_requests connections can be ordered.
var PullRequestOrderField;
(function (PullRequestOrderField) {
    // Order pull_requests by creation time
    PullRequestOrderField[PullRequestOrderField["CREATED_AT"] = 0] = "CREATED_AT";
    // Order pull_requests by update time
    PullRequestOrderField[PullRequestOrderField["UPDATED_AT"] = 1] = "UPDATED_AT";
})(PullRequestOrderField = exports.PullRequestOrderField || (exports.PullRequestOrderField = {}));
