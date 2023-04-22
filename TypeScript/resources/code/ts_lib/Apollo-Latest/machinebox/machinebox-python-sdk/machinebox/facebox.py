
"""
Perform facial detection and identification via facebox.

For more details about this code, please refer to the documentation at
tbd
"""
import requests
import shutil

from machinebox.core import (
    check_box_health, post_file, teach_file, valid_image_file
)

from machinebox.const import (
    BOUNDING_BOX, CONFIDENCE, IMAGE_ID, ID, MATCHED, NAME, FILE_PATH, 
    HTTP_BAD_REQUEST, HTTP_OK, HTTP_UNAUTHORIZED
)

CLASSIFIER = 'facebox'


def get_matched_faces(faces):
    """Return the name and rounded confidence of matched faces."""
    return {face['name']: round(face['confidence'], 2)
            for face in faces if face['matched']}


def parse_faces(api_faces):
    """Parse the API face data into the format required."""
    known_faces = []
    for entry in api_faces:
        face = {}
        if entry['matched']:  # This data is only in matched faces.
            face[NAME] = entry['name']
            face[IMAGE_ID] = entry['id']
        else:  # Lets be explicit.
            face[NAME] = None
            face[IMAGE_ID] = None
        face[CONFIDENCE] = round(100.0*entry['confidence'], 2)
        face[MATCHED] = entry['matched']
        face[BOUNDING_BOX] = entry['rect']
        known_faces.append(face)
    return known_faces


class Facebox():
    """Encapsulate a Facebox Box."""

    def __init__(self, ip_address='localhost', port=8080, 
                 username=None, password=None, print_info=True):
        """Init with the API key and model id."""
        self._url_check = f"http://{ip_address}:{port}/{CLASSIFIER}/check"
        self._url_teach = f"http://{ip_address}:{port}/{CLASSIFIER}/teach"
        self._url_state = f"http://{ip_address}:{port}/{CLASSIFIER}/state"
        self._username = username
        self._password = password
        self._print_info = print_info # Print messages

        url_health = f"http://{ip_address}:{port}/healthz"
        self._hostname = check_box_health(
            url_health, self._username, self._password)
        self.clear_data()

    def clear_data(self):
        """Clear all data."""
        self._faces = []
        self._total_faces = None
        self._matched = {}

    def get_state(self):
        """Get the state file."""
        kwargs = {}
        if self._username:
            kwargs['auth'] = requests.auth.HTTPBasicAuth(
                self._username, self._password)

        response = requests.get(self._url_state, stream=True, **kwargs)

        state_filename = 'state.facebox'
        with open(state_filename, 'wb') as out_file:
            shutil.copyfileobj(response.raw, out_file)
        if self._print_info:
            print(f"Downloaded state file : {state_filename}")

    def post_state(self):
        """Post the state file."""
        state_filename = 'state.facebox'
        file = {'file': open(state_filename, 'rb')}

        kwargs = {}
        if self._username:
            kwargs['auth'] = requests.auth.HTTPBasicAuth(
                self._username, self._password)

        response = requests.post(
            self._url_state,
            files=file,
            **kwargs
        )
        if response.status_code == HTTP_OK and self._print_info:
            print(f"Posted state file : {state_filename}")

    def process_file(self, file_path):
        """Process an file."""
        self.clear_data()
        if not valid_image_file(file_path):
            return
        response = post_file(
            self._url_check, file_path, self._username, self._password)
        if response:
            self.process_response(response)

        if self._print_info:
            total_faces = self.matched_faces['total_faces']
            print(f"Processed {file_path} and found {total_faces} faces")

    def process_response(self, response):
        """Process the API response."""
        response_json = response.json()
        if response_json['success']:
            self._faces = parse_faces(response_json['faces'])
            self._total_faces = response_json['facesCount']
            self._matched = get_matched_faces(self._faces)

    def teach(self, name, file_path):
        """Teach classifier a face name."""
        if not valid_image_file(file_path):
            return
        teach_file(
            self._url_teach, name, file_path, self._username, self._password)
        if self._print_info:
            print(f"Taught face {name} with file {file_path}")

    @property
    def faces(self):
        """Return the faces information."""
        return self._faces

    @property
    def matched_faces(self):
        """Return the matched_faces information."""
        return {
            'total_faces': len(self._faces),
            'matched_faces': self._matched,
            'total_matched_faces': len(self._matched),
        }
