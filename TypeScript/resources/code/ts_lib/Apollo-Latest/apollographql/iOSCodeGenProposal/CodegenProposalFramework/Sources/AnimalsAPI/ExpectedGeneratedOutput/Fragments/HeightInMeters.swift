@testable import ApolloAPI
import AnimalSchema

struct HeightInMeters: AnimalSchema.SelectionSet, Fragment {
  static let fragmentDefinition: String = """
  fragment HeightInMeters on Animal {
    height {
      meters
    }
  }
  """

  static var __parentType: ParentType { .Interface(AnimalSchema.Animal.self) }
  let data: DataDict

  var height: Height  { data["height"] }

  struct Height: AnimalSchema.SelectionSet {
    static var __parentType: ParentType { .Object(AnimalSchema.Height.self) }
    let data: DataDict

    var meters: Int { data["meters"] }
  }
}
