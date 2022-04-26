"use strict";
// RepositoryPermission
// The access level to a repository
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryPermission = void 0;
// Values
// ADMIN
// Can read, clone, push, and add collaborators
// READ
// Can read and clone
// WRITE
// Can read, clone and push
// The access level to a repository
var RepositoryPermission;
(function (RepositoryPermission) {
    // Can read, clone, push, and add collaborators
    RepositoryPermission[RepositoryPermission["ADMIN"] = 0] = "ADMIN";
    // Can read and clone
    RepositoryPermission[RepositoryPermission["READ"] = 1] = "READ";
    // Can read, clone and push
    RepositoryPermission[RepositoryPermission["WRITE"] = 2] = "WRITE";
})(RepositoryPermission = exports.RepositoryPermission || (exports.RepositoryPermission = {}));
