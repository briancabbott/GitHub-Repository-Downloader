﻿namespace Octokit.Webhooks.Models;

[PublicAPI]
public sealed record Committer
{
    [JsonPropertyName("name")]
    public string Name { get; init; } = null!;

    [JsonPropertyName("email")]
    public string? Email { get; init; }

    [JsonPropertyName("date")]
    public string? Date { get; init; }

    [JsonPropertyName("username")]
    public string? Username { get; init; }
}
