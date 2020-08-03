// RefOrderField
// Properties by which ref connections can be ordered.

// Values
// ALPHABETICAL
// Order refs by their alphanumeric name

// TAG_COMMIT_DATE
// Order refs by underlying commit date if the ref prefix is refs/tags/



// Properties by which ref connections can be ordered.
export enum RefOrderField {
    // Order refs by their alphanumeric name
    ALPHABETICAL,

    // Order refs by underlying commit date if the ref prefix is refs/tags/
    TAG_COMMIT_DATE
}