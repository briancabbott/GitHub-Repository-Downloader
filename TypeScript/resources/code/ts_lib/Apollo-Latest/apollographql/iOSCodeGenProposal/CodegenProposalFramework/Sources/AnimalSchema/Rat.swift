import ApolloAPI

public final class Rat: Object {
  override public class var __typename: String { "Rat" }
  
//  @CacheList var predators: [Animal]
  @Field("species") var species: String?
  @Field("height") var height: Height?
  @Field("skinCovering") var skinCovering: GraphQLEnum<SkinCovering>?
  @Field("humanName") var humanName: String?
  @Field("favoriteToy") var favoriteToy: String?
  @Field("owner") var owner: Human?

  override public class var __metadata: Metadata { _metadata }
  private static let _metadata: Metadata = Metadata(
    implements: [Animal.self, Pet.self]
  )
}
