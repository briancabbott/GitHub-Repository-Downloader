import { Commit } from "./Commit";

// BlameRange
// Represents a range of information from a Git blame.

// Fields
// age (Int!)
// Identifies the recency of the change, from 1 (new) to 10 (old). This is calculated as a 2-quantile and determines the length of distance between the median age of all the changes in the file and the recency of the current range's change.

// commit (Commit!)
// Identifies the line author

// endingLine (Int!)
// The ending line for the range

// startingLine (Int!)
// The starting line for the range


// Represents a range of information from a Git blame.
export class BlameRange {
    // Identifies the recency of the change, from 1 (new) to 10 (old). 
    // This is calculated as a 2-quantile and determines the length of distance 
    // between the median age of all the changes in the file and the recency of 
    // the current range's change.

    age: number
    
    // Identifies the line author
    commit: Commit

    // The ending line for the range
    endingLine: number

    // The starting line for the range
    startingLine: number
}