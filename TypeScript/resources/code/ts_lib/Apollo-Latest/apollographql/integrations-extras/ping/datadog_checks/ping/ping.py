# Licensed under Simplified BSD License (see LICENSE)

import platform
import re

from datadog_checks.base import AgentCheck
from datadog_checks.base.errors import CheckException
from datadog_checks.base.utils.subprocess_output import get_subprocess_output


class PingCheck(AgentCheck):

    SERVICE_CHECK_NAME = "network.ping.can_connect"

    def _load_conf(self, instance):
        # Fetches the conf
        timeout = float(instance.get("timeout", 4))
        response_time = instance.get("collect_response_time", False)
        custom_tags = instance.get("tags", [])

        host = instance.get("host", None)
        if host is None:
            raise CheckException("A valid host must be specified")

        return host, custom_tags, timeout, response_time

    def _exec_ping(self, timeout, target_host):
        if platform.system() == "Windows":  # pragma: nocover
            countOption = "-n"
            timeoutOption = "-w"
            # The timeout option is in ms on Windows
            # https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/ping
            timeout = timeout * 1000
        elif platform.system() == "Darwin":
            countOption = "-c"
            timeoutOption = "-W"  # Also in ms on Mac
            timeout = timeout * 1000
        else:
            # The timeout option is is seconds on Linux, leaving timeout as is
            # https://linux.die.net/man/8/ping
            countOption = "-c"
            timeoutOption = "-W"

        self.log.debug("Running: ping %s %s %s %s %s", countOption, "1", timeoutOption, timeout, target_host)

        lines, err, retcode = get_subprocess_output(
            ["ping", countOption, "1", timeoutOption, str(timeout), target_host], self.log, raise_on_empty_output=True
        )
        self.log.debug("ping returned %s - %s - %s", retcode, lines, err)
        if retcode != 0:
            raise CheckException("ping returned {}: {}".format(retcode, err))

        return lines

    def check(self, instance):
        host, custom_tags, timeout, response_time = self._load_conf(instance)

        custom_tags.append("target_host:{}".format(host))

        try:
            lines = self._exec_ping(timeout, host)
            regex = re.compile(r"time[<=]((\d|\.)*)")
            result = regex.findall(lines)
            if result:
                length = result[0][0]
            else:
                raise CheckException("No time= found ({})".format(lines))

        except CheckException as e:
            self.log.info("%s is DOWN (%s)", host, e)
            self.service_check(self.SERVICE_CHECK_NAME, AgentCheck.CRITICAL, custom_tags, message=str(e))
            self.gauge(self.SERVICE_CHECK_NAME, 0, custom_tags)

            raise e

        if response_time:
            self.gauge("network.ping.response_time", length, custom_tags)

        self.log.debug("%s is UP", host)
        self.service_check(self.SERVICE_CHECK_NAME, AgentCheck.OK, custom_tags)
        self.gauge(self.SERVICE_CHECK_NAME, 1, custom_tags)
