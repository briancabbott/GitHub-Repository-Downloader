import os

from datadog_checks.dev.docker import get_docker_hostname

HERE = os.path.dirname(os.path.abspath(__file__))
DOCKER_DIR = os.path.join(HERE, "docker")
HOST = get_docker_hostname()
FIXTURE_DIR = os.path.join(HERE, "fixtures")


def registry_file_path(name):
    return os.path.join(FIXTURE_DIR, "{}_registry.json".format(name))
