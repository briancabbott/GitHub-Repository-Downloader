// PageInfo
// Information about pagination in a connection.

// Fields
// endCursor (String)
// When paginating forwards, the cursor to continue.

// hasNextPage (Boolean!)
// When paginating forwards, are there more items?

// hasPreviousPage (Boolean!)
// When paginating backwards, are there more items?

// startCursor (String)
// When paginating backwards, the cursor to continue.





// Information about pagination in a connection.
export class PageInfo {
    // Fields

    // When paginating forwards, the cursor to continue.
    endCursor: string

    // When paginating forwards, are there more items?
    hasNextPage: boolean

    // When paginating backwards, are there more items?
    hasPreviousPage: boolean

    // When paginating backwards, the cursor to continue.
    startCursor: string
}