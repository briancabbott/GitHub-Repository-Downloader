namespace Octokit.Webhooks.Events.MarketplacePurchase;

[PublicAPI]
public sealed record MarketplacePurchaseAction : WebhookEventAction
{
    public static readonly MarketplacePurchaseAction Cancelled = new(MarketplacePurchaseActionValue.Cancelled);

    public static readonly MarketplacePurchaseAction Changed = new(MarketplacePurchaseActionValue.Changed);

    public static readonly MarketplacePurchaseAction PendingChange = new(MarketplacePurchaseActionValue.PendingChange);

    public static readonly MarketplacePurchaseAction PendingChangeCancelled = new(MarketplacePurchaseActionValue.PendingChangeCancelled);

    public static readonly MarketplacePurchaseAction Purchased = new(MarketplacePurchaseActionValue.Purchased);

    private MarketplacePurchaseAction(string value)
        : base(value)
    {
    }
}
