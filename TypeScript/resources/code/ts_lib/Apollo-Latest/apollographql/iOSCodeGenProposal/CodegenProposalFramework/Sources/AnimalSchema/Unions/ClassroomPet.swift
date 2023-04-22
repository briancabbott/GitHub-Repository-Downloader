import ApolloAPI

public enum ClassroomPet: UnionType, Equatable {
  case Cat(Cat)
  case Bird(Bird)
  case Rat(Rat)
  case PetRock(PetRock)

  public init?(_ object: Object) {
    switch object {
    case let ent as Cat: self = .Cat(ent)
    case let ent as Bird: self = .Bird(ent)
    case let ent as Rat: self = .Rat(ent)
    case let ent as PetRock: self = .PetRock(ent)
    default: return nil
    }
  }

  public var object: Object {
    switch self {
    case let .Cat(object as Object),
         let .Bird(object as Object),
         let .Rat(object as Object),
         let .PetRock(object as Object):
      return object
    }
  }

  static public let possibleTypes: [Object.Type] =
    [AnimalSchema.Cat.self, AnimalSchema.Bird.self, AnimalSchema.Rat.self,
     AnimalSchema.PetRock.self]
}
