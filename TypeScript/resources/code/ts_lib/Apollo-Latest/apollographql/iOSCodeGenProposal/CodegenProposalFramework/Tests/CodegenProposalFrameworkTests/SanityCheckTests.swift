//
//  Tests_iOS.swift
//  Tests iOS
//
//  Created by Anthony Miller on 1/25/21.
//

import XCTest
@testable import ApolloAPI
@testable import AnimalsAPI
@testable import AnimalSchema

class SanityCheckTests: XCTestCase {

  var data: DataDict!
  var dataDict: [String: Any]!

  override func setUpWithError() throws {
    try super.setUpWithError()

    dataDict = [
      "__typename": "Cat",
      "species": "Cat",
      "height": [
        "__typename": "Height",
        "feet": 2,
        "inches": 7,
        "meters": 10,
        "relativeSize": "SMALL",
        "centimeters": 1000,
        "yards": 3
      ],
      "predators": [
        [
          "__typename": "Human",
          "species": "Human",
          "bodyTemperature": 96,
          "height": [
            "__typename": "Height",
            "meters": 3,
            "yards": 1
          ],
          "laysEggs": false
        ],
        [
          "__typename": "Crocodile",
          "species": "Crocodile",
        ]
      ],
      "skinCovering": "FUR",
      "humanName": "Tiger Lily",
      "favoriteToy": "Shoelaces",
      "bodyTemperature": 98,
      "isJellical": true,
      "owner": [
        "__typename": "Human",
        "firstName": "Hugh"
      ]
    ]

    data = DataDict(dataDict)
  }

  override func tearDownWithError() throws {
    try super.tearDownWithError()
  }

  func testSpecies() throws {
    let cat = AllAnimalsQuery.Data.Animal(data: data)

    XCTAssertEqual(cat.species, "Cat")
  }

  func testAsTypeCondition_fieldOnTypeNested2TypeConditionsDeep() throws {
    let subject = AllAnimalsQuery.Data.Animal(data: data)

    XCTAssertEqual(subject.species, "Cat")
    XCTAssertEqual(subject.asPet?.species, "Cat")
    XCTAssertEqual(subject.asPet?.asWarmBlooded?.species, "Cat")
  }

  func testAsTypeConditions_withDuplicateFieldOnParent() throws {
    let subject = AllAnimalsQuery.Data.Animal(data: data)

    XCTAssertEqual(subject.species, "Cat")
    XCTAssertEqual(subject.height.feet, 2)
    XCTAssertEqual(subject.height.inches, 7)
    XCTAssertEqual(subject.height.meters, 10)
    XCTAssertEqual(subject.predators.count, 2)

    XCTAssertEqual(subject.asWarmBlooded?.species, "Cat")
    XCTAssertEqual(subject.asWarmBlooded?.height.feet, 2)
    XCTAssertEqual(subject.asWarmBlooded?.height.inches, 7)
    XCTAssertEqual(subject.asWarmBlooded?.height.meters, 10)
    XCTAssertEqual(subject.asWarmBlooded?.predators.count, 2)
    XCTAssertEqual(subject.asWarmBlooded?.height.yards, 3)
    XCTAssertEqual(subject.asWarmBlooded?.bodyTemperature, 98)

    XCTAssertEqual(subject.asPet?.species, "Cat")
    XCTAssertEqual(subject.asPet?.height.feet, 2)
    XCTAssertEqual(subject.asPet?.height.inches, 7)
    XCTAssertEqual(subject.asPet?.height.meters, 10)
    XCTAssertEqual(subject.asPet?.predators.count, 2)
    XCTAssertEqual(subject.asPet?.height.centimeters, 1000)
    XCTAssertEqual(subject.asPet?.height.relativeSize, .case(.SMALL))
    XCTAssertEqual(subject.asPet?.humanName, "Tiger Lily")
    XCTAssertEqual(subject.asPet?.favoriteToy, "Shoelaces")

    XCTAssertEqual(subject.asPet?.asWarmBlooded?.species, "Cat")
    XCTAssertEqual(subject.asPet?.asWarmBlooded?.height.feet, 2)
    XCTAssertEqual(subject.asPet?.asWarmBlooded?.height.inches, 7)
    XCTAssertEqual(subject.asPet?.asWarmBlooded?.height.meters, 10)
    XCTAssertEqual(subject.asPet?.asWarmBlooded?.predators.count, 2)
    XCTAssertEqual(subject.asPet?.asWarmBlooded?.height.centimeters, 1000)
    XCTAssertEqual(subject.asPet?.asWarmBlooded?.height.yards, 3)
    XCTAssertEqual(subject.asPet?.asWarmBlooded?.humanName, "Tiger Lily")
    XCTAssertEqual(subject.asPet?.asWarmBlooded?.favoriteToy, "Shoelaces")
    XCTAssertEqual(subject.asPet?.asWarmBlooded?.bodyTemperature, 98)    
  }

