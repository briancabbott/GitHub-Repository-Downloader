import ApolloAPI

public final class Pet: Interface {
  @Field("humanName") var humanName: String?
  @Field("favoriteToy") var favoriteToy: String?
  @Field("owner") var owner: Human?
}
