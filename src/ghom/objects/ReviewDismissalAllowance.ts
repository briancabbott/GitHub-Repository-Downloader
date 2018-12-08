ReviewDismissalAllowance
A team or user who has the ability to dismiss a review on a protected branch.

Implements
Node
Fields
actor (ReviewDismissalAllowanceActor)
The actor that can dismiss.

branchProtectionRule (BranchProtectionRule)
Identifies the branch protection rule associated with the allowed user or team.

id (ID!)
protectedBranch (ProtectedBranch!)
Deprecation notice
The ProtectedBranch type is deprecated and will be removed soon. Use ReviewDismissalAllowance.branchProtectionRule instead. Removal on 2019-01-01 UTC.

Identifies the protected branch associated with the allowed user or team.