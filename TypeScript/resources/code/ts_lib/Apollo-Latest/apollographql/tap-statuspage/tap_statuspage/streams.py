import inspect
import os
from typing import ClassVar, Dict, List, Optional
from dateutil import parser
from datetime import datetime, timezone
from dateutil.relativedelta import relativedelta

import backoff
import requests
import singer

LOGGER = singer.get_logger()


def is_fatal_code(e: requests.exceptions.RequestException) -> bool:
    '''Helper function to determine if a Requests reponse status code
    is a "fatal" status code. If it is, the backoff decorator will giveup
    instead of attemtping to backoff.'''
    return 400 <= e.response.status_code < 500 and e.response.status_code != 429


class StatuspageStream:
    base_url: ClassVar[str] = "https://api.statuspage.io/v1/"
    tap_stream_id: ClassVar[Optional[str]] = None

    def __init__(self, config, state):
        self.config = config
        self.api_key = config.get('api_key')
        self.state = state
        self.params = {
            "limit": config.get('limit', 100),
            "page": 1,
        }
        self.schema = self.load_schema()
        self.metadata = singer.metadata.get_standard_metadata(schema=self.load_schema(),
                                                              key_properties=self.key_properties,
                                                              valid_replication_keys=self.valid_replication_keys,
                                                              replication_method=self.replication_method)

        for param in self.required_params:
            config_param = config.get(param)
            if config_param:
                self.params.update({param: config_param})
            elif param == 'end':
                self.params.update(
                    {"end": datetime.now(timezone.utc).isoformat()})
            else:
                raise RuntimeError(
                    f"Parameter '{param}' required but not supplied for /{self.tap_stream_id} endpoint.")

    def get(self, key: str):
        '''Custom get method so that Singer can
        access Class attributes using dict syntax.
        '''
        return inspect.getattr_static(self, key, default=None)

    def _get_abs_path(self, path: str) -> str:
        return os.path.join(os.path.dirname(os.path.realpath(__file__)), path)

    def load_schema(self) -> Dict:
        '''Loads a JSON schema file for a given
        Pagerduty resource into a dict representation.
        '''
        schema_path = self._get_abs_path("schemas")
        return singer.utils.load_json(f"{schema_path}/{self.tap_stream_id}.json")

    def write_schema(self):
        '''Writes a Singer schema message.'''
        return singer.write_schema(stream_name=self.stream, schema=self.schema, key_properties=self.key_properties)

    def write_state(self):
        return singer.write_state(self.state)

    def _construct_headers(self) -> Dict:
        headers = requests.utils.default_headers()
        headers["Accept"] = "application/vnd.statuspage+json;version=2"
        headers["User-Agent"] = "python-statuspage-tap"
        headers["Authorization"] = f"OAuth {self.api_key}"
        headers["Content-Type"] = "application/json"
        return headers

    @backoff.on_exception(backoff.expo,
                          requests.exceptions.RequestException,
                          max_time=120,
                          logger=LOGGER)
    def _get(self, url_suffix: str, params: Dict = None) -> Dict:
        url = self.base_url + url_suffix
        headers = self._construct_headers()
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        return response.json()

    def update_bookmark(self, bookmark, value):
        if bookmark is None:
            new_bookmark = value
        else:
            new_bookmark = max(bookmark, value)
        return new_bookmark

    def _list_resource(self, url_suffix: str, params: Dict = None):
        response = self._get(url_suffix=url_suffix, params=params)
        return StatuspageResponse(self, url_suffix, params, response)

    def get_page_ids(self):
        pageIds = []
        for record in self._list_resource(url_suffix=f"/pages", params=self.params).response:
            pageIds.append(record.get("id"))
        return pageIds

    # List of components ids for a given page and their start dates
    def get_component_ids(self, page_id):
        component_ids = {}
        for component_response in self._list_resource(url_suffix=f"/pages/{page_id}/components", params=self.params):
            for component in component_response.response:
                if component.get('showcase'):
                    start_date = parser.parse(component.get('created_at'))
                    component_ids.update({component.get('id'): start_date})
        return component_ids


class StatuspageResponse:
    def __init__(self, client, url_suffix, params, response):
        self.client = client
        self.url_suffix = url_suffix
        self.params = params
        self.response = response

    def __iter__(self):
        self._iteration = 0
        return self

    def __next__(self):
        self._iteration += 1
        if self._iteration == 1:
            return self

        if not self.response:
            raise StopIteration
        else:
            self.params["page"] += 1
            self.response = self.client._get(
                url_suffix=self.url_suffix, params=self.params
            )
            return self

    def get(self, key, default=None):
        return self.response.get(key, default)


