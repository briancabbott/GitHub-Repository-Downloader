// SecurityAdvisory
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Access to GitHub Security Advisories preview for more details.
//
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
//
// A GitHub Security Advisory
//
// Implements
// Node
// Connections
// vulnerabilities (SecurityVulnerabilityConnection!)
// Vulnerabilities associated with this Advisory
//
// Argument	Type	Description
// after	String
// Returns the elements in the list that come after the specified cursor.
//
// before	String
// Returns the elements in the list that come before the specified cursor.
//
// ecosystem	SecurityAdvisoryEcosystem
// An ecosystem to filter vulnerabilities by.
//
// first	Int
// Returns the first n elements from the list.
//
// last	Int
// Returns the last n elements from the list.
//
// orderBy	SecurityVulnerabilityOrder
// Ordering options for the returned topics.
//
// The default value is {"field"=>"UPDATED_AT", "direction"=>"DESC"}.
//
// package	String
// A package name to filter vulnerabilities by.
//
// severities	[SecurityAdvisorySeverity!]
// A list of severities to filter vulnerabilities by.
//
// Fields
// databaseId (Int)
// Identifies the primary key from the database.
//
// description (String!)
// This is a long plaintext description of the advisory
//
// ghsaId (String!)
// The GitHub Security Advisory ID
//
// id (ID!)
// identifiers ([SecurityAdvisoryIdentifier!]!)
// A list of identifiers for this advisory
//
// publishedAt (DateTime!)
// When the advisory was published
//
// references ([SecurityAdvisoryReference!]!)
// A list of references for this advisory
//
// severity (SecurityAdvisorySeverity!)
// The severity of the advisory
//
// summary (String!)
// A short plaintext summary of the advisory
//
// updatedAt (DateTime!)
// When the advisory was last updated
//
// withdrawnAt (DateTime)
// When the advisory was withdrawn, if it has been withdrawn
