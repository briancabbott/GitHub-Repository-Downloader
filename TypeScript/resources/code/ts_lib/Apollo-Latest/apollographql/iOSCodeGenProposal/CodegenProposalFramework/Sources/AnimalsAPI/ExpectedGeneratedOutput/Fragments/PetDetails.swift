@testable import ApolloAPI
import AnimalSchema

struct PetDetails: AnimalSchema.SelectionSet, Fragment {
  static let fragmentDefinition: String = """
  fragment PetDetails on Pet {
   humanName
   favoriteToy
   owner {
     firstName
   }
  }
  """

  static var __parentType: ParentType { .Interface(AnimalSchema.Pet.self) }
  let data: DataDict

  var humanName: String? { data["humanName"] }
  var favoriteToy: String { data["favoriteToy"] }
  var owner: Human? { data["owner"] }

  struct Human: AnimalSchema.SelectionSet {
    static var __parentType: ParentType { .Object(AnimalSchema.Human.self) }
    let data: DataDict

    var firstName: String { data["firstName"] }
  }
}
