"use strict";
// StatusState
// The possible commit status states.
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusState = void 0;
// Values
// ERROR
// Status is errored.
// EXPECTED
// Status is expected.
// FAILURE
// Status is failing.
// PENDING
// Status is pending.
// SUCCESS
// Status is successful.
// The possible commit status states.
var StatusState;
(function (StatusState) {
    // Status is errored.
    StatusState[StatusState["ERROR"] = 0] = "ERROR";
    // Status is expected.
    StatusState[StatusState["EXPECTED"] = 1] = "EXPECTED";
    // Status is failing.
    StatusState[StatusState["FAILURE"] = 2] = "FAILURE";
    // Status is pending.
    StatusState[StatusState["PENDING"] = 3] = "PENDING";
    // Status is successful.
    StatusState[StatusState["SUCCESS"] = 4] = "SUCCESS";
})(StatusState = exports.StatusState || (exports.StatusState = {}));
