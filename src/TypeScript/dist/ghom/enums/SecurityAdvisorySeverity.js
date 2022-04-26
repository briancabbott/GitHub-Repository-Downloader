"use strict";
// SecurityAdvisorySeverity
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Access to GitHub Security Advisories preview for more details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityAdvisorySeverity = void 0;
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// Severity of the vulnerability.
// Values
// CRITICAL
// Critical.
// HIGH
// High.
// LOW
// Low.
// MODERATE
// Moderate.
// Severity of the vulnerability.
var SecurityAdvisorySeverity;
(function (SecurityAdvisorySeverity) {
    // Critical.
    SecurityAdvisorySeverity[SecurityAdvisorySeverity["CRITICAL"] = 0] = "CRITICAL";
    // High.
    SecurityAdvisorySeverity[SecurityAdvisorySeverity["HIGH"] = 1] = "HIGH";
    // Low.
    SecurityAdvisorySeverity[SecurityAdvisorySeverity["LOW"] = 2] = "LOW";
    // Moderate.
    SecurityAdvisorySeverity[SecurityAdvisorySeverity["MODERATE"] = 3] = "MODERATE";
})(SecurityAdvisorySeverity = exports.SecurityAdvisorySeverity || (exports.SecurityAdvisorySeverity = {}));
