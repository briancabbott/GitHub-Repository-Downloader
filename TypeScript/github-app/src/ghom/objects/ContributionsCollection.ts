import { ContributionCalendar } from "./ContributionCalendar";
import { User } from "./User";

// ContributionsCollection
// A contributions collection aggregates contributions such as opened issues and commits created by a user.

// Fields
// contributionCalendar (ContributionCalendar!)
// A calendar of this user's contributions on GitHub.

// doesEndInCurrentMonth (Boolean!)
// Determine if this collection's time span ends in the current month.

// earliestRestrictedContributionDate (Date)
// The date of the first restricted contribution the user made in this time period. Can only be non-null when the user has enabled private contribution counts.

// endedAt (DateTime!)
// The ending date and time of this collection.

// hasAnyContributions (Boolean!)
// Determine if there are any contributions in this collection.

// hasAnyRestrictedContributions (Boolean!)
// Determine if the user made any contributions in this time frame whose details are not visible because they were made in a private repository. Can only be true if the user enabled private contribution counts.

// isSingleDay (Boolean!)
// Whether or not the collector's time span is all within the same day.

// latestRestrictedContributionDate (Date)
// The date of the most recent restricted contribution the user made in this time period. Can only be non-null when the user has enabled private contribution counts.

// mostRecentCollectionWithActivity (ContributionsCollection)
// When this collection's time range does not include any activity from the user, use this to get a different collection from an earlier time range that does have activity.

// restrictedContributionsCount (Int!)
// A count of contributions made by the user that the viewer cannot access. Only non-zero when the user has chosen to share their private contribution counts.

// startedAt (DateTime!)
// The beginning date and time of this collection.

// totalCommitContributions (Int!)
// How many commits were made by the user in this time span.

// totalIssueContributions (Int!)
// How many issues the user opened.

// Argument	Type	Description
// excludeFirst	Boolean	
// Should the user's first issue ever be excluded from this count.

// The default value is false.

// excludePopular	Boolean	
// Should the user's most commented issue be excluded from this count.

// The default value is false.

// totalPullRequestContributions (Int!)
// How many pull requests the user opened.

// Argument	Type	Description
// excludeFirst	Boolean	
// Should the user's first pull request ever be excluded from this count.

// The default value is false.

// excludePopular	Boolean	
// Should the user's most commented pull request be excluded from this count.

// The default value is false.

// totalPullRequestReviewContributions (Int!)
// How many pull request reviews the user left.

// totalRepositoriesWithContributedCommits (Int!)
// How many different repositories the user committed to.

// totalRepositoriesWithContributedIssues (Int!)
// How many different repositories the user opened issues in.

// Argument	Type	Description
// excludeFirst	Boolean	
// Should the user's first issue ever be excluded from this count.

// The default value is false.

// excludePopular	Boolean	
// Should the user's most commented issue be excluded from this count.

// The default value is false.

// totalRepositoriesWithContributedPullRequestReviews (Int!)
// How many different repositories the user left pull request reviews in.

// totalRepositoriesWithContributedPullRequests (Int!)
// How many different repositories the user opened pull requests in.

// Argument	Type	Description
// excludeFirst	Boolean	
// Should the user's first pull request ever be excluded from this count.

// The default value is false.

// excludePopular	Boolean	
// Should the user's most commented pull request be excluded from this count.

// The default value is false.

// totalRepositoryContributions (Int!)
// How many repositories the user created.

// Argument	Type	Description
// excludeFirst	Boolean	
// Should the user's first repository ever be excluded from this count.

// The default value is false.

// user (User!)
// The user who made the contributions in this collection.





// A contributions collection aggregates contributions such as opened issues and commits created by a user.
export class ContributionsCollection {
    
    // A calendar of this user's contributions on GitHub.
    contributionCalendar: ContributionCalendar;
    
    // Determine if this collection's time span ends in the current month.
    doesEndInCurrentMonth: Boolean;
    
    // The date of the first restricted contribution the user made in this time 
    // period. Can only be non-null when the user has enabled private contribution 
    // counts.
    earliestRestrictedContributionDate: Date
    
    // The ending date and time of this collection.
    endedAt: Date
    
    // Determine if there are any contributions in this collection.
    hasAnyContributions: boolean
    
    // Determine if the user made any contributions in this time frame whose details 
    // are not visible because they were made in a private repository. Can only be 
    // true if the user enabled private contribution counts.
    hasAnyRestrictedContributions: boolean
    
    // Whether or not the collector's time span is all within the same day.
    isSingleDay: boolean
    
    // The date of the most recent restricted contribution the user made in this time 
    // period. Can only be non-null when the user has enabled private contribution counts.
    latestRestrictedContributionDate: Date
    
    // When this collection's time range does not include any activity from the user, 
    // use this to get a different collection from an earlier time range that does have 
    // activity.
    mostRecentCollectionWithActivity: ContributionsCollection
    
    // A count of contributions made by the user that the viewer cannot access. Only 
    // non-zero when the user has chosen to share their private contribution counts.
    restrictedContributionsCount: number
    
    // The beginning date and time of this collection.
    startedAt: Date
    
    // How many commits were made by the user in this time span.
    totalCommitContributions: number

    // How many issues the user opened.
    // Argument	        Type	        Description
    // excludeFirst	    Boolean	        Should the user's first issue ever be excluded from this count.
    // The default value is false. 
    totalIssueContributions: number

    // Should the user's most commented issue be excluded from this count.
    excludePopular: boolean	

    // How many pull requests the user opened.
    totalPullRequestContributions: number
    
    // Argument	        Type	    Description
    // excludeFirst     Boolean	    Should the user's first pull request ever be excluded from this count.
    // The default value is false.

    // Should the user's most commented pull request be excluded from this count.
    // excludePopular: boolean	

    // The default value is false.

    // How many pull request reviews the user left.
    totalPullRequestReviewContributions: number

    // How many different repositories the user committed to.
    totalRepositoriesWithContributedCommits: number

    // How many different repositories the user opened issues in.
    totalRepositoriesWithContributedIssues: number

// Argument	    Type	    Description
// excludeFirst	Boolean	    Should the user's first issue ever be excluded from this count.
// The default value is false.

// Should the user's most commented issue be excluded from this count.
    // excludePopular: boolean	

    // The default value is false.

    // How many different repositories the user left pull request reviews in.
    totalRepositoriesWithContributedPullRequestReviews: number

    // How many different repositories the user opened pull requests in.
    totalRepositoriesWithContributedPullRequests: number

    // Argument	Type	Description
    // excludeFirst	Boolean	 Should the user's first pull request ever be excluded from this count.

    // The default value is false.

    // Should the user's most commented pull request be excluded from this count.
    // excludePopular: boolean	

    // The default value is false.

    // How many repositories the user created.
    totalRepositoryContributions: number

    // Argument	Type	Description
    // excludeFirst	Boolean	
    // Should the user's first repository ever be excluded from this count.

    // The default value is false.

    // The user who made the contributions in this collection.
    user: User
}