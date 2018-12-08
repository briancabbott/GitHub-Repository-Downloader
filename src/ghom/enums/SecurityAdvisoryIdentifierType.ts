// SecurityAdvisoryIdentifierType
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Access to GitHub Security Advisories preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// Identifier formats available for advisories.

// Values
// CVE
// Common Vulnerabilities and Exposures Identifier.

// GHSA
// GitHub Security Advisory ID.


// Identifier formats available for advisories.
export enum SecurityAdvisoryIdentifierType {
    // Common Vulnerabilities and Exposures Identifier.
    CVE,

    // GitHub Security Advisory ID.
    GHSA
}