import { Node } from "../interfaces/Node";
import { ID } from "../scalars/Id";
import { BranchProtectionRule } from "./BranchProtectionRule";
import { ProtectedBranch } from "./ProtectedBranch";

// PushAllowance
// A team or user who has the ability to push to a protected branch.

// Implements
// Node
// Fields
// actor (PushAllowanceActor)
// The actor that can push.

// branchProtectionRule (BranchProtectionRule)
// Identifies the branch protection rule associated with the allowed user or team.

// id (ID!)
// protectedBranch (ProtectedBranch!)
// Deprecation notice
// The ProtectedBranch type is deprecated and will be removed soon. Use Repository.branchProtectionRule instead. Removal on 2019-01-01 UTC.

// Identifies the protected branch associated with the allowed user or team.





// A team or user who has the ability to push to a protected branch.
export class PushAllowance implements Node {

    // Fields

    // The actor that can push.
    actor: PushAllowanceActor

    // Identifies the branch protection rule associated with the allowed user or team.
    branchProtectionRule: BranchProtectionRule

    id: ID

    // Deprecation notice
    // The ProtectedBranch type is deprecated and will be removed soon. Use Repository.branchProtectionRule instead. Removal on 2019-01-01 UTC.
    // Identifies the protected branch associated with the allowed user or team.
    protectedBranch: ProtectedBranch


}

