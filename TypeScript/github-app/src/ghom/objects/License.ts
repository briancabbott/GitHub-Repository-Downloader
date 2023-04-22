import { ID } from "../scalars/Id";
import { Node } from "../interfaces/Node";
import { LicenseRule } from "./LicenseRule";

// License
// A repository's open source license

// Implements
// Node
// Fields
// body (String!)
// The full text of the license

// conditions ([LicenseRule]!)
// The conditions set by the license

// description (String)
// A human-readable description of the license

// featured (Boolean!)
// Whether the license should be featured

// hidden (Boolean!)
// Whether the license should be displayed in license pickers

// id (ID!)
// implementation (String)
// Instructions on how to implement the license

// key (String!)
// The lowercased SPDX ID of the license

// limitations ([LicenseRule]!)
// The limitations set by the license

// name (String!)
// The license full name specified by https://spdx.org/licenses

// nickname (String)
// Customary short name if applicable (e.g, GPLv3)

// permissions ([LicenseRule]!)
// The permissions set by the license

// pseudoLicense (Boolean!)
// Whether the license is a pseudo-license placeholder (e.g., other, no-license)

// spdxId (String)
// Short identifier specified by https://spdx.org/licenses

// url (URI)
// URL to the license on https://choosealicense.com







// A repository's open source license
export class License implements Node {

    // The full text of the license 
    body: string

    // The conditions set by the license
    conditions: LicenseRule

    // A human-readable description of the license
    description: string

    // Whether the license should be featured
    featured: boolean

    // Whether the license should be displayed in license pickers
    hidden: boolean

    id: ID

    // Instructions on how to implement the license
    implementation: string

    // The lowercased SPDX ID of the license
    key: string

    // The limitations set by the license
    limitations: Array<LicenseRule>

    // The license full name specified by https://spdx.org/licenses
    name: string

    // Customary short name if applicable (e.g, GPLv3)
    nickname: string

    // The permissions set by the license
    permissions: Array<LicenseRule>

    // Whether the license is a pseudo-license placeholder (e.g., other, no-license)
    pseudoLicense: boolean

    // Short identifier specified by https://spdx.org/licenses
    spdxId: string

    // URL to the license on https://choosealicense.com
    url: URL
}