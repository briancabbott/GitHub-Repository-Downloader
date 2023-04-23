﻿namespace Octokit.Webhooks.Models;

[PublicAPI]
public sealed record WorkflowPullRequestBase
{
    [JsonPropertyName("ref")]
    public string Ref { get; init; } = null!;

    [JsonPropertyName("sha")]
    public string Sha { get; init; } = null!;

    [JsonPropertyName("repo")]
    public RepoRef Repo { get; init; } = null!;
}
