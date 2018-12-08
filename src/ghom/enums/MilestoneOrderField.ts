// MilestoneOrderField
// Properties by which milestone connections can be ordered.

// Values
// CREATED_AT
// Order milestones by when they were created.

// DUE_DATE
// Order milestones by when they are due.

// NUMBER
// Order milestones by their number.

// UPDATED_AT
// Order milestones by when they were last updated.


// Properties by which milestone connections can be ordered.
export enum MilestoneOrderField {
    // Order milestones by when they were created.
    CREATED_AT,

    // Order milestones by when they are due.
    DUE_DATE,

    // Order milestones by their number.
    NUMBER,

    // Order milestones by when they were last updated.
    UPDATED_AT
}