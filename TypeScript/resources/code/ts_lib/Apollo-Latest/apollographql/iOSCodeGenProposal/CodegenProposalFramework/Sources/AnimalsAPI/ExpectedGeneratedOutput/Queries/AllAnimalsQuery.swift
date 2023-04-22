@testable import ApolloAPI
import AnimalSchema
@_exported import enum AnimalSchema.SkinCovering
@_exported import enum AnimalSchema.RelativeSize

// TODO: Fragment with nested type condition
// TODO: Figure out access control on everything
// TODO: inline fragment on union type `... on ClassroomPet { ... }`

struct AllAnimalsQuery {
  let data: Data

  struct Data: AnimalSchema.SelectionSet {
    static var __parentType: ParentType { .Object(AnimalSchema.Query.self) }
    static var selections: [Selection] { [
//      .field("allAnimals", type: .list(Animal.self)),
    ] }
    let data: DataDict

    var allAnimals: [Animal] { data["allAnimals"] }

    /// `Animal`
    struct Animal: AnimalSchema.SelectionSet {
      static var __parentType: ParentType { .Interface(AnimalSchema.Animal.self) }
      static var selections: [Selection] { [
        .field("species", String.self),
        .field("height", Height.self),
      ] }
      let data: DataDict

      var species: String { data["species"] }
      var height: Height { data["height"] }
      var predators: [Predators] { data["predators"] }
      var skinCovering: GraphQLEnum<SkinCovering>? { data["skinCovering"] }

      var asCat: AsCat? { _asType() }
      var asWarmBlooded: AsWarmBlooded? { _asType() }
      var asPet: AsPet? { _asType() }
      var asClassroomPet: AsClassroomPet? { _asType() }

      struct Fragments: FragmentContainer {
        let data: DataDict

        var heightInMeters: HeightInMeters { _toFragment() }
      }

      /// `Animal.Height`
      struct Height: AnimalSchema.SelectionSet {
        static var __parentType: ParentType { .Object(AnimalSchema.Height.self) }
        static var selections: [Selection] { [
          .field("feet", Int.self),
          .field("inches", Int.self),
          .field("meters", Int.self),
        ] }
        let data: DataDict

        var feet: Int { data["feet"] }
        var inches: Int { data["inches"] }
        var meters: Int { data["meters"] } // - NOTE:
        // This field is merged in from `HeightInMeters` fragment.
        // Because the fragment type identically matches the type it is queried on, we do
        // not need an optional `TypeCondition` and can merge the field up.
      }

      /// `Animal.Predators`
      struct Predators: AnimalSchema.SelectionSet {
        static var __parentType: ParentType { .Interface(AnimalSchema.Animal.self) }
        let data: DataDict

        var species: String { data["species"] }

        var asWarmBlooded: AsWarmBlooded? { _asType() }

        /// `AllAnimals.Predators.AsWarmBlooded`
        struct AsWarmBlooded: AnimalSchema.SelectionSet {
          static var __parentType: ParentType { .Interface(AnimalSchema.WarmBlooded.self) }
          let data: DataDict

          var bodyTemperature: Int { data["bodyTemperature"] }
          var height: Height { data["height"] }
          var laysEggs: Bool { data["laysEggs"] }
          // - NOTE:
          // These 2 fields are merged in from `WarmBloodedDetails` fragment.
          // Because the fragment type identically matches the type it is queried on, we do
          // not need an optional `TypeCondition` and can merge the fields up.

          struct Fragments: FragmentContainer {
            let data: DataDict

            var warmBloodedDetails: WarmBloodedDetails { _toFragment() }
          }

          struct Height: AnimalSchema.SelectionSet {
            static var __parentType: ParentType { .Object(AnimalSchema.Height.self) }
            let data: DataDict

            var meters: Int { data["meters"] }
            var yards: Int { data["yards"] }
          }
        }
      }

