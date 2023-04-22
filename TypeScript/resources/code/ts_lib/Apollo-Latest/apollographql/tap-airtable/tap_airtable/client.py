import requests
from requests.exceptions import ConnectionError, Timeout
import backoff
import json
import singer


LOGGER = singer.get_logger()

REQUEST_TIMEOUT = 300
BACKOFF_MAX_TRIES_REQUEST = 5

class ReadTimeoutError(Exception):
    pass
    
class Server5xxError(Exception):
    pass

class Server429Error(Exception):
    pass

class AirtableError(Exception):
    pass

class AirtableBadRequestError(AirtableError):
    pass

class AirtableUnauthorizedError(AirtableError):
    pass

class AirtablePaymentRequiredError(AirtableError):
    pass

class AirtableForbiddenError(AirtableError):
    pass

class AirtableNotFoundError(AirtableError):
    pass

class AirtableRequestEntityTooLargeError(AirtableError):
    pass

class AirtableInvalidRequestError(AirtableError):
    pass

class AirtableInternalServerError(AirtableError):
    pass


ERROR_CODE_EXCEPTION_MAPPING = {
    400: AirtableBadRequestError,
    401: AirtableUnauthorizedError,
    402: AirtablePaymentRequiredError,
    403: AirtableForbiddenError,
    404: AirtableNotFoundError,
    413: AirtableRequestEntityTooLargeError,
    422: AirtableInvalidRequestError,
    500: AirtableInternalServerError
}

def get_exception_for_error_code(error_code):
    return ERROR_CODE_EXCEPTION_MAPPING.get(error_code, AirtableError)

def raise_for_error(response):
    LOGGER.error(f'ERROR {response.status_code}: {response.text}, REASON: {response.reason}')
    try:    
        response.raise_for_status()
    except (requests.HTTPError, requests.ConnectionError) as error:
        try:
            content_length = len(response.content)
            if content_length == 0:
                # There is nothing we can do here since Airtable has neither sent
                # us a 2xx response nor a response content.
                return
            response = response.json()
            if ('error' in response) or ('errorCode' in response):
                message = '%s: %s' % (response.get('error', str(error)),
                                      response.get('message', 'Unknown Error'))
                error_code = response.get('status')
                ex = get_exception_for_error_code(error_code)
                raise ex(message)
            else:
                raise AirtableError(error)
        except (ValueError, TypeError):
            raise AirtableError(error)

class AirtableClient():
    BASE_URL = "https://api.airtable.com"
    TABLE_PATH = "v0/"
    METADATA_PATH = "v2/meta"

    def __init__(self, config):
        self.__base_id = config.get("base_id")
        self.__token = config.get("token")
        self.__verified = False
        self.__session = requests.Session()

    def __enter__(self):
        self.__verified = self.check_access()
        return self

    def __exit__(self, exception_type, exception_value, traceback):
        self.__session.close()
    
    def __headers(self):
        headers = {}
        headers['Accept'] = 'application/json'
        headers['Authorization'] = f'Bearer {self.__token}'
        return headers
    
    def get_table_url(self, table):
        url = f"{self.BASE_URL}/v0/{self.__base_id}/{table}"
        return url
    
    def get_metadata_url(self):
        url = f"{self.BASE_URL}/v2/meta/{self.__base_id}"
        return url
    
    @backoff.on_exception(
        backoff.expo,
        (Server5xxError, Server429Error, ReadTimeoutError, ConnectionError, Timeout),
        max_tries=5,
        factor=2)
    def check_access(self):
        if self.__token is None:
            raise Exception('Error: Missing token in tap config.json.')
        
        url = self.get_metadata_url()

        try:
            response = self.__session.get(url=url, timeout=REQUEST_TIMEOUT, headers=self.__headers())
        except requests.exceptions.Timeout as err:
            LOGGER.error(f'TIMEOUT ERROR: {err}')
            raise ReadTimeoutError
        if response.status_code != 200:
            LOGGER.error('Error status_code = {response.status_code}')
            raise_for_error(response)
        else:
            return True

    @backoff.on_exception(
        backoff.expo,
        (Server5xxError, Server429Error, ReadTimeoutError, ConnectionError, Timeout),
        max_tries=BACKOFF_MAX_TRIES_REQUEST,
        factor=3,
        logger=LOGGER)
    def perform_request(self,
                        method,
                        url=None,
                        params=None,
                        json=None,
                        stream=False,
                        **kwargs):
        try:
            response = self.__session.request(method=method,
                                              url=url,
                                              params=params,
                                              json=json,
                                              stream=stream,
                                              timeout=REQUEST_TIMEOUT,
                                              **kwargs)

            if response.status_code >= 500:
                raise Server5xxError()

            if response.status_code != 200:
                raise_for_error(response)
            return response

        except requests.exceptions.Timeout as err:
            LOGGER.error(f'TIMEOUT ERROR: {error}')
            raise ReadTimeoutError(err)

    def get_request(self, url, params=None, json=None, **kwargs):
        if not self.__verified:
            self.__verified = self.check_access()

        response = self.perform_request(method="get",
                                            url=url,
                                            params=params,
                                            json=json,
                                            headers=self.__headers(),
                                            **kwargs)

        response_json = response.json()

        return response_json
