"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchProtectionRule = void 0;
// BranchProtectionRule
// A branch protection rule.
// Implements
// Node
// Connections
// branchProtectionRuleConflicts (BranchProtectionRuleConflictConnection!)
// A list of conflicts matching branches protection rule and other branch protection rules
// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.
// before	String	
// Returns the elements in the list that come before the specified cursor.
// first	Int	
// Returns the first n elements from the list.
// last	Int	
// Returns the last n elements from the list.
// matchingRefs (RefConnection!)
// Repository refs that are protected by this rule
// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.
// before	String	
// Returns the elements in the list that come before the specified cursor.
// first	Int	
// Returns the first n elements from the list.
// last	Int	
// Returns the last n elements from the list.
// pushAllowances (PushAllowanceConnection!)
// A list push allowances for this branch protection rule.
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
// A list review dismissal allowances for this branch protection rule.
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
// The actor who created this branch protection rule.
// databaseId (Int)
// Identifies the primary key from the database.
// dismissesStaleReviews (Boolean!)
// Will new commits pushed to matching branches dismiss pull request review approvals.
// id (ID!)
// isAdminEnforced (Boolean!)
// Can admins overwrite branch protection.
// pattern (String!)
// Identifies the protection rule pattern.
// repository (Repository)
// The repository associated with this branch protection rule.
// requiredApprovingReviewCount (Int)
// Number of approving reviews required to update matching branches.
// requiredStatusCheckContexts ([String])
// List of required status check contexts that must pass for commits to be accepted to matching branches.
// requiresApprovingReviews (Boolean!)
// Are approving reviews required to update matching branches.
// requiresCommitSignatures (Boolean!)
// Are commits required to be signed.
// requiresStatusChecks (Boolean!)
// Are status checks required to update matching branches.
// requiresStrictStatusChecks (Boolean!)
// Are branches required to be up to date before merging.
// restrictsPushes (Boolean!)
// Is pushing to matching branches restricted.
// restrictsReviewDismissals (Boolean!)
// Is dismissal of pull request reviews restricted.
// A branch protection rule.
class BranchProtectionRule {
}
exports.BranchProtectionRule = BranchProtectionRule;
