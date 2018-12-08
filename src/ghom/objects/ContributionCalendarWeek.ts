import { ContributionCalendarDay } from "./ContributionCalendarDay";

// ContributionCalendarWeek
// A week of contributions in a user's contribution graph.

// Fields
// contributionDays ([ContributionCalendarDay!]!)
// The days of contributions in this week.

// firstDay (Date!)
// The date of the earliest square in this week.





// A week of contributions in a user's contribution graph.
export class ContributionCalendarWeek {

    // The days of contributions in this week.
    contributionDays: Array<ContributionCalendarDay>;

    // The date of the earliest square in this week.
    firstDay: Date
}