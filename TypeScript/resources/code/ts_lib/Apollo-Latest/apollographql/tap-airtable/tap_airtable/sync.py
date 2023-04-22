import singer
from singer import utils, metadata

from .transform import normalize_field_name

LOGGER = singer.get_logger()

def write_schema(stream):
    
    stream_name = stream.tap_stream_id
    schema = stream.schema.to_dict()
    
    try:
        singer.write_schema(stream_name, schema, stream.key_properties)
    except OSError as err:
        LOGGER.error(f'OS Error writing schema for: {stream_name}')
        raise err

def write_records(stream, records, time_extracted):  
    
    stream_name = stream.tap_stream_id  
    
    for record in records:
        try:
            singer.write_record(stream_name, record, time_extracted=time_extracted)
        except OSError as err:
            LOGGER.error(f'OS Error writing record for: {stream_name}')
            raise err
    
def transform_records(records):
    
    normalized_records = []

    for record in records:
        normalized_record = {"id": record.get("id")}
        
        for k, v in record.get("fields").items():
            normalized_record[normalize_field_name(k)] = v
        
        normalized_records.append(normalized_record)
    
    return normalized_records

def sync_records(client, url, stream, time_extracted, offset=None):

    params = None
    if offset:
        params = {"offset": offset}

    response = client.get_request(url, params=params)
    records = response.get('records')
    transformed_records = transform_records(records)
    write_records(stream, transformed_records, time_extracted)
    
    offset = response.get("offset")

    return offset

def sync_table(client, config, state, stream):
    
    write_schema(stream)
    table = stream.table
    url = client.get_table_url(table)
    time_extracted = utils.now()

    offset = sync_records(client, url, stream, time_extracted)

    while offset:
        offset = sync_records(client, url, stream, time_extracted, offset)

def sync(client, config, state, catalog):
    LOGGER.info(f"Starting sync...")
    selected_streams = catalog.get_selected_streams(state)
    for stream in selected_streams:
        LOGGER.info(f"Syncing stream: {stream.tap_stream_id}")
        sync_table(client, config, state, stream)
