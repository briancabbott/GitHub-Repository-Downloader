// GitSignatureState
// The state of a Git signature.

// Values
// BAD_CERT
// The signing certificate or its chain could not be verified

// BAD_EMAIL
// Invalid email used for signing

// EXPIRED_KEY
// Signing key expired

// GPGVERIFY_ERROR
// Internal error - the GPG verification service misbehaved

// GPGVERIFY_UNAVAILABLE
// Internal error - the GPG verification service is unavailable at the moment

// INVALID
// Invalid signature

// MALFORMED_SIG
// Malformed signature

// NOT_SIGNING_KEY
// The usage flags for the key that signed this don't allow signing

// NO_USER
// Email used for signing not known to GitHub

// OCSP_ERROR
// Valid siganture, though certificate revocation check failed

// OCSP_PENDING
// Valid signature, pending certificate revocation checking

// OCSP_REVOKED
// One or more certificates in chain has been revoked

// UNKNOWN_KEY
// Key used for signing not known to GitHub

// UNKNOWN_SIG_TYPE
// Unknown signature type

// UNSIGNED
// Unsigned

// UNVERIFIED_EMAIL
// Email used for signing unverified on GitHub

// VALID
// Valid signature and verified by GitHub


// The state of a Git signature.
export enum GitSignatureState {

    // The signing certificate or its chain could not be verified
    BAD_CERT,

    // Invalid email used for signing
    BAD_EMAIL,

    // Signing key expired
    EXPIRED_KEY,

    // Internal error - the GPG verification service misbehaved
    GPGVERIFY_ERROR,

    // Internal error - the GPG verification service is unavailable at the moment
    GPGVERIFY_UNAVAILABLE,

    // Invalid signature
    INVALID,

    // Malformed signature
    MALFORMED_SIG,

    // The usage flags for the key that signed this don't allow signing
    NOT_SIGNING_KEY,

    // Email used for signing not known to GitHub
    NO_USER,

    // Valid siganture, though certificate revocation check failed
    OCSP_ERROR,

    // Valid signature, pending certificate revocation checking
    OCSP_PENDING,

    // One or more certificates in chain has been revoked
    OCSP_REVOKED,

    // Key used for signing not known to GitHub
    UNKNOWN_KEY,

    // Unknown signature type
    UNKNOWN_SIG_TYPE,

    // Unsigned
    UNSIGNED,

    // Email used for signing unverified on GitHub
    UNVERIFIED_EMAIL,

    // Valid signature and verified by GitHub
    VALID
}