class PagesStream(StatuspageStream):
    tap_stream_id: ClassVar[str] = 'pages'
    stream: ClassVar[str] = 'pages'
    key_properties: ClassVar[str] = 'id'
    replication_key: ClassVar[str] = 'updated_at'
    valid_replication_keys: ClassVar[List[str]] = ['updated_at']
    replication_method: ClassVar[str] = 'FULL_TABLE'
    valid_params: ClassVar[List[str]] = []
    required_params: ClassVar[List[str]] = []

    def __init__(self, config, state, **kwargs):
        super().__init__(config, state)

    def sync(self):
        with singer.metrics.job_timer(job_type=f"list_{self.tap_stream_id}"):
            with singer.metrics.record_counter(endpoint=self.tap_stream_id) as counter:
                for record in self._list_resource(url_suffix=f"/{self.tap_stream_id}", params=self.params).response:
                    with singer.Transformer() as transformer:
                        transformed_record = transformer.transform(
                            data=record, schema=self.schema)
                        singer.write_record(stream_name=self.stream, time_extracted=singer.utils.now(
                        ), record=transformed_record)
                        counter.increment()


class IncidentsStream(StatuspageStream):
    tap_stream_id: ClassVar[str] = 'incidents'
    stream: ClassVar[str] = 'incidents'
    key_properties: ClassVar[str] = 'id'
    replication_key: ClassVar[str] = 'updated_at'
    valid_replication_keys: ClassVar[List[str]] = ['updated_at']
    replication_method: ClassVar[str] = 'INCREMENTAL'
    valid_params: ClassVar[List[str]] = ['q', 'limit', 'page']
    required_params: ClassVar[List[str]] = []

    def __init__(self, config, state, **kwargs):
        super().__init__(config, state)

    def sync(self):
        current_bookmark = singer.bookmarks.get_bookmark(state=self.state,
                                                         tap_stream_id=self.tap_stream_id,
                                                         key=self.replication_key,
                                                         default=None)

        if current_bookmark is not None:
            current_bookmark_dtime = parser.parse(current_bookmark)
        else:
            current_bookmark_dtime = None

        running_bookmark_dtime = current_bookmark_dtime
        with singer.metrics.job_timer(job_type=f"list_{self.tap_stream_id}"):
            with singer.metrics.record_counter(endpoint=self.tap_stream_id) as counter:
                for page_id in self.get_page_ids():
                    for page in self._list_resource(url_suffix=f"/pages/{page_id}/{self.tap_stream_id}", params=self.params):
                        for record in page.response:
                            record_replication_key_dtime = parser.parse(
                                record.get(self.replication_key))
                            if (current_bookmark_dtime is None) or (record_replication_key_dtime >= current_bookmark_dtime):
                                with singer.Transformer() as transformer:
                                    transformed_record = transformer.transform(
                                        data=record, schema=self.schema)
                                    singer.write_record(stream_name=self.stream, time_extracted=singer.utils.now(
                                    ), record=transformed_record)
                                    counter.increment()
                                    running_bookmark_dtime = self.update_bookmark(
                                        running_bookmark_dtime, record_replication_key_dtime)

        running_bookmark_str = running_bookmark_dtime.isoformat()
        singer.bookmarks.write_bookmark(state=self.state,
                                        tap_stream_id=self.tap_stream_id,
                                        key=self.replication_key,
                                        val=running_bookmark_str)


