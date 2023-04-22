import { Actor } from "../../interfaces/Actor";
import { Node } from "../../interfaces/Node";
import { DeploymentStatus } from "../DeploymentStatus";
import { PullRequest } from "../PullRequest";

// DeploymentEnvironmentChangedEvent
// Represents a 'deployment_environment_changed' event on a given pull request.

// Implements
// Node
// Fields
// actor (Actor)
// Identifies the actor who performed the event.

// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// deploymentStatus (DeploymentStatus!)
// The deployment status that updated the deployment environment.

// id (ID!)
// pullRequest (PullRequest!)
// PullRequest referenced by event.



// Represents a 'deployment_environment_changed' event on a given pull request.
export interface DeploymentEnvironmentChangedEvent extends Node {
    
    // Identifies the actor who performed the event.
    actor: Actor

    // Identifies the date and time when the object was created.
    createdAt: Date

    // The deployment status that updated the deployment environment.
    deploymentStatus: DeploymentStatus

    // PullRequest referenced by event.
    pullRequest: PullRequest
}