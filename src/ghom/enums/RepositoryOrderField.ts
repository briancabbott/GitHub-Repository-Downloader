// RepositoryOrderField
// Properties by which repository connections can be ordered.

// Values
// CREATED_AT
// Order repositories by creation time

// NAME
// Order repositories by name

// PUSHED_AT
// Order repositories by push time

// STARGAZERS
// Order repositories by number of stargazers

// UPDATED_AT
// Order repositories by update time



// Properties by which repository connections can be ordered.
export enum RepositoryOrderField {
    // Order repositories by creation time
    CREATED_AT,

    // Order repositories by name
    NAME,

    // Order repositories by push time
    PUSHED_AT,

    // Order repositories by number of stargazers
    STARGAZERS,

    // Order repositories by update time
    UPDATED_AT
}