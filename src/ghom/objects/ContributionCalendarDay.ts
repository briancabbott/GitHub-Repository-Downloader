// ContributionCalendarDay
// Represents a single day of contributions on GitHub by a user.
// 
// Fields
// color (String!)
// The hex color code that represents how many contributions were made on this day compared to others in the calendar.
// 
// contributionCount (Int!)
// How many contributions were made by the user on this day.
// 
// date (Date!)
// The day this square represents.
// 
// weekday (Int!)
// A number representing which day of the week this square represents, e.g., 1 is Monday.
//


// Represents a single day of contributions on GitHub by a user.
export class ContributionCalendarDay {
    // The hex color code that represents how many contributions were made on this 
    // day compared to others in the calendar.
    color: string
    
    // How many contributions were made by the user on this day.
    contributionCount: number
    
    // The day this square represents.
    date: Date
    
    // A number representing which day of the week this square represents, e.g., 1 is Monday.
    weekday: number
}