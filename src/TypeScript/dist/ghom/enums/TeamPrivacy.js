"use strict";
// TeamPrivacy
// The possible team privacy values.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamPrivacy = void 0;
// Values
// SECRET
// A secret team can only be seen by its members.
// VISIBLE
// A visible team can be seen and @mentioned by every member of the organization.
// The possible team privacy values.
var TeamPrivacy;
(function (TeamPrivacy) {
    // A secret team can only be seen by its members.
    TeamPrivacy[TeamPrivacy["SECRET"] = 0] = "SECRET";
    // A visible team can be seen and @mentioned by every member of the organization.
    TeamPrivacy[TeamPrivacy["VISIBLE"] = 1] = "VISIBLE";
})(TeamPrivacy = exports.TeamPrivacy || (exports.TeamPrivacy = {}));
