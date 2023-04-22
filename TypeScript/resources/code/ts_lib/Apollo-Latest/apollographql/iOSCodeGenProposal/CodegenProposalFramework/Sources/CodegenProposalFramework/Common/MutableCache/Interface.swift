open class Interface: ObjectType, Cacheable {

  final let object: Object
  final var underlyingType: Object.Type { Swift.type(of: object) } // TODO: Delete?

  public static var fields: [String : Cacheable.Type] { [:] }

  public final var _transaction: CacheTransaction { object._transaction }
  public final var data: [String: Any] { object.data }

  public required init(_ object: Object) throws {
    let objectType = type(of: object)
    guard objectType.__metadata.implements(Self.self) else {
      throw CacheError.Reason.invalidObjectType(objectType, forExpectedType: Self.self)
    }

    self.object = object
  }

  public required convenience init(_ interface: Interface) throws {
    try self.init(interface.object)
  }

  public static func value(
    with cacheData: Any,
    in transaction: CacheTransaction
  ) throws -> Self {
    switch cacheData {
    case let dataAsSelf as Self:
      return dataAsSelf

    case let object as Object:
      return try Self(object)

    case let key as CacheKey:
      return try Self(transaction.object(withKey: key)!)

    case let data as [String: Any]:
      return try Self(transaction.object(withData: data))

    case let interface as Interface:
      return try Self(interface)

    default:
      throw CacheError.Reason.unrecognizedCacheData(cacheData, forType: Self.self) // TODO
    }
  }

  public final func set<T: Cacheable>(value: T?, forField field: Field<T>) throws {
    try object.set(value: value, forField: field)
  }

}
