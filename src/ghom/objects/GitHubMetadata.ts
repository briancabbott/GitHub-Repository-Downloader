// GitHubMetadata
// Represents information about the GitHub instance.

// Fields
// gitHubServicesSha (GitObjectID!)
// Returns a String that's a SHA of github-services

// gitIpAddresses ([String!])
// IP addresses that users connect to for git operations

// hookIpAddresses ([String!])
// IP addresses that service hooks are sent from

// importerIpAddresses ([String!])
// IP addresses that the importer connects from

// isPasswordAuthenticationVerifiable (Boolean!)
// Whether or not users are verified

// pagesIpAddresses ([String!])
// IP addresses for GitHub Pages' A records






// Represents information about the GitHub instance.
export class GitHubMetadata {
    // Returns a String that's a SHA of github-services
    // gitHubServicesSha: GitObjectID

    // IP addresses that users connect to for git operations
    gitIpAddresses: Array<String>

    // IP addresses that service hooks are sent from
    hookIpAddresses: Array<String>

    // IP addresses that the importer connects from
    importerIpAddresses: Array<String>

    // Whether or not users are verified
    isPasswordAuthenticationVerifiable: boolean

    // IP addresses for GitHub Pages' A records
    pagesIpAddresses: Array<String>
}
