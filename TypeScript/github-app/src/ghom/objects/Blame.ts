import { BlameRange } from "./BlameRange";

// Blame
// Represents a Git blame.

// Fields
// ranges ([BlameRange!]!)
// The list of ranges from a Git blame.


// Represents a Git blame.
export class Blame {
    // The list of ranges from a Git blame.
    ranges: Array<BlameRange>
}