import { ID } from "../scalars/Id";
import { ContentReference } from "./ContentReference";

// ContentAttachment
// A content attachment

// Fields
// body (String!)
// The body text of the content attachment. This parameter supports markdown.

// contentReference (ContentReference!)
// The content reference that the content attachment is attached to.

// databaseId (Int!)
// Identifies the primary key from the database.

// id (ID!)
// title (String!)
// The title of the content attachment.


// A content attachment
export class ContentAttachment {
    id: ID

    // The body text of the content attachment. This parameter supports markdown.
    body: String

    // The content reference that the content attachment is attached to.
    contentReference: ContentReference

    // Identifies the primary key from the database.
    databaseId: number
    
    // The title of the content attachment.
    title: String
}