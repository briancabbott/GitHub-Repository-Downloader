


// // # Type queries into this side of the screen, and you will 
// // # see intelligent typeaheads aware of the current GraphQL type schema, 
// // # live syntax, and validation errors highlighted within the text.

// // # We'll get you started with a simple query showing your username!
// query { 
//   viewer { 
//     login
//   }
//   organization(login: "GoogleCloudPlatform") {
//     name
//     id
//     repositories(first: 100, after: "Y3Vyc29yOnYyOpHOAGazQQ==") {
//       totalCount
//       edges {
//         node {
//           url
//         }
//         cursor
//       }
//       pageInfo {
//         hasNextPage
//         hasPreviousPage
//       }
//     }
//   }
// }