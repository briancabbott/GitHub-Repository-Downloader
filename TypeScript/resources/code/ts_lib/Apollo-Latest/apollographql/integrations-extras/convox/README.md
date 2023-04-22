# Convox Integration

## Overview

Get metrics from Convox in real-time to visualize your containers' performance:

![snapshot][1]

## Setup

Please refer to the [Convox setup doc page][2].

### Deploy the Datadog Agent

You can deploy the Datadog Agent as a Convox app with a very simple `docker-compose.yml` manifest:

```shell
# check out the repo
$ git clone https://github.com/convox-examples/dd-agent.git
$ cd dd-agent

# deploy the agent app and secret
$ convox apps create
$ convox env set API_KEY=<your api key>
$ convox deploy
$ convox scale agent --count=3 --cpu=10 --memory=128
```

Use a `count` that matches the `InstanceCount` parameter of your Rack.

### Auto Scaling

If autoscaling is enabled on your Rack, you'll need to dynamically scale the Datadog agent count to match the Rack instance count.

See the [Listening for ECS CloudWatch Events Tutorial][3] for guidance.

## Data Collected

### Metrics

The Convox check does not include any metrics.

### Events

The Convox check does not include any events.

### Service Checks

The Convox check does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][4].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/convox/images/snapshot.png
[2]: https://docs.convox.com/external-services/datadog
[3]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_cwet.html
[4]: https://docs.datadoghq.com/help/
