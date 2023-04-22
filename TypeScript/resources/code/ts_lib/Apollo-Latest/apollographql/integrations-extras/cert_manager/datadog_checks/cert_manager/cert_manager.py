# (C) Datadog, Inc. 2019
# All rights reserved
# Licensed under a 3-clause BSD style license (see LICENSE)
from datadog_checks.base import OpenMetricsBaseCheck

from .metrics import METRIC_MAP


class CertManagerCheck(OpenMetricsBaseCheck):
    DEFAULT_METRIC_LIMIT = 0
    HEALTH_METRIC = 'cert_manager.prometheus.health'

    def __init__(self, name, init_config, instances=None):
        default_instances = {'cert_manager': {'metrics': [METRIC_MAP]}}

        super(CertManagerCheck, self).__init__(
            name, init_config, instances, default_instances=default_instances, default_namespace='cert_manager'
        )

    def process(self, scraper_config, metric_transformers=None):
        # Override the process method to send the health metric, as service checks can be disabled.
        endpoint = scraper_config.get('prometheus_url')
        tags = ['endpoint:{}'.format(endpoint)]
        if scraper_config.get('custom_tags'):
            tags.extend(scraper_config.get('custom_tags'))

        try:
            super(CertManagerCheck, self).process(scraper_config, metric_transformers=metric_transformers)
        except Exception:
            self.gauge(self.HEALTH_METRIC, 1, tags=tags)
            raise
        else:
            self.gauge(self.HEALTH_METRIC, 0, tags=tags)
