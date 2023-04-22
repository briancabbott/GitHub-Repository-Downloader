import XCTest
import Nimble
@testable import Apollo
@testable import ApolloAPI
@testable import AnimalSchema

class SelectionTests: XCTestCase {

  func test__convenienceInit__given_field_scalar_nonNull() {
    // given
    let tests: [(selection: Selection, expected: Selection.Field.OutputType)] = [
      // Scalar
      (.field("testName", String.self), .nonNull(.scalar(String.self))),
      (.field("testName", String?.self), .scalar(String.self)),
      // Object
      (.field("testName", MockSelectionSet.self), .nonNull(.object(MockSelectionSet.self))),
      (.field("testName", MockSelectionSet?.self), .object(MockSelectionSet.self)),
      // List - Scalar
      (.field("testName", [String].self), .nonNull(.list(.nonNull(.scalar(String.self))))),
      (.field("testName", [String?]?.self), .list(.scalar(String.self))),
      (.field("testName", [String?].self), .nonNull(.list(.scalar(String.self)))),
      (.field("testName", [String]?.self), .list(.nonNull(.scalar(String.self)))),
      // Nested Lists - Scalar
      (.field("testName", [[String]].self),
       .nonNull(.list(.nonNull(.list(.nonNull(.scalar(String.self))))))),
      (.field("testName", [[String?]].self),
       .nonNull(.list(.nonNull(.list(.scalar(String.self)))))),
      (.field("testName", [[String]?].self),
       .nonNull(.list(.list(.nonNull(.scalar(String.self)))))),
      (.field("testName", [[String]]?.self),
       .list(.nonNull(.list(.nonNull(.scalar(String.self)))))),
      (.field("testName", [[String]?]?.self),
       .list(.list(.nonNull(.scalar(String.self))))),
      (.field("testName", [[String?]?]?.self),
       .list(.list(.scalar(String.self)))),
      // Nested Lists - Object
      (.field("testName", [[MockSelectionSet]].self),
       .nonNull(.list(.nonNull(.list(.nonNull(.object(MockSelectionSet.self))))))),
      (.field("testName", [[MockSelectionSet?]].self),
       .nonNull(.list(.nonNull(.list(.object(MockSelectionSet.self)))))),
      (.field("testName", [[MockSelectionSet]?].self),
       .nonNull(.list(.list(.nonNull(.object(MockSelectionSet.self)))))),
      (.field("testName", [[MockSelectionSet]]?.self),
       .list(.nonNull(.list(.nonNull(.object(MockSelectionSet.self)))))),
      (.field("testName", [[MockSelectionSet]?]?.self),
       .list(.list(.nonNull(.object(MockSelectionSet.self))))),
      (.field("testName", [[MockSelectionSet?]?]?.self),
       .list(.list(.object(MockSelectionSet.self)))),
    ]

    // when
    for test in tests {
      switch test.selection {
      case let .field(actual):
        // then
        expect(actual.type).to(equal(test.expected))

      default: fail()
      }
    }
  }

}

fileprivate struct MockSelectionSet: RootSelectionSet, ApolloAPI.SelectionSet {
  typealias Schema = AnimalSchema.Schema

  static var __parentType: ParentType = .Object(Object.self)

  let data: DataDict

  init(data: DataDict) {
    self.data = data
  }


}
func equal(_ expected: Selection.Field.OutputType) -> Predicate<Selection.Field.OutputType> {
  func areEqual(actual: Selection.Field.OutputType, expected: Selection.Field.OutputType) -> Bool {
    switch (actual, expected) {
    case let (.scalar(actualType), .scalar(expectedType)):
      return actualType == expectedType

    case let (.object(actualType), .object(expectedType)):
      return actualType == expectedType

    case let (.nonNull(actualType), .nonNull(expectedType)),
         let (.list(actualType), .list(expectedType)):
      return areEqual(actual: actualType, expected: expectedType)
    default:
      return false
    }
  }

  return Predicate { (actualExpression: Expression<Selection.Field.OutputType>) throws -> PredicateResult in
    let msg = ExpectationMessage.expectedActualValueTo("equal <\(expected)>")
    if let actual = try actualExpression.evaluate() {
      return PredicateResult(
        bool: areEqual(actual: actual, expected: expected),
        message: msg
      )
    } else {
      return PredicateResult(
        status: .fail,
        message: msg.appendedBeNilHint()
      )
    }
  }
}
