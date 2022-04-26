"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deployment = void 0;
// Deployment
// Represents triggered deployment instance.
// Implements
// Node
// Connections
// statuses (DeploymentStatusConnection)
// A list of statuses associated with the deployment.
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
// before	String
// Returns the elements in the list that come before the specified cursor.
// first	Int
// Returns the first n elements from the list.
// last	Int
// Returns the last n elements from the list.
// Fields
// commit (Commit)
// Identifies the commit sha of the deployment.
// commitOid (String!)
// Identifies the oid of the deployment commit, even if the commit has been deleted.
// createdAt (DateTime!)
// Identifies the date and time when the object was created.
// creator (Actor)
// Identifies the actor who triggered the deployment.
// databaseId (Int)
// Identifies the primary key from the database.
// description (String)
// The deployment description.
// environment (String)
// The environment to which this deployment was made.
// id (ID!)
// latestStatus (DeploymentStatus)
// The latest status of this deployment.
// payload (String)
// Extra information that a deployment system might need.
// ref (Ref)
// Identifies the Ref of the deployment, if the deployment was created by ref.
// repository (Repository!)
// Identifies the repository associated with the deployment.
// state (DeploymentState)
// The current state of the deployment.
// task (String)
// The deployment task.
// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.
// Represents triggered deployment instance.
class Deployment {
}
exports.Deployment = Deployment;
