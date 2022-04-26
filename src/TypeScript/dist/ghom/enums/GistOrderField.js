"use strict";
// GistOrderField
// Properties by which gist connections can be ordered.
Object.defineProperty(exports, "__esModule", { value: true });
exports.GistOrderField = void 0;
// Values
// CREATED_AT
// Order gists by creation time
// PUSHED_AT
// Order gists by push time
// UPDATED_AT
// Order gists by update time
// Properties by which gist connections can be ordered.
var GistOrderField;
(function (GistOrderField) {
    // Order gists by creation time
    GistOrderField[GistOrderField["CREATED_AT"] = 0] = "CREATED_AT";
    // Order gists by push time
    GistOrderField[GistOrderField["PUSHED_AT"] = 1] = "PUSHED_AT";
    // Order gists by update time
    GistOrderField[GistOrderField["UPDATED_AT"] = 2] = "UPDATED_AT";
})(GistOrderField = exports.GistOrderField || (exports.GistOrderField = {}));
