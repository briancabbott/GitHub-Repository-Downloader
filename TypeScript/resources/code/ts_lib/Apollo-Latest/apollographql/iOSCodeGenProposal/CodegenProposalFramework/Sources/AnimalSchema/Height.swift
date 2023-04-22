import ApolloAPI

public final class Height: Object {
  override public class var __typename: String { "Height" }

  @Field("relativeSize") var relativeSize: GraphQLEnum<RelativeSize>?
  @Field("centimeters") var centimeters: Int?
  @Field("meters") var meters: Int?
  @Field("feet") var feet: Int?
  @Field("inches") var inches: Int?
  @Field("yards") var yards: Int?
}
