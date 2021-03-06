import { ID } from "../scalars/Id";

// ContentReference
// A content reference

// Fields
// databaseId (Int!)
// Identifies the primary key from the database.

// id (ID!)
// reference (String!)
// The reference of the content reference.


// A content reference
export class ContentReference {
    id: ID

    // Identifies the primary key from the database.
    databaseId: number

    // The reference of the content reference.
    reference: string
}
