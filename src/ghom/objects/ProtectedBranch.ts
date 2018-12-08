import { Node } from "../interfaces/Node";
import { Actor } from "../interfaces/Actor";
import { ID } from "../scalars/Id";
import { Repository } from "../../model";

// ProtectedBranch
// A repository protected branch.

// Implements
// Node
// Connections
// pushAllowances (PushAllowanceConnection!)
// A list push allowances for this protected branch.

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// reviewDismissalAllowances (ReviewDismissalAllowanceConnection!)
// A list review dismissal allowances for this protected branch.

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
// creator (Actor)
// The actor who created this protected branch.

// hasDismissableStaleReviews (Boolean!)
// Will new commits pushed to this branch dismiss pull request review approvals.

// hasRequiredReviews (Boolean!)
// Are reviews required to update this branch.

// hasRequiredSignatures (Boolean!)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Protected Branch: Required Signatures preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// Are commits required to be signed.

// hasRequiredStatusChecks (Boolean!)
// Are status checks required to update this branch.

// hasRestrictedPushes (Boolean!)
// Is pushing to this branch restricted.

// hasRestrictedReviewDismissals (Boolean!)
// Is dismissal of pull request reviews restricted.

// hasStrictRequiredStatusChecks (Boolean!)
// Are branches required to be up to date before merging.

// id (ID!)
// isAdminEnforced (Boolean!)
// Can admins overwrite branch protection.

// name (String!)
// The name of the protected branch rule.

// repository (Repository!)
// The repository associated with this protected branch.

// requiredApprovingReviewCount (Int)
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Protected Branch: Multiple Required Approving Reviews preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// Number of approving reviews required to update this branch.

// requiredStatusCheckContexts ([String])
// List of required status check contexts that must pass for commits to be accepted to this branch.



// A repository protected branch.
export class ProtectedBranch implements Node {

    // Connections
    // pushAllowances (PushAllowanceConnection!)
    // A list push allowances for this protected branch.

    // Argument	        Type	    Description
    // after	        String	    Returns the elements in the list that come after the specified cursor.
    // before	        String      Returns the elements in the list that come before the specified cursor.
    // first	        Int	        Returns the first n elements from the list.
    // last	            Int         Returns the last n elements from the list.

    // reviewDismissalAllowances   (ReviewDismissalAllowanceConnection!)     A list review dismissal allowances for this protected branch.

    // Argument	        Type	    Description
    // after	        String	    Returns the elements in the list that come after the specified cursor.
    // before	        String	    Returns the elements in the list that come before the specified cursor.
    // first	        Int	        Returns the first n elements from the list.
    // last	            Int	        Returns the last n elements from the list.

    // Fields

    // The actor who created this protected branch.
    creator: Actor

    // Will new commits pushed to this branch dismiss pull request review approvals.
    hasDismissableStaleReviews: boolean

    // Are reviews required to update this branch.
    hasRequiredReviews: boolean

    // Are commits required to be signed.
    hasRequiredSignatures: boolean

    // Are status checks required to update this branch.
    hasRequiredStatusChecks: boolean

    // Is pushing to this branch restricted.
    hasRestrictedPushes: boolean

    // Is dismissal of pull request reviews restricted.
    hasRestrictedReviewDismissals: boolean

    // Are branches required to be up to date before merging.
    hasStrictRequiredStatusChecks: boolean

    id: ID

    // Can admins overwrite branch protection.
    isAdminEnforced: boolean

    // The name of the protected branch rule.
    name: string

    // The repository associated with this protected branch.
    repository: Repository

    // Number of approving reviews required to update this branch.
    requiredApprovingReviewCount: number

    // List of required status check contexts that must pass for commits to be accepted to this branch.
    requiredStatusCheckContexts: Array<String>
}