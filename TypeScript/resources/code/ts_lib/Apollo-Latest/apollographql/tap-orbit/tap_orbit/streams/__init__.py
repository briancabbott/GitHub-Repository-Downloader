from tap_orbit.streams.activities import ActivitiesStream
from tap_orbit.streams.members import MembersStream
from tap_orbit.streams.organizations import OrganizationsStream
from tap_orbit.streams.organization_membership import OrganizationMembershipStream

AVAILABLE_STREAMS = [
    ActivitiesStream,
    MembersStream,
    OrganizationsStream,
    OrganizationMembershipStream
]

__all__ = [
    "ActivitiesStream",
    "MembersStream",
    "OrganizationsStream"
    "OrganizationMembershipStream"
]
