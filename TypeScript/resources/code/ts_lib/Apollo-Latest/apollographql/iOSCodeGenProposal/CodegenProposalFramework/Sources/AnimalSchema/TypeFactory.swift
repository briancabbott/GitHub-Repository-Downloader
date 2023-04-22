@testable import ApolloAPI

public protocol SelectionSet: ApolloAPI.SelectionSet & ApolloAPI.RootSelectionSet
where Schema == AnimalSchema.Schema {}

public protocol TypeCase: ApolloAPI.SelectionSet & ApolloAPI.TypeCase
where Schema == AnimalSchema.Schema {}

public enum Schema: SchemaConfiguration {
  public static func objectType(forTypename __typename: String) -> Object.Type? {
    switch __typename {
    case "Bird": return AnimalSchema.Bird.self
    case "Cat": return AnimalSchema.Cat.self
    case "Crocodile": return AnimalSchema.Crocodile.self
    case "Dog": return AnimalSchema.Dog.self
    case "Fish": return AnimalSchema.Fish.self
    case "Height": return AnimalSchema.Height.self
    case "Human": return AnimalSchema.Human.self
    case "PetRock": return AnimalSchema.PetRock.self
    case "Query": return AnimalSchema.Query.self
    case "Rat": return AnimalSchema.Rat.self
    default: return nil
    }
  }
}
