"use strict";
// CheckRunType
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Checks preview for more details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckRunType = void 0;
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// The possible types of check runs.
// Values
// ALL
// Every check run available.
// LATEST
// The latest check run.
// The possible types of check runs.
var CheckRunType;
(function (CheckRunType) {
    // Every check run available.
    CheckRunType[CheckRunType["ALL"] = 0] = "ALL";
    // The latest check run.
    CheckRunType[CheckRunType["LATEST"] = 1] = "LATEST";
})(CheckRunType = exports.CheckRunType || (exports.CheckRunType = {}));
