import XCTest
import Nimble
@testable import ApolloAPI
@testable import AnimalsAPI
@testable import AnimalSchema

class UnionTests: XCTestCase {

  var transaction: MockTransaction!

  override func setUp() {
    super.setUp()
    transaction = MockTransaction()
  }

  override func tearDown() {
    transaction = nil
    super.tearDown()
  }

  func test__Equatable__isIdenticalObject_returnsTrue() throws {
    // given
    let cat = Cat(transaction: transaction)

    // when
    let union = try Union<ClassroomPet>.value(with: cat, in: transaction)

    // then
    expect(union == .case(.Cat(cat))).to(beTrue())
    expect(union == ClassroomPet.Cat(cat)).to(beTrue())
    expect(union == cat).to(beTrue())

    expect(union != .case(.Cat(cat))).to(beFalse())
    expect(union != ClassroomPet.Cat(cat)).to(beFalse())
    expect(union != cat).to(beFalse())
  }

  func test__Equatable__isNotIdenticalObject_returnsFalse() throws {
    // given
    let cat = Cat(transaction: transaction)
    let cat2 = Cat(transaction: transaction)

    // when
    let union = try Union<ClassroomPet>.value(with: cat, in: transaction)

    // then
    expect(union == .case(.Cat(cat2))).to(beFalse())
    expect(union == ClassroomPet.Cat(cat2)).to(beFalse())
    expect(union == cat2).to(beFalse())

    expect(union != .case(.Cat(cat2))).to(beTrue())
    expect(union != ClassroomPet.Cat(cat2)).to(beTrue())
    expect(union != cat2).to(beTrue())
  }

  func test__optionalEquatable__isIdenticalObject_returnsTrue() throws {
    // given
    let cat = Cat(transaction: transaction)

    // when
    let union = try? Union<ClassroomPet>.value(with: cat, in: transaction)

    // then
    expect(union == .case(.Cat(cat))).to(beTrue())
    expect(union == ClassroomPet.Cat(cat)).to(beTrue())
    expect(union == cat).to(beTrue())

    expect(union != .case(.Cat(cat))).to(beFalse())
    expect(union != ClassroomPet.Cat(cat)).to(beFalse())
    expect(union != cat).to(beFalse())
  }

  func test__optionalEquatable__isNotIdenticalObject_returnsFalse() throws {
    // given
    let cat = Cat(transaction: transaction)
    let cat2 = Cat(transaction: transaction)

    // when
    let union = try? Union<ClassroomPet>.value(with: cat, in: transaction)

    // then
    expect(union == .case(.Cat(cat2))).to(beFalse())
    expect(union == ClassroomPet.Cat(cat2)).to(beFalse())
    expect(union == cat2).to(beFalse())

    expect(union != .case(.Cat(cat2))).to(beTrue())
    expect(union != ClassroomPet.Cat(cat2)).to(beTrue())
    expect(union != cat2).to(beTrue())
  }

  func test__unionTypeEquatable__isIdenticalObject_returnsTrue() throws {
    // given
    let cat = Cat(transaction: transaction)

    // when
    let classroomPet = ClassroomPet(cat)

    // then
    expect(classroomPet == .Cat(cat)).to(beTrue())
    expect(classroomPet == cat).to(beTrue())

    expect(classroomPet != .Cat(cat)).to(beFalse())
    expect(classroomPet != cat).to(beFalse())
  }

  func test__unionTypeEquatable__isNotIdenticalObject_returnsFalse() throws {
    // given
    let cat = Cat(transaction: transaction)
    let cat2 = Cat(transaction: transaction)

    // when
    let classroomPet = ClassroomPet(cat)

    // then
    expect(classroomPet == .Cat(cat2)).to(beFalse())
    expect(classroomPet == cat2).to(beFalse())

    expect(classroomPet != .Cat(cat2)).to(beTrue())
    expect(classroomPet != cat2).to(beTrue())
  }

  func test__patternMatching__matchesCasesWithIdenticalObject() throws {
    // given
    let cat = Cat(transaction: transaction)

    // when
    let union = try Union<ClassroomPet>.value(with: cat, in: transaction)

    // then

    switch union {
    case .Cat(cat): break
    case .Cat(Cat(transaction: transaction)): fail()
    default: fail()
    }

    switch union.value {
    case let .Cat(catValue): expect(catValue).to(beIdenticalTo(cat))
    default: fail()
    }
  }

  // MARK: Initializer Tests

  func test__init__givenObjectOfValidType_returnsUnionOfType() throws {
    // given
    let cat = Cat(transaction: transaction)

    // when
    let classroomPet = try Union<ClassroomPet>(cat)

    // then
    expect(classroomPet).to(equal(.case(.Cat(cat))))
  }

  func test__init__givenObjectOfInvalidType_throwsInvalidObjectTypeError() throws {
    // given
    let dog = Dog(transaction: transaction)

    let expectedError = CacheError.Reason
      .invalidObjectType(Dog.self, forExpectedType: Union<ClassroomPet>.self)

    // when
    expect(try Union<ClassroomPet>(dog))
      // then
      .to(throwError(expectedError))
  }

