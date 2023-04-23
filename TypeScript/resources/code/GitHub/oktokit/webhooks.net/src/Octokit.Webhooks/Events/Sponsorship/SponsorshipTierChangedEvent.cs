namespace Octokit.Webhooks.Events.Sponsorship;

using Octokit.Webhooks.Models.SponsorshipEvent;

[PublicAPI]
[WebhookActionType(SponsorshipActionValue.TierChanged)]
public sealed record SponsorshipTierChangedEvent : SponsorshipEvent
{
    [JsonPropertyName("action")]
    public override string Action => SponsorshipAction.TierChanged;

    [JsonPropertyName("changes")]
    public Changes Changes { get; init; } = null!;
}
