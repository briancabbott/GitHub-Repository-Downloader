// SecurityAdvisoryEcosystem
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Access to GitHub Security Advisories preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// The possible ecosystems of a security vulnerability's package.

// Values
// MAVEN
// Java artifacts hosted at the Maven central repository

// NPM
// JavaScript packages hosted at npmjs.com

// NUGET
// .NET packages hosted at the NuGet Gallery

// PIP
// Python packages hosted at PyPI.org

// RUBYGEMS
// Ruby gems hosted at RubyGems.org


// This part of the schema is currently available for developers to preview. 
// During this preview period, the API may change without any advance notice. 
// Please see the Access to GitHub Security Advisories preview for more details.

// The possible ecosystems of a security vulnerability's package.
export enum SecurityAdvisoryEcosystem {

    // Java artifacts hosted at the Maven central repository
    MAVEN,

    // JavaScript packages hosted at npmjs.com
    NPM,

    // .NET packages hosted at the NuGet Gallery
    NUGET,


    // Python packages hosted at PyPI.org
    PIP,

    // Ruby gems hosted at RubyGems.org
    RUBYGEMS
}