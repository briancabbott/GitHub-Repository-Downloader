import Foundation

public struct Resources {
  public static let GraphQLOperations: [URL] = Bundle.module.urls(
    forResourcesWithExtension: "graphql",
    subdirectory: nil
  )!

  public static let Schema = Bundle.module.url(
    forResource: "AnimalSchema",
    withExtension: "graphqls"
  )!
}
