// RateLimit
// Represents the client's rate limit.

// Fields
// cost (Int!)
// The point cost for the current query counting against the rate limit.

// limit (Int!)
// The maximum number of points the client is permitted to consume in a 60 minute window.

// nodeCount (Int!)
// The maximum number of nodes this query may return

// remaining (Int!)
// The number of points remaining in the current rate limit window.

// resetAt (DateTime!)
// The time at which the current rate limit window resets in UTC epoch seconds.




// Represents the client's rate limit.
export class RateLimit {

    //
    // Fields
    //
    
    // The point cost for the current query counting against the rate limit.
    cost: number

    // The maximum number of points the client is permitted to consume in a 60 minute window.
    limit: number

    // The maximum number of nodes this query may return
    nodeCount: number

    // The number of points remaining in the current rate limit window.
    remaining: number

    // The time at which the current rate limit window resets in UTC epoch seconds.
    resetAt: Date
}