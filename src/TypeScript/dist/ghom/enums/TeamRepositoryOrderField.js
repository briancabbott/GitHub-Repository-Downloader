"use strict";
// TeamRepositoryOrderField
// Properties by which team repository connections can be ordered.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRepositoryOrderField = void 0;
// Values
// CREATED_AT
// Order repositories by creation time
// NAME
// Order repositories by name
// PERMISSION
// Order repositories by permission
// PUSHED_AT
// Order repositories by push time
// STARGAZERS
// Order repositories by number of stargazers
// UPDATED_AT
// Order repositories by update time
// Properties by which team repository connections can be ordered.
var TeamRepositoryOrderField;
(function (TeamRepositoryOrderField) {
    // Order repositories by creation time
    TeamRepositoryOrderField[TeamRepositoryOrderField["CREATED_AT"] = 0] = "CREATED_AT";
    // Order repositories by name
    TeamRepositoryOrderField[TeamRepositoryOrderField["NAME"] = 1] = "NAME";
    // Order repositories by permission
    TeamRepositoryOrderField[TeamRepositoryOrderField["PERMISSION"] = 2] = "PERMISSION";
    // Order repositories by push time
    TeamRepositoryOrderField[TeamRepositoryOrderField["PUSHED_AT"] = 3] = "PUSHED_AT";
    // Order repositories by number of stargazers
    TeamRepositoryOrderField[TeamRepositoryOrderField["STARGAZERS"] = 4] = "STARGAZERS";
    // Order repositories by update time
    TeamRepositoryOrderField[TeamRepositoryOrderField["UPDATED_AT"] = 5] = "UPDATED_AT";
})(TeamRepositoryOrderField = exports.TeamRepositoryOrderField || (exports.TeamRepositoryOrderField = {}));
