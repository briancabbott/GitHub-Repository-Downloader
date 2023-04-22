import ApolloAPI

public final class PetRock: Object {
  override public class var __typename: String { "PetRock" }
  
  @Field("humanName") var humanName: String?
  @Field("favoriteToy") var favoriteToy: String?
  @Field("owner") var owner: Human?

  override public class var __metadata: Metadata { _metadata }
  private static let _metadata: Metadata = Metadata(
    implements: [Pet.self]
  )
}
