"use strict";
// DeploymentStatusState
// The possible states for a deployment status.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeploymentStatusState = void 0;
// Values
// ERROR
// The deployment experienced an error.
// FAILURE
// The deployment has failed.
// INACTIVE
// The deployment is inactive.
// PENDING
// The deployment is pending.
// SUCCESS
// The deployment was successful.
// The possible states for a deployment status.
var DeploymentStatusState;
(function (DeploymentStatusState) {
    // The deployment experienced an error.
    DeploymentStatusState[DeploymentStatusState["ERROR"] = 0] = "ERROR";
    // The deployment has failed.
    DeploymentStatusState[DeploymentStatusState["FAILURE"] = 1] = "FAILURE";
    // The deployment is inactive.
    DeploymentStatusState[DeploymentStatusState["INACTIVE"] = 2] = "INACTIVE";
    // The deployment is pending.
    DeploymentStatusState[DeploymentStatusState["PENDING"] = 3] = "PENDING";
    // The deployment was successful.
    DeploymentStatusState[DeploymentStatusState["SUCCESS"] = 4] = "SUCCESS";
})(DeploymentStatusState = exports.DeploymentStatusState || (exports.DeploymentStatusState = {}));
