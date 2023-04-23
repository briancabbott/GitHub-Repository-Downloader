namespace Octokit.Webhooks.Models;

[PublicAPI]
public sealed record ReferencedWorkflow
{
    [JsonPropertyName("path")]
    public string Path { get; init; } = null!;

    [JsonPropertyName("sha")]
    public string Sha { get; init; } = null!;

    [JsonPropertyName("ref")]
    public string? Ref { get; init; }
}
