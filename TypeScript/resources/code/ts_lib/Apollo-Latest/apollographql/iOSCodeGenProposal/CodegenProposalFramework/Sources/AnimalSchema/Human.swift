import ApolloAPI

public final class Human: Object {
  override public class var __typename: String { "Human" }
  
//  @CacheList var predators: [Animal]
  @Field("firstName") var firstName: String?
  @Field("species") var species: String?
  @Field("height") var height: Height?
  @Field("skinCovering") var skinCovering: GraphQLEnum<SkinCovering>?
  @Field("bodyTemperature") var bodyTemperature: Int?
  @Field("laysEggs") var laysEggs: Bool?

  override public class var __metadata: Metadata { _metadata }
  private static let _metadata: Metadata = Metadata(
    implements: [Animal.self, WarmBlooded.self]
  )
}