class ComponentsStream(StatuspageStream):
    tap_stream_id: ClassVar[str] = 'components'
    stream: ClassVar[str] = 'components'
    key_properties: ClassVar[str] = 'id'
    replication_key: ClassVar[str] = 'updated_at'
    valid_replication_keys: ClassVar[List[str]] = ['updated_at']
    replication_method: ClassVar[str] = 'INCREMENTAL'
    valid_params: ClassVar[List[str]] = ['page', 'per_page']
    required_params: ClassVar[List[str]] = []

    def __init__(self, config, state, **kwargs):
        super().__init__(config, state)

    def sync(self):
        current_bookmark = singer.bookmarks.get_bookmark(state=self.state,
                                                         tap_stream_id=self.tap_stream_id,
                                                         key=self.replication_key,
                                                         default=None)

        if current_bookmark is not None:
            current_bookmark_dtime = parser.parse(current_bookmark)
        else:
            current_bookmark_dtime = None

        running_bookmark_dtime = current_bookmark_dtime
        with singer.metrics.job_timer(job_type=f"list_{self.tap_stream_id}"):
            with singer.metrics.record_counter(endpoint=self.tap_stream_id) as counter:
                for page_id in self.get_page_ids():
                    for page in self._list_resource(url_suffix=f"/pages/{page_id}/{self.tap_stream_id}", params=self.params):
                        for record in page.response:
                            record_replication_key_dtime = parser.parse(
                                record.get(self.replication_key))
                            if (current_bookmark_dtime is None) or (record_replication_key_dtime >= current_bookmark_dtime):
                                with singer.Transformer() as transformer:
                                    transformed_record = transformer.transform(
                                        data=record, schema=self.schema)
                                    singer.write_record(stream_name=self.stream, time_extracted=singer.utils.now(
                                    ), record=transformed_record)
                                    counter.increment()
                                    running_bookmark_dtime = self.update_bookmark(
                                        running_bookmark_dtime, record_replication_key_dtime)

        running_bookmark_str = running_bookmark_dtime.isoformat()
        singer.bookmarks.write_bookmark(state=self.state,
                                        tap_stream_id=self.tap_stream_id,
                                        key=self.replication_key,
                                        val=running_bookmark_str)


class UptimeStream(StatuspageStream):
    tap_stream_id: ClassVar[str] = 'uptime'
    stream: ClassVar[str] = 'uptime'
    key_properties: ClassVar[str] = 'id'
    replication_key: ClassVar[str] = 'updated_at'
    valid_replication_keys: ClassVar[List[str]] = ['updated_at']
    replication_method: ClassVar[str] = 'INCREMENTAL'
    valid_params: ClassVar[List[str]] = ['start', 'end']
    required_params: ClassVar[List[str]] = ['start', 'end']

    def __init__(self, config, state, **kwargs):
        super().__init__(config, state)

    def sync(self):
        current_bookmark = singer.bookmarks.get_bookmark(state=self.state,
                                                         tap_stream_id=self.tap_stream_id,
                                                         key=self.replication_key,
                                                         default=None)

        if current_bookmark is not None:
            current_bookmark_dtime = parser.parse(current_bookmark)
        else:
            current_bookmark_dtime = None

        running_bookmark_dtime = current_bookmark_dtime
        with singer.metrics.job_timer(job_type=f"list_{self.tap_stream_id}"):
            with singer.metrics.record_counter(endpoint=self.tap_stream_id) as counter:
                for page_id in self.get_page_ids():
                    for component_id, start_date in self.get_component_ids(page_id).items():

                        request_range_limit = relativedelta(months=1)
                        end_gtime = parser.parse(self.params.get("end")).replace(day=1)  # global end

                        # We only want even 1 month increments of uptime
                        start_rtime = max(parser.parse(self.params.get("start")), start_date)  # relative start
                        if (start_rtime.day != 1):
                            start_rtime = (start_rtime + request_range_limit).replace(day=1)

                        while start_rtime < end_gtime:
                            date_params = {
                                "start": start_rtime.isoformat(),
                                "end": min((start_rtime + request_range_limit).isoformat(), end_gtime.isoformat()),
                            }
                            record = self._list_resource(
                                url_suffix=f"/pages/{page_id}/components/{component_id}/{self.tap_stream_id}", params=date_params).response
                            if (current_bookmark_dtime is None) or (start_rtime >= current_bookmark_dtime):
                                with singer.Transformer() as transformer:
                                    transformed_record = transformer.transform(
                                        data=record, schema=self.schema)
                                    singer.write_record(stream_name=self.stream, time_extracted=singer.utils.now(
                                    ), record=transformed_record)
                                    counter.increment()
                                    running_bookmark_dtime = self.update_bookmark(
                                        running_bookmark_dtime, start_rtime)
                            start_rtime += request_range_limit

        running_bookmark_str = running_bookmark_dtime.isoformat()
        singer.bookmarks.write_bookmark(state=self.state,
                                        tap_stream_id=self.tap_stream_id,
                                        key=self.replication_key,
                                        val=running_bookmark_str)


AVAILABLE_STREAMS = {
    PagesStream,
    IncidentsStream,
    ComponentsStream,
    UptimeStream
}
