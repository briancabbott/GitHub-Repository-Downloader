﻿namespace Octokit.Webhooks.Models.StatusEvent;

[PublicAPI]
[JsonConverter(typeof(JsonStringEnumMemberConverterWithFallback))]
public enum CommitVerificationReason
{
    Unknown = -1,
    [EnumMember(Value = "expired_key")]
    ExpiredKey,
    [EnumMember(Value = "not_signing_key")]
    NotSigningKey,
    [EnumMember(Value = "gpgverify_error")]
    GpgverifyError,
    [EnumMember(Value = "gpgverify_unavailable")]
    GpgverifyUnavailable,
    [EnumMember(Value = "unsigned")]
    Unsigned,
    [EnumMember(Value = "unknown_signature_type")]
    UnknownSignatureType,
    [EnumMember(Value = "no_user")]
    NoUser,
    [EnumMember(Value = "unverified_email")]
    UnverifiedEmail,
    [EnumMember(Value = "bad_email")]
    BadEmail,
    [EnumMember(Value = "unknown_key")]
    UnknownKey,
    [EnumMember(Value = "malformed_signature")]
    MalformedSignature,
    [EnumMember(Value = "invalid")]
    Invalid,
    [EnumMember(Value = "valid")]
    Valid,
}
