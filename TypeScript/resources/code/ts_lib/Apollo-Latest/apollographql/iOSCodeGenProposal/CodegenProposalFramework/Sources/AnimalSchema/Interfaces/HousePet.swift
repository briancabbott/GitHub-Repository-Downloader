import ApolloAPI

public final class HousePet: Interface {
  @Field("species") var species: String?
  @Field("height") var height: Height?
//  @Field("predators") var predators: [HousePet]
  @Field("skinCovering") var skinCovering: GraphQLEnum<SkinCovering>?
  @Field("humanName") var humanName: String?
  @Field("favoriteToy") var favoriteToy: String?
  @Field("owner") var owner: Human?
  @Field("bodyTemperature") var bodyTemperature: Int?
  @Field("laysEggs") var laysEggs: Bool?
  @Field("bestFriend") var bestFriend: Pet?
  @Field("rival") var rival: Pet?
  @Field("livesWith") var livesWith: Union<ClassroomPet>?
}
