@testable import ApolloAPI
import AnimalSchema

struct WarmBloodedDetails: AnimalSchema.SelectionSet, Fragment {
  static let fragmentDefinition: String = """
  fragment WarmBloodedDetails on WarmBlooded {
    bodyTemperature
    height {
      meters // TODO: Use HeightInMeters fragment?
      yards
    }
  }
  """

  static var __parentType: ParentType { .Interface(AnimalSchema.WarmBlooded.self) }

  let data: DataDict

  var bodyTemperature: Int { data["bodyTemperature"] }
  var height: Height  { data["height"] }

  struct Height: AnimalSchema.SelectionSet {
    static var __parentType: ParentType { .Object(AnimalSchema.Height.self) }
    let data: DataDict

    var meters: Int { data["meters"] }
    var yards: Int { data["yards"] }
  }  
}