      /// `Animal.AsCat`
      struct AsCat: AnimalSchema.TypeCase {
        static var __parentType: ParentType { .Object(AnimalSchema.Cat.self) }
        let data: DataDict

        var species: String { data["species"] }
        var height: Height { data["height"] }
        var predators: [Predators] { data["predators"] }
        var skinCovering: GraphQLEnum<SkinCovering>? { data["skinCovering"] }
        var humanName: String? { data["humanName"] }
        var favoriteToy: String { data["favoriteToy"] }
        var owner: PetDetails.Human? { data["owner"] } // - NOTE:
        // Because we don't fetch any additional fields on `owner` other than the fields fetched
        // by the fragment, we can just use the fragments `Human` type here.
        var bodyTemperature: Int { data["bodyTemperature"] }
        var isJellicle: Bool { data["isJellicle"] }

        struct Height: AnimalSchema.SelectionSet {
          static var __parentType: ParentType { .Object(AnimalSchema.Height.self) }
          let data: DataDict

          var feet: Int { data["feet"] }
          var inches: Int { data["inches"] }
          var meters: Int { data["meters"] }
          var centimeters: Int { data["centimeters"] }
          var relativeSize: GraphQLEnum<RelativeSize> { data["relativeSize"] }
          // - NOTE :
          // Because we know that the `Cat` is an `Animal` at this point, we can just merge the
          // centimeters and relativeSize fields. We don't need to create a `var asAnimal: Animal.AsCat.AsAnimal`.
        }
      }

      // - NOTE:
      // Because the type condition for `WarmBlooded` only includes the fragment,
      // we can just inherit the fragment type condition.
      //
      // For a type condition that fetches a fragment in addition to other fields,
      // we would use a custom `TypeCondition` with the fragment type condition nested inside.
      // See `Predators.AsWarmBlooded` for an example of this.
      /// `Animal.AsWarmBlooded`
      struct AsWarmBlooded: AnimalSchema.SelectionSet {
        static var __parentType: ParentType { .Interface(AnimalSchema.WarmBlooded.self) }

        let data: DataDict

        var species: String { data["species"] }
        var height: Height  { data["height"] }
        var predators: [Predators]  { data["predators"] }
        var skinCovering: GraphQLEnum<SkinCovering>? { data["skinCovering"] }
        var bodyTemperature: Int { data["bodyTemperature"] }

        struct Fragments: FragmentContainer {
          let data: DataDict

          var heightInMeters: HeightInMeters { _toFragment() }
          var warmBloodedDetails: WarmBloodedDetails  { _toFragment() }
        }

        struct Height: AnimalSchema.SelectionSet {
          static var __parentType: ParentType { .Object(AnimalSchema.Height.self) }
          let data: DataDict

          var feet: Int { data["feet"] }
          var inches: Int { data["inches"] }
          var meters: Int { data["meters"] }
          var yards: Int { data["yards"] }
        }
      }

      /// `Animal.AsPet`
      struct AsPet: AnimalSchema.SelectionSet {
        static var __parentType: ParentType { .Interface(AnimalSchema.Pet.self) }
        let data: DataDict

        var species: String { data["species"] }
        var height: Height  { data["height"] }
        var predators: [Predators]  { data["predators"] }
        var skinCovering: GraphQLEnum<SkinCovering>? { data["skinCovering"] }
        var humanName: String? { data["humanName"] }
        var favoriteToy: String { data["favoriteToy"] }
        var owner: PetDetails.Human? { data["owner"] } // - NOTE:
        // Because we don't fetch any additional fields on `owner` other than the fields fetched
        // by the fragment, we can just use the fragments `Human` type here.

        var asWarmBlooded: AsWarmBlooded? { _asType() }

        struct Fragments: FragmentContainer {
          let data: DataDict

          var heightInMeters: HeightInMeters { _toFragment() }
          var petDetails: PetDetails  { _toFragment() }
        }

        struct Height: AnimalSchema.SelectionSet {
          static var __parentType: ParentType { .Object(AnimalSchema.Height.self) }
          let data: DataDict

