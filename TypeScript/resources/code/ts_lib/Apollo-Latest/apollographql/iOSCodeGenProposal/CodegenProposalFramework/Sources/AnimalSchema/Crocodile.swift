import ApolloAPI

public final class Crocodile: Object {
  override public class var __typename: String { "Crocodile" }

  @Field("species") var species: String?
  @Field("height") var height: Height?
  @Field("skinCovering") var skinCovering: GraphQLEnum<SkinCovering>?
  @Field("age") var age: Int?
//  @CacheList var predators: [Animal]

  override public class var __metadata: Metadata { _metadata }
  private static let _metadata: Metadata = Metadata(
    implements: [Animal.self]
  )
}
