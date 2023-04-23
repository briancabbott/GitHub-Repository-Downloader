﻿namespace Octokit.Webhooks.Events.BranchProtectionRule;

[PublicAPI]
public sealed record BranchProtectionRuleAction : WebhookEventAction
{
    public static readonly BranchProtectionRuleAction Created = new(BranchProtectionRuleActionValue.Created);

    public static readonly BranchProtectionRuleAction Deleted = new(BranchProtectionRuleActionValue.Deleted);

    public static readonly BranchProtectionRuleAction Edited = new(BranchProtectionRuleActionValue.Edited);

    private BranchProtectionRuleAction(string value)
        : base(value)
    {
    }
}
