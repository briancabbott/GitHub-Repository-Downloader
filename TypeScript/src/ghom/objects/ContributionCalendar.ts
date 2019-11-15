import { ContributionCalendarMonth } from "./ContributionCalendarMonth";
import { ContributionCalendarWeek } from "./ContributionCalendarWeek";

// ContributionCalendar
// A calendar of contributions made on GitHub by a user.

// Fields
// colors ([String!]!)
// A list of hex color codes used in this calendar. The darker the color, the more contributions it represents.

// isHalloween (Boolean!)
// Determine if the color set was chosen because it's currently Halloween.

// months ([ContributionCalendarMonth!]!)
// A list of the months of contributions in this calendar.

// totalContributions (Int!)
// The count of total contributions in the calendar.

// weeks ([ContributionCalendarWeek!]!)
// A list of the weeks of contributions in this calendar.



// A calendar of contributions made on GitHub by a user.
export class ContributionCalendar {
    // A list of hex color codes used in this calendar. The darker the color, the more contributions it represents.
    colors: Array<String>

    // Determine if the color set was chosen because it's currently Halloween.
    isHalloween: boolean

    // A list of the months of contributions in this calendar.
    months: Array<ContributionCalendarMonth>

    // The count of total contributions in the calendar.
    totalContributions: number;

    // A list of the weeks of contributions in this calendar.
    weeks: Array<ContributionCalendarWeek>
}