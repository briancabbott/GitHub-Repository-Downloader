//
//  ResponseDataProtocols.swift
//  CodegenProposalFramework
//
//  Created by Anthony Miller on 2/16/21.
//

// MARK: - Fragment

/// A protocol representing a fragment that a `ResponseObject` object may be converted to.
///
/// A `ResponseObject` that conforms to `HasFragments` can be converted to
/// any `Fragment` included in it's `Fragments` object via its `fragments` property.
///
/// - SeeAlso: `HasFragments`, `ToFragments`
public protocol Fragment: AnySelectionSet { }

// MARK: - HasFragments

/// A protocol that a `ResponseObject` that contains fragments should conform to.
public protocol HasFragments: SelectionSet {

  /// A type representing all of the fragments contained on the `ResponseObject`.
  associatedtype Fragments: ResponseObject
}

extension HasFragments {
  /// A `FieldData` object that contains accessors for all of the fragments
  /// the object can be converted to.
  var fragments: Fragments { Fragments(data: data) }
}

public protocol TypeCase: SelectionSet {
//  static var __parentType: ParentType { get }
//  static var selections: [Selection] { get }
//  static var parent: AnySelectionSet.Type { get }
//  static var directSelections: [Selection] { get }
}

//extension TypeCaseSelectionSet {
//  static var selections: [Selection] {
//    parent.selections + directSelections
//  }
//}
