"use strict";
// GitHubMetadata
// Represents information about the GitHub instance.
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubMetadata = void 0;
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
class GitHubMetadata {
}
exports.GitHubMetadata = GitHubMetadata;
