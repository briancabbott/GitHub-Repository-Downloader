"use strict";
// RateLimit
// Represents the client's rate limit.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimit = void 0;
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
class RateLimit {
}
exports.RateLimit = RateLimit;
