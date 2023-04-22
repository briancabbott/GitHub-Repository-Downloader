#!/usr/bin/env python3

from Modules.circle_utils import *
import datetime
import itertools
import os.path
import pprint
import requests
import sys


from dateutil.parser import *

import argparse

sys.path.append("..")  # added!


job_life_clock = datetime.timedelta(hours=2)
job_midlife_warning = datetime.timedelta(hours=1)
utc_tz = datetime.timezone(datetime.timedelta(hours=0))
now = datetime.datetime.now(utc_tz)

robot_committers = ["apollo-bot2"]


def get_workflow_started_by(current_workflow, headers):
    user_url = f'https://circleci.com/api/v2/user/{current_workflow["started_by"]}'

    try:
        user_info = http_get(user_url, headers=headers).json()
        return user_info.get("login")
    except requests.exceptions.HTTPError as e:
        print(
            f'Exception encountered fetching user: {current_workflow["started_by"]} for current_workflow: {current_workflow["id"]}: {e}'
        )
        # 4XX
        # the Github / CircleCI scheduling bot won't have a username (JSON body will be {'message': 'Not found.'})
        return ''


def get_workflow_pending_approval_jobs(workflow_id, headers):
    """
    the top object of the workflow only tells us that the workflow is on hold, not why.
    Iterate through all the jobs of the workflow checking in particular for approval jobs
    and return information about approval jobs in this workflow that are on hold
    (so then we can filter them later)
    """

    for current_job in get_all_items(f"/workflow/{workflow_id}/job", headers):
        if (current_job.get("type") == "approval") and (current_job.get("status") == "on_hold"):
            yield current_job


def pipeline_created_at_to_datetime(pipeline):
    '''
    Pipeline's create_at value is in ISO 8601 format: Y-m-dTH:M:S.fZ, convert to a
    datetime.
    '''
    return datetime.datetime.fromisoformat(pipeline['created_at'][:-1]).replace(tzinfo=datetime.timezone.utc)


def find_old_workflow_ids(
        repo_slug,
        window_start,
        window_end_cancel,
        window_end_warn,
        headers):
    print(
        f'Window to paginate through: [start:{window_start}, cancel:{window_end_cancel}, warn:{window_end_warn}]')
    for current_pipeline in get_all_items(f"/project/gh/{repo_slug}/pipeline", headers, None):
        # Paginate through only those pipelines which started inside our given window
        created_at = pipeline_created_at_to_datetime(current_pipeline)
        if window_end_warn < created_at:
            print(f'Pipeline too young: {created_at}')
            continue
        if created_at < window_start:
            print(f'Pipeline too old: {created_at}')
            return None

        for current_workflow in get_all_items(f"/pipeline/{current_pipeline['id']}/workflow", headers, None):
            job_status = None
            username = get_workflow_started_by(current_workflow, headers)
            logging_detail = f'[{created_at}] ({current_workflow["name"]})[{current_workflow["status"]}], started by gh:{username}. See more info at: https://app.circleci.com/pipelines/workflows/{current_workflow["id"]}'

            if not current_workflow.get('stopped_at'):
                if (created_at < window_end_cancel):
                    print(f'found too old workflow {logging_detail}')
                    job_status = "too_old"

                elif username in robot_committers:
                    continue

                elif current_workflow['status'] == 'on_hold':
                    print(f'midlife warning for workflow {logging_detail}')
                    job_status = "age_warning"

            if job_status:
                yield {
                    "job_status": job_status,
                    "name": current_workflow['name'],
                    "id": current_workflow['id'],
                    "username": username
                }


def matches_any_in_list(str, list):
    for current in list:
        if (str.find(current) > -1):
            return True
    return False


def has_only_ignored_jobs(current_info, ignore, headers):
    for current in get_workflow_pending_approval_jobs(current_info['id'], headers):
        if not matches_any_in_list(current['name'], ignore):
            # if we are here then we have a job name that is not filtered by our ignore list
            # (so we do not _only_ have ignored jobs). Short circuit, the answer to our question is False
            return False
    return True


def main(circleapitoken, orgreposlug, n_windows, output_file, commit, ignore):
    standard_headers = {"Circle-Token": circleapitoken}

    simple_path = os.path.abspath(os.path.expanduser(
        os.path.expandvars(output_file)))

    with open(simple_path, 'w') as f:
        f.write("job_status\tproceed\tid\tusername\tname\n")
        for current_info in find_old_workflow_ids(
            orgreposlug,
            now - (job_life_clock * n_windows),
            now - job_life_clock,
            now - job_midlife_warning,
            standard_headers
        ):
            if current_info["job_status"] == "age_warning":
                if not (ignore == ['']):
                    if has_only_ignored_jobs(current_info, ignore, standard_headers):
                        print(
                            f"ignoring workflow: {current_info['id']} See more info at https://app.circleci.com/pipelines/workflows/{current_info['id']}")
                        continue
            else:
                if commit:
                    http_post(
                        f"https://circleci.com/api/v2/workflow/{current_info['id']}/cancel", headers=standard_headers)

            f.write(
                f"{current_info['job_status']}\ttrue\t{current_info['id']}\t{current_info['username']}\t{current_info['name']}\n")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("circleapitoken",
                        help="the CircleCI API token for this script")
    parser.add_argument("orgreposlug",
                        help="the location, user-or-org/repository-name , of this repository")

    parser.add_argument("--output-file",
                        help="output to file path",
                        default="/tmp/notifications.tsv")
    parser.add_argument("--commit",
                        help="just cancel jobs",
                        default=False,
                        action="store_true")
    parser.add_argument("--n-windows",
                        help="Number of windows to look back across. Default window length is 2 hours.",
                        type=int,
                        default=6)
    parser.add_argument("--ignore-job-names", help="if all awaiting approval jobs in the pipeline contain this word, do not age warn about it. Multiple word supported by delimiting with , (example: --ignore=optional,maybe). A job only has to match one of the words", default="")

    args = parser.parse_args()

    main(args.circleapitoken, args.orgreposlug,
         args.n_windows, args.output_file, args.commit, args.ignore_job_names.split(","))
