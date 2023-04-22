import XCTest
import Nimble
@testable import ApolloAPI
@testable import AnimalsAPI
@testable import AnimalSchema

class ObjectTests: XCTestCase {

  var transaction: MockTransaction!

  override func setUp() {
    super.setUp()
    transaction = MockTransaction()
  }

  override func tearDown() {
    transaction = nil
    super.tearDown()
  }

  // MARK: Init Tests

  func test__init__dataWithTypeName_retainsTypename() throws {
    // given
    let data = [
      "__typename": "Dog",
    ]

    // when
    let dog = Dog(transaction: transaction, data: data)

    // then
    expect(dog.data["__typename"] as? String).to(equal("Dog"))
  }

  func test__init__dataMissingTypeName_setsTypenameToDefaultTypename() throws {
    // when
    let dog = Dog(transaction: transaction, data: [:])

    // then
    expect(dog.data["__typename"] as? String).to(equal("Dog"))
  }

  func test__init__dataMissingTypeName_forUnknownObject_setsTypenameToUnknownTypeName() throws {
    // when
    let dog = Object(transaction: transaction, data: [:])

    // then
    expect(dog.data["__typename"] as? String).to(equal(Object.UnknownTypeName))
  }

  // MARK: - Field Getter Tests

  // MARK: Object Field Getter

  func test_getObjectField_fromNestedData_createsObjectWithData() throws {
    // given
    let dog = Dog(transaction: transaction)
    dog.data["height"] = [
      "__typename": "Height",
      "meters": 1,
      "feet": 3
    ]

    // when
    let heightObject = dog.height

    // then
    expect(heightObject?.meters).to(equal(1))
    expect(heightObject?.feet).to(equal(3))
  }

  func test_getObjectField_fromCacheKeyReference_getsObjectWithKeyFromCache() throws {
    // given
    let key = CacheReference("123")
    let dog = Dog(transaction: transaction)

    let rival = Cat(transaction: transaction)

    transaction.cache[key.key] = rival

    // when
    dog.data["rival"] = key

    // then
    expect(dog.rival).to(beIdenticalTo(rival))
  }

  func test_getObjectField_fromCacheKeyReference_objectNotInCache_returnsNilWithNoErrors() throws {
    // given
    let key = CacheReference("123")
    let dog = Dog(transaction: transaction)

    dog.data["rival"] = key

    // when
    let actual = dog.rival

    // then
    expect(actual).to(beNil())
    expect(self.transaction.errors).to(beEmpty())
  }

  // MARK: Interface Field Getter

  func test_getInterfaceField_fromNestedData_createsObjectWithData() throws {
    // given
    let dog = Dog(transaction: transaction)
    dog.data["bestFriend"] = [
      "__typename": "Dog",
      "species": "Canine",
    ]

    // when
    let bestFriend = dog.bestFriend

    // then
    expect(bestFriend?.species).to(equal("Canine"))
  }

  func test_getInterfaceField_fromCacheKeyReference_getsObjectWithKeyFromCache() throws {
    // given
    let key = CacheReference("123")
    let dog = Dog(transaction: transaction)

    let bestFriend = Dog(transaction: transaction)

    transaction.cache[key.key] = bestFriend

    // when
    dog.data["bestFriend"] = key

    // then
    expect(dog.bestFriend?.object).to(beIdenticalTo(bestFriend))
  }

  // MARK: - Field Setter Tests

  // MARK: Covariant Fields

  func test_setCovariantField_withInterfaceType_toInvalidType_throwsInvalidValueForCovariantFieldError() throws {
    let dog = Dog(transaction: transaction)
    let asHousePet = try HousePet(dog)

    let bird = Bird(transaction: transaction)
    let birdAsPet = try Pet(bird)

    let expectedError = CacheError(
      reason: .invalidValue(birdAsPet, forCovariantFieldOfType: HousePet.self),
      type: .write,
      field: "bestFriend",
      object: dog
    )

    asHousePet.bestFriend = birdAsPet

    expect(self.transaction.errors.first).to(equal(expectedError))
    expect(dog.bestFriend).to(beNil())
    expect(asHousePet.bestFriend).to(beNil())
  }

  func test_setCovariantField_withInterfaceType_toValidType_setsFieldOnObject() throws {
    let dog = Dog(transaction: transaction)
    let asHousePet = try HousePet(dog)

    let bestFriendAsDog = try Pet(Dog(transaction: transaction))

    asHousePet.bestFriend = bestFriendAsDog

    expect(self.transaction.errors).to(beEmpty())
    expect(dog.bestFriend?.object).to(beIdenticalTo(bestFriendAsDog.object))
    expect(asHousePet.bestFriend?.object).to(beIdenticalTo(bestFriendAsDog.object))
  }

  func test_setCovariantField_withObjectType_toInvalidType_throwsInvalidValueForCovariantFieldError() throws {
    let dog = Dog(transaction: transaction)
    let asHousePet = try HousePet(dog)

    let bird = Bird(transaction: transaction)
    let birdAsPet = try Pet(bird)

    let expectedError = CacheError(
      reason: .invalidValue(birdAsPet, forCovariantFieldOfType: Cat.self),
      type: .write,
      field: "rival",
      object: dog
    )

    asHousePet.rival = birdAsPet

    expect(self.transaction.errors.first).to(matchError(expectedError))
    expect(dog.bestFriend).to(beNil())
    expect(asHousePet.bestFriend).to(beNil())
  }

  func test_setCovariantField_withObjectType_toValidType_setsFieldOnObject() throws {
    let dog = Dog(transaction: transaction)
    let asHousePet = try HousePet(dog)

    let rivalAsPet = try Pet(Cat(transaction: transaction))

    asHousePet.rival = rivalAsPet

    expect(self.transaction.errors).to(beEmpty())
    expect(dog.rival).to(beIdenticalTo(rivalAsPet.object))
    expect(asHousePet.rival?.object).to(beIdenticalTo(rivalAsPet.object))
  }

  func test_setCovariantField_withUnionType_toInvalidType_throwsInvalidValueForCovariantFieldError() throws {
    let dog = Dog(transaction: transaction)
    let asHousePet = try HousePet(dog)

    let cat = Cat(transaction: transaction)
    let catAsClassroomPet = try Union<ClassroomPet>(cat)

    let expectedError = CacheError(
      reason: .invalidValue(catAsClassroomPet, forCovariantFieldOfType: Bird.self),
      type: .write,
      field: "livesWith",
      object: dog
    )

    asHousePet.livesWith = catAsClassroomPet

    expect(self.transaction.errors.first).to(matchError(expectedError))
    expect(dog.livesWith).to(beNil())
    expect(asHousePet.livesWith).to(beNil())
  }

  func test_setCovariantField_withUnionType_toValidType_setsFieldOnObject() throws {
    let dog = Dog(transaction: transaction)
    let asHousePet = try HousePet(dog)

    let bird = Bird(transaction: transaction)
    let birdAsClassroomPet = try Union<ClassroomPet>(bird)

    asHousePet.livesWith = birdAsClassroomPet

    expect(self.transaction.errors).to(beEmpty())
    expect(dog.livesWith).to(beIdenticalTo(bird))
    expect(asHousePet.livesWith?.object).to(beIdenticalTo(bird))
  }
}
