﻿namespace Octokit.Webhooks.Models.StatusEvent;

[PublicAPI]
public sealed record CommitDetailsTree
{
    [JsonPropertyName("sha")]
    public string Sha { get; init; } = null!;

    [JsonPropertyName("url")]
    public string Url { get; init; } = null!;
}
