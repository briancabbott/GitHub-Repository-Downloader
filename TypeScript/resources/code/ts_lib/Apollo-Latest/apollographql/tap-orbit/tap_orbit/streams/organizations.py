from tap_orbit.streams.base import BaseStream
import singer

LOGGER = singer.get_logger()


class OrganizationsStream(BaseStream):
    API_METHOD = "GET"
    TABLE = "organizations"
    KEY_PROPERTIES = ["id"]
    
    organization_ids = set()

    def get_organization_ids(self):

        if OrganizationsStream.organization_ids:
            for organization_id in sorted(OrganizationsStream.organization_ids):
                yield organization_id
        else:
            pass

    def set_organization_ids(self, records):
        for record in records:
            if record.get("attributes", {"members_count": 0}).get("members_count") > 0:
                self.organization_ids.add(record.get("id"))

    def sync_paginated(self, path, method):
        table = self.TABLE
        page_number = 1

        while True:
            response = self.client.make_request(path, method, page_number)

            transformed = self.get_stream_data(response)

            with singer.metrics.record_counter(endpoint=table) as counter:
                singer.write_records(table, transformed)
                self.set_organization_ids(transformed)
                counter.increment(len(transformed))

            data = response.get("data", [])

            if len(data) > 0:
                page_number += 1
            else:
                break

    def response_key(self):
        return "data"

    @property
    def path(self):
        return "organizations"

    @property
    def api_method(self):
        return "GET"
