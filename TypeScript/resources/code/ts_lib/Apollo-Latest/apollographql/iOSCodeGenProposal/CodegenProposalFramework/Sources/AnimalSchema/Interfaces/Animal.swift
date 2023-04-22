import ApolloAPI

public final class Animal: Interface {
  @Field("species") var species: String?
  @Field("height") var height: Height?
//  @Field("predators") var predators: [Animal]
  @Field("skinCovering") var skinCovering: GraphQLEnum<SkinCovering>?
}
