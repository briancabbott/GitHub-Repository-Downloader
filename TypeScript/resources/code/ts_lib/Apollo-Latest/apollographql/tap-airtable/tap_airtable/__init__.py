import os
import json
import singer
from singer import utils
from tap_airtable.client import AirtableClient
from tap_airtable.discover import discover
from tap_airtable.sync import sync


REQUIRED_CONFIG_KEYS = [
    'token',
    'base_id',
    'selected_by_default'
]

LOGGER = singer.get_logger()

@utils.handle_top_exception(LOGGER)
def main():
    # Parse command line arguments
    args = utils.parse_args(REQUIRED_CONFIG_KEYS)
    
    with AirtableClient(args.config) as client:
        # If discover flag was passed, run discovery mode and dump output to stdout
        if args.discover:
            catalog = discover(client, args.config)
            catalog.dump()
        # Otherwise run in sync mode
        else:
            if args.catalog:
                catalog = args.catalog
            else:
                catalog = discover(client, args.config)
            
            sync(client, args.config, args.state, catalog)

if __name__ == "__main__":
    main()