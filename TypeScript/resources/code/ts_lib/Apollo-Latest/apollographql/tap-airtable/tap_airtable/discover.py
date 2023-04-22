import singer
from singer.catalog import Catalog, CatalogEntry

from .schema import get_stream_schema

LOGGER = singer.get_logger()

def discover(client, config):

    LOGGER.info("Starting discovery...")

    url = client.get_metadata_url()
    metadata = client.get_request(url)

    streams = []

    for table in metadata["tables"]:
        schema = get_stream_schema(table)
        streams.append(CatalogEntry(metadata = [{"metadata":{"selected": config.get("selected_by_default")}, "breadcrumb": []}], **schema))

    LOGGER.info("Finished discovery.")

    return Catalog(streams)