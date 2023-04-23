﻿namespace Octokit.Webhooks.Models;

[PublicAPI]
[JsonConverter(typeof(JsonStringEnumMemberConverterWithFallback))]
public enum AuthorAssociation
{
    Unknown = -1,
    [EnumMember(Value = "COLLABORATOR")]
    Collaborator,
    [EnumMember(Value = "CONTRIBUTOR")]
    Contributor,
    [EnumMember(Value = "FIRST_TIMER")]
    FirstTimer,
    [EnumMember(Value = "FIRST_TIME_CONTRIBUTOR")]
    FirstTimeContributor,
    [EnumMember(Value = "MANNEQUIN")]
    Mannequin,
    [EnumMember(Value = "MEMBER")]
    Member,
    [EnumMember(Value = "NONE")]
    None,
    [EnumMember(Value = "OWNER")]
    Owner,
}
