

// ContributionCalendarMonth
// A month of contributions in a user's contribution graph.

// Fields
// firstDay (Date!)
// The date of the first day of this month.

// name (String!)
// The name of the month.

// totalWeeks (Int!)
// How many weeks started in this month.

// year (Int!)
// The year the month occurred in.



// A month of contributions in a user's contribution graph.
export class ContributionCalendarMonth {

    // The date of the first day of this month.
    firstDay: Date
    
    // The name of the month.
    name: string
    
    // How many weeks started in this month.
    totalWeeks: number
    
    // The year the month occurred in.
    year: number
}