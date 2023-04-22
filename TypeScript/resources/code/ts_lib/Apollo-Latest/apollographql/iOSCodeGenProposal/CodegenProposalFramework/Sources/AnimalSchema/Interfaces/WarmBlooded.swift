import ApolloAPI

public final class WarmBlooded: Interface {
  @Field("species") var species: String?
  @Field("height") var height: Height?
//  @Field("predators") var predators: [Animal]
  @Field("skinCovering") var skinCovering: GraphQLEnum<SkinCovering>?
  @Field("bodyTemperature") var bodyTemperature: Int?
  @Field("laysEggs") var laysEggs: Bool?
}
