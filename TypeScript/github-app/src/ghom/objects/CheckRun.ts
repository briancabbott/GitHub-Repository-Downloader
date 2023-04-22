import { UniformResourceLocatable } from "../interfaces/UniformResourceLocatable";
import { Node } from "../interfaces/Node";
import { URL } from "url";
import { Repository } from "../../model";
import { CheckStatusState } from "../enums/CheckStatusState";
import { CheckConclusionState } from "../enums/CheckConclusionState";
import { CheckSuite } from "./CheckSuite";
import { ID } from "../scalars/Id";

// CheckRun
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Checks preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// A check run.

// Implements
// Node
// UniformResourceLocatable
// Connections
// annotations (CheckAnnotationConnection)
// The check run's annotations

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
// checkSuite (CheckSuite!)
// The check suite that this run is a part of.

// completedAt (DateTime)
// Identifies the date and time when the check run was completed.

// conclusion (CheckConclusionState)
// The conclusion of the check run.

// databaseId (Int)
// Identifies the primary key from the database.

// detailsUrl (URI)
// The URL from which to find full details of the check run on the integrator's site.

// externalId (String)
// A reference for the check run on the integrator's system.

// id (ID!)
// name (String!)
// The name of the check for this check run.

// permalink (URI!)
// The permalink to the check run summary.

// repository (Repository!)
// The repository associated with this check run.

// resourcePath (URI!)
// The HTTP path for this check run.

// startedAt (DateTime)
// Identifies the date and time when the check run was started.

// status (CheckStatusState!)
// The current status of the check run.

// summary (String)
// A string representing the check run's summary

// text (String)
// A string representing the check run's text

// title (String)
// A string representing the check run

// url (URI!)
// The HTTP URL for this check run.


// A check run.
export class CheckRun implements Node, UniformResourceLocatable {
    id: ID;

    resourcePath: URL;
    
    url: URL;

    // Implements

    // Connections
    //
    // annotations (CheckAnnotationConnection)
    // The check run's annotations
    // 
    // Argument	    Type	    Description
    // after	    String	    Returns the elements in the list that come after the specified cursor.
    // before	    String      Returns the elements in the list that come before the specified cursor.
    // first	    Int         Returns the first n elements from the list.
    // last	        Int         Returns the last n elements from the list.


    // The check suite that this run is a part of.
    checkSuite: CheckSuite

    // Identifies the date and time when the check run was completed.
    completedAt: Date

    // The conclusion of the check run.
    conclusion: CheckConclusionState

    // Identifies the primary key from the database.
    databaseId: number

    // The URL from which to find full details of the check run on the integrator's site.
    detailsUrl: URL

    // A reference for the check run on the integrator's system.
    externalId: String

    // The name of the check for this check run.
    name: String

    // The permalink to the check run summary.
    permalink: URL

    // The repository associated with this check run.
    repository: Repository

    // The HTTP path for this check run.
    // resourcePath: URL

    // Identifies the date and time when the check run was started.
    // startedAt (DateTime)

    // The current status of the check run.
    status: CheckStatusState

    // A string representing the check run's summary
    summary: String

    // A string representing the check run's text
    text: String

    // A string representing the check run
    title: String

    // The HTTP URL for this check run.
    // url: URL
}