"use strict";
// SecurityAdvisoryOrderField
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Access to GitHub Security Advisories preview for more details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityAdvisoryOrderField = void 0;
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// Properties by which security advisory connections can be ordered.
// Values
// PUBLISHED_AT
// Order advisories by publication time
// UPDATED_AT
// Order advisories by update time
// Properties by which security advisory connections can be ordered.
var SecurityAdvisoryOrderField;
(function (SecurityAdvisoryOrderField) {
    // Order advisories by publication time
    SecurityAdvisoryOrderField[SecurityAdvisoryOrderField["PUBLISHED_AT"] = 0] = "PUBLISHED_AT";
    // Order advisories by update time
    SecurityAdvisoryOrderField[SecurityAdvisoryOrderField["UPDATED_AT"] = 1] = "UPDATED_AT";
})(SecurityAdvisoryOrderField = exports.SecurityAdvisoryOrderField || (exports.SecurityAdvisoryOrderField = {}));
