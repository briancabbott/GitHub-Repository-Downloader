"use strict";
// DeploymentState
// The possible states in which a deployment can be.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeploymentState = void 0;
// Values
// ABANDONED
// The pending deployment was not updated after 30 minutes.
// ACTIVE
// The deployment is currently active.
// DESTROYED
// An inactive transient deployment.
// ERROR
// The deployment experienced an error.
// FAILURE
// The deployment has failed.
// INACTIVE
// The deployment is inactive.
// IN_PROGRESS
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Deployments preview for more details.
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// The deployment is in progress.
// PENDING
// The deployment is pending.
// QUEUED
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Deployments preview for more details.
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// The deployment has queued
// The possible states in which a deployment can be.
var DeploymentState;
(function (DeploymentState) {
    // The pending deployment was not updated after 30 minutes.
    DeploymentState[DeploymentState["ABANDONED"] = 0] = "ABANDONED";
    // The deployment is currently active.
    DeploymentState[DeploymentState["ACTIVE"] = 1] = "ACTIVE";
    // An inactive transient deployment.
    DeploymentState[DeploymentState["DESTROYED"] = 2] = "DESTROYED";
    // The deployment experienced an error.
    DeploymentState[DeploymentState["ERROR"] = 3] = "ERROR";
    // The deployment has failed.
    DeploymentState[DeploymentState["FAILURE"] = 4] = "FAILURE";
    // The deployment is inactive.
    DeploymentState[DeploymentState["INACTIVE"] = 5] = "INACTIVE";
    // The deployment is in progress.
    DeploymentState[DeploymentState["IN_PROGRESS"] = 6] = "IN_PROGRESS";
    // The deployment is pending.
    DeploymentState[DeploymentState["PENDING"] = 7] = "PENDING";
    // The deployment has queued
    DeploymentState[DeploymentState["QUEUED"] = 8] = "QUEUED";
})(DeploymentState = exports.DeploymentState || (exports.DeploymentState = {}));