  func testAsTypeCondition_withFragmentsOnParent_convertToFragments() throws {
    let subject = AllAnimalsQuery.Data.Animal(data: data)

    XCTAssertEqual(subject.fragments.heightInMeters.height.meters, 10)

    XCTAssertEqual(subject.asWarmBlooded?.fragments.heightInMeters.height.meters, 10)
    XCTAssertEqual(subject.asWarmBlooded?.fragments.warmBloodedDetails.height.meters, 10)

    XCTAssertEqual(subject.asPet?.fragments.heightInMeters.height.meters, 10)
    XCTAssertEqual(subject.asPet?.fragments.petDetails.favoriteToy, "Shoelaces")

    XCTAssertEqual(subject.asPet?.asWarmBlooded?.fragments.heightInMeters.height.meters, 10)
    XCTAssertEqual(subject.asPet?.asWarmBlooded?.fragments.warmBloodedDetails.height.meters, 10)
    XCTAssertEqual(subject.asPet?.asWarmBlooded?.fragments.petDetails.favoriteToy, "Shoelaces")    
  }

  func testAsTypeConditionForInterface_withConcreteTypeThatDoesNotImplementInterface() throws {
    dataDict["__typename"] = Fish.__typename
    data = DataDict(dataDict)
    let subject = AllAnimalsQuery.Data.Animal(data: data)

    XCTAssertNil(subject.asWarmBlooded)
    XCTAssertNotNil(subject.asPet)
  }

  func testAsTypeConditionForConcreteType_withDifferentConcreteType() throws {
    dataDict["__typename"] = Fish.__typename
    data = DataDict(dataDict)
    let subject = AllAnimalsQuery.Data.Animal(data: data)

    XCTAssertNil(subject.asCat)
  }

  func testAsTypeConditionForConcreteType_withMatchingConcreteType() throws {
    let subject = AllAnimalsQuery.Data.Animal(data: data)

    XCTAssertNotNil(subject.asCat)
  }

  func testAsTypeConditionForUnionType_withConcreteTypeMatchingAMemberType() throws {
    dataDict["__typename"] = Bird.__typename
    dataDict["wingspan"] = 15
    data = DataDict(dataDict)
    let subject = AllAnimalsQuery.Data.Animal(data: data)

    let asClassroomPet = subject.asClassroomPet
    XCTAssertNotNil(asClassroomPet)
    XCTAssertEqual(asClassroomPet?.asBird?.wingspan, 15)
  }

  func testAsTypeConditionForUnionType_withConcreteTypeNotMatchingAMemberType() throws {
    dataDict["__typename"] = Crocodile.__typename
    data = DataDict(dataDict)
    let subject = AllAnimalsQuery.Data.Animal(data: data)

    let asClassroomPet = subject.asClassroomPet
    XCTAssertNil(asClassroomPet)    
  }

  func testListField() throws {
    let subject = AllAnimalsQuery.Data.Animal(data: data)
    let human = subject.predators[0]
    let crocodile = subject.predators[1]

    XCTAssertEqual(human.species, "Human")
    XCTAssertEqual(human.asWarmBlooded?.bodyTemperature, 96)
    XCTAssertEqual(human.asWarmBlooded?.height.meters, 3)
    XCTAssertEqual(human.asWarmBlooded?.height.yards, 1)
    XCTAssertEqual(human.asWarmBlooded?.laysEggs, false)

    XCTAssertEqual(crocodile.species, "Crocodile")
  }

  func testEnumField_withKnownValue() throws {
    let subject = AllAnimalsQuery.Data.Animal(data: data)

    XCTAssertEqual(subject.skinCovering, GraphQLEnum(SkinCovering.FUR))
    XCTAssertEqual(
      subject.skinCovering,
      GraphQLEnum<SkinCovering>.__unknown(SkinCovering.FUR.rawValue)
    )
    XCTAssertEqual(
      GraphQLEnum<SkinCovering>.__unknown(SkinCovering.FUR.rawValue),
      GraphQLEnum<SkinCovering>.__unknown(SkinCovering.FUR.rawValue)
    )
    XCTAssertNotEqual(
      GraphQLEnum<SkinCovering>.__unknown(SkinCovering.FUR.rawValue),
      GraphQLEnum<SkinCovering>.__unknown("UNKNOWN")
    )
    XCTAssertEqual(subject.skinCovering?.value, .FUR)
    XCTAssertNotEqual(subject.skinCovering?.value, .FEATHERS)
    XCTAssertEqual(subject.skinCovering?.rawValue, SkinCovering.FUR.rawValue)
    XCTAssertTrue(subject.skinCovering == .FUR)
    XCTAssertFalse(subject.skinCovering != .FUR)
    XCTAssertFalse(subject.skinCovering == .FEATHERS)
    XCTAssertTrue(subject.skinCovering != .FEATHERS)
  }

