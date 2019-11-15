import { GitSignatureState } from "../enums/GitSignatureState";
import { User } from "../objects/User";

// GitSignature
// Information about a signature (GPG or S/MIME) on a Commit or Tag.

// Implemented by
// GpgSignature
// SmimeSignature
// UnknownSignature
// Fields
// email (String!)
// Email used to sign this object.

// isValid (Boolean!)
// True if the signature is valid and verified by GitHub.

// payload (String!)
// Payload for GPG signing object. Raw ODB object without the signature header.

// signature (String!)
// ASCII-armored signature header from object.

// signer (User)
// GitHub user corresponding to the email signing this commit.

// state (GitSignatureState!)
// The state of this signature. VALID if signature is valid and verified by GitHub, otherwise represents reason why signature is considered invalid.

// wasSignedByGitHub (Boolean!)
// True if the signature was made with GitHub's signing key.





// Information about a signature (GPG or S/MIME) on a Commit or Tag.
export interface GitSignature {

    // Email used to sign this object.
    email: string

    // True if the signature is valid and verified by GitHub.
    isValid: Boolean

    // Payload for GPG signing object. Raw ODB object without the signature header.
    payload: string

    // ASCII-armored signature header from object.
    signature: string

    // GitHub user corresponding to the email signing this commit.
    signer: User

    // The state of this signature. VALID if signature is valid and verified by GitHub, otherwise represents reason why signature is considered invalid.
    state: GitSignatureState

    // True if the signature was made with GitHub's signing key.
    wasSignedByGitHub: boolean

}