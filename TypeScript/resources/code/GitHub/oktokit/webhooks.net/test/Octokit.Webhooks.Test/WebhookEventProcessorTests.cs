namespace Octokit.Webhooks.Test;

using System;
using FluentAssertions;
using Xunit;

public class WebhookEventProcessorTests
{
    private readonly TestWebhookEventProcessor webhookEventProcessor = new();

    [Theory]
    [ClassData(typeof(WebhookEventProcessorTestsData))]
    public void CanDeserialize(WebhookHeaders headers, string payload, Type expectedType)
    {
        var result = this.webhookEventProcessor.DeserializeWebhookEvent(headers, payload);
        result.Should().BeAssignableTo(expectedType);
    }
}
