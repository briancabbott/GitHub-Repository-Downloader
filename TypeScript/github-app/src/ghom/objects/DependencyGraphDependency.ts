import { Repository } from "../../model";

// DependencyGraphDependency
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Access to a Repositories Dependency Graph preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// A dependency manifest entry

// Fields
// hasDependencies (Boolean!)
// Does the dependency itself have dependencies?

// packageManager (String)
// The dependency package manager

// packageName (String!)
// The required package name

// repository (Repository)
// The repository containing the package

// requirements (String!)
// The dependency version requirements



// A dependency manifest entry
export class DependencyGraphDependency {

    // Does the dependency itself have dependencies?
    hasDependencies: boolean

    // The dependency package manager
    packageManager: string

    // The required package name
    packageName: string

    // The repository containing the package
    repository: Repository

    // The dependency version requirements
    requirements: string
}