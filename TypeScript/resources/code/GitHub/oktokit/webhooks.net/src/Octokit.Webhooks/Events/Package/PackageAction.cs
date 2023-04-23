namespace Octokit.Webhooks.Events.Package;

[PublicAPI]
public sealed record PackageAction : WebhookEventAction
{
    public static readonly PackageAction Published = new(PackageActionValue.Published);

    public static readonly PackageAction Updated = new(PackageActionValue.Updated);

    private PackageAction(string value)
        : base(value)
    {
    }
}
