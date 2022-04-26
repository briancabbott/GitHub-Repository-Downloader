"use strict";
// GitSignatureState
// The state of a Git signature.
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitSignatureState = void 0;
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
var GitSignatureState;
(function (GitSignatureState) {
    // The signing certificate or its chain could not be verified
    GitSignatureState[GitSignatureState["BAD_CERT"] = 0] = "BAD_CERT";
    // Invalid email used for signing
    GitSignatureState[GitSignatureState["BAD_EMAIL"] = 1] = "BAD_EMAIL";
    // Signing key expired
    GitSignatureState[GitSignatureState["EXPIRED_KEY"] = 2] = "EXPIRED_KEY";
    // Internal error - the GPG verification service misbehaved
    GitSignatureState[GitSignatureState["GPGVERIFY_ERROR"] = 3] = "GPGVERIFY_ERROR";
    // Internal error - the GPG verification service is unavailable at the moment
    GitSignatureState[GitSignatureState["GPGVERIFY_UNAVAILABLE"] = 4] = "GPGVERIFY_UNAVAILABLE";
    // Invalid signature
    GitSignatureState[GitSignatureState["INVALID"] = 5] = "INVALID";
    // Malformed signature
    GitSignatureState[GitSignatureState["MALFORMED_SIG"] = 6] = "MALFORMED_SIG";
    // The usage flags for the key that signed this don't allow signing
    GitSignatureState[GitSignatureState["NOT_SIGNING_KEY"] = 7] = "NOT_SIGNING_KEY";
    // Email used for signing not known to GitHub
    GitSignatureState[GitSignatureState["NO_USER"] = 8] = "NO_USER";
    // Valid siganture, though certificate revocation check failed
    GitSignatureState[GitSignatureState["OCSP_ERROR"] = 9] = "OCSP_ERROR";
    // Valid signature, pending certificate revocation checking
    GitSignatureState[GitSignatureState["OCSP_PENDING"] = 10] = "OCSP_PENDING";
    // One or more certificates in chain has been revoked
    GitSignatureState[GitSignatureState["OCSP_REVOKED"] = 11] = "OCSP_REVOKED";
    // Key used for signing not known to GitHub
    GitSignatureState[GitSignatureState["UNKNOWN_KEY"] = 12] = "UNKNOWN_KEY";
    // Unknown signature type
    GitSignatureState[GitSignatureState["UNKNOWN_SIG_TYPE"] = 13] = "UNKNOWN_SIG_TYPE";
    // Unsigned
    GitSignatureState[GitSignatureState["UNSIGNED"] = 14] = "UNSIGNED";
    // Email used for signing unverified on GitHub
    GitSignatureState[GitSignatureState["UNVERIFIED_EMAIL"] = 15] = "UNVERIFIED_EMAIL";
    // Valid signature and verified by GitHub
    GitSignatureState[GitSignatureState["VALID"] = 16] = "VALID";
})(GitSignatureState = exports.GitSignatureState || (exports.GitSignatureState = {}));
