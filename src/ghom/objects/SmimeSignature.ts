SmimeSignature
Represents an S/MIME signature on a Commit or Tag.

Implements
GitSignature
Fields
email (String!)
Email used to sign this object.

isValid (Boolean!)
True if the signature is valid and verified by GitHub.

payload (String!)
Payload for GPG signing object. Raw ODB object without the signature header.

signature (String!)
ASCII-armored signature header from object.

signer (User)
GitHub user corresponding to the email signing this commit.

state (GitSignatureState!)
The state of this signature. VALID if signature is valid and verified by GitHub, otherwise represents reason why signature is considered invalid.

wasSignedByGitHub (Boolean!)
True if the signature was made with GitHub's signing key.