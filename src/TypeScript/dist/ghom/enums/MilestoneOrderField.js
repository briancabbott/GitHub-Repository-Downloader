"use strict";
// MilestoneOrderField
// Properties by which milestone connections can be ordered.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MilestoneOrderField = void 0;
// Values
// CREATED_AT
// Order milestones by when they were created.
// DUE_DATE
// Order milestones by when they are due.
// NUMBER
// Order milestones by their number.
// UPDATED_AT
// Order milestones by when they were last updated.
// Properties by which milestone connections can be ordered.
var MilestoneOrderField;
(function (MilestoneOrderField) {
    // Order milestones by when they were created.
    MilestoneOrderField[MilestoneOrderField["CREATED_AT"] = 0] = "CREATED_AT";
    // Order milestones by when they are due.
    MilestoneOrderField[MilestoneOrderField["DUE_DATE"] = 1] = "DUE_DATE";
    // Order milestones by their number.
    MilestoneOrderField[MilestoneOrderField["NUMBER"] = 2] = "NUMBER";
    // Order milestones by when they were last updated.
    MilestoneOrderField[MilestoneOrderField["UPDATED_AT"] = 3] = "UPDATED_AT";
})(MilestoneOrderField = exports.MilestoneOrderField || (exports.MilestoneOrderField = {}));