          var feet: Int { data["feet"] }
          var inches: Int { data["inches"] }
          var meters: Int { data["meters"] }
          var centimeters: Int { data["centimeters"] }
          var relativeSize: GraphQLEnum<RelativeSize> { data["relativeSize"] }
          // - NOTE :
          // Because we know that the `AsPet` is an `Animal` at this point, we can just merge the
          // `centimeters` and `relativeSize` fields.
          // We don't need to create a `var asAnimal: Animal.AsPet.AsAnimal`.
        }

        /// `Animal.AsPet.AsWarmBlooded`
        struct AsWarmBlooded: AnimalSchema.SelectionSet {
          static var __parentType: ParentType { .Interface(AnimalSchema.WarmBlooded.self) }
          let data: DataDict

          var species: String { data["species"] }
          var height: Height  { data["height"] }
          var predators: [Predators]  { data["predators"] }
          var skinCovering: GraphQLEnum<SkinCovering>? { data["skinCovering"] }
          var humanName: String? { data["humanName"] }
          var favoriteToy: String { data["favoriteToy"] }
          var owner: PetDetails.Human? { data["owner"] } // - NOTE:
          // Because we don't fetch any additional fields on `owner` other than the fields fetched
          // by the fragment, we can just use the fragments `Human` type here.
          var bodyTemperature: Int { data["bodyTemperature"] }

          struct Fragments: FragmentContainer {
            let data: DataDict

            var heightInMeters: HeightInMeters { _toFragment() }
            var petDetails: PetDetails  { _toFragment() }
            var warmBloodedDetails: WarmBloodedDetails  { _toFragment() }
          }

          struct Height: AnimalSchema.SelectionSet {
            static var __parentType: ParentType { .Object(AnimalSchema.Height.self) }
            let data: DataDict

            var feet: Int { data["feet"] }
            var inches: Int { data["inches"] }
            var meters: Int { data["meters"] }
            var centimeters: Int { data["centimeters"] }
            var relativeSize: GraphQLEnum<RelativeSize> { data["relativeSize"] }
            var yards: Int { data["yards"] }
          }
        }
      }

      /// `Animal.AsClassroomPet`
      struct AsClassroomPet: AnimalSchema.SelectionSet {
        static var __parentType: ParentType { .Union(AnimalSchema.ClassroomPet.self) }
        let data: DataDict

        var species: String { data["species"] }
        var height: Height { data["height"] }
        var predators: [Predators] { data["predators"] }
        var skinCovering: GraphQLEnum<SkinCovering>? { data["skinCovering"] }

        var asBird: AsBird? { _asType() }

        /// `Animal.AsClassroomPet.AsBird`
        struct AsBird: AnimalSchema.SelectionSet {
          static var __parentType: ParentType { .Object(AnimalSchema.Bird.self) }
          let data: DataDict

          var species: String { data["species"] }
          var height: Height { data["height"] }
          var predators: [Predators] { data["predators"] }
          var skinCovering: GraphQLEnum<SkinCovering>? { data["skinCovering"] }
          var humanName: String? { data["humanName"] }
          var favoriteToy: String { data["favoriteToy"] }
          var owner: PetDetails.Human? { data["owner"] } // - NOTE:
          // Because we don't fetch any additional fields on `owner` other than the fields fetched
          // by the fragment, we can just use the fragments `Human` type here.
          var bodyTemperature: Int { data["bodyTemperature"] }
          var wingspan: Int { data["wingspan"] }

          struct Height: AnimalSchema.SelectionSet {
            static var __parentType: ParentType { .Object(AnimalSchema.Height.self) }
            let data: DataDict

            var feet: Int { data["feet"] }
            var inches: Int { data["inches"] }
            var meters: Int { data["meters"] }
            var centimeters: Int { data["centimeters"] }
            var relativeSize: GraphQLEnum<RelativeSize> { data["relativeSize"] }
          }
        }
      }
    }
  }
}
