﻿namespace Octokit.Webhooks.Models.LabelEvent;

[PublicAPI]
public sealed record Changes
{
    [JsonPropertyName("color")]
    public ChangesColor Color { get; init; } = null!;

    [JsonPropertyName("name")]
    public ChangesName Name { get; init; } = null!;

    [JsonPropertyName("description")]
    public ChangesDescription Description { get; init; } = null!;
}
