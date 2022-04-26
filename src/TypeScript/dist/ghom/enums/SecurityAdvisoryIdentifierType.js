"use strict";
// SecurityAdvisoryIdentifierType
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Access to GitHub Security Advisories preview for more details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityAdvisoryIdentifierType = void 0;
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// Identifier formats available for advisories.
// Values
// CVE
// Common Vulnerabilities and Exposures Identifier.
// GHSA
// GitHub Security Advisory ID.
// Identifier formats available for advisories.
var SecurityAdvisoryIdentifierType;
(function (SecurityAdvisoryIdentifierType) {
    // Common Vulnerabilities and Exposures Identifier.
    SecurityAdvisoryIdentifierType[SecurityAdvisoryIdentifierType["CVE"] = 0] = "CVE";
    // GitHub Security Advisory ID.
    SecurityAdvisoryIdentifierType[SecurityAdvisoryIdentifierType["GHSA"] = 1] = "GHSA";
})(SecurityAdvisoryIdentifierType = exports.SecurityAdvisoryIdentifierType || (exports.SecurityAdvisoryIdentifierType = {}));
