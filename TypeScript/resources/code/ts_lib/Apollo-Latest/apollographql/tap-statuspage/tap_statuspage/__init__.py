import os
import sys

import rollbar
import singer

from .streams import AVAILABLE_STREAMS

LOGGER = singer.get_logger()


try:
    ROLLBAR_ACCESS_TOKEN = os.environ["ROLLBAR_ACCESS_TOKEN"]
    ROLLBAR_ENVIRONMENT = os.environ["ROLLBAR_ENVIRONMENT"]
except KeyError:
    LOGGER.info(
        "Required env vars for Rollbar logging not found. Rollbar logging disabled..")
    log_to_rollbar = False
else:
    rollbar.init(ROLLBAR_ACCESS_TOKEN, ROLLBAR_ENVIRONMENT)
    log_to_rollbar = True


def discover(config, state={}):
    LOGGER.info('Starting discovery..')
    data = {}
    data['streams'] = []
    for available_stream in AVAILABLE_STREAMS:
        data['streams'].append(available_stream(config=config, state=state))
    catalog = singer.catalog.Catalog.from_dict(data=data)
    singer.catalog.write_catalog(catalog)
    LOGGER.info('Finished discovery..')


def sync(config, catalog, state={}):
    LOGGER.info('Starting sync..')
    selected_streams = {
        catalog_entry.stream for catalog_entry in catalog.get_selected_streams(state)}

    streams_to_sync = set()
    for available_stream in AVAILABLE_STREAMS:
        if available_stream.stream in selected_streams:
            streams_to_sync.add(available_stream(config=config, state=state))

    for stream in streams_to_sync:
        singer.bookmarks.set_currently_syncing(
            state=stream.state, tap_stream_id=stream.tap_stream_id)
        stream.write_state()
        stream.write_schema()
        stream.sync()
        singer.bookmarks.set_currently_syncing(
            state=stream.state, tap_stream_id=None)
        stream.write_state()


def _main():
    args = singer.utils.parse_args(required_config_keys=[])
    if args.discover:
        discover(config=args.config)
    else:
        sync(config=args.config, catalog=args.catalog, state=args.state)


def main():
    try:
        _main()
    except Exception:
        if log_to_rollbar is True:
            LOGGER.info("Reporting exception info to Rollbar..")
            rollbar.report_exc_info()
        LOGGER.exception(msg="Uncaught Exception..")
        sys.exit(1)


if __name__ == "__main__":
    main()
