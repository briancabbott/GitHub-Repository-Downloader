import { ID } from "../scalars/Id";

// App
// A GitHub App.

// Implements
// Node
// Fields
// createdAt (DateTime!)
// Identifies the date and time when the object was created.

// databaseId (Int)
// Identifies the primary key from the database.

// description (String)
// The description of the app.

// id (ID!)
// logoBackgroundColor (String!)
// The hex color code, without the leading '#', for the logo background.

// logoUrl (URI!)
// A URL pointing to the app's logo.

// Argument	Type	Description
// size	Int	
// The size of the resulting image.

// name (String!)
// The name of the app.

// slug (String!)
// A slug based on the name of the app for use in URLs.

// updatedAt (DateTime!)
// Identifies the date and time when the object was last updated.

// url (URI!)
// The URL to the app's homepage.


// A GitHub App.
export class App extends Node {

    // Identifies the date and time when the object was created.
    createdAt: Date

    // Identifies the primary key from the database.
    databaseId: number

    // The description of the app.
    description: string

    id: ID

    // The hex color code, without the leading '#', for the logo background.
    logoBackgroundColor: string

    // A URL pointing to the app's logo.
    logoUrl: URL

    // Argument	    Type	    Description
    // size	        Int	        The size of the resulting image.

    // The name of the app.
    name: string

    // A slug based on the name of the app for use in URLs.
    slug: string

    // Identifies the date and time when the object was last updated.
    updatedAt: Date

    // The URL to the app's homepage.
    url: URL
}