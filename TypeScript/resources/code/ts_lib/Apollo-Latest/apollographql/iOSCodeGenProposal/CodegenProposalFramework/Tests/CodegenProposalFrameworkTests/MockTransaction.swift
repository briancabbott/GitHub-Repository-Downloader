@testable import ApolloAPI
@testable import AnimalSchema

class MockTransaction: CacheTransaction {

  var cache: [String: Object] = [:]

  init() {
    super.init(schema: AnimalSchema.Schema.self)
  }

  override func object(for key: CacheReference) -> Object? {
    return cache[key.key]
  }
}

class MockCacheKeyProvider: Object, CacheKeyProvider {
  static func cacheKey(for: [String : Any]) -> String? {
    return nil
  }
}
