#!/usr/bin/env python3

from Modules.circle_utils import *

import argparse
import pprint
import datetime
import sys
import re

from dateutil.parser import *

sys.path.append("..")  # added!

# Turn on / off debugging
#http.client.HTTPConnection.debuglevel = 1


oncall_subteam = "<!subteam^S050XSUA7QU>"
robot_committers = ["apollo-bot2"]

leave_pending_jobs_for = datetime.timedelta(hours=1)


def make_graphql_query(githubtoken, orgreposlug):

    org_repo = orgreposlug.split("/")
    [org_name, repo_name] = org_repo

    # reduce dependencies by doing the GraphQL part myself
    # Play with this in Apollo Studio Explorer: https://tinyurl.com/4v7nsdmk
    graph_ql_query = {"query": """query($org_name: String!, $repo_name: String!) {
  viewer {
    organization(login: $org_name) {
      repository(name: $repo_name) {
        object(expression: "main") {
          ... on Commit {
            commitUrl
            status {
              state
              contexts {
                targetUrl
                createdAt
                state
                context
              }
            }
            author {
             user {
               login
             }
            }
            associatedPullRequests(first:1) {
              nodes {
                mergedBy {
                  login
                }
              }
            }
          }
        }
      }
    }
  }
} """, "variables": {"org_name": org_name, "repo_name": repo_name}}

    res = http_post(
        "https://api.github.com/graphql",
        json=graph_ql_query,
        headers={
            "Authorization": f"Bearer {githubtoken}",
            "Content-Type": "application/json"
        })

    return res


def main(githubtoken, orgreposlug, circleapitoken):
    now = datetime.datetime.now(datetime.timezone(
        datetime.timedelta(hours=0)))  # datetime in UTC

    res = make_graphql_query(githubtoken, orgreposlug)

    commit_info = None

    if res.json().get("errors"):
        messages = []
        [messages.append(x.get('message')) for x in res.json().get("errors")]
        print(f"{oncall_subteam} an error was reported by the scheduled main commit checker. Message was {','.join(messages)}")
        sys.exit(1)

    try:
        commit_info = res.json().get("data").get("viewer").get(
            "organization").get("repository").get("object")
    except AttributeError as e:
        print(e)
        pprint.pprint(res.json())
        raise e

    commit_state = commit_info.get("status").get("state")

    commit_url = commit_info.get("commitUrl")
    author = commit_info.get("author").get("user").get("login")

    if author in robot_committers:
        # don't blame the robot, blame the person who merged it
        author = commit_info.get("associatedPullRequests").get("nodes")[
            0].get("mergedBy").get("login")

    if (commit_state == "PENDING"):
        # This is a slightly more targetted nudge than what log_job_canceller does as it's ONLY for head of main
        # (but _technically_ duplicated reminders)
        #
        # regardless main's HEAD commit spends most of its time here, experimentally
        pending_workflows = []
        [pending_workflows.append(x) for x in commit_info.get("status").get("contexts") if (
            ((x.get("state") == "PENDING") and ("ci/circleci" in x.get("context"))) and not("dev0" in x.get("context")))]
        # pending workflows targetting dev0 don't deserve a callout by themselves

        if (len(pending_workflows) > 0):
            jobs_started_str = pending_workflows[0].get("createdAt")
            workflow_link = pending_workflows[0].get(
                "targetUrl")   # will always be the same targetURL
            workflow_id = None

            # we might have a situation where the job is already cancelled, but the Github build status indicator doesn't reflect that
            # so, if there's a workflow ID, use it to get the _real_ status of the job. If it is cancelled, well thanks other robot?
            if "/workflow-run/" in workflow_link:
                workflow_id = re.search(
                    "https://circleci.com/workflow-run/(.+).*", workflow_link).group(1)

            if workflow_id and circleapitoken:
                api_url = f"https://circleci.com/api/v2/workflow/{workflow_id}"
                standard_headers = {"Circle-Token": circleapitoken}

                workflow_info = http_get(
                    api_url, headers=standard_headers).json()
                if workflow_info.get("status") == "canceled":
                    return

            jobs_stated_dt = isoparse(jobs_started_str)

            if (jobs_stated_dt < (now - leave_pending_jobs_for)):
                print(f"Hey *gh:{author}*! Looks like your merge has spent some time in _staging_ to be tested. Go to *prod* :question: :link: <{workflow_link}|View on CircleCI>. - :heart: :canned_food:.")

    if (commit_state == "FAILURE"):
        # if a branch was created but nothing pushed to it, failures from that branch may affect this commit (as the commit is both head of main and head of that branch)
        # gather up failed statuses from circle
        # note for Circle build statuses these are likely job IDs, not workflow-runs

        failed_jobs = []
        [failed_jobs.append(x) for x in commit_info.get("status").get("contexts") if (
            (x.get("state") == "FAILURE") and ("ci/circleci" in x.get("context")))]

        main_has_failed_checks = False

        for current in failed_jobs:
            # extract the job id

            circle_job_id_results = re.search(
                f"https://circleci.com/gh/{orgreposlug}/(\d+)", current['targetUrl'])
            if circle_job_id_results:
                job_id = circle_job_id_results.group(1)

                standard_headers = {"Circle-Token": circleapitoken}
                api_url = f"https://circleci.com/api/v2/project/gh/{orgreposlug}/job/{job_id}"

                workflow_info = http_get(
                    api_url, headers=standard_headers).json()
                pipeline_id = workflow_info["pipeline"]["id"]

                pipeline_info = http_get(
                    f"https://circleci.com/api/v2/pipeline/{pipeline_id}", headers=standard_headers).json()
                # print(pipeline_info)

                failed_branch = pipeline_info["vcs"]["branch"]
                if failed_branch == "main":
                    main_has_failed_checks = True

        if main_has_failed_checks:
            print(
                f"Recent checks have found monorepo main is broken. Latest commit {commit_url} by gh:{author}. {oncall_subteam}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument("githubapitoken",
                        help="the Github API token for this script")

    # Token needs to have the following scopes:
    #   * admin:org read:org
    #   * repo repo:status

    parser.add_argument("orgreposlug",
                        help="the location, user-or-org/repository-name, of this repository")
    parser.add_argument("--circleapitoken",
                        type=str,
                        default=None,
                        help="the CircleCI API token for this script")

    args = parser.parse_args()

    main(args.githubapitoken, args.orgreposlug, args.circleapitoken)
