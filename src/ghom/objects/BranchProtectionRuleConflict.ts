import { BranchProtectionRule } from "./BranchProtectionRule";
import { Ref } from "./Ref";

// A conflict between two branch protection rules.

// Fields
// branchProtectionRule (BranchProtectionRule)
// Identifies the branch protection rule.
// conflictingBranchProtectionRule (BranchProtectionRule)
// Identifies the conflicting branch protection rule.
// ref (Ref)
// Identifies the branch ref that has conflicting rules

// BranchProtectionRuleConflict
// A conflict between two branch protection rules.
export class BranchProtectionRuleConflict {

    // Identifies the branch protection rule.
    branchProtectionRule: BranchProtectionRule

    // Identifies the conflicting branch protection rule.
    conflictingBranchProtectionRule: BranchProtectionRule

    // Identifies the branch ref that has conflicting rules
    ref: Ref
}