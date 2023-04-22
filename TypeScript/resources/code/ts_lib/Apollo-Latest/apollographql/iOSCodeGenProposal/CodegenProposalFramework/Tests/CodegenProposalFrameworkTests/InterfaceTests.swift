import XCTest
import Nimble
@testable import ApolloAPI
@testable import AnimalsAPI
@testable import AnimalSchema

class InterfaceTests: XCTestCase {

  var transaction: MockTransaction!

  override func setUp() {
    super.setUp()
    transaction = MockTransaction()
  }

  override func tearDown() {
    transaction = nil
    super.tearDown()
  }

  // MARK: Object Field

  func test_getObjectField_fromNestedData_createsObjectWithData() throws {
    // given
    let dog = Dog(transaction: transaction)
    dog.data["height"] = [
      "__typename": "Height",
      "meters": 1,
      "feet": 3
    ]


    // when
    let asHousePet = try HousePet(dog)
    let heightObject = asHousePet.height

    // then
    expect(heightObject?.meters).to(equal(1))
    expect(heightObject?.feet).to(equal(3))
  }

  func test_getObjectField_fromCacheKeyReference_getsObjectWithKeyFromCache() throws {
    // given
    let key = CacheReference("123")
    let dog = Dog(transaction: transaction)
    dog.data["bestFriend"] = key

    let bestFriend = Dog(transaction: transaction)
    transaction.cache[key.key] = bestFriend

    // when
    let asHousePet = try HousePet(dog)

    // then
    expect(asHousePet.bestFriend?.object).to(beIdenticalTo(bestFriend))
  }
  
}
