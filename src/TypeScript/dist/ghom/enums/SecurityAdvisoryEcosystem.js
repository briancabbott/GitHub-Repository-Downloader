"use strict";
// SecurityAdvisoryEcosystem
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Access to GitHub Security Advisories preview for more details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityAdvisoryEcosystem = void 0;
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
var SecurityAdvisoryEcosystem;
(function (SecurityAdvisoryEcosystem) {
    // Java artifacts hosted at the Maven central repository
    SecurityAdvisoryEcosystem[SecurityAdvisoryEcosystem["MAVEN"] = 0] = "MAVEN";
    // JavaScript packages hosted at npmjs.com
    SecurityAdvisoryEcosystem[SecurityAdvisoryEcosystem["NPM"] = 1] = "NPM";
    // .NET packages hosted at the NuGet Gallery
    SecurityAdvisoryEcosystem[SecurityAdvisoryEcosystem["NUGET"] = 2] = "NUGET";
    // Python packages hosted at PyPI.org
    SecurityAdvisoryEcosystem[SecurityAdvisoryEcosystem["PIP"] = 3] = "PIP";
    // Ruby gems hosted at RubyGems.org
    SecurityAdvisoryEcosystem[SecurityAdvisoryEcosystem["RUBYGEMS"] = 4] = "RUBYGEMS";
})(SecurityAdvisoryEcosystem = exports.SecurityAdvisoryEcosystem || (exports.SecurityAdvisoryEcosystem = {}));