  func test__init__givenUnknownObject_returnsUnknownCase() throws {
    // given
    let unknownObject = Object(transaction: transaction)

    // when
    let classroomPet = try Union<ClassroomPet>(unknownObject)

    // then
    expect(classroomPet).to(equal(.__unknown(unknownObject)))
  }


  func test__init__givenUnknownObjectWithConcreteTypeName_returnsUnknownCase() throws {
    // given
    let unknownObject = Object(transaction: transaction)
    unknownObject.data["__typename"] = "CatDog"

    // when
    let classroomPet = try Union<ClassroomPet>(unknownObject)

    // then
    expect(classroomPet).to(equal(.__unknown(unknownObject)))
  }

  // MARK: valueWithCacheDataInTransaction Tests

  func test__valueWithCacheDataInTransaction__givenObjectOfValidType_returnsUnionOfType() throws {
    // given
    let cat = Cat(transaction: transaction)

    // when
    let classroomPet = try Union<ClassroomPet>.value(with: cat, in: transaction)

    // then
    expect(classroomPet).to(equal(.case(.Cat(cat))))
  }

  func test__valueWithCacheDataInTransaction__givenObjectOfInvalidType_throwsInvalidObjectTypeError() throws {
    // given
    let dog = Dog(transaction: transaction)

    let expectedError = CacheError.Reason
      .invalidObjectType(Dog.self, forExpectedType: Union<ClassroomPet>.self)

    // when
    expect(try Union<ClassroomPet>.value(with: dog, in: self.transaction))
      // then
      .to(throwError(expectedError))
  }

  func test__valueWithCacheDataInTransaction__givenUnknownObject_returnsUnknownCase() throws {
    // given
    let unknownObject = Object(transaction: transaction)

    // when
    let classroomPet = try Union<ClassroomPet>.value(with: unknownObject, in: transaction)

    // then
    expect(classroomPet).to(equal(.__unknown(unknownObject)))
  }

  func test__valueWithCacheDataInTransaction__givenInterfaceWrappingObjectOfValidType_returnsUnionOfType() throws {
    // given
    let cat = Cat(transaction: transaction)
    let pet = try Pet(cat)

    // when
    let classroomPet = try Union<ClassroomPet>.value(with: pet, in: transaction)

    // then
    expect(classroomPet).to(equal(.case(.Cat(cat))))
  }

  func test__valueWithCacheDataInTransaction__givenInterfaceWrappingObjectOfInvalidType_throwsInvalidObjectTypeError() throws {
    // given
    let dog = Dog(transaction: transaction)
    let pet = try Pet(dog)

    // when
    let expectedError = CacheError.Reason
      .invalidObjectType(Dog.self, forExpectedType: Union<ClassroomPet>.self)

    // when
    expect(try Union<ClassroomPet>.value(with: pet, in: self.transaction))
      // then
      .to(throwError(expectedError))
  }

  func test__valueWithCacheDataInTransaction__givenDataDictionaryForObjectOfValidType_returnsUnionOfType() throws {
    // given
    let data: [String: Any] = [
      "__typename": Cat.__typename
    ]

    // when
    let classroomPet = try Union<ClassroomPet>.value(with: data, in: transaction)

    // then
    switch classroomPet {
    case .case(.Cat(_)): break
    default: fail("expected ClassroomPet.Cat")
    }
  }

  func test__valueWithCacheDataInTransaction__givenDataDictionaryForObjectOfInvalidType_throwsInvalidObjectTypeError() throws {
    // given
    let data: [String: Any] = [
      "__typename": Dog.__typename
    ]

    // when
    let expectedError = CacheError.Reason
      .invalidObjectType(Dog.self, forExpectedType: Union<ClassroomPet>.self)

    // then
    // when
    expect(try Union<ClassroomPet>.value(with: data, in: self.transaction))
      // then
      .to(throwError(expectedError))
  }

  func test__valueWithCacheDataInTransaction__givenCacheKeyForObjectOfValidType_returnsUnionOfType() throws {
    // given
    let cat = Cat(transaction: transaction)
    let key = CacheReference("123")
    transaction.cache[key.key] = cat

    // when
    let classroomPet = try Union<ClassroomPet>.value(with: key, in: transaction)

    // then
    expect(classroomPet).to(equal(.case(.Cat(cat))))
  }

  func test__valueWithCacheDataInTransaction__givenCacheKeyForObjectOfInvalidType_throwsInvalidObjectError() throws {
    // given
    let dog = Dog(transaction: transaction)
    let key = CacheReference("123")
    transaction.cache[key.key] = dog

    // when
    let expectedError = CacheError.Reason
      .invalidObjectType(Dog.self, forExpectedType: Union<ClassroomPet>.self)

    // then
    // when
    expect(try Union<ClassroomPet>.value(with: key, in: self.transaction))
      // then
      .to(throwError(expectedError))
  }

  func test__valueWithCacheDataInTransaction__givenScalarType_throwsUnrecognizedCacheDataError() throws {
    // given
    let scalar = "I am a Cat!"

    // when
    let expectedError = CacheError.Reason
      .unrecognizedCacheData(scalar, forType: Union<ClassroomPet>.self)

    // then
    // when
    expect(try Union<ClassroomPet>.value(with: scalar, in: self.transaction))
      // then
      .to(throwError(expectedError))
  }
}
