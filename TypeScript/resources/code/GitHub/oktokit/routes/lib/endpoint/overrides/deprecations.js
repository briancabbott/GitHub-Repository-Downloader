/**
 * We manually keep track endpoint name or parameter changes. It’s common that
 * an endpoint gets renamed in the documentation for better readability or a
 * URL parameter is being renamed. It makes no differences for the REST APIs.
 * But as the Octokit clients generate their methods based on these names, these
 * changes are causing breaking changes. To work around that, we keep track of
 * deprecations together with time stamps, so each Octokit client can decide at
 * what date to "cut off" the deprecations.
 *
 * Deprecations are stored in the `"x-changes"` extension. Each Deprecation has
 * 3 properties
 *
 * 1. `type`: either `"operation"` or `"parameter"`
 * 2. `date`: timestamp in `YYYY-MM-DD` format
 * 3. `note`: An explenation about the deprecation
 *
 * Additionally, each deprecation can have a before or both before & after properties.
 * `before` / `after` should be directly applicaple to either the operation or the
 * parameter with the given `name`. The most common deprecations are renames of
 * `operationId`s or parameter `name`s, in which cases the changes look like this
 * for an operation deprecation
 *
 *    before: {
 *      operationId: "search/issues"
 *    },
 *    after: {
 *      operationId: "search/issues-and-pull-requests"
 *    }
 *
 * And like this for a parameter deprecation
 *
 *    before: {
 *      name: "external_identity_guid"
 *    },
 *    after: {
 *      name: "scim_user_id"
 *    }
 *
 * In some cases, a method or parameter is deprecated entirely, in which case there is
 * no `after` key, and the `before` key can have more keys to bring back e.g. a no longer
 * documented parameter. Example
 *
 *    before: {
 *      name: "in_reply_to",
 *      description:
 *        "The comment ID to reply to. **Note**: This must be the ID of a top-level comment, not a reply to that comment. Replies to replies are not supported.",
 *      in: "body",
 *      schema: {
 *        type: "integer"
 *      }
 *    },
 *    after: {}
 *
 * In order to apply deprecations to GitHub Enterprise above a sepicific version, wrap
 * the code in an if statement such as
 *
 *    // apply to api.github.com and GHE version 2.18 and above
 *    if (!gheVersion || gheVersion >= 2.18) {
 *      // ...
 *    }
 *
 */

module.exports = deprecations;