  func testEnumField_withUnknownValue() throws {
    dataDict["skinCovering"] = "TEST_UNKNOWN"
    data = DataDict(dataDict)
    let subject = AllAnimalsQuery.Data.Animal(data: data)

    XCTAssertNotEqual(subject.skinCovering, GraphQLEnum(SkinCovering.FUR))
    XCTAssertNotEqual(
      subject.skinCovering,
      GraphQLEnum<SkinCovering>.__unknown(SkinCovering.FUR.rawValue)
    )
    XCTAssertEqual(
      subject.skinCovering,
      GraphQLEnum<SkinCovering>.__unknown("TEST_UNKNOWN")
    )
    XCTAssertNotEqual(
      subject.skinCovering,
      GraphQLEnum<SkinCovering>.__unknown("OTHER_UNKNOWN")
    )
    XCTAssertNotEqual(
      subject.skinCovering,
      GraphQLEnum<SkinCovering>.__unknown(SkinCovering.FUR.rawValue)
    )

    XCTAssertNil(subject.skinCovering?.value)
    XCTAssertEqual(subject.skinCovering?.rawValue, "TEST_UNKNOWN")

    XCTAssertFalse(subject.skinCovering == .FUR)
    XCTAssertTrue(subject.skinCovering != .FUR)
    XCTAssertFalse(subject.skinCovering == .FEATHERS)
    XCTAssertTrue(subject.skinCovering != .FEATHERS)

    switch subject.skinCovering! {
    case .case(.FEATHERS): break
    case .case(.FUR): break
    case .case(.HAIR): break
    case .case(.SCALES): break
    case .__unknown(_): break
    }
  }

  func testOptionalScalarField_withValue() throws {
    dataDict["humanName"] = "Anastasia"
    data = DataDict(dataDict)
    let subject = AllAnimalsQuery.Data.Animal(data: data)

    XCTAssertEqual(subject.asPet?.humanName, "Anastasia")
  }

  func testOptionalScalarField_withNilValue() throws {
    dataDict["humanName"] = nil
    data = DataDict(dataDict)
    let subject = AllAnimalsQuery.Data.Animal(data: data)

    XCTAssertNil(subject.asPet?.humanName)
  }

  func testOptionalScalarField_withNullValue() throws {
    dataDict["humanName"] = NSNull()
    data = DataDict(dataDict)
    let subject = AllAnimalsQuery.Data.Animal(data: data)

    XCTAssertNil(subject.asPet?.humanName)
  }

  func testOptionalNestedTypeField_withValue() throws {
    dataDict["owner"] = [
      "__typename": "Human",
      "firstName": "Hugh"
    ]
    data = DataDict(dataDict)
    let subject = AllAnimalsQuery.Data.Animal(data: data)

    XCTAssertEqual(subject.asPet?.owner?.firstName, "Hugh")
  }

  func testOptionalNestedTypeField_withNilValue() throws {
    dataDict["owner"] = nil
    data = DataDict(dataDict)
    let subject = AllAnimalsQuery.Data.Animal(data: data)

    XCTAssertNil(subject.asPet?.owner)
  }

  func testOptionalNestedTypeField_withNullValue() throws {
    dataDict["owner"] = NSNull()
    data = DataDict(dataDict)
    let subject = AllAnimalsQuery.Data.Animal(data: data)

    XCTAssertNil(subject.asPet?.owner)
  }

  func testOptionalEnumField_withValue() throws {
    dataDict["skinCovering"] = "FUR"
    data = DataDict(dataDict)
    let subject = AllAnimalsQuery.Data.Animal(data: data)

    XCTAssertEqual(subject.skinCovering, GraphQLEnum(SkinCovering.FUR))
  }

  func testOptionalEnumField_withNilValue() throws {
    dataDict["skinCovering"] = nil
    data = DataDict(dataDict)
    let subject = AllAnimalsQuery.Data.Animal(data: data)

    XCTAssertNil(subject.skinCovering)
  }

  func testOptionalEnumField_withNullValue() throws {
    dataDict["skinCovering"] = NSNull()
    data = DataDict(dataDict)
    let subject = AllAnimalsQuery.Data.Animal(data: data)

    XCTAssertNil(subject.skinCovering)
  }
}
