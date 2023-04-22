public enum Selection {
  case field(Field)
  case booleanCondition(BooleanCondition)
  case typeCase(TypeCase)
  case fragmentSpread(FragmentSpread)

  public struct Field {
    let name: String
    let alias: String?
    let arguments: Arguments?
    let type: OutputType

    public var responseKey: String {
      return alias ?? name
    }

    public init(_ name: String,
                alias: String? = nil,
                arguments: Arguments? = nil,
                type: OutputType) {
      self.name = name
      self.alias = alias

      self.arguments = arguments

      self.type = type
    }

    public struct Arguments: ExpressibleByDictionaryLiteral {
      let arguments: InputValue

      public init(dictionaryLiteral elements: (String, InputValue)...) {
        arguments = .object(Dictionary(elements, uniquingKeysWith: { (_, last) in last }))
      }
    }

    public indirect enum OutputType {
      case scalar(ScalarType.Type)
      case object(RootSelectionSet.Type)
      case nonNull(OutputType)
      case list(OutputType)

      var namedType: OutputType {
        switch self {
        case .nonNull(let innerType), .list(let innerType):
          return innerType.namedType
        case .scalar, .object:
          return self
        }
      }
    }
  }

  public struct BooleanCondition {
    public let variableName: String
    public let inverted: Bool
    public let selections: [Selection]

    public init(variableName: String,
                inverted: Bool,
                selections: [Selection]) {
      self.variableName = variableName
      self.inverted = inverted;
      self.selections = selections;
    }
  }

  public struct FragmentSpread {
    public let fragment: Fragment.Type

    public init(_ fragment: Fragment.Type) {
      self.fragment = fragment
    }
  }

  public struct TypeCase {
    public let type: ParentType
    public let selections: [Selection]

    public init(type: ParentType, selections: [Selection]) {
      self.type = type
      self.selections = selections
    }
  }

  // MARK: - Convenience Initializers

  static public func field(
    _ name: String,
    alias: String? = nil,
    arguments: Field.Arguments? = nil,
    _ type: OutputTypeConvertible.Type) -> Selection {
    return .field(.init(name, alias: alias, arguments: arguments, type: type.asOutputType))
  }

}

// MARK: OutputTypeConvertible
public protocol OutputTypeConvertible {
  @inlinable static var asOutputType: Selection.Field.OutputType { get }
}

extension String: OutputTypeConvertible {
  public static let asOutputType: Selection.Field.OutputType = .nonNull(.scalar(String.self))
}
extension Int: OutputTypeConvertible {
  public static let asOutputType: Selection.Field.OutputType = .nonNull(.scalar(Int.self))
}
extension Bool: OutputTypeConvertible {
  public static let asOutputType: Selection.Field.OutputType = .nonNull(.scalar(Bool.self))
}
extension Float: OutputTypeConvertible {
  public static let asOutputType: Selection.Field.OutputType = .nonNull(.scalar(Float.self))
}
extension Double: OutputTypeConvertible {
  public static let asOutputType: Selection.Field.OutputType = .nonNull(.scalar(Double.self))
}

extension Optional: OutputTypeConvertible where Wrapped: OutputTypeConvertible {
  @inlinable public static var asOutputType: Selection.Field.OutputType {
    guard case let .nonNull(wrappedOutputType) = Wrapped.asOutputType else {
      return Wrapped.asOutputType
    }
    return wrappedOutputType
  }
}

extension Array: OutputTypeConvertible where Element: OutputTypeConvertible {
  @inlinable public static var asOutputType: Selection.Field.OutputType {
    .nonNull(.list(Element.asOutputType))
  }
}

extension RootSelectionSet {
  @inlinable public static var asOutputType: Selection.Field.OutputType {
    .nonNull(.object(self))
  }
}
