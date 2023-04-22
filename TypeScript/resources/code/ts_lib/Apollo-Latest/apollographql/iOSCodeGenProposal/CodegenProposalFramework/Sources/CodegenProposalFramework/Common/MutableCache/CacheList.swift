@propertyWrapper
public class CacheList<T> {

  private var value: [T] = []

  public init() {}

  public var wrappedValue: [T] {
    get { value }
    set { value = newValue }
  }

  public func mutate(_ newValue: [Any]) {

  }

  public var projectedValue: CacheList { self }
}