function deprecations({ routes, gheVersion }) {
  // 2018-12-27 – "Search issues" renamed to "Search issues and pull requests"
  const searchIssuesAndPullRequests = findByRoute(routes, "GET /search/issues");
  searchIssuesAndPullRequests &&
    searchIssuesAndPullRequests.operation["x-changes"].push({
      type: "operation",
      date: "2018-12-27",
      note:
        '"Search issues" has been renamed to "Search issues and pull requests"',

      before: {
        operationId: "search/issues",
      },
      after: {
        operationId: "search/issues-and-pull-requests",
      },
    });

  // 2019-01-05 – "and" is no longer ignored for "idName"
  const getOrCreateAuthorizationForAppAndFingerprint = findByRoute(
    routes,
    "PUT /authorizations/clients/:client_id/:fingerprint"
  );
  getOrCreateAuthorizationForAppAndFingerprint &&
    getOrCreateAuthorizationForAppAndFingerprint.operation["x-changes"].push({
      type: "operation",
      date: "2018-12-27",
      note:
        '`idName` changed for "Get-or-create an authorization for a specific app and fingerprint". It now includes `-and-`',

      before: {
        operationId:
          "oauth-authorizations/get-or-create-authorization-for-app-fingerprint",
      },
      after: {
        operationId:
          "oauth-authorizations/get-or-create-authorization-for-app-and-fingerprint",
      },
    });

  const provisionAndInviteUsers = findByRoute(
    routes,
    "POST /scim/v2/organizations/:org/Users"
  );
  provisionAndInviteUsers &&
    provisionAndInviteUsers.operation["x-changes"].push({
      type: "operation",
      date: "2018-12-27",
      note:
        '`idName` changed for "Provision and invite users". It now includes `-and-`',
      before: {
        operationId: "scim/provision-invite-users",
      },
      after: {
        operationId: "scim/provision-and-invite-users",
      },
    });

  // 2019-03-05 – "List all licenses" renamed to "List commonly used licenses"
  const listLicenses = findByRoute(routes, "GET /licenses");
  listLicenses &&
    listLicenses.operation["x-changes"].push({
      type: "operation",
      date: "2019-03-05",
      note: '"List all licenses" renamed to "List commonly used licenses"',
      before: {
        operationId: "licenses/list",
      },
      after: {
        operationId: "licenses/list-commonly-used",
      },
    });

  // 2019-04-10 ":number" parameter is now ":issue_number", ":milestone_number", or ":pull_number"
  const ROUTES_WITH_RENAMED_NUMBER_PARAMETER = [
    "GET /repos/:owner/:repo/issues/:issue_number",
    "PATCH /repos/:owner/:repo/issues/:issue_number",
    "PUT /repos/:owner/:repo/issues/:issue_number/lock",
    "DELETE /repos/:owner/:repo/issues/:issue_number/lock",
    "POST /repos/:owner/:repo/issues/:issue_number/assignees",
    "DELETE /repos/:owner/:repo/issues/:issue_number/assignees",
    "GET /repos/:owner/:repo/issues/:issue_number/comments",
    "POST /repos/:owner/:repo/issues/:issue_number/comments",
    "GET /repos/:owner/:repo/issues/:issue_number/events",
    "GET /repos/:owner/:repo/issues/:issue_number/labels",
    "POST /repos/:owner/:repo/issues/:issue_number/labels",
    "DELETE /repos/:owner/:repo/issues/:issue_number/labels/:name",
    "PUT /repos/:owner/:repo/issues/:issue_number/labels",
    "DELETE /repos/:owner/:repo/issues/:issue_number/labels",
    "GET /repos/:owner/:repo/milestones/:milestone_number/labels",
    "GET /repos/:owner/:repo/milestones/:milestone_number",
    "PATCH /repos/:owner/:repo/milestones/:milestone_number",
    "DELETE /repos/:owner/:repo/milestones/:milestone_number",
    "GET /repos/:owner/:repo/issues/:issue_number/timeline",
    "GET /repos/:owner/:repo/pulls/:pull_number",
    "PATCH /repos/:owner/:repo/pulls/:pull_number",
    "GET /repos/:owner/:repo/pulls/:pull_number/commits",
    "GET /repos/:owner/:repo/pulls/:pull_number/files",
    "GET /repos/:owner/:repo/pulls/:pull_number/merge",
    "PUT /repos/:owner/:repo/pulls/:pull_number/merge",
    "GET /repos/:owner/:repo/pulls/:pull_number/comments",
    "POST /repos/:owner/:repo/pulls/:pull_number/comments",
    "GET /repos/:owner/:repo/pulls/:pull_number/requested_reviewers",
    "POST /repos/:owner/:repo/pulls/:pull_number/requested_reviewers",
    "DELETE /repos/:owner/:repo/pulls/:pull_number/requested_reviewers",
    "GET /repos/:owner/:repo/pulls/:pull_number/reviews",
    "GET /repos/:owner/:repo/pulls/:pull_number/reviews/:review_id",
    "DELETE /repos/:owner/:repo/pulls/:pull_number/reviews/:review_id",
    "GET /repos/:owner/:repo/pulls/:pull_number/reviews/:review_id/comments",
    "POST /repos/:owner/:repo/pulls/:pull_number/reviews",
    "PUT /repos/:owner/:repo/pulls/:pull_number/reviews/:review_id",
    "POST /repos/:owner/:repo/pulls/:pull_number/reviews/:review_id/events",
    "PUT /repos/:owner/:repo/pulls/:pull_number/reviews/:review_id/dismissals",
    "GET /repos/:owner/:repo/issues/:issue_number/reactions",
    "POST /repos/:owner/:repo/issues/:issue_number/reactions",
  ];

  ROUTES_WITH_RENAMED_NUMBER_PARAMETER.forEach((endpoint) => {
    findAllByRoute(routes, endpoint).forEach((route) => {
      // don’t add if "number" parameter already exists
      if (route.operation.parameters.find((param) => param.name === "number")) {
        return;
      }

      const { name } = route.operation.parameters.find((param) =>
        /_number$/.test(param.name)
      );
      const isChangeMissing = !route.operation["x-changes"].find(
        (change) =>
          change.type === "parameter" &&
          change.note === `"number" parameter renamed to "${name}"`
      );
      isChangeMissing &&
        route.operation["x-changes"].push({
          type: "parameter",
          date: "2019-04-10",
          note: `"number" parameter renamed to "${name}"`,
          before: {
            name: "number",
          },
          after: {
            name: name,
          },
        });
    });
  });

  // 2019-04-10 – "Update a provisioned organization membership" renamed to "Replace a provisioned user's information"
  const replaceProvisionedUserInformation = findByRoute(
    routes,
    "PUT /scim/v2/organizations/:org/Users/:scim_user_id"
  );
  replaceProvisionedUserInformation &&
    replaceProvisionedUserInformation.operation["x-changes"].push({
      type: "operation",
      date: "2019-04-10",
      note:
        '"Update a provisioned organization membership" renamed to "Replace a provisioned user\'s information"',
      before: {
        operationId: "scim/update-provisioned-org-membership",
      },
      after: {
        operationId: "scim/replace-provisioned-user-information",
      },
    });

  // 2019-04-10 ":external_identity_guid" parameter renamed to ":scim_user_id"
  const ROUTES_WITH_RENAMED_SCIM_USER_ID_PARAMETER = [
    "GET /scim/v2/organizations/:org/Users/:scim_user_id",
    "PUT /scim/v2/organizations/:org/Users/:scim_user_id",
    "PATCH /scim/v2/organizations/:org/Users/:scim_user_id",
    "DELETE /scim/v2/organizations/:org/Users/:scim_user_id",
  ];

  ROUTES_WITH_RENAMED_SCIM_USER_ID_PARAMETER.forEach((endpoint) => {
    findAllByRoute(routes, endpoint).forEach((route) => {
      // don’t add if "external_identity_guid" parameter already exists
      if (
        route.operation.parameters.find(
          (param) => param.name === "external_identity_guid"
        )
      ) {
        return;
      }

      route.operation["x-changes"].push({
        type: "parameter",
        date: "2019-04-10",
        note: '"external_identity_guid" parameter renamed to "scim_user_id"',
        before: {
          name: "external_identity_guid",
        },
        after: {
          name: "scim_user_id",
        },
      });
    });
  });

  const getCommit = findByRoute(routes, "GET /repos/:owner/:repo/commits/:ref");

  // 2019-05-22 Deprecate "Get the SHA-1 of a commit reference"
  // if (getCommit) {
  //   const deprecatedGetCommitShaForRef = cloneDeep(getCommit)

  //   deprecatedGetCommitShaForRef.responses[0] = {
  //     headers: {
  //       status: '200 OK'
  //     }
  //   }

  //   deprecatedGetCommitShaForRef.deprecated = {
  //     date: '2019-05-22',
  //     message: '"Get the SHA-1 of a commit reference" will be removed. Use "Get a single commit" instead with media type format set to "sha" instead.'
  //   }
  //   deprecatedGetCommitShaForRef.name = 'Get the SHA-1 of a commit reference'
  //   deprecatedGetCommitShaForRef.description = '**Note:** To access this endpoint, you must provide a custom [media type](https://developer.github.com/v3/media) in the `Accept` header:\n\n```\napplication/vnd.github.VERSION.sha\n\n```\n\nReturns the SHA-1 of the commit reference. You must have `read` access for the repository to get the SHA-1 of a commit reference. You can use this endpoint to check if a remote reference\'s SHA-1 is the same as your local reference\'s SHA-1 by providing the local SHA-1 reference as the ETag.\n\n'
  //   deprecatedGetCommitShaForRef.idName = 'get-commit-ref-sha'

  //   routes.push(deprecatedGetCommitShaForRef)
  // }

  // 2019-04-12 ":sha" parameter renamed to ":commit_sha" for "Get a single commit"
  // 2019-06-21 ":commit_sha" parameter renamed to ":ref" for "Get a single commit"
  getCommit &&
    getCommit.operation["x-changes"].push(
      {
        type: "parameter",
        date: "2019-04-10",
        note: '"sha" parameter renamed to "ref"',
        before: {
          name: "sha",
        },
        after: {
          name: "ref",
        },
      },
      {
        type: "parameter",
        date: "2019-06-21",
        note: '"commit_sha" parameter renamed to "ref"',
        before: {
          name: "commit_sha",
        },
        after: {
          name: "ref",
        },
      }
    );

  // 2019-04-18 Method name changes
  // - "Find organization installation" => "Get an organization installation" (find-org-installation => get-org-installation)
  // - "Find repository installation" => "Get a repository installation" (find-repo-installation => get-repo-installation)
  // - "Find user installation" => "Get a user installation" (find-user-installation => get-user-installation)
  const getOrgInstallation = findByRoute(routes, "GET /orgs/:org/installation");
  getOrgInstallation &&
    getOrgInstallation.operation["x-changes"].push({
      type: "operation",
      date: "2019-04-10",
      note:
        '"Find organization installation" renamed to "Get an organization installation"',
      before: {
        operationId: "apps/find-org-installation",
      },
      after: {
        operationId: "apps/get-org-installation",
      },
    });

  const getRepoInstallation = findByRoute(
    routes,
    "GET /repos/:owner/:repo/installation"
  );
  getRepoInstallation &&
    getRepoInstallation.operation["x-changes"].push({
      type: "operation",
      date: "2019-04-10",
      note:
        '"Find repository installation" renamed to "Get a repository installation"',
      before: {
        operationId: "apps/find-repo-installation",
      },
      after: {
        operationId: "apps/get-repo-installation",
      },
    });

  const getUserInstallation = findByRoute(
    routes,
    "GET /users/:username/installation"
  );
  getUserInstallation &&
    getUserInstallation.operation["x-changes"].push({
      type: "operation",
      date: "2019-04-10",
      note:
        '"Find repository installation" renamed to "Get a repository installation"',
      before: {
        operationId: "apps/find-user-installation",
      },
      after: {
        operationId: "apps/get-user-installation",
      },
    });

  // 2019-06-07 URL parameter "ref"  renamed to "commit_sha" for "List comments for Commit"
  const listCommentsForCommit = findByRoute(
    routes,
    "GET /repos/:owner/:repo/commits/:commit_sha/comments"
  );
  listCommentsForCommit &&
    listCommentsForCommit.operation["x-changes"].push({
      type: "parameter",
      date: "2019-06-07",
      note: '"ref" parameter renamed to "commit_sha"',
      before: {
        name: "ref",
      },
      after: {
        name: "commit_sha",
      },
    });

  // 2019-06-07 URL parameter "sha"  renamed to "commit_sha" for "Create a commit comment"
  const createCommitComment = findByRoute(
    routes,
    "POST /repos/:owner/:repo/commits/:commit_sha/comments"
  );
  createCommitComment &&
    createCommitComment.operation["x-changes"].push({
      type: "parameter",
      date: "2019-06-07",
      note: '"sha" parameter renamed to "commit_sha"',
      before: {
        name: "sha",
      },
      after: {
        name: "commit_sha",
      },
    });

  // 2019-06-07 "Create a file" & "Update a file" is now "Create or update a file"
  const createOrUpdateFile = findByRoute(
    routes,
    "PUT /repos/:owner/:repo/contents/:path"
  );
  if (
    createOrUpdateFile &&
    createOrUpdateFile.operation.operationId.endsWith("create-or-update-file")
  ) {
    createOrUpdateFile.operation["x-changes"].push({
      type: "operation",
      date: "2019-06-07",
      note: '"Create a file" replaced by "Create or update a file"',
      before: {
        operationId: "repos/create-file",
      },
      after: {
        operationId: "repos/create-or-update-file",
      },
    });
    createOrUpdateFile.operation["x-changes"].push({
      type: "operation",
      date: "2019-06-07",
      note: '"Update a file" replaced by "Create or update a file"',
      before: {
        operationId: "repos/update-file",
      },
      after: {
        operationId: "repos/create-or-update-file",
      },
    });
  }

  if (!gheVersion || gheVersion >= 2.18) {
    // 2019-09-09 idName changed for "Create a comment" for pull request reviews
    const createPullRequestReviewComment = findByRoute(
      routes,
      "POST /repos/:owner/:repo/pulls/:pull_number/comments"
    );
    if (createPullRequestReviewComment) {
      createPullRequestReviewComment.operation["x-changes"].push({
        type: "operation",
        date: "2019-09-09",
        note:
          '"Create a comment reply" is now "Create a comment". To create a pull request review comment reply, use the new "Create a review comment reply" endpoint',
        before: {
          operationId: "pulls/create-comment-reply",
        },
        after: {
          operationId: "pulls/create-comment",
        },
      });
      createPullRequestReviewComment.operation["x-changes"].push({
        type: "parameter",
        date: "2019-09-09",
        note:
          '"in_reply_to" parameter is deprecated for "Create a comment". To create a pull request review comment reply, use the new "Create a review comment reply" endpoint',
        before: {
          name: "in_reply_to",
          description:
            "The comment ID to reply to. **Note**: This must be the ID of a top-level comment, not a reply to that comment. Replies to replies are not supported.",
          in: "body",
          type: "integer",
        },
        after: {},
      });
    }
  }

  // 2019-09-09 idName changed for "List team restrictions of protected branch"
  const getTeamsWithAccessToProtectedBranch = findByRoute(
    routes,
    "GET /repos/:owner/:repo/branches/:branch/protection/restrictions/teams"
  );
  if (getTeamsWithAccessToProtectedBranch) {
    getTeamsWithAccessToProtectedBranch.operation["x-changes"].push({
      type: "operation",
      date: "2019-09-09",
      note:
        '"List team restrictions of protected branch" is now "Get teams with access to protected branch"',
      before: {
        operationId: "repos/list-protected-branch-team-restrictions",
      },
      after: {
        operationId: "repos/get-teams-with-access-to-protected-branch",
      },
    });
  }

  // 2019-09-09 idName changed for "List user restrictions of protected branch"
  // - updated on 2019-09-13 to new operationId
  const getUsersWithAccessToProtectedBranch = findByRoute(
    routes,
    "GET /repos/:owner/:repo/branches/:branch/protection/restrictions/users"
  );
  if (getUsersWithAccessToProtectedBranch) {
    getUsersWithAccessToProtectedBranch.operation["x-changes"].push({
      type: "operation",
      date: "2019-09-09",
      note:
        '"List user restrictions of protected branch" is now "Get users with access to protected branch"',
      before: {
        operationId: "repos/list-protected-branch-user-restrictions",
      },
      after: {
        operationId: "repos/get-users-with-access-to-protected-branch",
      },
    });
  }

  // 2019-09-13 idName changed for "List (Apps/Users/Teams) with access to protected branch"
  const getAppsWithAccessToProtectedBranch = findByRoute(
    routes,
    "GET /repos/:owner/:repo/branches/:branch/protection/restrictions/apps"
  );

  [
    getAppsWithAccessToProtectedBranch,
    getTeamsWithAccessToProtectedBranch,
    getUsersWithAccessToProtectedBranch,
  ]
    .filter(Boolean)
    .forEach((endpoint) => {
      endpoint.operation["x-changes"].push({
        type: "operation",
        date: "2019-09-13",
        note: `"${endpoint.operation.summary.replace(
          /^\w+/,
          "List"
        )}" is now "${endpoint.operation.summary}"`,
        before: {
          operationId: endpoint.operation.operationId.replace(/\/get/, "/list"),
        },
        after: {
          operationId: endpoint.operation.operationId,
        },
      });
    });

  if (!gheVersion || gheVersion > 2.19) {
    const relocatedAuthorizationAccessTokenRoutes = findAllByPath(
      routes,
      "/applications/:client_id/tokens/:access_token"
    );
    relocatedAuthorizationAccessTokenRoutes.forEach((endpoint) => {
      endpoint.operation["x-changes"].push({
        type: "operation",
        date: "2019-11-05",
        note: `"${endpoint.operation.summary}" has been moved from "OAuth Authorizations" to "Apps"`,
        before: {
          operationId: endpoint.operation.operationId.replace(
            /apps\//,
            "oauth-authorizations/"
          ),
        },
        after: {
          operationId: endpoint.operation.operationId,
        },
      });
    });

    const revokeGrantForApplication = findByRoute(
      routes,
      "DELETE /applications/:client_id/grants/:access_token"
    );
    if (revokeGrantForApplication) {
      revokeGrantForApplication.operation["x-changes"].push({
        type: "operation",
        date: "2019-11-05",
        note: `"Revoke a grant for an application" has been moved from "OAuth Authorizations" to "Apps"`,
        before: {
          operationId: "oauth-authorizations/revoke-grant-for-application",
        },
        after: {
          operationId: "apps/revoke-grant-for-application",
        },
      });
    }
  }

  // 2020-01-16 idName changed for "List (Apps/Users/Teams) with access to protected branch"
  [
    "GET /teams/:team_id/members/:username",
    "PUT /teams/:team_id/members/:username",
    "DELETE /teams/:team_id/members/:username",
  ].forEach((route) => {
    const endpoint = findByRoute(routes, route);
    if (!endpoint) return;

    endpoint.operation["x-changes"].push({
      type: "operation",
      date: "2020-01-16",
      note: `The path for "${endpoint.operation.summary}" changed  from "/teams/{team_id}*" to "/orgs/{org}/teams/{team_slug}*"). The operation ID for the old path now has a "-legacy" suffix. The route with the new path has a "-for-org" suffix in the operation ID to avoid breaking changes`,
      before: {
        operationId: endpoint.operation.operationId.replace(/-legacy$/, ""),
      },
      after: {
        operationId: endpoint.operation.operationId,
      },
    });
  });

  if (!gheVersion || gheVersion >= 2.21) {
    [
      "GET /teams/:team_id",
      "PATCH /teams/:team_id",
      "DELETE /teams/:team_id",
      "GET /teams/:team_id/discussions",
      "POST /teams/:team_id/discussions",
      "GET /teams/:team_id/discussions/:discussion_number",
      "PATCH /teams/:team_id/discussions/:discussion_number",
      "DELETE /teams/:team_id/discussions/:discussion_number",
      "GET /teams/:team_id/discussions/:discussion_number/comments",
      "POST /teams/:team_id/discussions/:discussion_number/comments",
      "GET /teams/:team_id/discussions/:discussion_number/comments/:comment_number",
      "PATCH /teams/:team_id/discussions/:discussion_number/comments/:comment_number",
      "DELETE /teams/:team_id/discussions/:discussion_number/comments/:comment_number",
      "GET /teams/:team_id/discussions/:discussion_number/comments/:comment_number/reactions",
      "POST /teams/:team_id/discussions/:discussion_number/comments/:comment_number/reactions",
      "GET /teams/:team_id/discussions/:discussion_number/reactions",
      "POST /teams/:team_id/discussions/:discussion_number/reactions",
      "GET /teams/:team_id/invitations",
      "GET /teams/:team_id/members",
      "GET /teams/:team_id/memberships/:username",
      "PUT /teams/:team_id/memberships/:username",
      "DELETE /teams/:team_id/memberships/:username",
      "GET /teams/:team_id/projects",
      "GET /teams/:team_id/projects/:project_id",
      "PUT /teams/:team_id/projects/:project_id",
      "DELETE /teams/:team_id/projects/:project_id",
      "GET /teams/:team_id/repos",
      "GET /teams/:team_id/repos/:owner/:repo",
      "PUT /teams/:team_id/repos/:owner/:repo",
      "DELETE /teams/:team_id/repos/:owner/:repo",
      "GET /teams/:team_id/team-sync/group-mappings",
      "PATCH /teams/:team_id/team-sync/group-mappings",
      "GET /teams/:team_id/teams",
    ].forEach((route) => {
      const endpoint = findByRoute(routes, route);
      if (!endpoint) return;

      endpoint.operation["x-changes"].push({
        type: "operation",
        date: "2020-01-16",
        note: `The path for "${endpoint.operation.summary.replace(
          " (Legacy)",
          ""
        )}" changed  from "/teams/{team_id}*" to "/orgs/{org}/teams/{team_slug}*"). The operation ID for the old path now has a "-legacy" suffix. The route with the new path has a "-for-org" suffix in the operation ID to avoid breaking changes`,
        before: {
          operationId: endpoint.operation.operationId.replace(/-legacy$/, ""),
        },
        after: {
          operationId: endpoint.operation.operationId,
        },
      });
    });
  }

  // 2020-01-27 remove workaround to rename "download-*" to "get-*"
  // - updated on 2019-09-13 to new operationId
  const downloadMigrationsArchiveForOrg = findByRoute(
    routes,
    "GET /orgs/:org/migrations/:migration_id/archive"
  );
  if (downloadMigrationsArchiveForOrg) {
    downloadMigrationsArchiveForOrg.operation["x-changes"].push({
      type: "operation",
      date: "2020-01-27",
      note:
        '"migrations/get-archive-for-org" operation ID is now "migrations/download-archive-for-org"',
      before: {
        operationId: "migrations/get-archive-for-org",
      },
      after: {
        operationId: "migrations/download-archive-for-org",
      },
    });
  }

  // 2020-02-26 Replacing the "Delete reactions" endpoint
  // https://developer.github.com/changes/2020-02-26-new-delete-reactions-endpoints/
  if (!gheVersion || gheVersion >= 2.21) {
    const deleteReaction = findByRoute(
      routes,
      "DELETE /reactions/:reaction_id"
    );
    if (deleteReaction) {
      deleteReaction.operation["x-changes"].push({
        type: "operation",
        date: "2020-02-26",
        note:
          '"reactions/delete" operation ID is now "reactions/delete-legacy"',
        before: {
          operationId: "reactions/delete",
        },
        after: {
          operationId: "reactions/delete-legacy",
        },
      });
    }
  }

  // 2020-03-04 One documentation section per route, and some endpoint title normalizations
  const listAccountsForPlan = findByRoute(
    routes,
    "GET /marketplace_listing/plans/:plan_id/accounts"
  );
  if (listAccountsForPlan) {
    listAccountsForPlan.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-04",
      note:
        '"apps/list-accounts-user-or-org-on-plan" operation ID is now "apps/list-accounts-for-plan"',
      before: {
        operationId: "apps/list-accounts-user-or-org-on-plan",
      },
      after: {
        operationId: "apps/list-accounts-for-plan",
      },
    });
  }

  const listAccountsForPlanStubbed = findByRoute(
    routes,
    "GET /marketplace_listing/stubbed/plans/:plan_id/accounts"
  );
  if (listAccountsForPlanStubbed) {
    listAccountsForPlanStubbed.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-04",
      note:
        '"apps/list-accounts-user-or-org-on-plan-stubbed" operation ID is now "apps/list-accounts-for-plan-stubbed"',
      before: {
        operationId: "apps/list-accounts-user-or-org-on-plan-stubbed",
      },
      after: {
        operationId: "apps/list-accounts-for-plan-stubbed",
      },
    });
  }

  const listReposForAuthenticatedUser = findByRoute(routes, "GET /user/repos");
  if (listReposForAuthenticatedUser) {
    listReposForAuthenticatedUser.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-04",
      note:
        '"repos/list" operation ID is now "repos/list-for-authenticated-user"',
      before: {
        operationId: "repos/list",
      },
      after: {
        operationId: "repos/list-for-authenticated-user",
      },
    });
  }

  const listGistsForUser = findByRoute(routes, "GET /users/:username/gists");
  if (listGistsForUser) {
    listGistsForUser.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-04",
      note:
        '"gists/list-public-for-user" operation ID is now "gists/list-for-user"',
      before: {
        operationId: "gists/list-public-for-user",
      },
      after: {
        operationId: "gists/list-for-user",
      },
    });
  }

  const getCodesOfConduct = findByRoute(routes, "GET /codes_of_conduct");
  if (getCodesOfConduct) {
    getCodesOfConduct.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-04",
      note:
        '"codes-of-conduct/list-conduct-codes" operation ID is now "codes-of-conduct/get-all-codes-of-conduct"',
      before: {
        operationId: "codes-of-conduct/list-conduct-codes",
      },
      after: {
        operationId: "codes-of-conduct/get-all-codes-of-conduct",
      },
    });
  }

  const removeAllLabels = findByRoute(
    routes,
    "DELETE /repos/:owner/:repo/issues/:issue_number/labels"
  );
  if (removeAllLabels) {
    removeAllLabels.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-04",
      note:
        '"issues/remove-labels" operation ID is now "issues/remove-all-labels"',
      before: {
        operationId: "issues/remove-labels",
      },
      after: {
        operationId: "issues/remove-all-labels",
      },
    });
  }

  const replaceAllLabels = findByRoute(
    routes,
    "PUT /repos/:owner/:repo/issues/:issue_number/labels"
  );
  if (replaceAllLabels) {
    replaceAllLabels.operation["x-changes"].push(
      {
        type: "operation",
        date: "2020-03-04",
        note:
          '"issues/replace-labels" operation ID is now "issues/replace-all-labels"',
        before: {
          operationId: "issues/replace-labels",
        },
        after: {
          operationId: "issues/replace-all-labels",
        },
      },
      {
        type: "operation",
        date: "2020-06-04",
        note:
          '"issues/replace-all-labels" operation ID is now "issues/set-labels"',
        before: {
          operationId: "issues/replace-all-labels",
        },
        after: {
          operationId: "issues/set-labels",
        },
      }
    );
  }

  const getAllTopics = findByRoute(routes, "GET /repos/:owner/:repo/topics");
  if (getAllTopics) {
    getAllTopics.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-04",
      note: '"repos/list-topics" operation ID is now "repos/get-all-topics"',
      before: {
        operationId: "repos/list-topics",
      },
      after: {
        operationId: "repos/get-all-topics",
      },
    });
  }

  const replaceAllTopics = findByRoute(
    routes,
    "PUT /repos/:owner/:repo/topics"
  );
  if (replaceAllTopics) {
    replaceAllTopics.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-04",
      note:
        '"repos/replace-topics" operation ID is now "repos/replace-all-topics"',
      before: {
        operationId: "repos/replace-topics",
      },
      after: {
        operationId: "repos/replace-all-topics",
      },
    });
  }

  const listUsersfollowedByAuthenticated = findByRoute(
    routes,
    "GET /user/following"
  );
  if (listUsersfollowedByAuthenticated) {
    listUsersfollowedByAuthenticated.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-04",
      note:
        '"users/list-following-for-authenticated-user" operation ID is now "users/list-followed-by-authenticated"',
      before: {
        operationId: "users/list-following-for-authenticated-user",
      },
      after: {
        operationId: "users/list-followed-by-authenticated",
      },
    });
  }

  // 2020-03-08 check subscription plan is now get subscription plan
  const getSubscriptionPlanForAccount = findByRoute(
    routes,
    "GET /marketplace_listing/accounts/:account_id"
  );
  if (getSubscriptionPlanForAccount) {
    getSubscriptionPlanForAccount.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-08",
      note:
        '"apps/check-account-is-associated-with-any" operation ID is now "apps/get-subscription-plan-for-account"',
      before: {
        operationId: "apps/check-account-is-associated-with-any",
      },
      after: {
        operationId: "apps/get-subscription-plan-for-account",
      },
    });
  }

  const getSubscriptionPlanForAccountStubbed = findByRoute(
    routes,
    "GET /marketplace_listing/stubbed/accounts/:account_id"
  );
  if (getSubscriptionPlanForAccountStubbed) {
    getSubscriptionPlanForAccountStubbed.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-08",
      note:
        '"apps/check-account-is-associated-with-any-stubbed" operation ID is now "apps/get-subscription-plan-for-account-stubbed"',
      before: {
        operationId: "apps/check-account-is-associated-with-any-stubbed",
      },
      after: {
        operationId: "apps/get-subscription-plan-for-account-stubbed",
      },
    });
  }

  const listSubscriptionsForTheAuthenticatedUser = findByRoute(
    routes,
    "GET /user/marketplace_purchases"
  );
  if (listSubscriptionsForTheAuthenticatedUser) {
    listSubscriptionsForTheAuthenticatedUser.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-08",
      note:
        '"apps/list-marketplace-purchases-for-authenticated-user" operation ID is now "apps/list-subscriptions-for-authenticated-user"',
      before: {
        operationId: "apps/list-marketplace-purchases-for-authenticated-user",
      },
      after: {
        operationId: "apps/list-subscriptions-for-authenticated-user",
      },
    });
  }

  const listSubscriptionsForTheAuthenticatedUserStubbed = findByRoute(
    routes,
    "GET /user/marketplace_purchases/stubbed"
  );
  if (listSubscriptionsForTheAuthenticatedUserStubbed) {
    listSubscriptionsForTheAuthenticatedUserStubbed.operation["x-changes"].push(
      {
        type: "operation",
        date: "2020-03-08",
        note:
          '"apps/list-marketplace-purchases-for-authenticated-user-stubbed" operation ID is now "apps/list-subscriptions-for-authenticated-user-stubbed"',
        before: {
          operationId:
            "apps/list-marketplace-purchases-for-authenticated-user-stubbed",
        },
        after: {
          operationId: "apps/list-subscriptions-for-authenticated-user-stubbed",
        },
      }
    );
  }

  // 2020-03-25 "List feeds" renamed to "Get feeds"
  const getFeeds = findByRoute(routes, "GET /feeds");
  if (getFeeds) {
    getFeeds.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-25",
      note: '"activity/list-feeds" operation ID is now "activity/get-feeds"',
      before: {
        operationId: "activity/list-feeds",
      },
      after: {
        operationId: "activity/get-feeds",
      },
    });
  }

  // 2020-03-25 "List your notifications" renamed to "List notifications for the authenticated user"
  const listNotificationsForAuthenticatedUser = findByRoute(
    routes,
    "GET /notifications"
  );
  if (listNotificationsForAuthenticatedUser) {
    listNotificationsForAuthenticatedUser.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-25",
      note:
        '"activity/list-notifications" operation ID is now "activity/list-notifications-for-authenticated-user"',
      before: {
        operationId: "activity/list-notifications",
      },
      after: {
        operationId: "activity/list-notifications-for-authenticated-user",
      },
    });
  }

  // 2020-03-25 "Mark as read" renamed to "Mark notifications as read"
  const markNotificationsAsRead = findByRoute(routes, "PUT /notifications");
  if (markNotificationsAsRead) {
    markNotificationsAsRead.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-25",
      note:
        '"activity/mark-as-read" operation ID is now "activity/mark-notifications-as-read"',
      before: {
        operationId: "activity/mark-as-read",
      },
      after: {
        operationId: "activity/mark-notifications-as-read",
      },
    });
  }

  // 2020-03-25 "Get a thread subscription" renamed to "Get a thread subscription for the authenticated user"
  const getThreadSubscriptionForAuthenticatedUser = findByRoute(
    routes,
    "PUT /notifications"
  );
  if (getThreadSubscriptionForAuthenticatedUser) {
    getThreadSubscriptionForAuthenticatedUser.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-25",
      note:
        '"activity/get-thread-subscription" operation ID is now "activity/get-thread-subscription-for-authenticated-user"',
      before: {
        operationId: "activity/get-thread-subscription",
      },
      after: {
        operationId: "activity/get-thread-subscription-for-authenticated-user",
      },
    });
  }

  // 2020-03-25 "List public events for an organization" renamed to "List public organization events"
  const listPublicOrgEvents = findByRoute(routes, "GET /orgs/:org/events");
  if (listPublicOrgEvents) {
    listPublicOrgEvents.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-25",
      note:
        '"activity/list-public-events-for-org" operation ID is now "activity/list-public-org-events"',
      before: {
        operationId: "activity/list-public-events-for-org",
      },
      after: {
        operationId: "activity/list-public-org-events",
      },
    });
  }

  // 2020-03-25 "List your notifications in a repository" renamed to "List repository notifications for the authenticated user"
  const listRepoNotificationsForAuthenticatedUser = findByRoute(
    routes,
    "GET /repos/:owner/:repo/notifications"
  );
  if (listRepoNotificationsForAuthenticatedUser) {
    listRepoNotificationsForAuthenticatedUser.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-25",
      note:
        '"activity/list-notifications-for-repo" operation ID is now "activity/list-repo-notifications-for-authenticated-user"',
      before: {
        operationId: "activity/list-notifications-for-repo",
      },
      after: {
        operationId: "activity/list-repo-notifications-for-authenticated-user",
      },
    });
  }

  // 2020-03-25 "Mark notifications as read in a repository" renamed to "Mark repository notifications as read"
  const markRepoNotificationsAsRead = findByRoute(
    routes,
    "PUT /repos/:owner/:repo/notifications"
  );
  if (markRepoNotificationsAsRead) {
    markRepoNotificationsAsRead.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-25",
      note:
        '"activity/mark-notifications-as-read-for-repo" operation ID is now "activity/mark-repo-notifications-as-read"',
      before: {
        operationId: "activity/mark-notifications-as-read-for-repo",
      },
      after: {
        operationId: "activity/mark-repo-notifications-as-read",
      },
    });
  }

  // 2020-03-25 "Check if you are starring a repository" renamed to "Check if a repository is starred by the authenticated user"
  const checkRepoIsStarredByAuthenticatedUser = findByRoute(
    routes,
    "GET /user/starred/:owner/:repo"
  );
  if (checkRepoIsStarredByAuthenticatedUser) {
    checkRepoIsStarredByAuthenticatedUser.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-25",
      note:
        '"activity/check-starring-repo" operation ID is now "activity/check-repo-is-starred-by-authenticated-user"',
      before: {
        operationId: "activity/check-starring-repo",
      },
      after: {
        operationId: "activity/check-repo-is-starred-by-authenticated-user",
      },
    });
  }

  // 2020-03-25 "Star a repository" renamed to "Star a repository for the authenticated user"
  const starRepoForAuthenticatedUser = findByRoute(
    routes,
    "PUT /user/starred/:owner/:repo"
  );
  if (starRepoForAuthenticatedUser) {
    starRepoForAuthenticatedUser.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-25",
      note:
        '"activity/star-repo" operation ID is now "activity/star-repo-for-authenticated-user"',
      before: {
        operationId: "activity/star-repo",
      },
      after: {
        operationId: "activity/star-repo-for-authenticated-user",
      },
    });
  }

  // 2020-03-25 "Unstar a repository" renamed to "Unstar a repository for the authenticated user"
  const unstarRepoForAuthenticatedUser = findByRoute(
    routes,
    "DELETE /user/starred/:owner/:repo"
  );
  if (unstarRepoForAuthenticatedUser) {
    unstarRepoForAuthenticatedUser.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-25",
      note:
        '"activity/unstar-repo" operation ID is now "activity/unstar-repo-for-authenticated-user"',
      before: {
        operationId: "activity/unstar-repo",
      },
      after: {
        operationId: "activity/unstar-repo-for-authenticated-user",
      },
    });
  }

  // 2020-03-25 "List events performed by a user" renamed to "List events for the authenticated user"
  const listEventsForAuthenticatedUser = findByRoute(
    routes,
    "GET /users/:username/events"
  );
  if (listEventsForAuthenticatedUser) {
    listEventsForAuthenticatedUser.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-25",
      note:
        '"activity/list-events-for-user" operation ID is now "activity/list-events-for-authenticated-user"',
      before: {
        operationId: "activity/list-events-for-user",
      },
      after: {
        operationId: "activity/list-events-for-authenticated-user",
      },
    });
  }

  // 2020-03-25 "List events for an organization" renamed to "List organization events for the authenticated user"
  const listOrgEventsForAuthenticatedUser = findByRoute(
    routes,
    "GET /users/:username/events/orgs/:org"
  );
  if (listOrgEventsForAuthenticatedUser) {
    listOrgEventsForAuthenticatedUser.operation["x-changes"].push({
      type: "operation",
      date: "2020-03-25",
      note:
        '"activity/list-events-for-org" operation ID is now "activity/list-org-events-for-authenticated-user"',
      before: {
        operationId: "activity/list-events-for-org",
      },
      after: {
        operationId: "activity/list-org-events-for-authenticated-user",
      },
    });
  }

  // 2020-04-22 "List downloads for the self-hosted runner application" renamed to "List runner applications for a repository"
  const listRunnerApplicationsForRepo = findByRoute(
    routes,
    "GET /repos/:owner/:repo/actions/runners/downloads"
  );
  if (listRunnerApplicationsForRepo) {
    listRunnerApplicationsForRepo.operation["x-changes"].push({
      type: "operation",
      date: "2020-04-22",
      note:
        '"actions/list-downloads-for-self-hosted-runner-application" operation ID is now "actions/list-runner-applications-for-repo"',
      before: {
        operationId:
          "actions/list-downloads-for-self-hosted-runner-application",
      },
      after: {
        operationId: "actions/list-runner-applications-for-repo",
      },
    });
  }

  // 2020-04-22 "Create a registration token" renamed to "Create a registration token for a repository"
  const createRegistrationTokenForRepo = findByRoute(
    routes,
    "POST /repos/:owner/:repo/actions/runners/registration-token"
  );
  if (createRegistrationTokenForRepo) {
    createRegistrationTokenForRepo.operation["x-changes"].push({
      type: "operation",
      date: "2020-04-22",
      note:
        '"actions/create-registration-token" operation ID is now "actions/create-registration-token-for-repo"',
      before: {
        operationId: "actions/create-registration-token",
      },
      after: {
        operationId: "actions/create-registration-token-for-repo",
      },
    });
  }

  // 2020-04-22 "Create a remove token" renamed to "Create a remove token for a repository"
  const createRemoveTokenForRepo = findByRoute(
    routes,
    "POST /repos/:owner/:repo/actions/runners/remove-token"
  );
  if (createRemoveTokenForRepo) {
    createRemoveTokenForRepo.operation["x-changes"].push({
      type: "operation",
      date: "2020-04-22",
      note:
        '"actions/create-remove-token" operation ID is now "actions/create-remove-token-for-repo"',
      before: {
        operationId: "actions/create-remove-token",
      },
      after: {
        operationId: "actions/create-remove-token-for-repo",
      },
    });
  }

  // 2020-04-22 "Get a self-hosted runner" renamed to "Get a self-hosted runner for a repository"
  const getSelfHostedRunnerForRepo = findByRoute(
    routes,
    "GET /repos/:owner/:repo/actions/runners/:runner_id"
  );
  if (getSelfHostedRunnerForRepo) {
    getSelfHostedRunnerForRepo.operation["x-changes"].push({
      type: "operation",
      date: "2020-04-22",
      note:
        '"actions/get-self-hosted-runner" operation ID is now "actions/get-self-hosted-runner-for-repo"',
      before: {
        operationId: "actions/get-self-hosted-runner",
      },
      after: {
        operationId: "actions/get-self-hosted-runner-for-repo",
      },
    });
  }

  // 2020-04-22 "Remove a self-hosted runner" renamed to "Remove a self-hosted runner from a repository"
  const deleteSelfHostedRunnerFromRepo = findByRoute(
    routes,
    "DELETE /repos/:owner/:repo/actions/runners/:runner_id"
  );
  if (deleteSelfHostedRunnerFromRepo) {
    deleteSelfHostedRunnerFromRepo.operation["x-changes"].push({
      type: "operation",
      date: "2020-04-22",
      note:
        '"actions/remove-self-hosted-runner" operation ID is now "actions/delete-self-hosted-runner-from-repo"',
      before: {
        operationId: "actions/remove-self-hosted-runner",
      },
      after: {
        operationId: "actions/delete-self-hosted-runner-from-repo",
      },
    });
  }

  // 2020-05-04 "List workflow run logs" renamed to "Download workflow run logs"
  const downloadWorkflowRunLogs = findByRoute(
    routes,
    "GET /repos/:owner/:repo/actions/runs/:run_id/logs"
  );
  if (downloadWorkflowRunLogs) {
    downloadWorkflowRunLogs.operation["x-changes"].push({
      type: "operation",
      date: "2020-05-04",
      note:
        '"actions/list-workflow-run-logs" operation ID is now "actions/download-workflow-run-logs"',
      before: {
        operationId: "actions/list-workflow-run-logs",
      },
      after: {
        operationId: "actions/download-workflow-run-logs",
      },
    });
  }

  // 2020-05-04 "List workflow run logs" renamed to "Download workflow run logs"
  const downloadWorkflowJobLogs = findByRoute(
    routes,
    "GET /repos/:owner/:repo/actions/jobs/:job_id/logs"
  );
  if (downloadWorkflowJobLogs) {
    downloadWorkflowJobLogs.operation["x-changes"].push(
      {
        type: "operation",
        date: "2020-05-04",
        note:
          '"actions/list-workflow-job-logs" operation ID is now "actions/download-workflow-job-logs"',
        before: {
          operationId: "actions/list-workflow-job-logs",
        },
        after: {
          operationId: "actions/download-workflow-job-logs",
        },
      },
      {
        type: "operation",
        date: "2020-06-04",
        note:
          '"actions/download-workflow-job-logs" operation ID is now "actions/download-job-logs-for-workflow-run"',
        before: {
          operationId: "actions/download-workflow-job-logs",
        },
        after: {
          operationId: "actions/download-job-logs-for-workflow-run",
        },
      }
    );
  }

  // 2020-05-14 org secrets introduced, operation IDs for repo secrets endpoints needed to be adjusted
  const listRepoSecrets = findByRoute(
    routes,
    "GET /repos/:owner/:repo/actions/secrets"
  );
  if (listRepoSecrets) {
    listRepoSecrets.operation["x-changes"].push({
      type: "operation",
      date: "2020-05-14",
      note:
        '"actions/list-secrets-for-repo" operation ID is now "actions/list-repo-secrets"',
      before: {
        operationId: "actions/list-secrets-for-repo",
      },
      after: {
        operationId: "actions/list-repo-secrets",
      },
    });
  }

  const getRepoPublicKey = findByRoute(
    routes,
    "GET /repos/:owner/:repo/actions/secrets/public-key"
  );
  if (getRepoPublicKey) {
    getRepoPublicKey.operation["x-changes"].push({
      type: "operation",
      date: "2020-05-14",
      note:
        '"actions/get-public-key" operation ID is now "actions/get-repo-public-key"',
      before: {
        operationId: "actions/get-public-key",
      },
      after: {
        operationId: "actions/get-repo-public-key",
      },
    });
  }

  const getRepoSecret = findByRoute(
    routes,
    "GET /repos/:owner/:repo/actions/secrets/:secret_name"
  );
  if (getRepoSecret) {
    getRepoSecret.operation["x-changes"].push(
      {
        type: "parameter",
        date: "2020-05-14",
        note: '"name" parameter renamed to "secret_name"',
        before: {
          name: "name",
        },
        after: {
          name: "secret_name",
        },
      },
      {
        type: "operation",
        date: "2020-05-14",
        note:
          '"actions/get-secret" operation ID is now "actions/get-repo-secret"',
        before: {
          operationId: "actions/get-secret",
        },
        after: {
          operationId: "actions/get-repo-secret",
        },
      }
    );
  }

  const createOrUpdateRepoSecret = findByRoute(
    routes,
    "PUT /repos/:owner/:repo/actions/secrets/:secret_name"
  );
  if (createOrUpdateRepoSecret) {
    createOrUpdateRepoSecret.operation["x-changes"].push(
      {
        type: "parameter",
        date: "2020-05-14",
        note: '"name" parameter renamed to "secret_name"',
        before: {
          name: "name",
        },
        after: {
          name: "secret_name",
        },
      },
      {
        type: "operation",
        date: "2020-05-14",
        note:
          '"actions/create-or-update-secret-for-repo" operation ID is now "actions/create-or-update-repo-secret"',
        before: {
          operationId: "actions/create-or-update-secret-for-repo",
        },
        after: {
          operationId: "actions/create-or-update-repo-secret",
        },
      }
    );
  }

  const deleteRepoSecret = findByRoute(
    routes,
    "DELETE /repos/:owner/:repo/actions/secrets/:secret_name"
  );
  if (deleteRepoSecret) {
    deleteRepoSecret.operation["x-changes"].push(
      {
        type: "parameter",
        date: "2020-05-14",
        note: '"name" parameter renamed to "secret_name"',
        before: {
          name: "name",
        },
        after: {
          name: "secret_name",
        },
      },
      {
        type: "operation",
        date: "2020-05-14",
        note:
          '"actions/delete-secret-from-repo" operation ID is now "actions/delete-repo-secret"',
        before: {
          operationId: "actions/delete-secret-from-repo",
        },
        after: {
          operationId: "actions/delete-repo-secret",
        },
      }
    );
  }

  const getMembershipForUserInOrg = findByRoute(
    routes,
    "GET /orgs/:org/teams/:team_slug/memberships/:username"
  );
  if (getMembershipForUserInOrg) {
    getMembershipForUserInOrg.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-01",
      note:
        '"teams/get-membership-in-org" operation ID is now "teams/get-membership-for-user-in-org"',
      before: {
        operationId: "teams/get-membership-in-org",
      },
      after: {
        operationId: "teams/get-membership-for-user-in-org",
      },
    });
  }

  const addOrUpdateMembershipForUserInOrg = findByRoute(
    routes,
    "PUT /orgs/:org/teams/:team_slug/memberships/:username"
  );
  if (addOrUpdateMembershipForUserInOrg) {
    addOrUpdateMembershipForUserInOrg.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-01",
      note:
        '"teams/add-or-update-membership-in-org" operation ID is now "teams/add-or-update-membership-for-user-in-org"',
      before: {
        operationId: "teams/add-or-update-membership-in-org",
      },
      after: {
        operationId: "teams/add-or-update-membership-for-user-in-org",
      },
    });
  }

  const removeMembershipForUserInOrg = findByRoute(
    routes,
    "DELETE /orgs/:org/teams/:team_slug/memberships/:username"
  );
  if (removeMembershipForUserInOrg) {
    removeMembershipForUserInOrg.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-01",
      note:
        '"teams/remove-membership-in-org" operation ID is now "teams/remove-membership-for-user-in-org"',
      before: {
        operationId: "teams/remove-membership-in-org",
      },
      after: {
        operationId: "teams/remove-membership-for-user-in-org",
      },
    });
  }

  const addOrUpdateProjectPermissionsInOrg = findByRoute(
    routes,
    "PUT /orgs/:org/teams/:team_slug/projects/:project_id"
  );
  if (addOrUpdateProjectPermissionsInOrg) {
    addOrUpdateProjectPermissionsInOrg.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-01",
      note:
        '"teams/add-or-update-project-in-org" operation ID is now "teams/add-or-update-project-permissions-in-org"',
      before: {
        operationId: "teams/add-or-update-project-in-org",
      },
      after: {
        operationId: "teams/add-or-update-project-permissions-in-org",
      },
    });
  }

  const checkPermissionsForProjectInOrg = findByRoute(
    routes,
    "GET /orgs/:org/teams/:team_slug/projects/:project_id"
  );
  if (checkPermissionsForProjectInOrg) {
    checkPermissionsForProjectInOrg.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-01",
      note:
        '"teams/review-project-in-org" operation ID is now "teams/check-permissions-for-project-in-org"',
      before: {
        operationId: "teams/review-project-in-org",
      },
      after: {
        operationId: "teams/check-permissions-for-project-in-org",
      },
    });
  }

  const checkPermissionsForRepoInOrg = findByRoute(
    routes,
    "GET /orgs/:org/teams/:team_slug/repos/:owner/:repo"
  );
  if (checkPermissionsForRepoInOrg) {
    checkPermissionsForRepoInOrg.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-01",
      note:
        '"teams/check-manages-repo-in-org" operation ID is now "teams/check-permissions-for-repo-in-org"',
      before: {
        operationId: "teams/check-manages-repo-in-org",
      },
      after: {
        operationId: "teams/check-permissions-for-repo-in-org",
      },
    });
  }

  const addOrUpdateRepoPermissionsInOrg = findByRoute(
    routes,
    "PUT /orgs/:org/teams/:team_slug/repos/:owner/:repo"
  );
  if (addOrUpdateRepoPermissionsInOrg) {
    addOrUpdateRepoPermissionsInOrg.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-01",
      note:
        '"teams/add-or-update-repo-in-org" operation ID is now "teams/add-or-update-repo-permissions-in-org"',
      before: {
        operationId: "teams/add-or-update-repo-in-org",
      },
      after: {
        operationId: "teams/add-or-update-repo-permissions-in-org",
      },
    });
  }

  const checkUserCanBeAssigned = findByRoute(
    routes,
    "GET /repos/:owner/:repo/assignees/:assignee"
  );
  if (checkUserCanBeAssigned) {
    checkUserCanBeAssigned.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-01",
      note:
        '"issues/check-assignee" operation ID is now "issues/check-user-can-be-assigned"',
      before: {
        operationId: "issues/check-assignee",
      },
      after: {
        operationId: "issues/check-user-can-be-assigned",
      },
    });
  }

  const listMilestones = findByRoute(
    routes,
    "GET /repos/:owner/:repo/milestones"
  );
  if (listMilestones) {
    listMilestones.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-01",
      note:
        '"issues/list-milestones-for-repo" operation ID is now "issues/list-milestones"',
      before: {
        operationId: "issues/list-milestones-for-repo",
      },
      after: {
        operationId: "issues/list-milestones",
      },
    });
  }

  const getImportStatus = findByRoute(routes, "GET /repos/:owner/:repo/import");
  if (getImportStatus) {
    getImportStatus.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-01",
      note:
        '"migrations/get-import-progress" operation ID is now "migrations/get-import-status"',
      before: {
        operationId: "migrations/get-import-progress",
      },
      after: {
        operationId: "migrations/get-import-status",
      },
    });
  }

  if (!gheVersion || gheVersion >= 2.21) {
    const getMembershipForUserLegacy = findByRoute(
      routes,
      "GET /teams/:team_id/memberships/:username"
    );
    if (getMembershipForUserLegacy) {
      getMembershipForUserLegacy.operation["x-changes"].push({
        type: "operation",
        date: "2020-06-03",
        note:
          '"teams/get-membership-legacy" operation ID is now "teams/get-membership-for-user-legacy"',
        before: {
          operationId: "teams/get-membership-legacy",
        },
        after: {
          operationId: "teams/get-membership-for-user-legacy",
        },
      });
    }

    const addOrUpdateMembershipForUserLegacy = findByRoute(
      routes,
      "PUT /teams/:team_id/memberships/:username"
    );
    if (addOrUpdateMembershipForUserLegacy) {
      addOrUpdateMembershipForUserLegacy.operation["x-changes"].push({
        type: "operation",
        date: "2020-06-03",
        note:
          '"teams/add-or-update-membership-legacy" operation ID is now "teams/add-or-update-membership-for-user-legacy"',
        before: {
          operationId: "teams/add-or-update-membership-legacy",
        },
        after: {
          operationId: "teams/add-or-update-membership-for-user-legacy",
        },
      });
    }

    const removeMembershipForUserLegacy = findByRoute(
      routes,
      "DELETE /teams/:team_id/memberships/:username"
    );
    if (removeMembershipForUserLegacy) {
      removeMembershipForUserLegacy.operation["x-changes"].push({
        type: "operation",
        date: "2020-06-03",
        note:
          '"teams/remove-membership-legacy" operation ID is now "teams/remove-membership-for-user-legacy"',
        before: {
          operationId: "teams/remove-membership-legacy",
        },
        after: {
          operationId: "teams/remove-membership-for-user-legacy",
        },
      });
    }

    const checkPermissionsForProjectLegacy = findByRoute(
      routes,
      "GET /teams/:team_id/projects/:project_id"
    );
    if (checkPermissionsForProjectLegacy) {
      checkPermissionsForProjectLegacy.operation["x-changes"].push({
        type: "operation",
        date: "2020-06-03",
        note:
          '"teams/review-project-legacy" operation ID is now "teams/check-permissions-for-project-legacy"',
        before: {
          operationId: "teams/review-project-legacy",
        },
        after: {
          operationId: "teams/check-permissions-for-project-legacy",
        },
      });
    }

    const addOrUpdateProjectPermissionsLegacy = findByRoute(
      routes,
      "PUT /teams/:team_id/projects/:project_id"
    );
    if (addOrUpdateProjectPermissionsLegacy) {
      addOrUpdateProjectPermissionsLegacy.operation["x-changes"].push({
        type: "operation",
        date: "2020-06-03",
        note:
          '"teams/add-or-update-project-legacy" operation ID is now "teams/add-or-update-project-permissions-legacy"',
        before: {
          operationId: "teams/add-or-update-project-legacy",
        },
        after: {
          operationId: "teams/add-or-update-project-permissions-legacy",
        },
      });
    }

    const checkPermissionsForRepoLegacy = findByRoute(
      routes,
      "GET /teams/:team_id/repos/:owner/:repo"
    );
    if (checkPermissionsForRepoLegacy) {
      checkPermissionsForRepoLegacy.operation["x-changes"].push({
        type: "operation",
        date: "2020-06-03",
        note:
          '"teams/check-manages-repo-legacy" operation ID is now "teams/check-permissions-for-repo-legacy"',
        before: {
          operationId: "teams/check-manages-repo-legacy",
        },
        after: {
          operationId: "teams/check-permissions-for-repo-legacy",
        },
      });
    }

    const addOrUpdateRepoPermissionsLegacy = findByRoute(
      routes,
      "PUT /teams/:team_id/repos/:owner/:repo"
    );
    if (addOrUpdateRepoPermissionsLegacy) {
      addOrUpdateRepoPermissionsLegacy.operation["x-changes"].push({
        type: "operation",
        date: "2020-06-03",
        note:
          '"teams/add-or-update-repo-legacy" operation ID is now "teams/add-or-update-repo-permissions-legacy"',
        before: {
          operationId: "teams/add-or-update-repo-legacy",
        },
        after: {
          operationId: "teams/add-or-update-repo-permissions-legacy",
        },
      });
    }
  }

  const getMembershipForUser = findByRoute(
    routes,
    "GET /teams/:team_id/memberships/:username"
  );
  if (getMembershipForUser) {
    getMembershipForUser.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-04",
      note:
        '"teams/get-membership" operation ID is now "teams/get-membership-for-user"',
      before: {
        operationId: "teams/get-membership",
      },
      after: {
        operationId: "teams/get-membership-for-user",
      },
    });
  }

  const addOrUpdateMembershipForUser = findByRoute(
    routes,
    "PUT /teams/:team_id/memberships/:username"
  );
  if (addOrUpdateMembershipForUser) {
    addOrUpdateMembershipForUser.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-04",
      note:
        '"teams/add-or-update-membership" operation ID is now "teams/add-or-update-membership-for-user"',
      before: {
        operationId: "teams/add-or-update-membership",
      },
      after: {
        operationId: "teams/add-or-update-membership-for-user",
      },
    });
  }

  const removeMembershipForUser = findByRoute(
    routes,
    "DELETE /teams/:team_id/memberships/:username"
  );
  if (removeMembershipForUser) {
    removeMembershipForUser.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-04",
      note:
        '"teams/remove-membership" operation ID is now "teams/remove-membership-for-user"',
      before: {
        operationId: "teams/remove-membership",
      },
      after: {
        operationId: "teams/remove-membership-for-user",
      },
    });
  }

  const checkPermissionsForProject = findByRoute(
    routes,
    "GET /teams/:team_id/projects/:project_id"
  );
  if (checkPermissionsForProject) {
    checkPermissionsForProject.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-04",
      note:
        '"teams/review-project" operation ID is now "teams/check-permissions-for-project"',
      before: {
        operationId: "teams/review-project",
      },
      after: {
        operationId: "teams/check-permissions-for-project",
      },
    });
  }

  const addOrUpdateProjectPermissions = findByRoute(
    routes,
    "PUT /teams/:team_id/projects/:project_id"
  );
  if (addOrUpdateProjectPermissions) {
    addOrUpdateProjectPermissions.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-04",
      note:
        '"teams/add-or-update-project" operation ID is now "teams/add-or-update-project-permissions"',
      before: {
        operationId: "teams/add-or-update-project",
      },
      after: {
        operationId: "teams/add-or-update-project-permissions",
      },
    });
  }

  const checkPermissionsForRepo = findByRoute(
    routes,
    "GET /teams/:team_id/repos/:owner/:repo"
  );
  if (checkPermissionsForRepo) {
    checkPermissionsForRepo.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-04",
      note:
        '"teams/check-manages-repo" operation ID is now "teams/check-permissions-for-repo"',
      before: {
        operationId: "teams/check-manages-repo",
      },
      after: {
        operationId: "teams/check-permissions-for-repo",
      },
    });
  }

  const addOrUpdateRepoPermissions = findByRoute(
    routes,
    "PUT /teams/:team_id/repos/:owner/:repo"
  );
  if (addOrUpdateRepoPermissions) {
    addOrUpdateRepoPermissions.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-04",
      note:
        '"teams/add-or-update-repo" operation ID is now "teams/add-or-update-repo-permissions"',
      before: {
        operationId: "teams/add-or-update-repo",
      },
      after: {
        operationId: "teams/add-or-update-repo-permissions",
      },
    });
  }

  const listReposAccessibleToInstallation = findByRoute(
    routes,
    "GET /installation/repositories"
  );
  if (listReposAccessibleToInstallation) {
    listReposAccessibleToInstallation.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-04",
      note:
        '"apps/list-repos" operation ID is now "apps/list-repos-accessible-to-installation"',
      before: {
        operationId: "apps/list-repos",
      },
      after: {
        operationId: "apps/list-repos-accessible-to-installation",
      },
    });
  }

  const revokeInstallationAccessToken = findByRoute(
    routes,
    "DELETE /installation/token"
  );
  if (revokeInstallationAccessToken) {
    revokeInstallationAccessToken.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-04",
      note:
        '"apps/revoke-installation-token" operation ID is now "apps/revoke-installation-access-token"',
      before: {
        operationId: "apps/revoke-installation-token",
      },
      after: {
        operationId: "apps/revoke-installation-access-token",
      },
    });
  }

  const getJobForWorkflowRun = findByRoute(
    routes,
    "GET /repos/:owner/:repo/actions/jobs/:job_id"
  );
  if (getJobForWorkflowRun) {
    getJobForWorkflowRun.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-04",
      note:
        '"actions/get-workflow-job" operation ID is now "actions/get-job-for-workflow-run"',
      before: {
        operationId: "actions/get-workflow-job",
      },
      after: {
        operationId: "actions/get-job-for-workflow-run",
      },
    });
  }

  const createInstallationAccessToken = findByRoute(
    routes,
    "POST /app/installations/:installation_id/access_tokens"
  );
  if (createInstallationAccessToken) {
    createInstallationAccessToken.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-04",
      note:
        '"apps/create-installation-token" operation ID is now "apps/create-installation-access-token"',
      before: {
        operationId: "apps/create-installation-token",
      },
      after: {
        operationId: "apps/create-installation-access-token",
      },
    });
  }

  const setRestrictionsForRepo = findByRoute(
    routes,
    "PUT /repos/:owner/:repo/interaction-limits"
  );
  if (setRestrictionsForRepo) {
    setRestrictionsForRepo.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-04",
      note:
        '"interactions/add-or-update-restrictions-for-repo" operation ID is now "interactions/set-restrictions-for-repo"',
      before: {
        operationId: "interactions/add-or-update-restrictions-for-repo",
      },
      after: {
        operationId: "interactions/set-restrictions-for-repo",
      },
    });
  }

  const setRestrictionsForOrg = findByRoute(
    routes,
    "PUT /orgs/:org/interaction-limits"
  );
  if (setRestrictionsForOrg) {
    setRestrictionsForOrg.operation["x-changes"].push({
      type: "operation",
      date: "2020-06-04",
      note:
        '"interactions/add-or-update-restrictions-for-org" operation ID is now "interactions/set-restrictions-for-org"',
      before: {
        operationId: "interactions/add-or-update-restrictions-for-org",
      },
      after: {
        operationId: "interactions/set-restrictions-for-org",
      },
    });
  }

  addOperationIdRename(
    routes,
    "GET /repos/{owner}/{repo}/actions/runs",
    "2020-06-04",
    "actions/list-repo-workflow-runs",
    "actions/list-workflow-runs-for-repo"
  );

  if (!gheVersion) {
    addOperationIdRename(
      routes,
      "GET /gitignore/templates",
      "2020-06-04",
      "gitignore/list-templates",
      "gitignore/get-all-templates"
    );

    addOperationIdRename(
      routes,
      "GET /licenses",
      "2020-06-04",
      "licenses/list-commonly-used",
      "licenses/get-all-commonly-used"
    );
  }

  addOperationIdRename(
    routes,
    "GET /orgs/{org}/credential-authorizations",
    "2020-06-04",
    "orgs/list-credential-authorizations",
    "orgs/list-saml-sso-authorizations"
  );

  addOperationIdRename(
    routes,
    "DELETE /orgs/{org}/credential-authorizations/{credential_id}",
    "2020-06-04",
    "orgs/remove-credential-authorization",
    "orgs/remove-saml-sso-authorization"
  );

  addOperationIdRename(
    routes,
    "GET /orgs/{org}/hooks",
    "2020-06-04",
    "orgs/list-hooks",
    "orgs/list-webhooks"
  );

  addOperationIdRename(
    routes,
    "POST /orgs/{org}/hooks",
    "2020-06-04",
    "orgs/create-hook",
    "orgs/create-webhook"
  );

  addOperationIdRename(
    routes,
    "GET /orgs/{org}/hooks/{hook_id}",
    "2020-06-04",
    "orgs/get-hook",
    "orgs/get-webhook"
  );

  addOperationIdRename(
    routes,
    "PATCH /orgs/{org}/hooks/{hook_id}",
    "2020-06-04",
    "orgs/update-hook",
    "orgs/update-webhook"
  );

  addOperationIdRename(
    routes,
    "DELETE /orgs/{org}/hooks/{hook_id}",
    "2020-06-04",
    "orgs/delete-hook",
    "orgs/delete-webhook"
  );

  addOperationIdRename(
    routes,
    "POST /orgs/{org}/hooks/{hook_id}/pings",
    "2020-06-04",
    "orgs/ping-hook",
    "orgs/ping-webhook"
  );

  addOperationIdRename(
    routes,
    "GET /orgs/{org}/installations",
    "2020-06-04",
    "orgs/list-installations",
    "orgs/list-app-installations"
  );

  addOperationIdRename(
    routes,
    "GET /orgs/{org}/members/{username}",
    "2020-06-04",
    "orgs/check-membership",
    "orgs/check-membership-for-user"
  );

  addOperationIdRename(
    routes,
    "GET /orgs/{org}/memberships/{username}",
    "2020-06-04",
    "orgs/get-membership",
    "orgs/get-membership-for-user"
  );

  addOperationIdRename(
    routes,
    "PUT /orgs/{org}/memberships/{username}",
    "2020-06-04",
    "orgs/add-or-update-membership",
    "orgs/set-membership-for-user"
  );

  addOperationIdRename(
    routes,
    "DELETE /orgs/{org}/memberships/{username}",
    "2020-06-04",
    "orgs/remove-membership",
    "orgs/remove-membership-for-user"
  );

  addOperationIdRename(
    routes,
    "GET /orgs/{org}/public_members/{username}",
    "2020-06-04",
    "orgs/check-public-membership",
    "orgs/check-public-membership-for-user"
  );

  addOperationIdRename(
    routes,
    "PUT /orgs/{org}/public_members/{username}",
    "2020-06-04",
    "orgs/publicize-membership",
    "orgs/set-public-membership-for-authenticated-user"
  );

  addOperationIdRename(
    routes,
    "DELETE /orgs/{org}/public_members/{username}",
    "2020-06-04",
    "orgs/conceal-membership",
    "orgs/remove-public-membership-for-authenticated-user"
  );

  addOperationIdRename(
    routes,
    "DELETE /repos/{owner}/{repo}/branches/{branch}/protection",
    "2020-06-04",
    "repos/remove-branch-protection",
    "repos/delete-branch-protection"
  );

  addOperationIdRename(
    routes,
    "GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins",
    "2020-06-04",
    "repos/get-protected-branch-admin-enforcement",
    "repos/get-admin-branch-protection"
  );

  addOperationIdRename(
    routes,
    "POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins",
    "2020-06-04",
    "repos/add-protected-branch-admin-enforcement",
    "repos/set-admin-branch-protection"
  );

  addOperationIdRename(
    routes,
    "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins",
    "2020-06-04",
    "repos/remove-protected-branch-admin-enforcement",
    "repos/delete-admin-branch-protection"
  );

  addOperationIdRename(
    routes,
    "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews",
    "2020-06-04",
    "repos/get-protected-branch-pull-request-review-enforcement",
    "repos/get-pull-request-review-protection"
  );

  addOperationIdRename(
    routes,
    "PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews",
    "2020-06-04",
    "repos/update-protected-branch-pull-request-review-enforcement",
    "repos/update-pull-request-review-protection"
  );

  addOperationIdRename(
    routes,
    "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews",
    "2020-06-04",
    "repos/remove-protected-branch-pull-request-review-enforcement",
    "repos/delete-pull-request-review-protection"
  );

  addOperationIdRename(
    routes,
    "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures",
    "2020-06-04",
    "repos/get-protected-branch-required-signatures",
    "repos/get-commit-signature-protection"
  );

  addOperationIdRename(
    routes,
    "POST /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures",
    "2020-06-04",
    "repos/add-protected-branch-required-signatures",
    "repos/create-commit-signature-protection"
  );

  addOperationIdRename(
    routes,
    "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures",
    "2020-06-04",
    "repos/remove-protected-branch-required-signatures",
    "repos/delete-commit-signature-protection"
  );

  addOperationIdRename(
    routes,
    "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks",
    "2020-06-04",
    "repos/get-protected-branch-required-status-checks",
    "repos/get-status-checks-protection"
  );

  addOperationIdRename(
    routes,
    "PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks",
    "2020-06-04",
    "repos/update-protected-branch-required-status-checks",
    "repos/update-status-checks-protection"
  );

  addOperationIdRename(
    routes,
    "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks",
    "2020-06-04",
    "repos/remove-protected-branch-required-status-checks",
    "repos/remove-status-checks-protection"
  );

  addOperationIdRename(
    routes,
    "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
    "2020-06-04",
    "repos/list-protected-branch-required-status-checks-contexts",
    "repos/get-all-status-check-contexts"
  );

  addOperationIdRename(
    routes,
    "PUT /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
    "2020-06-04",
    "repos/replace-protected-branch-required-status-checks-contexts",
    "repos/set-status-check-contexts"
  );

  addOperationIdRename(
    routes,
    "POST /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
    "2020-06-04",
    "repos/add-protected-branch-required-status-checks-contexts",
    "repos/add-status-check-contexts"
  );

  addOperationIdRename(
    routes,
    "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
    "2020-06-04",
    "repos/remove-protected-branch-required-status-checks-contexts",
    "repos/remove-status-check-contexts"
  );

  addOperationIdRename(
    routes,
    "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions",
    "2020-06-04",
    "repos/remove-protected-branch-restrictions",
    "repos/delete-access-restrictions"
  );

  addOperationIdRename(
    routes,
    "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions",
    "2020-06-04",
    "repos/get-protected-branch-restrictions",
    "repos/get-access-restrictions"
  );

  addOperationIdRename(
    routes,
    "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
    "2020-06-04",
    "repos/replace-protected-branch-app-restrictions",
    "repos/set-app-access-restrictions"
  );

  addOperationIdRename(
    routes,
    "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
    "2020-06-04",
    "repos/add-protected-branch-app-restrictions",
    "repos/add-app-access-restrictions"
  );

  addOperationIdRename(
    routes,
    "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
    "2020-06-04",
    "repos/remove-protected-branch-app-restrictions",
    "repos/remove-app-access-restrictions"
  );

  addOperationIdRename(
    routes,
    "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
    "2020-06-04",
    "repos/replace-protected-branch-team-restrictions",
    "repos/set-team-access-restrictions"
  );

  addOperationIdRename(
    routes,
    "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
    "2020-06-04",
    "repos/add-protected-branch-team-restrictions",
    "repos/add-team-access-restrictions"
  );

  addOperationIdRename(
    routes,
    "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
    "2020-06-04",
    "repos/remove-protected-branch-team-restrictions",
    "repos/remove-team-access-restrictions"
  );

  addOperationIdRename(
    routes,
    "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
    "2020-06-04",
    "repos/replace-protected-branch-user-restrictions",
    "repos/set-user-access-restrictions"
  );

  addOperationIdRename(
    routes,
    "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
    "2020-06-04",
    "repos/add-protected-branch-user-restrictions",
    "repos/add-user-access-restrictions"
  );

  addOperationIdRename(
    routes,
    "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
    "2020-06-04",
    "repos/remove-protected-branch-user-restrictions",
    "repos/remove-user-access-restrictions"
  );

  addOperationIdRename(
    routes,
    "GET /repos/{owner}/{repo}/commits/{ref}/statuses",
    "2020-06-04",
    "repos/list-statuses-for-ref",
    "repos/list-commit-statuses-for-ref"
  );

  addOperationIdRename(
    routes,
    "GET /repos/{owner}/{repo}/community/profile",
    "2020-06-04",
    "repos/retrieve-community-profile-metrics",
    "repos/get-community-profile-metrics"
  );

  addOperationIdRename(
    routes,
    "GET /repos/{owner}/{repo}/contents/{path}",
    "2020-06-04",
    "repos/get-contents",
    "repos/get-content"
  );

  addOperationIdRename(
    routes,
    "PUT /repos/{owner}/{repo}/contents/{path}",
    "2020-06-04",
    "repos/create-or-update-file",
    "repos/create-or-update-file-contents"
  );

  addOperationIdRename(
    routes,
    "GET /repos/{owner}/{repo}/hooks",
    "2020-06-04",
    "repos/list-hooks",
    "repos/list-webhooks"
  );

  addOperationIdRename(
    routes,
    "POST /repos/{owner}/{repo}/hooks",
    "2020-06-04",
    "repos/create-hook",
    "repos/create-webhook"
  );

  addOperationIdRename(
    routes,
    "GET /repos/{owner}/{repo}/hooks/{hook_id}",
    "2020-06-04",
    "repos/get-hook",
    "repos/get-webhook"
  );

  addOperationIdRename(
    routes,
    "PATCH /repos/{owner}/{repo}/hooks/{hook_id}",
    "2020-06-04",
    "repos/update-hook",
    "repos/update-webhook"
  );

  addOperationIdRename(
    routes,
    "DELETE /repos/{owner}/{repo}/hooks/{hook_id}",
    "2020-06-04",
    "repos/delete-hook",
    "repos/delete-webhook"
  );

  addOperationIdRename(
    routes,
    "POST /repos/{owner}/{repo}/hooks/{hook_id}/pings",
    "2020-06-04",
    "repos/ping-hook",
    "repos/ping-webhook"
  );

  addOperationIdRename(
    routes,
    "POST /repos/{owner}/{repo}/hooks/{hook_id}/tests",
    "2020-06-04",
    "repos/test-push-hook",
    "repos/test-push-webhook"
  );

  addOperationIdRename(
    routes,
    "POST /repos/{owner}/{repo}/keys",
    "2020-06-04",
    "repos/add-deploy-key",
    "repos/create-deploy-key"
  );

  addOperationIdRename(
    routes,
    "DELETE /repos/{owner}/{repo}/keys/{key_id}",
    "2020-06-04",
    "repos/remove-deploy-key",
    "repos/delete-deploy-key"
  );

  addOperationIdRename(
    routes,
    "POST /repos/{owner}/{repo}/pages",
    "2020-06-04",
    "repos/enable-pages-site",
    "repos/create-pages-site"
  );

  addOperationIdRename(
    routes,
    "DELETE /repos/{owner}/{repo}/pages",
    "2020-06-04",
    "repos/disable-pages-site",
    "repos/delete-pages-site"
  );

  addOperationIdRename(
    routes,
    "POST /repos/{owner}/{repo}/pages/builds",
    "2020-06-04",
    "repos/request-page-build",
    "repos/request-pages-build"
  );

  addOperationIdRename(
    routes,
    "GET /repos/{owner}/{repo}/releases/{release_id}/assets",
    "2020-06-04",
    "repos/list-assets-for-release",
    "repos/list-release-assets"
  );

  addOperationIdRename(
    routes,
    "POST /repos/{owner}/{repo}/statuses/{sha}",
    "2020-06-04",
    "repos/create-status",
    "repos/create-commit-status"
  );

  addOperationIdRename(
    routes,
    "GET /repos/{owner}/{repo}/{archive_format}/{ref}",
    "2020-06-04",
    "repos/get-archive-link",
    "repos/download-archive"
  );

  addOperationIdRename(
    routes,
    "POST /scim/v2/organizations/{org}/Users",
    "2020-06-04",
    "scim/provision-and-invite-users",
    "scim/provision-and-invite-user"
  );

  addOperationIdRename(
    routes,
    "GET /scim/v2/organizations/{org}/Users/{scim_user_id}",
    "2020-06-04",
    "scim/get-provisioning-details-for-user",
    "scim/get-provisioning-information-for-user"
  );

  addOperationIdRename(
    routes,
    "PUT /scim/v2/organizations/{org}/Users/{scim_user_id}",
    "2020-06-04",
    "scim/replace-provisioned-user-information",
    "scim/set-information-for-provisioned-user"
  );

  addOperationIdRename(
    routes,
    "PATCH /scim/v2/organizations/{org}/Users/{scim_user_id}",
    "2020-06-04",
    "scim/update-user-attribute",
    "scim/update-attribute-for-user"
  );

  addOperationIdRename(
    routes,
    "DELETE /scim/v2/organizations/{org}/Users/{scim_user_id}",
    "2020-06-04",
    "scim/remove-user-from-org",
    "scim/delete-user-from-org"
  );

  addOperationIdRename(
    routes,
    "GET /user/blocks",
    "2020-06-04",
    "users/list-blocked",
    "users/list-blocked-by-authenticated"
  );

  addOperationIdRename(
    routes,
    "PATCH /user/email/visibility",
    "2020-06-04",
    "users/toggle-primary-email-visibility",
    "users/set-primary-email-visibility-for-authenticated"
  );

  addOperationIdRename(
    routes,
    "GET /user/emails",
    "2020-06-04",
    "users/list-emails",
    "users/list-emails-for-authenticated"
  );

  addOperationIdRename(
    routes,
    "POST /user/emails",
    "2020-06-04",
    "users/add-emails",
    "users/add-emails-for-authenticated"
  );

  addOperationIdRename(
    routes,
    "DELETE /user/emails",
    "2020-06-04",
    "users/delete-emails",
    "users/delete-emails-for-authenticated"
  );

  addOperationIdRename(
    routes,
    "GET /user/following/{username}",
    "2020-06-04",
    "users/check-following",
    "users/check-person-is-followed-by-authenticated"
  );

  addOperationIdRename(
    routes,
    "GET /user/gpg_keys",
    "2020-06-04",
    "users/list-gpg-keys",
    "users/list-gpg-keys-for-authenticated"
  );

  addOperationIdRename(
    routes,
    "POST /user/gpg_keys",
    "2020-06-04",
    "users/create-gpg-key",
    "users/create-gpg-key-for-authenticated"
  );

  addOperationIdRename(
    routes,
    "GET /user/gpg_keys/{gpg_key_id}",
    "2020-06-04",
    "users/get-gpg-key",
    "users/get-gpg-key-for-authenticated"
  );

  addOperationIdRename(
    routes,
    "DELETE /user/gpg_keys/{gpg_key_id}",
    "2020-06-04",
    "users/delete-gpg-key",
    "users/delete-gpg-key-for-authenticated"
  );

  addOperationIdRename(
    routes,
    "GET /user/keys",
    "2020-06-04",
    "users/list-public-keys",
    "users/list-public-ssh-keys-for-authenticated"
  );

  addOperationIdRename(
    routes,
    "POST /user/keys",
    "2020-06-04",
    "users/create-public-key",
    "users/create-public-ssh-key-for-authenticated"
  );

  addOperationIdRename(
    routes,
    "GET /user/keys/{key_id}",
    "2020-06-04",
    "users/get-public-key",
    "users/get-public-ssh-key-for-authenticated"
  );

  addOperationIdRename(
    routes,
    "DELETE /user/keys/{key_id}",
    "2020-06-04",
    "users/delete-public-key",
    "users/delete-public-ssh-key-for-authenticated"
  );

  addOperationIdRename(
    routes,
    "GET /user/memberships/orgs",
    "2020-06-04",
    "orgs/list-memberships",
    "orgs/list-memberships-for-authenticated-user"
  );

  addOperationIdRename(
    routes,
    "PATCH /user/memberships/orgs/{org}",
    "2020-06-04",
    "orgs/update-membership",
    "orgs/update-membership-for-authenticated-user"
  );

  addOperationIdRename(
    routes,
    "GET /user/public_emails",
    "2020-06-04",
    "users/list-public-emails",
    "users/list-public-emails-for-authenticated-user"
  );

  addOperationIdRename(
    routes,
    "GET /repos/{owner}/{repo}/comments",
    "2020-06-04",
    "repos/list-commit-comments",
    "repos/list-commit-comments-for-repo"
  );

  addOperationIdRename(
    routes,
    "GET /projects/{project_id}/collaborators/{username}/permission",
    "2020-06-05",
    "projects/review-user-permission-level",
    "projects/get-permission-for-user"
  );

  addOperationIdRename(
    routes,
    "GET /repos/{owner}/{repo}/pulls/comments",
    "2020-06-05",
    "pulls/list-comments-for-repo",
    "pulls/list-review-comments-for-repo"
  );

  addOperationIdRename(
    routes,
    "GET /repos/{owner}/{repo}/pulls/comments/{comment_id}",
    "2020-06-05",
    "pulls/get-comment",
    "pulls/get-review-comment"
  );

  addOperationIdRename(
    routes,
    "PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}",
    "2020-06-05",
    "pulls/update-comment",
    "pulls/update-review-comment"
  );

  addOperationIdRename(
    routes,
    "DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}",
    "2020-06-05",
    "pulls/delete-comment",
    "pulls/delete-review-comment"
  );

  addOperationIdRename(
    routes,
    "GET /repos/{owner}/{repo}/pulls/{pull_number}/comments",
    "2020-06-05",
    "pulls/list-comments",
    "pulls/list-review-comments"
  );

  addOperationIdRename(
    routes,
    "POST /repos/{owner}/{repo}/pulls/{pull_number}/comments",
    "2020-06-05",
    "pulls/create-comment",
    "pulls/create-review-comment"
  );

  addOperationIdRename(
    routes,
    "POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies",
    "2020-06-05",
    "pulls/create-review-comment-reply",
    "pulls/create-reply-for-review-comment"
  );

  addOperationIdRename(
    routes,
    "GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers",
    "2020-06-05",
    "pulls/list-review-requests",
    "pulls/list-requested-reviewers"
  );

  addOperationIdRename(
    routes,
    "POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers",
    "2020-06-05",
    "pulls/create-review-request",
    "pulls/request-reviewers"
  );

  addOperationIdRename(
    routes,
    "DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers",
    "2020-06-05",
    "pulls/delete-review-request",
    "pulls/remove-requested-reviewers"
  );

  addOperationIdRename(
    routes,
    "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments",
    "2020-06-05",
    "pulls/get-comments-for-review",
    "pulls/list-comments-for-review"
  );

  addOperationIdRename(
    routes,
    "GET /admin/hooks",
    "2020-06-05",
    "enterprise-admin/list-global-hooks",
    "enterprise-admin/list-global-webhooks"
  );

  addOperationIdRename(
    routes,
    "POST /admin/hooks",
    "2020-06-05",
    "enterprise-admin/create-global-hooks",
    "enterprise-admin/create-global-webhooks"
  );

  addOperationIdRename(
    routes,
    "GET /admin/hooks/{hook_id}",
    "2020-06-05",
    "enterprise-admin/get-global-hook",
    "enterprise-admin/get-global-webhook"
  );

  addOperationIdRename(
    routes,
    "PATCH /admin/hooks/{hook_id}",
    "2020-06-05",
    "enterprise-admin/update-global-hook",
    "enterprise-admin/update-global-webhook"
  );

  addOperationIdRename(
    routes,
    "DELETE /admin/hooks/{hook_id}",
    "2020-06-05",
    "enterprise-admin/delete-global-hook",
    "enterprise-admin/delete-global-webhook"
  );

  addOperationIdRename(
    routes,
    "POST /admin/hooks/{hook_id}/pings",
    "2020-06-05",
    "enterprise-admin/ping-global-hook",
    "enterprise-admin/ping-global-webhook"
  );

  addOperationIdRename(
    routes,
    "PATCH /admin/organizations/{org}",
    "2020-06-05",
    "enterprise-admin/rename-org",
    "enterprise-admin/update-org-name"
  );

  addOperationIdRename(
    routes,
    "POST /admin/pre-receive-environments/{pre_receive_environment_id}/downloads",
    "2020-06-05",
    "enterprise-admin/trigger-pre-receive-environment-download",
    "enterprise-admin/start-pre-receive-environment-download"
  );

  addOperationIdRename(
    routes,
    "GET /admin/pre-receive-environments/{pre_receive_environment_id}/downloads/latest",
    "2020-06-05",
    "enterprise-admin/get-pre-receive-environment-download-status",
    "enterprise-admin/get-download-status-for-pre-receive-environment"
  );

  addOperationIdRename(
    routes,
    "PATCH /admin/users/{username}",
    "2020-06-05",
    "enterprise-admin/rename-user",
    "enterprise-admin/update-username-for-user"
  );

  addOperationIdRename(
    routes,
    "GET /setup/api/configcheck",
    "2020-06-05",
    "enterprise-admin/check-configuration-status",
    "enterprise-admin/get-configuration-status"
  );

  addOperationIdRename(
    routes,
    "GET /setup/api/maintenance",
    "2020-06-05",
    "enterprise-admin/check-maintenance-status",
    "enterprise-admin/get-maintenance-status"
  );

  addOperationIdRename(
    routes,
    "GET /setup/api/settings",
    "2020-06-05",
    "enterprise-admin/retrieve-settings",
    "enterprise-admin/get-settings"
  );

  addOperationIdRename(
    routes,
    "PUT /setup/api/settings",
    "2020-06-05",
    "enterprise-admin/modify-settings",
    "enterprise-admin/set-settings"
  );

  addOperationIdRename(
    routes,
    "GET /setup/api/settings/authorized-keys",
    "2020-06-05",
    "enterprise-admin/retrieve-authorized-ssh-keys",
    "enterprise-admin/get-all-authorized-ssh-keys"
  );

  addOperationIdRename(
    routes,
    "POST /setup/api/start",
    "2020-06-05",
    "enterprise-admin/upload-license-for-first-time",
    "enterprise-admin/create-enterprise-server-license"
  );

  addOperationIdRename(
    routes,
    "POST /staff/indexing_jobs",
    "2020-06-05",
    "enterprise-admin/queue-indexing-job",
    "enterprise-admin/create-indexing-job"
  );

  addOperationIdRename(
    routes,
    "POST /staff/indexing_jobs",
    "2020-06-05",
    "enterprise-admin/queue-indexing-job",
    "enterprise-admin/create-indexing-job"
  );

  addOperationIdRename(
    routes,
    "PUT /users/{username}/site_admin",
    "2020-06-05",
    "enterprise-admin/promote-ordinary-user-to-site-administrator",
    "enterprise-admin/promote-user-to-be-site-administrator"
  );

  addOperationIdRename(
    routes,
    "DELETE /users/{username}/site_admin",
    "2020-06-05",
    "enterprise-admin/demote-site-administrator-to-ordinary-user",
    "enterprise-admin/demote-site-administrator"
  );
}

function addOperationIdRename(routes, route, date, before, after) {
  // /foo/{bar} -> /foo/:bar
  route = route.replace(/\{([^}]+)\}/g, ":$1");

  const { operation } = findByRoute(routes, route) || {};
  if (!operation) return;

  operation["x-changes"].push({
    type: "operation",
    date,
    note: `"${before}" operation ID is now "${after}"`,
    before: {
      operationId: before,
    },
    after: {
      operationId: after,
    },
  });
}

function findAllByPath(routes, path) {
  return routes.filter((route) => {
    return path === route.path;
  });
}

function findByRoute(routes, route) {
  return routes.find(({ method, path }) => {
    return route === `${method} ${path}`;
  });
}

function findAllByRoute(routes, route) {
  return routes.filter(({ method, path }) => {
    return route === `${method} ${path}`;
  });
}
