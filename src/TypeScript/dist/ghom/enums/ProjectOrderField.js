"use strict";
// ProjectOrderField
// Properties by which project connections can be ordered.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectOrderField = void 0;
// Values
// CREATED_AT
// Order projects by creation time
// NAME
// Order projects by name
// UPDATED_AT
// Order projects by update time
// Properties by which project connections can be ordered.
var ProjectOrderField;
(function (ProjectOrderField) {
    // Order projects by creation time
    ProjectOrderField[ProjectOrderField["CREATED_AT"] = 0] = "CREATED_AT";
    // Order projects by name
    ProjectOrderField[ProjectOrderField["NAME"] = 1] = "NAME";
    // Order projects by update time
    ProjectOrderField[ProjectOrderField["UPDATED_AT"] = 2] = "UPDATED_AT";
})(ProjectOrderField = exports.ProjectOrderField || (exports.ProjectOrderField = {}));
