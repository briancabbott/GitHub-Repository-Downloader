﻿namespace Octokit.Webhooks.Events;

using Octokit.Webhooks.Models.MetaEvent;

[PublicAPI]
[WebhookEventType(WebhookEventType.Meta)]
[JsonConverter(typeof(WebhookConverter<MetaEvent>))]
public abstract record MetaEvent : WebhookEvent
{
    [JsonPropertyName("hook_id")]
    public long HookId { get; init; }

    [JsonPropertyName("hook")]
    public Hook Hook { get; init; } = null!;
}
