"use strict";
// RepositoryLockReason
// The possible reasons a given repository could be in a locked state.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryLockReason = void 0;
// Values
// BILLING
// The repository is locked due to a billing related reason.
// MIGRATING
// The repository is locked due to a migration.
// MOVING
// The repository is locked due to a move.
// RENAME
// The repository is locked due to a rename.
// The possible reasons a given repository could be in a locked state.
var RepositoryLockReason;
(function (RepositoryLockReason) {
    // The repository is locked due to a billing related reason.
    RepositoryLockReason[RepositoryLockReason["BILLING"] = 0] = "BILLING";
    // The repository is locked due to a migration.
    RepositoryLockReason[RepositoryLockReason["MIGRATING"] = 1] = "MIGRATING";
    // The repository is locked due to a move.
    RepositoryLockReason[RepositoryLockReason["MOVING"] = 2] = "MOVING";
    // The repository is locked due to a rename.
    RepositoryLockReason[RepositoryLockReason["RENAME"] = 3] = "RENAME";
})(RepositoryLockReason = exports.RepositoryLockReason || (exports.RepositoryLockReason = {}));
