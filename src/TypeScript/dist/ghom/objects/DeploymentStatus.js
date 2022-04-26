"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeploymentStatus = void 0;
// DeploymentStatus
// Describes the status of a given deployment attempt.
// Implements
// Node
// Fields
// createdAt (DateTime!)
// Identifies the date and time when the object was created.
// creator (Actor)
// Identifies the actor who triggered the deployment.
// deployment (Deployment!)
// Identifies the deployment associated with status.
// description (String)
// Identifies the description of the deployment.
// environment (String)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Deployments preview for more details.
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// Identifies the environment of the deployment at the time of this deployment status
// environmentUrl (URI)
// Identifies the environment URL of the deployment.
// id (ID!)
// logUrl (URI)
// Identifies the log URL of the deployment.
// state (DeploymentStatusState!)
// Identifies the current state of the deployment.
// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.
// Describes the status of a given deployment attempt.
class DeploymentStatus {
}
exports.DeploymentStatus = DeploymentStatus;
