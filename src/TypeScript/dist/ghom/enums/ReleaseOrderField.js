"use strict";
// ReleaseOrderField
// Properties by which release connections can be ordered.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReleaseOrderField = void 0;
// Values
// CREATED_AT
// Order releases by creation time
// NAME
// Order releases alphabetically by name
// Properties by which release connections can be ordered.
var ReleaseOrderField;
(function (ReleaseOrderField) {
    // Order releases by creation time
    ReleaseOrderField[ReleaseOrderField["CREATED_AT"] = 0] = "CREATED_AT";
    // Order releases alphabetically by name
    ReleaseOrderField[ReleaseOrderField["NAME"] = 1] = "NAME";
})(ReleaseOrderField = exports.ReleaseOrderField || (exports.ReleaseOrderField = {}));
