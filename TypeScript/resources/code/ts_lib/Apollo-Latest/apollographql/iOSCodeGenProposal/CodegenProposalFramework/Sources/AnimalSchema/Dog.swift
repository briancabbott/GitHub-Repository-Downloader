import ApolloAPI

public final class Dog: Object {
  override public class var __typename: String { "Dog" }

  @Field("species") var species: String?
  @Field("height") var height: Height?
//  @CacheList var predators: [Animal]
  @Field("skinCovering") var skinCovering: GraphQLEnum<SkinCovering>?
  @Field("humanName") var humanName: String?
  @Field("favoriteToy") var favoriteToy: String?
  @Field("owner") var owner: Human?
  @Field("bodyTemperature") var bodyTemperature: Int?
  @Field("laysEggs") var laysEggs: Bool?
  @Field("bestFriend") var bestFriend: HousePet?
  @Field("rival") var rival: Cat?
  @Field("livesWith") var livesWith: Bird?

  // MARK: - Metadata
  override public class var __metadata: Metadata { _metadata }
  private static let _metadata: Metadata = Metadata(
    implements: [Animal.self, Pet.self, WarmBlooded.self, HousePet.self],
    covariantFields: ["bestFriend": HousePet.self, "rival": Cat.self, "livesWith": Bird.self]
  )
}
