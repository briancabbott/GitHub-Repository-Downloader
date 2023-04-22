import singer
from singer.schema import Schema

from .transform import normalize_field_name

LOGGER = singer.get_logger()

STRING_TYPES = set([
    'lookup',
    'singleLineText',
    'singleSelect',
    'phoneNumber',
    'email',
    'url',
    'multilineText',
    'rollup',
    'rating',
    'duration',
    'richText',
    'currency',
    'link',
    'createdBy',
    'singleCollaborator'
])

NUMBER_TYPES = set([
    'number',
    'autoNumber',
    'count',
    'legacyPercentTimes100'
])

DATETIME_TYPES = set([
    'dateTime',
    'createdTime'
])

ARRAY_TYPES = set([
    'multipleRecordLinks',
    'multipleSelects',
    'multipleAttachments',
    'multipleCollaborators'
    
])

def get_property_schema(field):
    
    property_schema = {}
    airtable_type = field.get("type")

    if airtable_type in STRING_TYPES:
        property_schema["type"] = ["null", "string"]
    elif airtable_type in DATETIME_TYPES:
        date_type = {"type": "string", "format": "date-time"}
        string_type = {"type": ["null", "string"]}
        property_schema["anyOf"] = [date_type, string_type]
    elif airtable_type in NUMBER_TYPES:
        property_schema['type'] = ["null", "number"]
    elif airtable_type == "checkbox":
        property_schema['type'] = ["null", "boolean"]
    elif airtable_type == "date":
        date_type = {"type": "string", "format": "date"}
        string_type = {"type": ["null", "string"]}
        property_schema["anyOf"] = [date_type, string_type]
    elif airtable_type in ARRAY_TYPES:
        property_schema['items'] = {"type": "string"}
        property_schema['type'] = ["null", "array"]
    elif airtable_type == "formula":
        property_schema = get_property_schema(field.get("options").get("result"))
    else:
        property_schema["type"] = ["null", "string"]
#         raise Exception(f"Found unsupported type: {airtable_type}.")

    return property_schema

def get_stream_schema(table):

    stream_schema = {}
    properties = {"id": {"type": "string"}}

    table_name = table.get("name")
    stream_name = normalize_field_name(table_name.lower())
    id_field = table.get("primaryFieldId")

    for field in table.get("fields"):
        property_name = normalize_field_name(field.get("name"))
        property_schema = get_property_schema(field.get("config"))
        properties[property_name] = property_schema
    
    stream_schema["table"] = table_name
    stream_schema["tap_stream_id"] = stream_name
    stream_schema["stream"] = stream_name
    stream_schema["schema"] = Schema.from_dict({"type": ["null", "object"], "properties": properties})
    stream_schema["key_properties"] = ["id"]

    return stream_schema
