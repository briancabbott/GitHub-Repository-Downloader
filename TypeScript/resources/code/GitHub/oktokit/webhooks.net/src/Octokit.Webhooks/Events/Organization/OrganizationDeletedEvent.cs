namespace Octokit.Webhooks.Events.Organization;

[PublicAPI]
[WebhookActionType(OrganizationActionValue.Deleted)]
public sealed record OrganizationDeletedEvent : OrganizationEvent
{
    [JsonPropertyName("action")]
    public override string Action => OrganizationAction.Deleted;

    [JsonPropertyName("membership")]
    public Octokit.Webhooks.Models.Membership? Membership { get; init; }
}
