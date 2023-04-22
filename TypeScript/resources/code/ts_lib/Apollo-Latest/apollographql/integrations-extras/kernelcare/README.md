# Agent Check: kernelcare

## Overview

[KernelCare][1] is a live patching system that automatically applies security patches to Linux kernel vulnerabilities, with no reboots. It’s used on over 500,000 servers, and has been used to patch servers running for 6+ years for Dell, Zoom and other enterprise companies. It works with all major Linux distributions, such as RHEL, CentOS, Amazon Linux, and Ubuntu & interoperates with common vulnerability scanners, cloud monitoring tools & patch management solutions.

This integration allows you to forward the Kernelcare metrics through the Datadog Agent.

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### Installation

To install the kernelcare check on your host:

1. Install the [developer toolkit](https://docs.datadoghq.com/developers/integrations/new_check_howto/#developer-toolkit) on any machine.
2. Run `ddev release build kernelcare` to build the package.
3. [Download the Datadog Agent](https://app.datadoghq.com/account/settings#agent).
4. Upload the build artifact to any host with an Agent and run `datadog-agent integration install -w path/to/kernelcare/dist/<ARTIFACT_NAME>.whl`.

### Configuration

1. Edit the `kernelcare.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your kernelcare performance data. See the [sample kernelcare.d/conf.yaml][3] for all available configuration options.

2. [Restart the Agent][4].

### Validation

[Run the Agent's status subcommand][5] and look for `kernelcare` under the Checks section.

## Data Collected

### Metrics

See [metadata.csv][6] for a list of metrics provided by this check.

### Service Checks

**`kernelcare.can_connect`**:

Returns `Critical` if the Agent cannot connect to Kernelcare to collect metrics, returns `OK` otherwise.

### Events

kernelcare does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][7].

[1]: https://www.kernelcare.com
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-extras/blob/master/kernelcare/datadog_checks/kernelcare/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-extras/blob/master/kernelcare/metadata.csv
[7]: https://docs.datadoghq.com/help/
