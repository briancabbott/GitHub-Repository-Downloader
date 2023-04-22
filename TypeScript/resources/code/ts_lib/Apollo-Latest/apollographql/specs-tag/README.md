# Spec Template

## Getting Started

1. Click the "Use this template" button on this repository to create a copy of it and name the new repository `specs-{{spec_name}}`, per convention.
1. Search for usages of `%%SPEC-.*?%%` tokens within this repository and replace them with appropriate names (e.g., `%%SPEC-NAME%%`, `%%SPEC-TITLE%%` and `%%SPEC-VERSION%%`).
1. Setup the new repository with Netlify
   1. Name the deployment per convention as `apollo-specs-{{spec_name}}`.  This will make it available at `https://apollo-specs-{{spec_name}}.netlify.app/`.
   1. Sub-step TBD.
1. Setup proxying redirects to the new sub-spec site [on the `specs` repo](https://github.com/apollographql/specs/blob/main/_redirects).  This will make it available at `https://specs.apollo.dev/{{spec_name}}`.
1. Run `npm run dev` to watch and rebuild.  Just use a browser to view `.dist/index.html` to see the rendered page.
1. Write the actual specifications.  _Use other specifications (like [the `core` specification](https://github.com/apollographql/specs-core)) as your guide._
