﻿namespace Octokit.Webhooks;

[AttributeUsage(AttributeTargets.Class)]
internal sealed class WebhookActionTypeAttribute : Attribute
{
    public WebhookActionTypeAttribute(string actionType) => this.ActionType = actionType;

    public string ActionType { get; }
}
