import { ID } from "../scalars/Id";

/* 
Node
An object with an ID.

Implemented by:

AddedToProjectEvent, App, AssignedEvent, BaseRefChangedEvent, BaseRefForcePushedEvent, Blob, Bot,
BranchProtectionRule, CheckRun, CheckSuite, ClosedEvent, CommentDeletedEvent, Commit, CommitComment, 
CommitCommentThread, ConvertedNoteToIssueEvent, CrossReferencedEvent, DemilestonedEvent, DependencyGraphManifest
DeployKey, DeployedEvent, Deployment, DeploymentEnvironmentChangedEvent, DeploymentStatus, ExternalIdentity
Gist, GistComment, HeadRefDeletedEvent, HeadRefForcePushedEvent, HeadRefRestoredEvent, Issue, IssueComment
Label, LabeledEvent, Language, License, LockedEvent, MarketplaceCategory, MarketplaceListing, MentionedEvent, 
MergedEvent, Milestone, MilestonedEvent, MovedColumnsInProjectEvent, Organization, OrganizationIdentityProvider
OrganizationInvitation, Project, ProjectCard, ProjectColumn, ProtectedBranch, PublicKey, PullRequest, PullRequestCommit
PullRequestCommitCommentThread, PullRequestReview, PullRequestReviewComment, PullRequestReviewThread
Push, PushAllowance, Reaction, Ref, ReferencedEvent, Release, ReleaseAsset, RemovedFromProjectEvent, RenamedTitleEvent,
ReopenedEvent,
Repository,
RepositoryInvitation,
RepositoryTopic,
RepositoryVulnerabilityAlert,
ReviewDismissalAllowance,
ReviewDismissedEvent,
ReviewRequest,
ReviewRequestRemovedEvent,
ReviewRequestedEvent,
SecurityAdvisory, 
Status,
StatusContext,
SubscribedEvent,
Tag,
Team,
TeamDiscussion,
TeamDiscussionComment, 
Topic, 
TransferredEvent,
Tree, 
UnassignedEvent,
UnlabeledEvent,
UnlockedEvent, UnsubscribedEvent
User, UserContentEdit
*/
export interface Node { 
    
    // ID of the object.
    // id (ID!)
    id: ID
}