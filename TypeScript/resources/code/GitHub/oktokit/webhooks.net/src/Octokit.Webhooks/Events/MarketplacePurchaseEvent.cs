namespace Octokit.Webhooks.Events;

[PublicAPI]
[WebhookEventType(WebhookEventType.MarketplacePurchase)]
[JsonConverter(typeof(WebhookConverter<MarketplacePurchaseEvent>))]
public abstract record MarketplacePurchaseEvent : WebhookEvent
{
    [JsonPropertyName("effective_date")]
    public string EffectiveDate { get; init; } = null!;

    [JsonPropertyName("marketplace_purchase")]
    public Models.MarketplacePurchase MarketplacePurchase { get; init; } = null!;

    [JsonPropertyName("previous_marketplace_purchase")]
    public Models.MarketplacePurchase? PreviousMarketplacePurchase { get; init; }
}
