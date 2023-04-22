import { ID } from "../scalars/Id";
import { Node } from "../interfaces/Node";

// MarketplaceCategory
// A public description of a Marketplace category.

// Implements
// Node
// Fields
// description (String)
// The category's description.

// howItWorks (String)
// The technical description of how apps listed in this category work with GitHub.

// id (ID!)
// name (String!)
// The category's name.

// primaryListingCount (Int!)
// How many Marketplace listings have this as their primary category.

// resourcePath (URI!)
// The HTTP path for this Marketplace category.

// secondaryListingCount (Int!)
// How many Marketplace listings have this as their secondary category.

// slug (String!)
// The short name of the category used in its URL.

// url (URI!)
// The HTTP URL for this Marketplace category.



// A public description of a Marketplace category.
export class MarketplaceCategory implements Node {

    // The category's description.
    description: string

    // The technical description of how apps listed in this category work with GitHub.
    howItWorks: string

    id: ID

    // The category's name.
    name: string

    // How many Marketplace listings have this as their primary category.
    primaryListingCount: number

    // The HTTP path for this Marketplace category.
    resourcePath: URL

    // How many Marketplace listings have this as their secondary category.
    secondaryListingCount: number

    // The short name of the category used in its URL.
    slug: string

    // The HTTP URL for this Marketplace category.
    url: URL
}
