// ProjectColumnPurpose
// The semantic purpose of the column - todo, in progress, or done.

// Values
// DONE
// The column contains cards which are complete

// IN_PROGRESS
// The column contains cards which are currently being worked on

// TODO
// The column contains cards still to be worked on


// The semantic purpose of the column - todo, in progress, or done.
export enum ProjectColumnPurpose {
    // The column contains cards which are complete
    DONE, 

    // The column contains cards which are currently being worked on
    IN_PROGRESS, 
    
    // The column contains cards still to be worked on
    TODO
}