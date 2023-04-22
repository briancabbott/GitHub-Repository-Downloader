import Foundation
import ApolloCodegenLib
import AnimalsAPI

let generator = try! GraphQLJSFrontend.init()

let animalSchema = try! generator.loadSchema(from: AnimalsAPI.Resources.Schema)
let animalOperations = try! generator.mergeDocuments(
  AnimalsAPI.Resources.GraphQLOperations.map {
    try! generator.parseDocument(from: $0)
  }
)

let AST = try! generator.compile(schema: animalSchema, document: animalOperations)

print("GraphQL Compiled Successfully")
