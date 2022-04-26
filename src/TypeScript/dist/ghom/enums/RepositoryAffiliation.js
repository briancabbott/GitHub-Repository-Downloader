"use strict";
// RepositoryAffiliation
// The affiliation of a user to a repository
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryAffiliation = void 0;
// Values
// COLLABORATOR
// Repositories that the user has been added to as a collaborator.
// ORGANIZATION_MEMBER
// Repositories that the user has access to through being a member of an organization. This includes every repository on every team that the user is on.
// OWNER
// Repositories that are owned by the authenticated user.
// The affiliation of a user to a repository
var RepositoryAffiliation;
(function (RepositoryAffiliation) {
    // Repositories that the user has been added to as a collaborator.
    RepositoryAffiliation[RepositoryAffiliation["COLLABORATOR"] = 0] = "COLLABORATOR";
    // Repositories that the user has access to through being a member of an organization. This includes every repository on every team that the user is on.
    RepositoryAffiliation[RepositoryAffiliation["ORGANIZATION_MEMBER"] = 1] = "ORGANIZATION_MEMBER";
    // Repositories that are owned by the authenticated user.
    RepositoryAffiliation[RepositoryAffiliation["OWNER"] = 2] = "OWNER";
})(RepositoryAffiliation = exports.RepositoryAffiliation || (exports.RepositoryAffiliation = {}));
