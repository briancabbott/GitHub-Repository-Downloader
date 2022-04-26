"use strict";
// RepositoryOrderField
// Properties by which repository connections can be ordered.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryOrderField = void 0;
// Values
// CREATED_AT
// Order repositories by creation time
// NAME
// Order repositories by name
// PUSHED_AT
// Order repositories by push time
// STARGAZERS
// Order repositories by number of stargazers
// UPDATED_AT
// Order repositories by update time
// Properties by which repository connections can be ordered.
var RepositoryOrderField;
(function (RepositoryOrderField) {
    // Order repositories by creation time
    RepositoryOrderField[RepositoryOrderField["CREATED_AT"] = 0] = "CREATED_AT";
    // Order repositories by name
    RepositoryOrderField[RepositoryOrderField["NAME"] = 1] = "NAME";
    // Order repositories by push time
    RepositoryOrderField[RepositoryOrderField["PUSHED_AT"] = 2] = "PUSHED_AT";
    // Order repositories by number of stargazers
    RepositoryOrderField[RepositoryOrderField["STARGAZERS"] = 3] = "STARGAZERS";
    // Order repositories by update time
    RepositoryOrderField[RepositoryOrderField["UPDATED_AT"] = 4] = "UPDATED_AT";
})(RepositoryOrderField = exports.RepositoryOrderField || (exports.RepositoryOrderField = {}));
