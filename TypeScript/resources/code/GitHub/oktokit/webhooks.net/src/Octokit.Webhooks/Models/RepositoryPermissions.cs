﻿namespace Octokit.Webhooks.Models;

[PublicAPI]
public sealed record RepositoryPermissions
{
    [JsonPropertyName("pull")]
    public bool Pull { get; init; }

    [JsonPropertyName("push")]
    public bool Push { get; init; }

    [JsonPropertyName("admin")]
    public bool Admin { get; init; }

    [JsonPropertyName("maintain")]
    public bool? Maintain { get; init; }

    [JsonPropertyName("triage")]
    public bool? Triage { get; init; }
}
