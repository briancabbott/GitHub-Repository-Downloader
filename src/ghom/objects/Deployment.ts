import { Node } from "../interfaces/Node";
import { ID } from "../scalars/Id";
import { Commit } from "./Commit";
import { Actor } from "../interfaces/Actor";
import { Ref } from "./Ref";
import { Repository } from "../../model";
import { DeploymentState } from "../enums/DeploymentState";
import { DeploymentStatus } from "./DeploymentStatus";

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
export class Deployment implements Node {
    
    // Connections

    // A list of statuses associated with the deployment.
    statuses: DeploymentStatusConnection

    // Argument	    Type	Description
    // after	    String	Returns the elements in the list that come after the specified cursor.
    // before	    String	Returns the elements in the list that come before the specified cursor.
    // first	    Int	    Returns the first n elements from the list.
    // last	        Int	    Returns the last n elements from the list.


    // Identifies the commit sha of the deployment.
    commit: Commit

    // Identifies the oid of the deployment commit, even if the commit has been deleted.
    commitOid: String


    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the actor who triggered the deployment.
    creator: Actor

    // Identifies the primary key from the database.
    databaseId: number

    // The deployment description.
    description: string

    // The environment to which this deployment was made.
    environment: string

    id: ID

    // The latest status of this deployment.
    latestStatus: DeploymentStatus

    // Extra information that a deployment system might need.
    payload: String

    // Identifies the Ref of the deployment, if the deployment was created by ref.
    ref: Ref

    // Identifies the repository associated with the deployment.
    repository: Repository

    // The current state of the deployment.
    state: DeploymentState

    // The deployment task.
    task: String

    // Identifies the date and time when the object was last updated.
    updatedAt: Date
}