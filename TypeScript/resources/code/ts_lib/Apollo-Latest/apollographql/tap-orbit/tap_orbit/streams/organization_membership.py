from tap_orbit.streams.base import BaseStream
from tap_orbit.streams.organizations import OrganizationsStream
import singer

LOGGER = singer.get_logger()


class OrganizationMembershipStream(BaseStream):
    API_METHOD = "GET"
    TABLE = "organization_membership"
    KEY_PROPERTIES = ["id"]
    
    def sync_data(self):
        table = self.TABLE
        LOGGER.info("Syncing data for {}".format(table))
        
        organization_stream = OrganizationsStream(self.config, self.state, self.catalog, self.client)
        organization_ids = organization_stream.get_organization_ids()
        
        if organization_ids:
            for organization_id in organization_ids:
                self.sync_paginated(organization_id, self.api_method)

        return self.state

    def sync_paginated(self, organization_id, method):
        table = self.TABLE
        page_number = 1

        path = self.get_path(organization_id)

        while True:
            response = self.client.make_request(path, method, page_number)

            transformed = self.get_stream_data(response, organization_id)

            with singer.metrics.record_counter(endpoint=table) as counter:
                singer.write_records(table, transformed)
                counter.increment(len(transformed))

            data = response.get("data", [])

            if len(data) > 0:
                page_number += 1
            else:
                break

    def get_stream_data(self, response, organization_id):
        transformed = []

        for record in response[self.response_key()]:
            record["organization_id"] = organization_id
            record["member_id"] = record["id"]
            record = self.transform_record(record)
            transformed.append(record)

        return transformed


    def response_key(self):
        return "data"

    def get_path(self, organization_id):
        path = f"organizations/{organization_id}/members"
        return path

    @property
    def api_method(self):
        return "GET"
