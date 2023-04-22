// @flow

/*:: declare var invariant; */

// Error messages are colocated with the plugin.
/* eslint-disable @babel/development-internal/dry-error-messages */

import type State from "../../tokenizer/state";
import {
  tokenIsIdentifier,
  tokenIsTSDeclarationStart,
  tokenIsTSTypeOperator,
  tokenOperatorPrecedence,
  tokenIsKeywordOrIdentifier,
  tt,
  type TokenType,
  tokenIsTemplate,
} from "../../tokenizer/types";
import { types as tc } from "../../tokenizer/context";
import * as N from "../../types";
import type { Position } from "../../util/location";
import type Parser from "../../parser";
import {
  type BindingTypes,
  SCOPE_TS_MODULE,
  SCOPE_OTHER,
  BIND_TS_ENUM,
  BIND_TS_CONST_ENUM,
  BIND_TS_TYPE,
  BIND_TS_INTERFACE,
  BIND_TS_AMBIENT,
  BIND_TS_NAMESPACE,
  BIND_CLASS,
  BIND_LEXICAL,
} from "../../util/scopeflags";
import TypeScriptScopeHandler from "./scope";
import * as charCodes from "charcodes";
import type { ExpressionErrors } from "../../parser/util";
import { PARAM } from "../../util/production-parameter";
import {
  Errors,
  makeErrorTemplates,
  type ErrorTemplate,
  ErrorCodes,
} from "../../parser/error";
import { cloneIdentifier } from "../../parser/node";

type TsModifier =
  | "readonly"
  | "abstract"
  | "declare"
  | "static"
  | "override"
  | N.Accessibility;

function nonNull<T>(x: ?T): T {
  if (x == null) {
    // $FlowIgnore
    throw new Error(`Unexpected ${x} value.`);
  }
  return x;
}

function assert(x: boolean): void {
  if (!x) {
    throw new Error("Assert fail");
  }
}

type ParsingContext =
  | "EnumMembers"
  | "HeritageClauseElement"
  | "TupleElementTypes"
  | "TypeMembers"
  | "TypeParametersOrArguments";

/* eslint sort-keys: "error" */
const TSErrors = makeErrorTemplates(
  {
    AbstractMethodHasImplementation:
      "Method '%0' cannot have an implementation because it is marked abstract.",
    AbstractPropertyHasInitializer:
      "Property '%0' cannot have an initializer because it is marked abstract.",
    AccesorCannotDeclareThisParameter:
      "'get' and 'set' accessors cannot declare 'this' parameters.",
    AccesorCannotHaveTypeParameters: "An accessor cannot have type parameters.",
    ClassMethodHasDeclare: "Class methods cannot have the 'declare' modifier.",
    ClassMethodHasReadonly:
      "Class methods cannot have the 'readonly' modifier.",
    ConstructorHasTypeParameters:
      "Type parameters cannot appear on a constructor declaration.",
    DeclareAccessor: "'declare' is not allowed in %0ters.",
    DeclareClassFieldHasInitializer:
      "Initializers are not allowed in ambient contexts.",
    DeclareFunctionHasImplementation:
      "An implementation cannot be declared in ambient contexts.",
    DuplicateAccessibilityModifier: "Accessibility modifier already seen.",
    DuplicateModifier: "Duplicate modifier: '%0'.",
    EmptyHeritageClauseType: "'%0' list cannot be empty.",
    EmptyTypeArguments: "Type argument list cannot be empty.",
    EmptyTypeParameters: "Type parameter list cannot be empty.",
    ExpectedAmbientAfterExportDeclare:
      "'export declare' must be followed by an ambient declaration.",
    ImportAliasHasImportType: "An import alias can not use 'import type'.",
    IncompatibleModifiers: "'%0' modifier cannot be used with '%1' modifier.",
    IndexSignatureHasAbstract:
      "Index signatures cannot have the 'abstract' modifier.",
    IndexSignatureHasAccessibility:
      "Index signatures cannot have an accessibility modifier ('%0').",
    IndexSignatureHasDeclare:
      "Index signatures cannot have the 'declare' modifier.",
    IndexSignatureHasOverride:
      "'override' modifier cannot appear on an index signature.",
    IndexSignatureHasStatic:
      "Index signatures cannot have the 'static' modifier.",
    InvalidModifierOnTypeMember:
      "'%0' modifier cannot appear on a type member.",
    InvalidModifiersOrder: "'%0' modifier must precede '%1' modifier.",
    InvalidTupleMemberLabel:
      "Tuple members must be labeled with a simple identifier.",
    MissingInterfaceName:
      "'interface' declarations must be followed by an identifier.",
    MixedLabeledAndUnlabeledElements:
      "Tuple members must all have names or all not have names.",
    NonAbstractClassHasAbstractMethod:
      "Abstract methods can only appear within an abstract class.",
    NonClassMethodPropertyHasAbstractModifer:
      "'abstract' modifier can only appear on a class, method, or property declaration.",
    OptionalTypeBeforeRequired:
      "A required element cannot follow an optional element.",
    OverrideNotInSubClass:
      "This member cannot have an 'override' modifier because its containing class does not extend another class.",
    PatternIsOptional:
      "A binding pattern parameter cannot be optional in an implementation signature.",
    PrivateElementHasAbstract:
      "Private elements cannot have the 'abstract' modifier.",
    PrivateElementHasAccessibility:
      "Private elements cannot have an accessibility modifier ('%0').",
    ReadonlyForMethodSignature:
      "'readonly' modifier can only appear on a property declaration or index signature.",
    ReservedArrowTypeParam:
      "This syntax is reserved in files with the .mts or .cts extension. Add a trailing comma, as in `<T,>() => ...`.",
    ReservedTypeAssertion:
      "This syntax is reserved in files with the .mts or .cts extension. Use an `as` expression instead.",
    SetAccesorCannotHaveOptionalParameter:
      "A 'set' accessor cannot have an optional parameter.",
    SetAccesorCannotHaveRestParameter:
      "A 'set' accessor cannot have rest parameter.",
    SetAccesorCannotHaveReturnType:
      "A 'set' accessor cannot have a return type annotation.",
    StaticBlockCannotHaveModifier:
      "Static class blocks cannot have any modifier.",
    TypeAnnotationAfterAssign:
      "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`.",
    TypeImportCannotSpecifyDefaultAndNamed:
      "A type-only import can specify a default import or named bindings, but not both.",
    TypeModifierIsUsedInTypeExports:
      "The 'type' modifier cannot be used on a named export when 'export type' is used on its export statement.",
    TypeModifierIsUsedInTypeImports:
      "The 'type' modifier cannot be used on a named import when 'import type' is used on its import statement.",
    UnexpectedParameterModifier:
      "A parameter property is only allowed in a constructor implementation.",
    UnexpectedReadonly:
      "'readonly' type modifier is only permitted on array and tuple literal types.",
    UnexpectedTypeAnnotation: "Did not expect a type annotation here.",
    UnexpectedTypeCastInParameter:
      "Unexpected type cast in parameter position.",
    UnsupportedImportTypeArgument:
      "Argument in a type import must be a string literal.",
    UnsupportedParameterPropertyKind:
      "A parameter property may not be declared using a binding pattern.",
    UnsupportedSignatureParameterKind:
      "Name in a signature must be an Identifier, ObjectPattern or ArrayPattern, instead got %0.",
  },
  /* code */ ErrorCodes.SyntaxError,
  /* syntaxPlugin */ "typescript",
);
/* eslint-disable sort-keys */

// Doesn't handle "void" or "null" because those are keywords, not identifiers.
// It also doesn't handle "intrinsic", since usually it's not a keyword.
function keywordTypeFromName(
  value: string,
): N.TsKeywordTypeType | typeof undefined {
  switch (value) {
    case "any":
      return "TSAnyKeyword";
    case "boolean":
      return "TSBooleanKeyword";
    case "bigint":
      return "TSBigIntKeyword";
    case "never":
      return "TSNeverKeyword";
    case "number":
      return "TSNumberKeyword";
    case "object":
      return "TSObjectKeyword";
    case "string":
      return "TSStringKeyword";
    case "symbol":
      return "TSSymbolKeyword";
    case "undefined":
      return "TSUndefinedKeyword";
    case "unknown":
      return "TSUnknownKeyword";
    default:
      return undefined;
  }
}

function tsIsAccessModifier(modifier: string): boolean %checks {
  return (
    modifier === "private" || modifier === "public" || modifier === "protected"
  );
}

export default (superClass: Class<Parser>): Class<Parser> =>
  class extends superClass {
    getScopeHandler(): Class<TypeScriptScopeHandler> {
      return TypeScriptScopeHandler;
    }

    tsIsIdentifier(): boolean {
      // TODO: actually a bit more complex in TypeScript, but shouldn't matter.
      // See https://github.com/Microsoft/TypeScript/issues/15008
      return tokenIsIdentifier(this.state.type);
    }

    tsTokenCanFollowModifier() {
      return (
        (this.match(tt.bracketL) ||
          this.match(tt.braceL) ||
          this.match(tt.star) ||
          this.match(tt.ellipsis) ||
          this.match(tt.privateName) ||
          this.isLiteralPropertyName()) &&
        !this.hasPrecedingLineBreak()
      );
    }

    tsNextTokenCanFollowModifier() {
      // Note: TypeScript's implementation is much more complicated because
      // more things are considered modifiers there.
      // This implementation only handles modifiers not handled by @babel/parser itself. And "static".
      // TODO: Would be nice to avoid lookahead. Want a hasLineBreakUpNext() method...
      this.next();
      return this.tsTokenCanFollowModifier();
    }

    /** Parses a modifier matching one the given modifier names. */
    tsParseModifier<T: TsModifier>(
      allowedModifiers: T[],
      stopOnStartOfClassStaticBlock?: boolean,
    ): ?T {
      if (!tokenIsIdentifier(this.state.type)) {
        return undefined;
      }

      const modifier = this.state.value;
      if (allowedModifiers.indexOf(modifier) !== -1) {
        if (stopOnStartOfClassStaticBlock && this.tsIsStartOfStaticBlocks()) {
          return undefined;
        }
        if (this.tsTryParse(this.tsNextTokenCanFollowModifier.bind(this))) {
          return modifier;
        }
      }
      return undefined;
    }

    /** Parses a list of modifiers, in any order.
     *  If you need a specific order, you must call this function multiple times:
     *    this.tsParseModifiers(node, ["public"]);
     *    this.tsParseModifiers(node, ["abstract", "readonly"]);
     */
    tsParseModifiers(
      modified: {
        [key: TsModifier]: ?true,
        accessibility?: N.Accessibility,
      },
      allowedModifiers: TsModifier[],
      disallowedModifiers?: TsModifier[],
      errorTemplate?: ErrorTemplate,
      stopOnStartOfClassStaticBlock?: boolean,
    ): void {
      const enforceOrder = (pos, modifier, before, after) => {
        if (modifier === before && modified[after]) {
          this.raise(pos, TSErrors.InvalidModifiersOrder, before, after);
        }
      };
      const incompatible = (pos, modifier, mod1, mod2) => {
        if (
          (modified[mod1] && modifier === mod2) ||
          (modified[mod2] && modifier === mod1)
        ) {
          this.raise(pos, TSErrors.IncompatibleModifiers, mod1, mod2);
        }
      };

      for (;;) {
        const startPos = this.state.start;
        const modifier: ?TsModifier = this.tsParseModifier(
          allowedModifiers.concat(disallowedModifiers ?? []),
          stopOnStartOfClassStaticBlock,
        );

        if (!modifier) break;

        if (tsIsAccessModifier(modifier)) {
          if (modified.accessibility) {
            this.raise(startPos, TSErrors.DuplicateAccessibilityModifier);
          } else {
            enforceOrder(startPos, modifier, modifier, "override");
            enforceOrder(startPos, modifier, modifier, "static");
            enforceOrder(startPos, modifier, modifier, "readonly");

            modified.accessibility = modifier;
          }
        } else {
          if (Object.hasOwnProperty.call(modified, modifier)) {
            this.raise(startPos, TSErrors.DuplicateModifier, modifier);
          } else {
            enforceOrder(startPos, modifier, "static", "readonly");
            enforceOrder(startPos, modifier, "static", "override");
            enforceOrder(startPos, modifier, "override", "readonly");
            enforceOrder(startPos, modifier, "abstract", "override");

            incompatible(startPos, modifier, "declare", "override");
            incompatible(startPos, modifier, "static", "abstract");
          }
          modified[modifier] = true;
        }

        if (disallowedModifiers?.includes(modifier)) {
          this.raise(
            startPos,
            // $FlowIgnore
            errorTemplate,
            modifier,
          );
        }
      }
    }

    tsIsListTerminator(kind: ParsingContext): boolean {
      switch (kind) {
        case "EnumMembers":
        case "TypeMembers":
          return this.match(tt.braceR);
        case "HeritageClauseElement":
          return this.match(tt.braceL);
        case "TupleElementTypes":
          return this.match(tt.bracketR);
        case "TypeParametersOrArguments":
          return this.match(tt.gt);
      }

      throw new Error("Unreachable");
    }

    tsParseList<T: N.Node>(kind: ParsingContext, parseElement: () => T): T[] {
      const result: T[] = [];
      while (!this.tsIsListTerminator(kind)) {
        // Skipping "parseListElement" from the TS source since that's just for error handling.
        result.push(parseElement());
      }
      return result;
    }

    tsParseDelimitedList<T: N.Node>(
      kind: ParsingContext,
      parseElement: () => T,
      refTrailingCommaPos?: { value: number },
    ): T[] {
      return nonNull(
        this.tsParseDelimitedListWorker(
          kind,
          parseElement,
          /* expectSuccess */ true,
          refTrailingCommaPos,
        ),
      );
    }

    /**
     * If !expectSuccess, returns undefined instead of failing to parse.
     * If expectSuccess, parseElement should always return a defined value.
     */
    tsParseDelimitedListWorker<T: N.Node>(
      kind: ParsingContext,
      parseElement: () => ?T,
      expectSuccess: boolean,
      refTrailingCommaPos?: { value: number },
    ): ?(T[]) {
      const result = [];
      let trailingCommaPos = -1;

      for (;;) {
        if (this.tsIsListTerminator(kind)) {
          break;
        }
        trailingCommaPos = -1;

        const element = parseElement();
        if (element == null) {
          return undefined;
        }
        result.push(element);

        if (this.eat(tt.comma)) {
          trailingCommaPos = this.state.lastTokStart;
          continue;
        }

        if (this.tsIsListTerminator(kind)) {
          break;
        }

        if (expectSuccess) {
          // This will fail with an error about a missing comma
          this.expect(tt.comma);
        }
        return undefined;
      }

      if (refTrailingCommaPos) {
        refTrailingCommaPos.value = trailingCommaPos;
      }

      return result;
    }

    tsParseBracketedList<T: N.Node>(
      kind: ParsingContext,
      parseElement: () => T,
      bracket: boolean,
      skipFirstToken: boolean,
      refTrailingCommaPos?: { value: number },
    ): T[] {
      if (!skipFirstToken) {
        if (bracket) {
          this.expect(tt.bracketL);
        } else {
          this.expect(tt.lt);
        }
      }

      const result = this.tsParseDelimitedList(
        kind,
        parseElement,
        refTrailingCommaPos,
      );

      if (bracket) {
        this.expect(tt.bracketR);
      } else {
        this.expect(tt.gt);
      }

      return result;
    }

    tsParseImportType(): N.TsImportType {
      const node: N.TsImportType = this.startNode();
      this.expect(tt._import);
      this.expect(tt.parenL);
      if (!this.match(tt.string)) {
        this.raise(this.state.start, TSErrors.UnsupportedImportTypeArgument);
      }

      // For compatibility to estree we cannot call parseLiteral directly here
      node.argument = this.parseExprAtom();
      this.expect(tt.parenR);

      if (this.eat(tt.dot)) {
        node.qualifier = this.tsParseEntityName(/* allowReservedWords */ true);
      }
      if (this.match(tt.lt)) {
        node.typeParameters = this.tsParseTypeArguments();
      }
      return this.finishNode(node, "TSImportType");
    }

    tsParseEntityName(allowReservedWords: boolean): N.TsEntityName {
      let entity: N.TsEntityName = this.parseIdentifier();
      while (this.eat(tt.dot)) {
        const node: N.TsQualifiedName = this.startNodeAtNode(entity);
        node.left = entity;
        node.right = this.parseIdentifier(allowReservedWords);
        entity = this.finishNode(node, "TSQualifiedName");
      }
      return entity;
    }

    tsParseTypeReference(): N.TsTypeReference {
      const node: N.TsTypeReference = this.startNode();
      node.typeName = this.tsParseEntityName(/* allowReservedWords */ false);
      if (!this.hasPrecedingLineBreak() && this.match(tt.lt)) {
        node.typeParameters = this.tsParseTypeArguments();
      }
      return this.finishNode(node, "TSTypeReference");
    }

    tsParseThisTypePredicate(lhs: N.TsThisType): N.TsTypePredicate {
      this.next();
      const node: N.TsTypePredicate = this.startNodeAtNode(lhs);
      node.parameterName = lhs;
      node.typeAnnotation = this.tsParseTypeAnnotation(/* eatColon */ false);
      node.asserts = false;
      return this.finishNode(node, "TSTypePredicate");
    }

    tsParseThisTypeNode(): N.TsThisType {
      const node: N.TsThisType = this.startNode();
      this.next();
      return this.finishNode(node, "TSThisType");
    }

    tsParseTypeQuery(): N.TsTypeQuery {
      const node: N.TsTypeQuery = this.startNode();
      this.expect(tt._typeof);
      if (this.match(tt._import)) {
        node.exprName = this.tsParseImportType();
      } else {
        node.exprName = this.tsParseEntityName(/* allowReservedWords */ true);
      }
      return this.finishNode(node, "TSTypeQuery");
    }

    tsParseTypeParameter(): N.TsTypeParameter {
      const node: N.TsTypeParameter = this.startNode();
      node.name = this.tsParseTypeParameterName();
      node.constraint = this.tsEatThenParseType(tt._extends);
      node.default = this.tsEatThenParseType(tt.eq);
      return this.finishNode(node, "TSTypeParameter");
    }

    tsTryParseTypeParameters(): ?N.TsTypeParameterDeclaration {
      if (this.match(tt.lt)) {
        return this.tsParseTypeParameters();
      }
    }

    tsParseTypeParameters() {
      const node: N.TsTypeParameterDeclaration = this.startNode();

      if (this.match(tt.lt) || this.match(tt.jsxTagStart)) {
        this.next();
      } else {
        this.unexpected();
      }

      const refTrailingCommaPos = { value: -1 };

      node.params = this.tsParseBracketedList(
        "TypeParametersOrArguments",
        this.tsParseTypeParameter.bind(this),
        /* bracket */ false,
        /* skipFirstToken */ true,
        refTrailingCommaPos,
      );
      if (node.params.length === 0) {
        this.raise(node.start, TSErrors.EmptyTypeParameters);
      }
      if (refTrailingCommaPos.value !== -1) {
        this.addExtra(node, "trailingComma", refTrailingCommaPos.value);
      }
      return this.finishNode(node, "TSTypeParameterDeclaration");
    }

    tsTryNextParseConstantContext(): ?N.TsTypeReference {
      if (this.lookahead().type === tt._const) {
        this.next();
        return this.tsParseTypeReference();
      }
      return null;
    }

    // Note: In TypeScript implementation we must provide `yieldContext` and `awaitContext`,
    // but here it's always false, because this is only used for types.
    tsFillSignature(
      returnToken: TokenType,
      signature: N.TsSignatureDeclaration,
    ): void {
      // Arrow fns *must* have return token (`=>`). Normal functions can omit it.
      const returnTokenRequired = returnToken === tt.arrow;

      // https://github.com/babel/babel/issues/9231
      const paramsKey = process.env.BABEL_8_BREAKING ? "params" : "parameters";
      const returnTypeKey = process.env.BABEL_8_BREAKING
        ? "returnType"
        : "typeAnnotation";

      signature.typeParameters = this.tsTryParseTypeParameters();
      this.expect(tt.parenL);
      signature[paramsKey] = this.tsParseBindingListForSignature();
      if (returnTokenRequired) {
        signature[returnTypeKey] =
          this.tsParseTypeOrTypePredicateAnnotation(returnToken);
      } else if (this.match(returnToken)) {
        signature[returnTypeKey] =
          this.tsParseTypeOrTypePredicateAnnotation(returnToken);
      }
    }

    tsParseBindingListForSignature(): $ReadOnlyArray<
      N.Identifier | N.RestElement | N.ObjectPattern | N.ArrayPattern,
    > {
      return this.parseBindingList(tt.parenR, charCodes.rightParenthesis).map(
        pattern => {
          if (
            pattern.type !== "Identifier" &&
            pattern.type !== "RestElement" &&
            pattern.type !== "ObjectPattern" &&
            pattern.type !== "ArrayPattern"
          ) {
            this.raise(
              pattern.start,
              TSErrors.UnsupportedSignatureParameterKind,
              pattern.type,
            );
          }
          return (pattern: any);
        },
      );
    }

    tsParseTypeMemberSemicolon(): void {
      if (!this.eat(tt.comma) && !this.isLineTerminator()) {
        this.expect(tt.semi);
      }
    }

    tsParseSignatureMember(
      kind: "TSCallSignatureDeclaration" | "TSConstructSignatureDeclaration",
      node: N.TsCallSignatureDeclaration | N.TsConstructSignatureDeclaration,
    ): N.TsCallSignatureDeclaration | N.TsConstructSignatureDeclaration {
      this.tsFillSignature(tt.colon, node);
      this.tsParseTypeMemberSemicolon();
      return this.finishNode(node, kind);
    }

    tsIsUnambiguouslyIndexSignature() {
      this.next(); // Skip '{'
      if (tokenIsIdentifier(this.state.type)) {
        this.next();
        return this.match(tt.colon);
      }
      return false;
    }

    tsTryParseIndexSignature(node: N.Node): ?N.TsIndexSignature {
      if (
        !(
          this.match(tt.bracketL) &&
          this.tsLookAhead(this.tsIsUnambiguouslyIndexSignature.bind(this))
        )
      ) {
        return undefined;
      }

      this.expect(tt.bracketL);
      const id = this.parseIdentifier();
      id.typeAnnotation = this.tsParseTypeAnnotation();
      this.resetEndLocation(id); // set end position to end of type

      this.expect(tt.bracketR);
      node.parameters = [id];

      const type = this.tsTryParseTypeAnnotation();
      if (type) node.typeAnnotation = type;
      this.tsParseTypeMemberSemicolon();
      return this.finishNode(node, "TSIndexSignature");
    }

    tsParsePropertyOrMethodSignature(
      node: N.TsPropertySignature | N.TsMethodSignature,
      readonly: boolean,
    ): N.TsPropertySignature | N.TsMethodSignature {
      if (this.eat(tt.question)) node.optional = true;
      const nodeAny: any = node;

      if (this.match(tt.parenL) || this.match(tt.lt)) {
        if (readonly) {
          this.raise(node.start, TSErrors.ReadonlyForMethodSignature);
        }
        const method: N.TsMethodSignature = nodeAny;
        if (method.kind && this.match(tt.lt)) {
          this.raise(this.state.pos, TSErrors.AccesorCannotHaveTypeParameters);
        }
        this.tsFillSignature(tt.colon, method);
        this.tsParseTypeMemberSemicolon();
        const paramsKey = process.env.BABEL_8_BREAKING
          ? "params"
          : "parameters";
        const returnTypeKey = process.env.BABEL_8_BREAKING
          ? "returnType"
          : "typeAnnotation";
        if (method.kind === "get") {
          if (method[paramsKey].length > 0) {
            this.raise(this.state.pos, Errors.BadGetterArity);
            if (this.isThisParam(method[paramsKey][0])) {
              this.raise(
                this.state.pos,
                TSErrors.AccesorCannotDeclareThisParameter,
              );
            }
          }
        } else if (method.kind === "set") {
          if (method[paramsKey].length !== 1) {
            this.raise(this.state.pos, Errors.BadSetterArity);
          } else {
            const firstParameter = method[paramsKey][0];
            if (this.isThisParam(firstParameter)) {
              this.raise(
                this.state.pos,
                TSErrors.AccesorCannotDeclareThisParameter,
              );
            }
            if (
              firstParameter.type === "Identifier" &&
              firstParameter.optional
            ) {
              this.raise(
                this.state.pos,
                TSErrors.SetAccesorCannotHaveOptionalParameter,
              );
            }
            if (firstParameter.type === "RestElement") {
              this.raise(
                this.state.pos,
                TSErrors.SetAccesorCannotHaveRestParameter,
              );
            }
          }
          if (method[returnTypeKey]) {
            this.raise(
              method[returnTypeKey].start,
              TSErrors.SetAccesorCannotHaveReturnType,
            );
          }
        } else {
          method.kind = "method";
        }
        return this.finishNode(method, "TSMethodSignature");
      } else {
        const property: N.TsPropertySignature = nodeAny;
        if (readonly) property.readonly = true;
        const type = this.tsTryParseTypeAnnotation();
        if (type) property.typeAnnotation = type;
        this.tsParseTypeMemberSemicolon();
        return this.finishNode(property, "TSPropertySignature");
      }
    }

    tsParseTypeMember(): N.TsTypeElement {
      const node: any = this.startNode();

      if (this.match(tt.parenL) || this.match(tt.lt)) {
        return this.tsParseSignatureMember("TSCallSignatureDeclaration", node);
      }

      if (this.match(tt._new)) {
        const id: N.Identifier = this.startNode();
        this.next();
        if (this.match(tt.parenL) || this.match(tt.lt)) {
          return this.tsParseSignatureMember(
            "TSConstructSignatureDeclaration",
            node,
          );
        } else {
          node.key = this.createIdentifier(id, "new");
          return this.tsParsePropertyOrMethodSignature(node, false);
        }
      }

      this.tsParseModifiers(
        node,
        ["readonly"],
        [
          "declare",
          "abstract",
          "private",
          "protected",
          "public",
          "static",
          "override",
        ],
        TSErrors.InvalidModifierOnTypeMember,
      );

      const idx = this.tsTryParseIndexSignature(node);
      if (idx) {
        return idx;
      }

      this.parsePropertyName(node);
      if (
        !node.computed &&
        node.key.type === "Identifier" &&
        (node.key.name === "get" || node.key.name === "set") &&
        this.tsTokenCanFollowModifier()
      ) {
        node.kind = node.key.name;
        this.parsePropertyName(node);
      }
      return this.tsParsePropertyOrMethodSignature(node, !!node.readonly);
    }

    tsParseTypeLiteral(): N.TsTypeLiteral {
      const node: N.TsTypeLiteral = this.startNode();
      node.members = this.tsParseObjectTypeMembers();
      return this.finishNode(node, "TSTypeLiteral");
    }

    tsParseObjectTypeMembers(): $ReadOnlyArray<N.TsTypeElement> {
      this.expect(tt.braceL);
      const members = this.tsParseList(
        "TypeMembers",
        this.tsParseTypeMember.bind(this),
      );
      this.expect(tt.braceR);
      return members;
    }

    tsIsStartOfMappedType(): boolean {
      this.next();
      if (this.eat(tt.plusMin)) {
        return this.isContextual(tt._readonly);
      }
      if (this.isContextual(tt._readonly)) {
        this.next();
      }
      if (!this.match(tt.bracketL)) {
        return false;
      }
      this.next();
      if (!this.tsIsIdentifier()) {
        return false;
      }
      this.next();
      return this.match(tt._in);
    }

    tsParseMappedTypeParameter(): N.TsTypeParameter {
      const node: N.TsTypeParameter = this.startNode();
      node.name = this.tsParseTypeParameterName();
      node.constraint = this.tsExpectThenParseType(tt._in);
      return this.finishNode(node, "TSTypeParameter");
    }

    tsParseMappedType(): N.TsMappedType {
      const node: N.TsMappedType = this.startNode();

      this.expect(tt.braceL);

      if (this.match(tt.plusMin)) {
        node.readonly = this.state.value;
        this.next();
        this.expectContextual(tt._readonly);
      } else if (this.eatContextual(tt._readonly)) {
        node.readonly = true;
      }

      this.expect(tt.bracketL);
      node.typeParameter = this.tsParseMappedTypeParameter();
      node.nameType = this.eatContextual(tt._as) ? this.tsParseType() : null;

      this.expect(tt.bracketR);

      if (this.match(tt.plusMin)) {
        node.optional = this.state.value;
        this.next();
        this.expect(tt.question);
      } else if (this.eat(tt.question)) {
        node.optional = true;
      }

      node.typeAnnotation = this.tsTryParseType();
      this.semicolon();
      this.expect(tt.braceR);

      return this.finishNode(node, "TSMappedType");
    }

    tsParseTupleType(): N.TsTupleType {
      const node: N.TsTupleType = this.startNode();
      node.elementTypes = this.tsParseBracketedList(
        "TupleElementTypes",
        this.tsParseTupleElementType.bind(this),
        /* bracket */ true,
        /* skipFirstToken */ false,
      );

      // Validate the elementTypes to ensure that no mandatory elements
      // follow optional elements
      let seenOptionalElement = false;
      let labeledElements = null;
      node.elementTypes.forEach(elementNode => {
        let { type } = elementNode;

        if (
          seenOptionalElement &&
          type !== "TSRestType" &&
          type !== "TSOptionalType" &&
          !(type === "TSNamedTupleMember" && elementNode.optional)
        ) {
          this.raise(elementNode.start, TSErrors.OptionalTypeBeforeRequired);
        }

        // Flow doesn't support ||=
        seenOptionalElement =
          seenOptionalElement ||
          (type === "TSNamedTupleMember" && elementNode.optional) ||
          type === "TSOptionalType";

        // When checking labels, check the argument of the spread operator
        if (type === "TSRestType") {
          elementNode = elementNode.typeAnnotation;
          type = elementNode.type;
        }

        const isLabeled = type === "TSNamedTupleMember";
        // Flow doesn't support ??=
        labeledElements = labeledElements ?? isLabeled;
        if (labeledElements !== isLabeled) {
          this.raise(
            elementNode.start,
            TSErrors.MixedLabeledAndUnlabeledElements,
          );
        }
      });

      return this.finishNode(node, "TSTupleType");
    }

    tsParseTupleElementType(): N.TsType | N.TsNamedTupleMember {
      // parses `...TsType[]`

      const { start: startPos, startLoc } = this.state;

      const rest = this.eat(tt.ellipsis);
      let type = this.tsParseType();
      const optional = this.eat(tt.question);
      const labeled = this.eat(tt.colon);

      if (labeled) {
        const labeledNode: N.TsNamedTupleMember = this.startNodeAtNode(type);
        labeledNode.optional = optional;

        if (
          type.type === "TSTypeReference" &&
          !type.typeParameters &&
          type.typeName.type === "Identifier"
        ) {
          labeledNode.label = (type.typeName: N.Identifier);
        } else {
          this.raise(type.start, TSErrors.InvalidTupleMemberLabel);
          // This produces an invalid AST, but at least we don't drop
          // nodes representing the invalid source.
          // $FlowIgnore
          labeledNode.label = type;
        }

        labeledNode.elementType = this.tsParseType();
        type = this.finishNode(labeledNode, "TSNamedTupleMember");
      } else if (optional) {
        const optionalTypeNode: N.TsOptionalType = this.startNodeAtNode(type);
        optionalTypeNode.typeAnnotation = type;
        type = this.finishNode(optionalTypeNode, "TSOptionalType");
      }

      if (rest) {
        const restNode: N.TsRestType = this.startNodeAt(startPos, startLoc);
        restNode.typeAnnotation = type;
        type = this.finishNode(restNode, "TSRestType");
      }

      return type;
    }

    tsParseParenthesizedType(): N.TsParenthesizedType {
      const node = this.startNode();
      this.expect(tt.parenL);
      node.typeAnnotation = this.tsParseType();
      this.expect(tt.parenR);
      return this.finishNode(node, "TSParenthesizedType");
    }

    tsParseFunctionOrConstructorType(
      type: "TSFunctionType" | "TSConstructorType",
      abstract?: boolean,
    ): N.TsFunctionOrConstructorType {
      const node: N.TsFunctionOrConstructorType = this.startNode();
      if (type === "TSConstructorType") {
        // $FlowIgnore
        node.abstract = !!abstract;
        if (abstract) this.next();
        this.next(); // eat `new`
      }
      this.tsFillSignature(tt.arrow, node);
      return this.finishNode(node, type);
    }

    tsParseLiteralTypeNode(): N.TsLiteralType {
      const node: N.TsLiteralType = this.startNode();
      node.literal = (() => {
        switch (this.state.type) {
          case tt.num:
          case tt.bigint:
          case tt.string:
          case tt._true:
          case tt._false:
            // For compatibility to estree we cannot call parseLiteral directly here
            return this.parseExprAtom();
          default:
            throw this.unexpected();
        }
      })();
      return this.finishNode(node, "TSLiteralType");
    }

    tsParseTemplateLiteralType(): N.TsType {
      const node: N.TsLiteralType = this.startNode();
      node.literal = this.parseTemplate(false);
      return this.finishNode(node, "TSLiteralType");
    }

    parseTemplateSubstitution(): N.TsType {
      if (this.state.inType) return this.tsParseType();
      return super.parseTemplateSubstitution();
    }

    tsParseThisTypeOrThisTypePredicate(): N.TsThisType | N.TsTypePredicate {
      const thisKeyword = this.tsParseThisTypeNode();
      if (this.isContextual(tt._is) && !this.hasPrecedingLineBreak()) {
        return this.tsParseThisTypePredicate(thisKeyword);
      } else {
        return thisKeyword;
      }
    }

    tsParseNonArrayType(): N.TsType {
      switch (this.state.type) {
        case tt.string:
        case tt.num:
        case tt.bigint:
        case tt._true:
        case tt._false:
          return this.tsParseLiteralTypeNode();
        case tt.plusMin:
          if (this.state.value === "-") {
            const node: N.TsLiteralType = this.startNode();
            const nextToken = this.lookahead();
            if (nextToken.type !== tt.num && nextToken.type !== tt.bigint) {
              throw this.unexpected();
            }
            node.literal = this.parseMaybeUnary();
            return this.finishNode(node, "TSLiteralType");
          }
          break;
        case tt._this:
          return this.tsParseThisTypeOrThisTypePredicate();
        case tt._typeof:
          return this.tsParseTypeQuery();
        case tt._import:
          return this.tsParseImportType();
        case tt.braceL:
          return this.tsLookAhead(this.tsIsStartOfMappedType.bind(this))
            ? this.tsParseMappedType()
            : this.tsParseTypeLiteral();
        case tt.bracketL:
          return this.tsParseTupleType();
        case tt.parenL:
          if (process.env.BABEL_8_BREAKING) {
            if (!this.options.createParenthesizedExpressions) {
              const startPos = this.state.start;
              this.next();
              const type = this.tsParseType();
              this.expect(tt.parenR);
              this.addExtra(type, "parenthesized", true);
              this.addExtra(type, "parenStart", startPos);
              return type;
            }
          }

          return this.tsParseParenthesizedType();
        case tt.templateNonTail:
        case tt.templateTail:
          return this.tsParseTemplateLiteralType();
        default: {
          const { type } = this.state;
          if (
            tokenIsIdentifier(type) ||
            type === tt._void ||
            type === tt._null
          ) {
            const nodeType =
              type === tt._void
                ? "TSVoidKeyword"
                : type === tt._null
                ? "TSNullKeyword"
                : keywordTypeFromName(this.state.value);
            if (
              nodeType !== undefined &&
              this.lookaheadCharCode() !== charCodes.dot
            ) {
              const node: N.TsKeywordType = this.startNode();
              this.next();
              return this.finishNode(node, nodeType);
            }
            return this.tsParseTypeReference();
          }
        }
      }

      throw this.unexpected();
    }

    tsParseArrayTypeOrHigher(): N.TsType {
      let type = this.tsParseNonArrayType();
      while (!this.hasPrecedingLineBreak() && this.eat(tt.bracketL)) {
        if (this.match(tt.bracketR)) {
          const node: N.TsArrayType = this.startNodeAtNode(type);
          node.elementType = type;
          this.expect(tt.bracketR);
          type = this.finishNode(node, "TSArrayType");
        } else {
          const node: N.TsIndexedAccessType = this.startNodeAtNode(type);
          node.objectType = type;
          node.indexType = this.tsParseType();
          this.expect(tt.bracketR);
          type = this.finishNode(node, "TSIndexedAccessType");
        }
      }
      return type;
    }

    tsParseTypeOperator(): N.TsTypeOperator {
      const node: N.TsTypeOperator = this.startNode();
      const operator = this.state.value;
      this.next(); // eat operator
      node.operator = operator;
      node.typeAnnotation = this.tsParseTypeOperatorOrHigher();

      if (operator === "readonly") {
        this.tsCheckTypeAnnotationForReadOnly(node);
      }

      return this.finishNode(node, "TSTypeOperator");
    }

    tsCheckTypeAnnotationForReadOnly(node: N.Node) {
      switch (node.typeAnnotation.type) {
        case "TSTupleType":
        case "TSArrayType":
          return;
        default:
          this.raise(node.start, TSErrors.UnexpectedReadonly);
      }
    }

    tsParseInferType(): N.TsInferType {
      const node = this.startNode();
      this.expectContextual(tt._infer);
      const typeParameter = this.startNode();
      typeParameter.name = this.tsParseTypeParameterName();
      node.typeParameter = this.finishNode(typeParameter, "TSTypeParameter");
      return this.finishNode(node, "TSInferType");
    }

    tsParseTypeOperatorOrHigher(): N.TsType {
      const isTypeOperator =
        tokenIsTSTypeOperator(this.state.type) && !this.state.containsEsc;
      return isTypeOperator
        ? this.tsParseTypeOperator()
        : this.isContextual(tt._infer)
        ? this.tsParseInferType()
        : this.tsParseArrayTypeOrHigher();
    }

    tsParseUnionOrIntersectionType(
      kind: "TSUnionType" | "TSIntersectionType",
      parseConstituentType: () => N.TsType,
      operator: TokenType,
    ): N.TsType {
      const node: N.TsUnionType | N.TsIntersectionType = this.startNode();
      const hasLeadingOperator = this.eat(operator);
      const types = [];
      do {
        types.push(parseConstituentType());
      } while (this.eat(operator));
      if (types.length === 1 && !hasLeadingOperator) {
        return types[0];
      }
      node.types = types;
      return this.finishNode(node, kind);
    }

    tsParseIntersectionTypeOrHigher(): N.TsType {
      return this.tsParseUnionOrIntersectionType(
        "TSIntersectionType",
        this.tsParseTypeOperatorOrHigher.bind(this),
        tt.bitwiseAND,
      );
    }

    tsParseUnionTypeOrHigher() {
      return this.tsParseUnionOrIntersectionType(
        "TSUnionType",
        this.tsParseIntersectionTypeOrHigher.bind(this),
        tt.bitwiseOR,
      );
    }

    tsIsStartOfFunctionType() {
      if (this.match(tt.lt)) {
        return true;
      }
      return (
        this.match(tt.parenL) &&
        this.tsLookAhead(this.tsIsUnambiguouslyStartOfFunctionType.bind(this))
      );
    }

    tsSkipParameterStart(): boolean {
      if (tokenIsIdentifier(this.state.type) || this.match(tt._this)) {
        this.next();
        return true;
      }

      if (this.match(tt.braceL)) {
        let braceStackCounter = 1;
        this.next();

        while (braceStackCounter > 0) {
          if (this.match(tt.braceL)) {
            ++braceStackCounter;
          } else if (this.match(tt.braceR)) {
            --braceStackCounter;
          }
          this.next();
        }
        return true;
      }

      if (this.match(tt.bracketL)) {
        let braceStackCounter = 1;
        this.next();

        while (braceStackCounter > 0) {
          if (this.match(tt.bracketL)) {
            ++braceStackCounter;
          } else if (this.match(tt.bracketR)) {
            --braceStackCounter;
          }
          this.next();
        }
        return true;
      }

      return false;
    }

    tsIsUnambiguouslyStartOfFunctionType(): boolean {
      this.next();
      if (this.match(tt.parenR) || this.match(tt.ellipsis)) {
        // ( )
        // ( ...
        return true;
      }
      if (this.tsSkipParameterStart()) {
        if (
          this.match(tt.colon) ||
          this.match(tt.comma) ||
          this.match(tt.question) ||
          this.match(tt.eq)
        ) {
          // ( xxx :
          // ( xxx ,
          // ( xxx ?
          // ( xxx =
          return true;
        }
        if (this.match(tt.parenR)) {
          this.next();
          if (this.match(tt.arrow)) {
            // ( xxx ) =>
            return true;
          }
        }
      }
      return false;
    }

    tsParseTypeOrTypePredicateAnnotation(
      returnToken: TokenType,
    ): N.TsTypeAnnotation {
      return this.tsInType(() => {
        const t: N.TsTypeAnnotation = this.startNode();
        this.expect(returnToken);

        const node = this.startNode<N.TsTypePredicate>();

        const asserts = !!this.tsTryParse(
          this.tsParseTypePredicateAsserts.bind(this),
        );

        if (asserts && this.match(tt._this)) {
          // When asserts is false, thisKeyword is handled by tsParseNonArrayType
          // : asserts this is type
          let thisTypePredicate = this.tsParseThisTypeOrThisTypePredicate();
          // if it turns out to be a `TSThisType`, wrap it with `TSTypePredicate`
          // : asserts this
          if (thisTypePredicate.type === "TSThisType") {
            node.parameterName = (thisTypePredicate: N.TsThisType);
            node.asserts = true;
            (node: N.TsTypePredicate).typeAnnotation = null;
            thisTypePredicate = this.finishNode(node, "TSTypePredicate");
          } else {
            this.resetStartLocationFromNode(thisTypePredicate, node);
            (thisTypePredicate: N.TsTypePredicate).asserts = true;
          }
          t.typeAnnotation = thisTypePredicate;
          return this.finishNode(t, "TSTypeAnnotation");
        }

        const typePredicateVariable =
          this.tsIsIdentifier() &&
          this.tsTryParse(this.tsParseTypePredicatePrefix.bind(this));

        if (!typePredicateVariable) {
          if (!asserts) {
            // : type
            return this.tsParseTypeAnnotation(/* eatColon */ false, t);
          }

          // : asserts foo
          node.parameterName = this.parseIdentifier();
          node.asserts = asserts;
          (node: N.TsTypePredicate).typeAnnotation = null;
          t.typeAnnotation = this.finishNode(node, "TSTypePredicate");
          return this.finishNode(t, "TSTypeAnnotation");
        }

        // : asserts foo is type
        const type = this.tsParseTypeAnnotation(/* eatColon */ false);
        node.parameterName = typePredicateVariable;
        node.typeAnnotation = type;
        node.asserts = asserts;
        t.typeAnnotation = this.finishNode(node, "TSTypePredicate");
        return this.finishNode(t, "TSTypeAnnotation");
      });
    }

    tsTryParseTypeOrTypePredicateAnnotation(): ?N.TsTypeAnnotation {
      return this.match(tt.colon)
        ? this.tsParseTypeOrTypePredicateAnnotation(tt.colon)
        : undefined;
    }

    tsTryParseTypeAnnotation(): ?N.TsTypeAnnotation {
      return this.match(tt.colon) ? this.tsParseTypeAnnotation() : undefined;
    }

    tsTryParseType(): ?N.TsType {
      return this.tsEatThenParseType(tt.colon);
    }

    tsParseTypePredicatePrefix(): ?N.Identifier {
      const id = this.parseIdentifier();
      if (this.isContextual(tt._is) && !this.hasPrecedingLineBreak()) {
        this.next();
        return id;
      }
    }

    tsParseTypePredicateAsserts(): boolean {
      if (this.state.type !== tt._asserts) {
        return false;
      }
      const containsEsc = this.state.containsEsc;
      this.next();
      if (!tokenIsIdentifier(this.state.type) && !this.match(tt._this)) {
        return false;
      }

      if (containsEsc) {
        this.raise(
          this.state.lastTokStart,
          Errors.InvalidEscapedReservedWord,
          "asserts",
        );
      }

      return true;
    }

    tsParseTypeAnnotation(
      eatColon = true,
      t: N.TsTypeAnnotation = this.startNode(),
    ): N.TsTypeAnnotation {
      this.tsInType(() => {
        if (eatColon) this.expect(tt.colon);
        t.typeAnnotation = this.tsParseType();
      });
      return this.finishNode(t, "TSTypeAnnotation");
    }

    /** Be sure to be in a type context before calling this, using `tsInType`. */
    tsParseType(): N.TsType {
      // Need to set `state.inType` so that we don't parse JSX in a type context.
      assert(this.state.inType);
      const type = this.tsParseNonConditionalType();
      if (this.hasPrecedingLineBreak() || !this.eat(tt._extends)) {
        return type;
      }
      const node: N.TsConditionalType = this.startNodeAtNode(type);
      node.checkType = type;
      node.extendsType = this.tsParseNonConditionalType();
      this.expect(tt.question);
      node.trueType = this.tsParseType();
      this.expect(tt.colon);
      node.falseType = this.tsParseType();
      return this.finishNode(node, "TSConditionalType");
    }

    isAbstractConstructorSignature(): boolean {
      return (
        this.isContextual(tt._abstract) && this.lookahead().type === tt._new
      );
    }

    tsParseNonConditionalType(): N.TsType {
      if (this.tsIsStartOfFunctionType()) {
        return this.tsParseFunctionOrConstructorType("TSFunctionType");
      }
      if (this.match(tt._new)) {
        // As in `new () => Date`
        return this.tsParseFunctionOrConstructorType("TSConstructorType");
      } else if (this.isAbstractConstructorSignature()) {
        // As in `abstract new () => Date`
        return this.tsParseFunctionOrConstructorType(
          "TSConstructorType",
          /* abstract */ true,
        );
      }
      return this.tsParseUnionTypeOrHigher();
    }

    tsParseTypeAssertion(): N.TsTypeAssertion {
      if (this.getPluginOption("typescript", "disallowAmbiguousJSXLike")) {
        this.raise(this.state.start, TSErrors.ReservedTypeAssertion);
      }

      const node: N.TsTypeAssertion = this.startNode();
      const _const = this.tsTryNextParseConstantContext();
      node.typeAnnotation = _const || this.tsNextThenParseType();
      this.expect(tt.gt);
      node.expression = this.parseMaybeUnary();
      return this.finishNode(node, "TSTypeAssertion");
    }

    tsParseHeritageClause(
      descriptor: string,
    ): $ReadOnlyArray<N.TsExpressionWithTypeArguments> {
      const originalStart = this.state.start;

      const delimitedList = this.tsParseDelimitedList(
        "HeritageClauseElement",
        this.tsParseExpressionWithTypeArguments.bind(this),
      );

      if (!delimitedList.length) {
        this.raise(originalStart, TSErrors.EmptyHeritageClauseType, descriptor);
      }

      return delimitedList;
    }

    tsParseExpressionWithTypeArguments(): N.TsExpressionWithTypeArguments {
      const node: N.TsExpressionWithTypeArguments = this.startNode();
      // Note: TS uses parseLeftHandSideExpressionOrHigher,
      // then has grammar errors later if it's not an EntityName.
      node.expression = this.tsParseEntityName(/* allowReservedWords */ false);
      if (this.match(tt.lt)) {
        node.typeParameters = this.tsParseTypeArguments();
      }

      return this.finishNode(node, "TSExpressionWithTypeArguments");
    }

    tsParseInterfaceDeclaration(
      node: N.TsInterfaceDeclaration,
    ): N.TsInterfaceDeclaration {
      if (tokenIsIdentifier(this.state.type)) {
        node.id = this.parseIdentifier();
        this.checkLVal(
          node.id,
          "typescript interface declaration",
          BIND_TS_INTERFACE,
        );
      } else {
        node.id = null;
        this.raise(this.state.start, TSErrors.MissingInterfaceName);
      }

      node.typeParameters = this.tsTryParseTypeParameters();
      if (this.eat(tt._extends)) {
        node.extends = this.tsParseHeritageClause("extends");
      }
      const body: N.TSInterfaceBody = this.startNode();
      body.body = this.tsInType(this.tsParseObjectTypeMembers.bind(this));
      node.body = this.finishNode(body, "TSInterfaceBody");
      return this.finishNode(node, "TSInterfaceDeclaration");
    }

    tsParseTypeAliasDeclaration(
      node: N.TsTypeAliasDeclaration,
    ): N.TsTypeAliasDeclaration {
      node.id = this.parseIdentifier();
      this.checkLVal(node.id, "typescript type alias", BIND_TS_TYPE);

      node.typeParameters = this.tsTryParseTypeParameters();
      node.typeAnnotation = this.tsInType(() => {
        this.expect(tt.eq);

        if (
          this.isContextual(tt._intrinsic) &&
          this.lookahead().type !== tt.dot
        ) {
          const node: N.TsKeywordType = this.startNode();
          this.next();
          return this.finishNode(node, "TSIntrinsicKeyword");
        }

        return this.tsParseType();
      });

      this.semicolon();
      return this.finishNode(node, "TSTypeAliasDeclaration");
    }

    tsInNoContext<T>(cb: () => T): T {
      const oldContext = this.state.context;
      this.state.context = [oldContext[0]];
      try {
        return cb();
      } finally {
        this.state.context = oldContext;
      }
    }

    /**
     * Runs `cb` in a type context.
     * This should be called one token *before* the first type token,
     * so that the call to `next()` is run in type context.
     */
    tsInType<T>(cb: () => T): T {
      const oldInType = this.state.inType;
      this.state.inType = true;
      try {
        return cb();
      } finally {
        this.state.inType = oldInType;
      }
    }

    tsEatThenParseType(token: TokenType): N.TsType | typeof undefined {
      return !this.match(token) ? undefined : this.tsNextThenParseType();
    }

    tsExpectThenParseType(token: TokenType): N.TsType {
      return this.tsDoThenParseType(() => this.expect(token));
    }

    tsNextThenParseType(): N.TsType {
      return this.tsDoThenParseType(() => this.next());
    }

    tsDoThenParseType(cb: () => void): N.TsType {
      return this.tsInType(() => {
        cb();
        return this.tsParseType();
      });
    }

    tsParseEnumMember(): N.TsEnumMember {
      const node: N.TsEnumMember = this.startNode();
      // Computed property names are grammar errors in an enum, so accept just string literal or identifier.
      node.id = this.match(tt.string)
        ? this.parseExprAtom()
        : this.parseIdentifier(/* liberal */ true);
      if (this.eat(tt.eq)) {
        node.initializer = this.parseMaybeAssignAllowIn();
      }
      return this.finishNode(node, "TSEnumMember");
    }

    tsParseEnumDeclaration(
      node: N.TsEnumDeclaration,
      isConst: boolean,
    ): N.TsEnumDeclaration {
      if (isConst) node.const = true;
      node.id = this.parseIdentifier();
      this.checkLVal(
        node.id,
        "typescript enum declaration",
        isConst ? BIND_TS_CONST_ENUM : BIND_TS_ENUM,
      );

      this.expect(tt.braceL);
      node.members = this.tsParseDelimitedList(
        "EnumMembers",
        this.tsParseEnumMember.bind(this),
      );
      this.expect(tt.braceR);
      return this.finishNode(node, "TSEnumDeclaration");
    }

    tsParseModuleBlock(): N.TsModuleBlock {
      const node: N.TsModuleBlock = this.startNode();
      this.scope.enter(SCOPE_OTHER);

      this.expect(tt.braceL);
      // Inside of a module block is considered "top-level", meaning it can have imports and exports.
      this.parseBlockOrModuleBlockBody(
        (node.body = []),
        /* directives */ undefined,
        /* topLevel */ true,
        /* end */ tt.braceR,
      );
      this.scope.exit();
      return this.finishNode(node, "TSModuleBlock");
    }

    tsParseModuleOrNamespaceDeclaration(
      node: N.TsModuleDeclaration,
      nested?: boolean = false,
    ): N.TsModuleDeclaration {
      node.id = this.parseIdentifier();

      if (!nested) {
        this.checkLVal(
          node.id,
          "module or namespace declaration",
          BIND_TS_NAMESPACE,
        );
      }

      if (this.eat(tt.dot)) {
        const inner = this.startNode();
        this.tsParseModuleOrNamespaceDeclaration(inner, true);
        node.body = inner;
      } else {
        this.scope.enter(SCOPE_TS_MODULE);
        this.prodParam.enter(PARAM);
        node.body = this.tsParseModuleBlock();
        this.prodParam.exit();
        this.scope.exit();
      }
      return this.finishNode(node, "TSModuleDeclaration");
    }

    tsParseAmbientExternalModuleDeclaration(
      node: N.TsModuleDeclaration,
    ): N.TsModuleDeclaration {
      if (this.isContextual(tt._global)) {
        node.global = true;
        node.id = this.parseIdentifier();
      } else if (this.match(tt.string)) {
        node.id = this.parseExprAtom();
      } else {
        this.unexpected();
      }
      if (this.match(tt.braceL)) {
        this.scope.enter(SCOPE_TS_MODULE);
        this.prodParam.enter(PARAM);
        node.body = this.tsParseModuleBlock();
        this.prodParam.exit();
        this.scope.exit();
      } else {
        this.semicolon();
      }

      return this.finishNode(node, "TSModuleDeclaration");
    }

    tsParseImportEqualsDeclaration(
      node: N.TsImportEqualsDeclaration,
      isExport?: boolean,
    ): N.TsImportEqualsDeclaration {
      node.isExport = isExport || false;
      node.id = this.parseIdentifier();
      this.checkLVal(node.id, "import equals declaration", BIND_LEXICAL);
      this.expect(tt.eq);
      const moduleReference = this.tsParseModuleReference();
      if (
        node.importKind === "type" &&
        moduleReference.type !== "TSExternalModuleReference"
      ) {
        this.raise(moduleReference.start, TSErrors.ImportAliasHasImportType);
      }
      node.moduleReference = moduleReference;
      this.semicolon();
      return this.finishNode(node, "TSImportEqualsDeclaration");
    }

    tsIsExternalModuleReference(): boolean {
      return (
        this.isContextual(tt._require) &&
        this.lookaheadCharCode() === charCodes.leftParenthesis
      );
    }

    tsParseModuleReference(): N.TsModuleReference {
      return this.tsIsExternalModuleReference()
        ? this.tsParseExternalModuleReference()
        : this.tsParseEntityName(/* allowReservedWords */ false);
    }

    tsParseExternalModuleReference(): N.TsExternalModuleReference {
      const node: N.TsExternalModuleReference = this.startNode();
      this.expectContextual(tt._require);
      this.expect(tt.parenL);
      if (!this.match(tt.string)) {
        throw this.unexpected();
      }
      // For compatibility to estree we cannot call parseLiteral directly here
      node.expression = this.parseExprAtom();
      this.expect(tt.parenR);
      return this.finishNode(node, "TSExternalModuleReference");
    }

    // Utilities

    tsLookAhead<T>(f: () => T): T {
      const state = this.state.clone();
      const res = f();
      this.state = state;
      return res;
    }

    tsTryParseAndCatch<T: ?N.NodeBase>(f: () => T): ?T {
      const result = this.tryParse(abort => f() || abort());

      if (result.aborted || !result.node) return undefined;
      if (result.error) this.state = result.failState;
      return result.node;
    }

    tsTryParse<T>(f: () => ?T): ?T {
      const state = this.state.clone();
      const result = f();
      if (result !== undefined && result !== false) {
        return result;
      } else {
        this.state = state;
        return undefined;
      }
    }

    tsTryParseDeclare(nany: any): ?N.Declaration {
      if (this.isLineTerminator()) {
        return;
      }
      let starttype = this.state.type;
      let kind;

      if (this.isContextual(tt._let)) {
        starttype = tt._var;
        kind = "let";
      }

      return this.tsInAmbientContext(() => {
        switch (starttype) {
          case tt._function:
            nany.declare = true;
            return this.parseFunctionStatement(
              nany,
              /* async */ false,
              /* declarationPosition */ true,
            );
          case tt._class:
            // While this is also set by tsParseExpressionStatement, we need to set it
            // before parsing the class declaration to now how to register it in the scope.
            nany.declare = true;
            return this.parseClass(
              nany,
              /* isStatement */ true,
              /* optionalId */ false,
            );
          case tt._const:
            if (this.match(tt._const) && this.isLookaheadContextual("enum")) {
              // `const enum = 0;` not allowed because "enum" is a strict mode reserved word.
              this.expect(tt._const);
              this.expectContextual(tt._enum);
              return this.tsParseEnumDeclaration(nany, /* isConst */ true);
            }
          // falls through
          case tt._var:
            kind = kind || this.state.value;
            return this.parseVarStatement(nany, kind);
          case tt._global:
            return this.tsParseAmbientExternalModuleDeclaration(nany);
          default: {
            if (tokenIsIdentifier(starttype)) {
              return this.tsParseDeclaration(
                nany,
                this.state.value,
                /* next */ true,
              );
            }
          }
        }
      });
    }

    // Note: this won't be called unless the keyword is allowed in `shouldParseExportDeclaration`.
    tsTryParseExportDeclaration(): ?N.Declaration {
      return this.tsParseDeclaration(
        this.startNode(),
        this.state.value,
        /* next */ true,
      );
    }

    tsParseExpressionStatement(node: any, expr: N.Identifier): ?N.Declaration {
      switch (expr.name) {
        case "declare": {
          const declaration = this.tsTryParseDeclare(node);
          if (declaration) {
            declaration.declare = true;
            return declaration;
          }
          break;
        }
        case "global":
          // `global { }` (with no `declare`) may appear inside an ambient module declaration.
          // Would like to use tsParseAmbientExternalModuleDeclaration here, but already ran past "global".
          if (this.match(tt.braceL)) {
            this.scope.enter(SCOPE_TS_MODULE);
            this.prodParam.enter(PARAM);
            const mod: N.TsModuleDeclaration = node;
            mod.global = true;
            mod.id = expr;
            mod.body = this.tsParseModuleBlock();
            this.scope.exit();
            this.prodParam.exit();
            return this.finishNode(mod, "TSModuleDeclaration");
          }
          break;

        default:
          return this.tsParseDeclaration(node, expr.name, /* next */ false);
      }
    }

    // Common to tsTryParseDeclare, tsTryParseExportDeclaration, and tsParseExpressionStatement.
    tsParseDeclaration(
      node: any,
      value: string,
      next: boolean,
    ): ?N.Declaration {
      // no declaration apart from enum can be followed by a line break.
      switch (value) {
        case "abstract":
          if (
            this.tsCheckLineTerminator(next) &&
            (this.match(tt._class) || tokenIsIdentifier(this.state.type))
          ) {
            return this.tsParseAbstractDeclaration(node);
          }
          break;

        case "enum":
          if (next || tokenIsIdentifier(this.state.type)) {
            if (next) this.next();
            return this.tsParseEnumDeclaration(node, /* isConst */ false);
          }
          break;

        case "interface":
          if (
            this.tsCheckLineTerminator(next) &&
            tokenIsIdentifier(this.state.type)
          ) {
            return this.tsParseInterfaceDeclaration(node);
          }
          break;

        case "module":
          if (this.tsCheckLineTerminator(next)) {
            if (this.match(tt.string)) {
              return this.tsParseAmbientExternalModuleDeclaration(node);
            } else if (tokenIsIdentifier(this.state.type)) {
              return this.tsParseModuleOrNamespaceDeclaration(node);
            }
          }
          break;

        case "namespace":
          if (
            this.tsCheckLineTerminator(next) &&
            tokenIsIdentifier(this.state.type)
          ) {
            return this.tsParseModuleOrNamespaceDeclaration(node);
          }
          break;

        case "type":
          if (
            this.tsCheckLineTerminator(next) &&
            tokenIsIdentifier(this.state.type)
          ) {
            return this.tsParseTypeAliasDeclaration(node);
          }
          break;
      }
    }

    tsCheckLineTerminator(next: boolean) {
      if (next) {
        if (this.hasFollowingLineBreak()) return false;
        this.next();
        return true;
      }
      return !this.isLineTerminator();
    }

    tsTryParseGenericAsyncArrowFunction(
      startPos: number,
      startLoc: Position,
    ): ?N.ArrowFunctionExpression {
      if (!this.match(tt.lt)) {
        return undefined;
      }

      const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;
      this.state.maybeInArrowParameters = true;

      const res: ?N.ArrowFunctionExpression = this.tsTryParseAndCatch(() => {
        const node: N.ArrowFunctionExpression = this.startNodeAt(
          startPos,
          startLoc,
        );
        node.typeParameters = this.tsParseTypeParameters();
        // Don't use overloaded parseFunctionParams which would look for "<" again.
        super.parseFunctionParams(node);
        node.returnType = this.tsTryParseTypeOrTypePredicateAnnotation();
        this.expect(tt.arrow);
        return node;
      });

      this.state.maybeInArrowParameters = oldMaybeInArrowParameters;

      if (!res) {
        return undefined;
      }

      return this.parseArrowExpression(
        res,
        /* params are already set */ null,
        /* async */ true,
      );
    }

    tsParseTypeArguments(): N.TsTypeParameterInstantiation {
      const node = this.startNode();
      node.params = this.tsInType(() =>
        // Temporarily remove a JSX parsing context, which makes us scan different tokens.
        this.tsInNoContext(() => {
          this.expect(tt.lt);
          return this.tsParseDelimitedList(
            "TypeParametersOrArguments",
            this.tsParseType.bind(this),
          );
        }),
      );
      if (node.params.length === 0) {
        this.raise(node.start, TSErrors.EmptyTypeArguments);
      }
      this.expect(tt.gt);
      return this.finishNode(node, "TSTypeParameterInstantiation");
    }

    tsIsDeclarationStart(): boolean {
      return tokenIsTSDeclarationStart(this.state.type);
    }

    // ======================================================
    // OVERRIDES
    // ======================================================

    isExportDefaultSpecifier(): boolean {
      if (this.tsIsDeclarationStart()) return false;
      return super.isExportDefaultSpecifier();
    }

    parseAssignableListItem(
      allowModifiers: ?boolean,
      decorators: N.Decorator[],
    ): N.Pattern | N.TSParameterProperty {
      // Store original location/position to include modifiers in range
      const startPos = this.state.start;
      const startLoc = this.state.startLoc;

      let accessibility: ?N.Accessibility;
      let readonly = false;
      let override = false;
      if (allowModifiers !== undefined) {
        const modified = {};
        this.tsParseModifiers(modified, [
          "public",
          "private",
          "protected",
          "override",
          "readonly",
        ]);
        accessibility = modified.accessibility;
        override = modified.override;
        readonly = modified.readonly;
        if (
          allowModifiers === false &&
          (accessibility || readonly || override)
        ) {
          this.raise(startPos, TSErrors.UnexpectedParameterModifier);
        }
      }

      const left = this.parseMaybeDefault();
      this.parseAssignableListItemTypes(left);
      const elt = this.parseMaybeDefault(left.start, left.loc.start, left);
      if (accessibility || readonly || override) {
        const pp: N.TSParameterProperty = this.startNodeAt(startPos, startLoc);
        if (decorators.length) {
          pp.decorators = decorators;
        }
        if (accessibility) pp.accessibility = accessibility;
        if (readonly) pp.readonly = readonly;
        if (override) pp.override = override;
        if (elt.type !== "Identifier" && elt.type !== "AssignmentPattern") {
          this.raise(pp.start, TSErrors.UnsupportedParameterPropertyKind);
        }
        pp.parameter = ((elt: any): N.Identifier | N.AssignmentPattern);
        return this.finishNode(pp, "TSParameterProperty");
      }

      if (decorators.length) {
        left.decorators = decorators;
      }

      return elt;
    }

    parseFunctionBodyAndFinish(
      node: N.BodilessFunctionOrMethodBase,
      type: string,
      isMethod?: boolean = false,
    ): void {
      if (this.match(tt.colon)) {
        node.returnType = this.tsParseTypeOrTypePredicateAnnotation(tt.colon);
      }

      const bodilessType =
        type === "FunctionDeclaration"
          ? "TSDeclareFunction"
          : type === "ClassMethod" || type === "ClassPrivateMethod"
          ? "TSDeclareMethod"
          : undefined;
      if (bodilessType && !this.match(tt.braceL) && this.isLineTerminator()) {
        this.finishNode(node, bodilessType);
        return;
      }
      if (bodilessType === "TSDeclareFunction" && this.state.isAmbientContext) {
        this.raise(node.start, TSErrors.DeclareFunctionHasImplementation);
        if (
          // $FlowIgnore
          node.declare
        ) {
          super.parseFunctionBodyAndFinish(node, bodilessType, isMethod);
          return;
        }
      }

      super.parseFunctionBodyAndFinish(node, type, isMethod);
    }

    registerFunctionStatementId(node: N.Function): void {
      if (!node.body && node.id) {
        // Function ids are validated after parsing their body.
        // For bodyless function, we need to do it here.
        this.checkLVal(node.id, "function name", BIND_TS_AMBIENT);
      } else {
        super.registerFunctionStatementId(...arguments);
      }
    }

    tsCheckForInvalidTypeCasts(items: $ReadOnlyArray<?N.Expression>) {
      items.forEach(node => {
        if (node?.type === "TSTypeCastExpression") {
          this.raise(
            node.typeAnnotation.start,
            TSErrors.UnexpectedTypeAnnotation,
          );
        }
      });
    }

    toReferencedList(
      exprList: $ReadOnlyArray<?N.Expression>,
      isInParens?: boolean, // eslint-disable-line no-unused-vars
    ): $ReadOnlyArray<?N.Expression> {
      // Handles invalid scenarios like: `f(a:b)`, `(a:b);`, and `(a:b,c:d)`.
      //
      // Note that `f<T>(a:b)` goes through a different path and is handled
      // in `parseSubscript` directly.
      this.tsCheckForInvalidTypeCasts(exprList);
      return exprList;
    }

    parseArrayLike(...args): N.ArrayExpression | N.TupleExpression {
      const node = super.parseArrayLike(...args);

      if (node.type === "ArrayExpression") {
        this.tsCheckForInvalidTypeCasts(node.elements);
      }

      return node;
    }

    parseSubscript(
      base: N.Expression,
      startPos: number,
      startLoc: Position,
      noCalls: ?boolean,
      state: N.ParseSubscriptState,
    ): N.Expression {
      if (!this.hasPrecedingLineBreak() && this.match(tt.bang)) {
        // When ! is consumed as a postfix operator (non-null assertion),
        // disallow JSX tag forming after. e.g. When parsing `p! < n.p!`
        // `<n.p` can not be a start of JSX tag
        this.state.canStartJSXElement = false;
        this.next();

        const nonNullExpression: N.TsNonNullExpression = this.startNodeAt(
          startPos,
          startLoc,
        );
        nonNullExpression.expression = base;
        return this.finishNode(nonNullExpression, "TSNonNullExpression");
      }

      let isOptionalCall = false;
      if (
        this.match(tt.questionDot) &&
        this.lookaheadCharCode() === charCodes.lessThan
      ) {
        if (noCalls) {
          state.stop = true;
          return base;
        }
        state.optionalChainMember = isOptionalCall = true;
        this.next();
      }

      if (this.match(tt.lt)) {
        let missingParenErrorPos;
        // tsTryParseAndCatch is expensive, so avoid if not necessary.
        // There are number of things we are going to "maybe" parse, like type arguments on
        // tagged template expressions. If any of them fail, walk it back and continue.
        const result = this.tsTryParseAndCatch(() => {
          if (!noCalls && this.atPossibleAsyncArrow(base)) {
            // Almost certainly this is a generic async function `async <T>() => ...
            // But it might be a call with a type argument `async<T>();`
            const asyncArrowFn = this.tsTryParseGenericAsyncArrowFunction(
              startPos,
              startLoc,
            );
            if (asyncArrowFn) {
              return asyncArrowFn;
            }
          }

          const node: N.CallExpression = this.startNodeAt(startPos, startLoc);
          node.callee = base;

          const typeArguments = this.tsParseTypeArguments();

          if (typeArguments) {
            if (isOptionalCall && !this.match(tt.parenL)) {
              missingParenErrorPos = this.state.pos;
              this.unexpected();
            }

            if (!noCalls && this.eat(tt.parenL)) {
              // possibleAsync always false here, because we would have handled it above.
              // $FlowIgnore (won't be any undefined arguments)
              node.arguments = this.parseCallExpressionArguments(
                tt.parenR,
                /* possibleAsync */ false,
              );

              // Handles invalid case: `f<T>(a:b)`
              this.tsCheckForInvalidTypeCasts(node.arguments);

              node.typeParameters = typeArguments;
              if (state.optionalChainMember) {
                // $FlowIgnore
                node.optional = isOptionalCall;
              }

              return this.finishCallExpression(node, state.optionalChainMember);
            } else if (tokenIsTemplate(this.state.type)) {
              const result = this.parseTaggedTemplateExpression(
                base,
                startPos,
                startLoc,
                state,
              );
              result.typeParameters = typeArguments;
              return result;
            }
          }

          this.unexpected();
        });

        if (missingParenErrorPos) {
          this.unexpected(missingParenErrorPos, tt.parenL);
        }

        if (result) return result;
      }

      return super.parseSubscript(base, startPos, startLoc, noCalls, state);
    }

    parseNewArguments(node: N.NewExpression): void {
      if (this.match(tt.lt)) {
        // tsTryParseAndCatch is expensive, so avoid if not necessary.
        // 99% certain this is `new C<T>();`. But may be `new C < T;`, which is also legal.
        const typeParameters = this.tsTryParseAndCatch(() => {
          const args = this.tsParseTypeArguments();
          if (!this.match(tt.parenL)) this.unexpected();
          return args;
        });
        if (typeParameters) {
          node.typeParameters = typeParameters;
        }
      }

      super.parseNewArguments(node);
    }

    parseExprOp(
      left: N.Expression,
      leftStartPos: number,
      leftStartLoc: Position,
      minPrec: number,
    ) {
      if (
        tokenOperatorPrecedence(tt._in) > minPrec &&
        !this.hasPrecedingLineBreak() &&
        this.isContextual(tt._as)
      ) {
        const node: N.TsAsExpression = this.startNodeAt(
          leftStartPos,
          leftStartLoc,
        );
        node.expression = left;
        const _const = this.tsTryNextParseConstantContext();
        if (_const) {
          node.typeAnnotation = _const;
        } else {
          node.typeAnnotation = this.tsNextThenParseType();
        }
        this.finishNode(node, "TSAsExpression");
        // rescan `<`, `>` because they were scanned when this.state.inType was true
        this.reScan_lt_gt();
        return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec);
      }

      return super.parseExprOp(left, leftStartPos, leftStartLoc, minPrec);
    }

    checkReservedWord(
      word: string, // eslint-disable-line no-unused-vars
      startLoc: number, // eslint-disable-line no-unused-vars
      checkKeywords: boolean, // eslint-disable-line no-unused-vars
      // eslint-disable-next-line no-unused-vars
      isBinding: boolean,
    ): void {
      // Don't bother checking for TypeScript code.
      // Strict mode words may be allowed as in `declare namespace N { const static: number; }`.
      // And we have a type checker anyway, so don't bother having the parser do it.
    }

    /*
    Don't bother doing this check in TypeScript code because:
    1. We may have a nested export statement with the same name:
      export const x = 0;
      export namespace N {
        export const x = 1;
      }
    2. We have a type checker to warn us about this sort of thing.
    */
    checkDuplicateExports() {}

    parseImport(node: N.Node): N.AnyImport {
      node.importKind = "value";
      if (
        tokenIsIdentifier(this.state.type) ||
        this.match(tt.star) ||
        this.match(tt.braceL)
      ) {
        let ahead = this.lookahead();

        if (
          this.isContextual(tt._type) &&
          // import type, { a } from "b";
          ahead.type !== tt.comma &&
          // import type from "a";
          ahead.type !== tt._from &&
          // import type = require("a");
          ahead.type !== tt.eq
        ) {
          node.importKind = "type";
          this.next();
          ahead = this.lookahead();
        }

        if (tokenIsIdentifier(this.state.type) && ahead.type === tt.eq) {
          return this.tsParseImportEqualsDeclaration(node);
        }
      }

      const importNode = super.parseImport(node);
      /*:: invariant(importNode.type !== "TSImportEqualsDeclaration") */

      // `import type` can only be used on imports with named imports or with a
      // default import - but not both
      if (
        importNode.importKind === "type" &&
        importNode.specifiers.length > 1 &&
        importNode.specifiers[0].type === "ImportDefaultSpecifier"
      ) {
        this.raise(
          importNode.start,
          TSErrors.TypeImportCannotSpecifyDefaultAndNamed,
        );
      }

      return importNode;
    }

    parseExport(node: N.Node): N.AnyExport {
      if (this.match(tt._import)) {
        // `export import A = B;`
        this.next(); // eat `tt._import`
        if (
          this.isContextual(tt._type) &&
          this.lookaheadCharCode() !== charCodes.equalsTo
        ) {
          node.importKind = "type";
          this.next(); // eat "type"
        } else {
          node.importKind = "value";
        }
        return this.tsParseImportEqualsDeclaration(node, /* isExport */ true);
      } else if (this.eat(tt.eq)) {
        // `export = x;`
        const assign: N.TsExportAssignment = node;
        assign.expression = this.parseExpression();
        this.semicolon();
        return this.finishNode(assign, "TSExportAssignment");
      } else if (this.eatContextual(tt._as)) {
        // `export as namespace A;`
        const decl: N.TsNamespaceExportDeclaration = node;
        // See `parseNamespaceExportDeclaration` in TypeScript's own parser
        this.expectContextual(tt._namespace);
        decl.id = this.parseIdentifier();
        this.semicolon();
        return this.finishNode(decl, "TSNamespaceExportDeclaration");
      } else {
        if (
          this.isContextual(tt._type) &&
          this.lookahead().type === tt.braceL
        ) {
          this.next();
          node.exportKind = "type";
        } else {
          node.exportKind = "value";
        }

        return super.parseExport(node);
      }
    }

    isAbstractClass(): boolean {
      return (
        this.isContextual(tt._abstract) && this.lookahead().type === tt._class
      );
    }

    parseExportDefaultExpression(): N.Expression | N.Declaration {
      if (this.isAbstractClass()) {
        const cls = this.startNode();
        this.next(); // Skip "abstract"
        cls.abstract = true;
        this.parseClass(cls, true, true);
        return cls;
      }

      // export default interface allowed in:
      // https://github.com/Microsoft/TypeScript/pull/16040
      if (this.match(tt._interface)) {
        const interfaceNode = this.startNode();
        this.next();
        const result = this.tsParseInterfaceDeclaration(interfaceNode);
        if (result) return result;
      }

      return super.parseExportDefaultExpression();
    }

    parseStatementContent(context: ?string, topLevel: ?boolean): N.Statement {
      if (this.state.type === tt._const) {
        const ahead = this.lookahead();
        if (ahead.type === tt._enum) {
          const node: N.TsEnumDeclaration = this.startNode();
          this.next(); // eat 'const'
          this.expectContextual(tt._enum);
          return this.tsParseEnumDeclaration(node, /* isConst */ true);
        }
      }
      return super.parseStatementContent(context, topLevel);
    }

    parseAccessModifier(): ?N.Accessibility {
      return this.tsParseModifier(["public", "protected", "private"]);
    }

    tsHasSomeModifiers(member: any, modifiers: TsModifier[]): boolean {
      return modifiers.some(modifier => {
        if (tsIsAccessModifier(modifier)) {
          return member.accessibility === modifier;
        }
        return !!member[modifier];
      });
    }

    tsIsStartOfStaticBlocks() {
      return (
        this.isContextual(tt._static) &&
        this.lookaheadCharCode() === charCodes.leftCurlyBrace
      );
    }

    parseClassMember(
      classBody: N.ClassBody,
      member: any,
      state: N.ParseClassMemberState,
    ): void {
      const modifiers = [
        "declare",
        "private",
        "public",
        "protected",
        "override",
        "abstract",
        "readonly",
        "static",
      ];
      this.tsParseModifiers(
        member,
        modifiers,
        /* disallowedModifiers */ undefined,
        /* errorTemplate */ undefined,
        /* stopOnStartOfClassStaticBlock */ true,
      );

      const callParseClassMemberWithIsStatic = () => {
        if (this.tsIsStartOfStaticBlocks()) {
          this.next(); // eat "static"
          this.next(); // eat "{"
          if (this.tsHasSomeModifiers(member, modifiers)) {
            this.raise(this.state.pos, TSErrors.StaticBlockCannotHaveModifier);
          }
          this.parseClassStaticBlock(classBody, ((member: any): N.StaticBlock));
        } else {
          this.parseClassMemberWithIsStatic(
            classBody,
            member,
            state,
            !!member.static,
          );
        }
      };
      if (member.declare) {
        this.tsInAmbientContext(callParseClassMemberWithIsStatic);
      } else {
        callParseClassMemberWithIsStatic();
      }
    }

    parseClassMemberWithIsStatic(
      classBody: N.ClassBody,
      member: N.ClassMember | N.TsIndexSignature,
      state: N.ParseClassMemberState,
      isStatic: boolean,
    ): void {
      const idx = this.tsTryParseIndexSignature(member);
      if (idx) {
        classBody.body.push(idx);

        if ((member: any).abstract) {
          this.raise(member.start, TSErrors.IndexSignatureHasAbstract);
        }
        if ((member: any).accessibility) {
          this.raise(
            member.start,
            TSErrors.IndexSignatureHasAccessibility,
            (member: any).accessibility,
          );
        }
        if ((member: any).declare) {
          this.raise(member.start, TSErrors.IndexSignatureHasDeclare);
        }
        if ((member: any).override) {
          this.raise(member.start, TSErrors.IndexSignatureHasOverride);
        }

        return;
      }

      if (!this.state.inAbstractClass && (member: any).abstract) {
        this.raise(member.start, TSErrors.NonAbstractClassHasAbstractMethod);
      }

      if ((member: any).override) {
        if (!state.hadSuperClass) {
          this.raise(member.start, TSErrors.OverrideNotInSubClass);
        }
      }

      /*:: invariant(member.type !== "TSIndexSignature") */

      super.parseClassMemberWithIsStatic(classBody, member, state, isStatic);
    }

    parsePostMemberNameModifiers(
      methodOrProp: N.ClassMethod | N.ClassProperty | N.ClassPrivateProperty,
    ): void {
      const optional = this.eat(tt.question);
      if (optional) methodOrProp.optional = true;

      if ((methodOrProp: any).readonly && this.match(tt.parenL)) {
        this.raise(methodOrProp.start, TSErrors.ClassMethodHasReadonly);
      }

      if ((methodOrProp: any).declare && this.match(tt.parenL)) {
        this.raise(methodOrProp.start, TSErrors.ClassMethodHasDeclare);
      }
    }

    // Note: The reason we do this in `parseExpressionStatement` and not `parseStatement`
    // is that e.g. `type()` is valid JS, so we must try parsing that first.
    // If it's really a type, we will parse `type` as the statement, and can correct it here
    // by parsing the rest.
    parseExpressionStatement(
      node: N.ExpressionStatement,
      expr: N.Expression,
    ): N.Statement {
      const decl =
        expr.type === "Identifier"
          ? this.tsParseExpressionStatement(node, expr)
          : undefined;
      return decl || super.parseExpressionStatement(node, expr);
    }

    // export type
    // Should be true for anything parsed by `tsTryParseExportDeclaration`.
    shouldParseExportDeclaration(): boolean {
      if (this.tsIsDeclarationStart()) return true;
      return super.shouldParseExportDeclaration();
    }

    // An apparent conditional expression could actually be an optional parameter in an arrow function.
    parseConditional(
      expr: N.Expression,
      startPos: number,
      startLoc: Position,
      refExpressionErrors?: ?ExpressionErrors,
    ): N.Expression {
      // only do the expensive clone if there is a question mark
      // and if we come from inside parens
      if (!this.state.maybeInArrowParameters || !this.match(tt.question)) {
        return super.parseConditional(
          expr,
          startPos,
          startLoc,
          refExpressionErrors,
        );
      }

      const result = this.tryParse(() =>
        super.parseConditional(expr, startPos, startLoc),
      );

      if (!result.node) {
        if (result.error) {
          /*:: invariant(refExpressionErrors != null) */
          super.setOptionalParametersError(refExpressionErrors, result.error);
        }

        return expr;
      }
      if (result.error) this.state = result.failState;
      return result.node;
    }

    // Note: These "type casts" are *not* valid TS expressions.
    // But we parse them here and change them when completing the arrow function.
    parseParenItem(
      node: N.Expression,
      startPos: number,
      startLoc: Position,
    ): N.Expression {
      node = super.parseParenItem(node, startPos, startLoc);
      if (this.eat(tt.question)) {
        node.optional = true;
        // Include questionmark in location of node
        // Don't use this.finishNode() as otherwise we might process comments twice and
        // include already consumed parens
        this.resetEndLocation(node);
      }

      if (this.match(tt.colon)) {
        const typeCastNode: N.TsTypeCastExpression = this.startNodeAt(
          startPos,
          startLoc,
        );
        typeCastNode.expression = node;
        typeCastNode.typeAnnotation = this.tsParseTypeAnnotation();

        return this.finishNode(typeCastNode, "TSTypeCastExpression");
      }

      return node;
    }

    parseExportDeclaration(node: N.ExportNamedDeclaration): ?N.Declaration {
      // Store original location/position
      const startPos = this.state.start;
      const startLoc = this.state.startLoc;

      // "export declare" is equivalent to just "export".
      const isDeclare = this.eatContextual(tt._declare);

      if (
        isDeclare &&
        (this.isContextual(tt._declare) || !this.shouldParseExportDeclaration())
      ) {
        throw this.raise(
          this.state.start,
          TSErrors.ExpectedAmbientAfterExportDeclare,
        );
      }

      let declaration: ?N.Declaration;

      if (tokenIsIdentifier(this.state.type)) {
        declaration = this.tsTryParseExportDeclaration();
      }
      if (!declaration) {
        declaration = super.parseExportDeclaration(node);
      }
      if (
        declaration &&
        (declaration.type === "TSInterfaceDeclaration" ||
          declaration.type === "TSTypeAliasDeclaration" ||
          isDeclare)
      ) {
        node.exportKind = "type";
      }

      if (declaration && isDeclare) {
        // Reset location to include `declare` in range
        this.resetStartLocation(declaration, startPos, startLoc);

        declaration.declare = true;
      }

      return declaration;
    }

    parseClassId(
      node: N.Class,
      isStatement: boolean,
      optionalId: ?boolean,
    ): void {
      if ((!isStatement || optionalId) && this.isContextual(tt._implements)) {
        return;
      }

      super.parseClassId(
        node,
        isStatement,
        optionalId,
        (node: any).declare ? BIND_TS_AMBIENT : BIND_CLASS,
      );
      const typeParameters = this.tsTryParseTypeParameters();
      if (typeParameters) node.typeParameters = typeParameters;
    }

    parseClassPropertyAnnotation(
      node: N.ClassProperty | N.ClassPrivateProperty,
    ): void {
      if (!node.optional && this.eat(tt.bang)) {
        node.definite = true;
      }

      const type = this.tsTryParseTypeAnnotation();
      if (type) node.typeAnnotation = type;
    }

    parseClassProperty(node: N.ClassProperty): N.ClassProperty {
      this.parseClassPropertyAnnotation(node);

      if (this.state.isAmbientContext && this.match(tt.eq)) {
        this.raise(this.state.start, TSErrors.DeclareClassFieldHasInitializer);
      }
      if (node.abstract && this.match(tt.eq)) {
        const { key } = node;
        this.raise(
          this.state.start,
          TSErrors.AbstractPropertyHasInitializer,
          key.type === "Identifier" && !node.computed
            ? key.name
            : `[${this.input.slice(key.start, key.end)}]`,
        );
      }

      return super.parseClassProperty(node);
    }

    parseClassPrivateProperty(
      node: N.ClassPrivateProperty,
    ): N.ClassPrivateProperty {
      // $FlowIgnore
      if (node.abstract) {
        this.raise(node.start, TSErrors.PrivateElementHasAbstract);
      }

      // $FlowIgnore
      if (node.accessibility) {
        this.raise(
          node.start,
          TSErrors.PrivateElementHasAccessibility,
          node.accessibility,
        );
      }

      this.parseClassPropertyAnnotation(node);
      return super.parseClassPrivateProperty(node);
    }

    pushClassMethod(
      classBody: N.ClassBody,
      method: N.ClassMethod,
      isGenerator: boolean,
      isAsync: boolean,
      isConstructor: boolean,
      allowsDirectSuper: boolean,
    ): void {
      const typeParameters = this.tsTryParseTypeParameters();
      if (typeParameters && isConstructor) {
        this.raise(typeParameters.start, TSErrors.ConstructorHasTypeParameters);
      }

      // $FlowIgnore
      if (method.declare && (method.kind === "get" || method.kind === "set")) {
        this.raise(method.start, TSErrors.DeclareAccessor, method.kind);
      }
      if (typeParameters) method.typeParameters = typeParameters;
      super.pushClassMethod(
        classBody,
        method,
        isGenerator,
        isAsync,
        isConstructor,
        allowsDirectSuper,
      );
    }

    pushClassPrivateMethod(
      classBody: N.ClassBody,
      method: N.ClassPrivateMethod,
      isGenerator: boolean,
      isAsync: boolean,
    ): void {
      const typeParameters = this.tsTryParseTypeParameters();
      if (typeParameters) method.typeParameters = typeParameters;
      super.pushClassPrivateMethod(classBody, method, isGenerator, isAsync);
    }

    declareClassPrivateMethodInScope(
      node: N.ClassPrivateMethod | N.EstreeMethodDefinition | N.TSDeclareMethod,
      kind: number,
    ) {
      if (node.type === "TSDeclareMethod") return;
      // This happens when using the "estree" plugin.
      if (node.type === "MethodDefinition" && !node.value.body) return;

      super.declareClassPrivateMethodInScope(node, kind);
    }

    parseClassSuper(node: N.Class): void {
      super.parseClassSuper(node);
      if (node.superClass && this.match(tt.lt)) {
        node.superTypeParameters = this.tsParseTypeArguments();
      }
      if (this.eatContextual(tt._implements)) {
        node.implements = this.tsParseHeritageClause("implements");
      }
    }

    parseObjPropValue(prop: N.ObjectMember, ...args): void {
      const typeParameters = this.tsTryParseTypeParameters();
      if (typeParameters) prop.typeParameters = typeParameters;

      super.parseObjPropValue(prop, ...args);
    }

    parseFunctionParams(node: N.Function, allowModifiers?: boolean): void {
      const typeParameters = this.tsTryParseTypeParameters();
      if (typeParameters) node.typeParameters = typeParameters;
      super.parseFunctionParams(node, allowModifiers);
    }

    // `let x: number;`
    parseVarId(
      decl: N.VariableDeclarator,
      kind: "var" | "let" | "const",
    ): void {
      super.parseVarId(decl, kind);
      if (
        decl.id.type === "Identifier" &&
        !this.hasPrecedingLineBreak() &&
        this.eat(tt.bang)
      ) {
        decl.definite = true;
      }

      const type = this.tsTryParseTypeAnnotation();
      if (type) {
        decl.id.typeAnnotation = type;
        this.resetEndLocation(decl.id); // set end position to end of type
      }
    }

    // parse the return type of an async arrow function - let foo = (async (): number => {});
    parseAsyncArrowFromCallExpression(
      node: N.ArrowFunctionExpression,
      call: N.CallExpression,
    ): N.ArrowFunctionExpression {
      if (this.match(tt.colon)) {
        node.returnType = this.tsParseTypeAnnotation();
      }
      return super.parseAsyncArrowFromCallExpression(node, call);
    }

    parseMaybeAssign(...args): N.Expression {
      // Note: When the JSX plugin is on, type assertions (`<T> x`) aren't valid syntax.

      let state: ?State;
      let jsx;
      let typeCast;

      if (
        this.hasPlugin("jsx") &&
        (this.match(tt.jsxTagStart) || this.match(tt.lt))
      ) {
        // Prefer to parse JSX if possible. But may be an arrow fn.
        state = this.state.clone();

        jsx = this.tryParse(() => super.parseMaybeAssign(...args), state);

        /*:: invariant(!jsx.aborted) */
        /*:: invariant(jsx.node != null) */
        if (!jsx.error) return jsx.node;

        // Remove `tc.j_expr` or `tc.j_oTag` from context added
        // by parsing `jsxTagStart` to stop the JSX plugin from
        // messing with the tokens
        const { context } = this.state;
        const currentContext = context[context.length - 1];
        if (currentContext === tc.j_oTag || currentContext === tc.j_expr) {
          context.pop();
        }
      }

      if (!jsx?.error && !this.match(tt.lt)) {
        return super.parseMaybeAssign(...args);
      }

      // Either way, we're looking at a '<': tt.jsxTagStart or relational.

      let typeParameters: ?N.TsTypeParameterDeclaration;
      state = state || this.state.clone();

      const arrow = this.tryParse(abort => {
        // This is similar to TypeScript's `tryParseParenthesizedArrowFunctionExpression`.
        typeParameters = this.tsParseTypeParameters();
        const expr = super.parseMaybeAssign(...args);

        if (
          expr.type !== "ArrowFunctionExpression" ||
          expr.extra?.parenthesized
        ) {
          abort();
        }

        // Correct TypeScript code should have at least 1 type parameter, but don't crash on bad code.
        if (typeParameters?.params.length !== 0) {
          this.resetStartLocationFromNode(expr, typeParameters);
        }
        expr.typeParameters = typeParameters;
        return expr;
      }, state);

      /*:: invariant(arrow.node != null) */
      if (!arrow.error && !arrow.aborted) {
        // This error is reported outside of the this.tryParse call so that
        // in case of <T>(x) => 2, we don't consider <T>(x) as a type assertion
        // because of this error.
        if (typeParameters) this.reportReservedArrowTypeParam(typeParameters);
        return arrow.node;
      }

      if (!jsx) {
        // Try parsing a type cast instead of an arrow function.
        // This will never happen outside of JSX.
        // (Because in JSX the '<' should be a jsxTagStart and not a relational.
        assert(!this.hasPlugin("jsx"));

        // This will start with a type assertion (via parseMaybeUnary).
        // But don't directly call `this.tsParseTypeAssertion` because we want to handle any binary after it.
        typeCast = this.tryParse(() => super.parseMaybeAssign(...args), state);
        /*:: invariant(!typeCast.aborted) */
        /*:: invariant(typeCast.node != null) */
        if (!typeCast.error) return typeCast.node;
      }

      if (jsx?.node) {
        /*:: invariant(jsx.failState) */
        this.state = jsx.failState;
        return jsx.node;
      }

      if (arrow.node) {
        /*:: invariant(arrow.failState) */
        this.state = arrow.failState;
        if (typeParameters) this.reportReservedArrowTypeParam(typeParameters);
        return arrow.node;
      }

      if (typeCast?.node) {
        /*:: invariant(typeCast.failState) */
        this.state = typeCast.failState;
        return typeCast.node;
      }

      if (jsx?.thrown) throw jsx.error;
      if (arrow.thrown) throw arrow.error;
      if (typeCast?.thrown) throw typeCast.error;

      throw jsx?.error || arrow.error || typeCast?.error;
    }

    reportReservedArrowTypeParam(node: any) {
      if (
        node.params.length === 1 &&
        !node.extra?.trailingComma &&
        this.getPluginOption("typescript", "disallowAmbiguousJSXLike")
      ) {
        this.raise(node.start, TSErrors.ReservedArrowTypeParam);
      }
    }

    // Handle type assertions
    parseMaybeUnary(refExpressionErrors?: ?ExpressionErrors): N.Expression {
      if (!this.hasPlugin("jsx") && this.match(tt.lt)) {
        return this.tsParseTypeAssertion();
      } else {
        return super.parseMaybeUnary(refExpressionErrors);
      }
    }

    parseArrow(node: N.ArrowFunctionExpression): ?N.ArrowFunctionExpression {
      if (this.match(tt.colon)) {
        // This is different from how the TS parser does it.
        // TS uses lookahead. The Babel Parser parses it as a parenthesized expression and converts.

        const result = this.tryParse(abort => {
          const returnType = this.tsParseTypeOrTypePredicateAnnotation(
            tt.colon,
          );
          if (this.canInsertSemicolon() || !this.match(tt.arrow)) abort();
          return returnType;
        });

        if (result.aborted) return;

        if (!result.thrown) {
          if (result.error) this.state = result.failState;
          node.returnType = result.node;
        }
      }

      return super.parseArrow(node);
    }

    // Allow type annotations inside of a parameter list.
    parseAssignableListItemTypes(param: N.Pattern) {
      if (this.eat(tt.question)) {
        if (
          param.type !== "Identifier" &&
          !this.state.isAmbientContext &&
          !this.state.inType
        ) {
          this.raise(param.start, TSErrors.PatternIsOptional);
        }

        ((param: any): N.Identifier).optional = true;
      }
      const type = this.tsTryParseTypeAnnotation();
      if (type) param.typeAnnotation = type;
      this.resetEndLocation(param);

      return param;
    }

    isAssignable(node: N.Node, isBinding?: boolean): boolean {
      switch (node.type) {
        case "TSTypeCastExpression":
          return this.isAssignable(node.expression, isBinding);
        case "TSParameterProperty":
          return true;
        default:
          return super.isAssignable(node, isBinding);
      }
    }

    toAssignable(node: N.Node, isLHS: boolean = false): N.Node {
      switch (node.type) {
        case "TSTypeCastExpression":
          return super.toAssignable(this.typeCastToParameter(node), isLHS);
        case "TSParameterProperty":
          return super.toAssignable(node, isLHS);
        case "ParenthesizedExpression":
          return this.toAssignableParenthesizedExpression(node, isLHS);
        case "TSAsExpression":
        case "TSNonNullExpression":
        case "TSTypeAssertion":
          node.expression = this.toAssignable(node.expression, isLHS);
          return node;
        default:
          return super.toAssignable(node, isLHS);
      }
    }

    toAssignableParenthesizedExpression(node: N.Node, isLHS: boolean) {
      switch (node.expression.type) {
        case "TSAsExpression":
        case "TSNonNullExpression":
        case "TSTypeAssertion":
        case "ParenthesizedExpression":
          node.expression = this.toAssignable(node.expression, isLHS);
          return node;
        default:
          return super.toAssignable(node, isLHS);
      }
    }

    checkLVal(
      expr: N.Expression,
      contextDescription: string,
      ...args:
        | [BindingTypes | void]
        | [BindingTypes | void, ?Set<string>, boolean | void, boolean | void]
    ): void {
      switch (expr.type) {
        case "TSTypeCastExpression":
          // Allow "typecasts" to appear on the left of assignment expressions,
          // because it may be in an arrow function.
          // e.g. `const f = (foo: number = 0) => foo;`
          return;
        case "TSParameterProperty":
          this.checkLVal(expr.parameter, "parameter property", ...args);
          return;
        case "TSAsExpression":
        case "TSTypeAssertion":
          if (
            /*bindingType*/ !args[0] &&
            contextDescription !== "parenthesized expression" &&
            !expr.extra?.parenthesized
          ) {
            this.raise(expr.start, Errors.InvalidLhs, contextDescription);
            break;
          }
          this.checkLVal(expr.expression, "parenthesized expression", ...args);
          return;
        case "TSNonNullExpression":
          this.checkLVal(expr.expression, contextDescription, ...args);
          return;
        default:
          super.checkLVal(expr, contextDescription, ...args);
          return;
      }
    }

    parseBindingAtom(): N.Pattern {
      switch (this.state.type) {
        case tt._this:
          // "this" may be the name of a parameter, so allow it.
          return this.parseIdentifier(/* liberal */ true);
        default:
          return super.parseBindingAtom();
      }
    }

    parseMaybeDecoratorArguments(expr: N.Expression): N.Expression {
      if (this.match(tt.lt)) {
        const typeArguments = this.tsParseTypeArguments();

        if (this.match(tt.parenL)) {
          const call = super.parseMaybeDecoratorArguments(expr);
          call.typeParameters = typeArguments;
          return call;
        }

        this.unexpected(this.state.start, tt.parenL);
      }

      return super.parseMaybeDecoratorArguments(expr);
    }

    checkCommaAfterRest(close) {
      if (
        this.state.isAmbientContext &&
        this.match(tt.comma) &&
        this.lookaheadCharCode() === close
      ) {
        this.next();
      } else {
        super.checkCommaAfterRest(close);
      }
    }

    // === === === === === === === === === === === === === === === ===
    // Note: All below methods are duplicates of something in flow.js.
    // Not sure what the best way to combine these is.
    // === === === === === === === === === === === === === === === ===

    isClassMethod(): boolean {
      return this.match(tt.lt) || super.isClassMethod();
    }

    isClassProperty(): boolean {
      return (
        this.match(tt.bang) || this.match(tt.colon) || super.isClassProperty()
      );
    }

    parseMaybeDefault(...args): N.Pattern {
      const node = super.parseMaybeDefault(...args);

      if (
        node.type === "AssignmentPattern" &&
        node.typeAnnotation &&
        node.right.start < node.typeAnnotation.start
      ) {
        this.raise(
          node.typeAnnotation.start,
          TSErrors.TypeAnnotationAfterAssign,
        );
      }

      return node;
    }

    // ensure that inside types, we bypass the jsx parser plugin
    getTokenFromCode(code: number): void {
      if (this.state.inType) {
        if (code === charCodes.greaterThan) {
          return this.finishOp(tt.gt, 1);
        }
        if (code === charCodes.lessThan) {
          return this.finishOp(tt.lt, 1);
        }
      }
      return super.getTokenFromCode(code);
    }

    // used after we have finished parsing types
    reScan_lt_gt() {
      const { type } = this.state;
      if (type === tt.lt) {
        this.state.pos -= 1;
        this.readToken_lt();
      } else if (type === tt.gt) {
        this.state.pos -= 1;
        this.readToken_gt();
      }
    }

    toAssignableList(exprList: N.Expression[]): $ReadOnlyArray<N.Pattern> {
      for (let i = 0; i < exprList.length; i++) {
        const expr = exprList[i];
        if (!expr) continue;
        switch (expr.type) {
          case "TSTypeCastExpression":
            exprList[i] = this.typeCastToParameter(expr);
            break;
          case "TSAsExpression":
          case "TSTypeAssertion":
            if (!this.state.maybeInArrowParameters) {
              exprList[i] = this.typeCastToParameter(expr);
            } else {
              this.raise(expr.start, TSErrors.UnexpectedTypeCastInParameter);
            }
            break;
        }
      }
      return super.toAssignableList(...arguments);
    }

    typeCastToParameter(node: N.TsTypeCastExpression): N.Node {
      node.expression.typeAnnotation = node.typeAnnotation;

      this.resetEndLocation(
        node.expression,
        node.typeAnnotation.end,
        node.typeAnnotation.loc.end,
      );

      return node.expression;
    }

    shouldParseArrow(params: Array<N.Node>) {
      if (this.match(tt.colon)) {
        return params.every(expr => this.isAssignable(expr, true));
      }
      return super.shouldParseArrow(params);
    }

    shouldParseAsyncArrow(): boolean {
      return this.match(tt.colon) || super.shouldParseAsyncArrow();
    }

    canHaveLeadingDecorator() {
      // Avoid unnecessary lookahead in checking for abstract class unless needed!
      return super.canHaveLeadingDecorator() || this.isAbstractClass();
    }

    jsxParseOpeningElementAfterName(
      node: N.JSXOpeningElement,
    ): N.JSXOpeningElement {
      if (this.match(tt.lt)) {
        const typeArguments = this.tsTryParseAndCatch(() =>
          this.tsParseTypeArguments(),
        );
        if (typeArguments) node.typeParameters = typeArguments;
      }
      return super.jsxParseOpeningElementAfterName(node);
    }

    getGetterSetterExpectedParamCount(
      method: N.ObjectMethod | N.ClassMethod,
    ): number {
      const baseCount = super.getGetterSetterExpectedParamCount(method);
      const params = this.getObjectOrClassMethodParams(method);
      const firstParam = params[0];
      const hasContextParam = firstParam && this.isThisParam(firstParam);

      return hasContextParam ? baseCount + 1 : baseCount;
    }

    parseCatchClauseParam(): N.Pattern {
      const param = super.parseCatchClauseParam();
      const type = this.tsTryParseTypeAnnotation();

      if (type) {
        param.typeAnnotation = type;
        this.resetEndLocation(param);
      }

      return param;
    }

    tsInAmbientContext<T>(cb: () => T): T {
      const oldIsAmbientContext = this.state.isAmbientContext;
      this.state.isAmbientContext = true;
      try {
        return cb();
      } finally {
        this.state.isAmbientContext = oldIsAmbientContext;
      }
    }

    parseClass<T: N.Class>(node: T, ...args: any[]): T {
      const oldInAbstractClass = this.state.inAbstractClass;
      this.state.inAbstractClass = !!(node: any).abstract;
      try {
        return super.parseClass(node, ...args);
      } finally {
        this.state.inAbstractClass = oldInAbstractClass;
      }
    }

    tsParseAbstractDeclaration(
      node: any,
    ): N.ClassDeclaration | N.TsInterfaceDeclaration | typeof undefined {
      if (this.match(tt._class)) {
        node.abstract = true;
        return this.parseClass<N.ClassDeclaration>(
          (node: N.ClassDeclaration),
          /* isStatement */ true,
          /* optionalId */ false,
        );
      } else if (this.isContextual(tt._interface)) {
        // for invalid abstract interface

        // To avoid
        //   abstract interface
        //   Foo {}
        if (!this.hasFollowingLineBreak()) {
          node.abstract = true;
          this.raise(
            node.start,
            TSErrors.NonClassMethodPropertyHasAbstractModifer,
          );
          this.next();
          return this.tsParseInterfaceDeclaration(
            (node: N.TsInterfaceDeclaration),
          );
        }
      } else {
        this.unexpected(null, tt._class);
      }
    }

    parseMethod(...args: any[]) {
      const method = super.parseMethod(...args);
      if (method.abstract) {
        const hasBody = this.hasPlugin("estree")
          ? !!method.value.body
          : !!method.body;
        if (hasBody) {
          const { key } = method;
          this.raise(
            method.start,
            TSErrors.AbstractMethodHasImplementation,
            key.type === "Identifier" && !method.computed
              ? key.name
              : `[${this.input.slice(key.start, key.end)}]`,
          );
        }
      }
      return method;
    }

    tsParseTypeParameterName(): N.Identifier | string {
      const typeName: N.Identifier = this.parseIdentifier();
      return process.env.BABEL_8_BREAKING ? typeName : typeName.name;
    }

    shouldParseAsAmbientContext(): boolean {
      return !!this.getPluginOption("typescript", "dts");
    }

    parse() {
      if (this.shouldParseAsAmbientContext()) {
        this.state.isAmbientContext = true;
      }
      return super.parse();
    }

    getExpression() {
      if (this.shouldParseAsAmbientContext()) {
        this.state.isAmbientContext = true;
      }
      return super.getExpression();
    }

    parseExportSpecifier(
      node: any,
      isString: boolean,
      isInTypeExport: boolean,
      isMaybeTypeOnly: boolean,
    ) {
      if (!isString && isMaybeTypeOnly) {
        this.parseTypeOnlyImportExportSpecifier(
          node,
          /* isImport */ false,
          isInTypeExport,
        );
        return this.finishNode<N.ExportSpecifier>(node, "ExportSpecifier");
      }
      node.exportKind = "value";
      return super.parseExportSpecifier(
        node,
        isString,
        isInTypeExport,
        isMaybeTypeOnly,
      );
    }

    parseImportSpecifier(
      specifier: any,
      importedIsString: boolean,
      isInTypeOnlyImport: boolean,
      isMaybeTypeOnly: boolean,
    ): N.ImportSpecifier {
      if (!importedIsString && isMaybeTypeOnly) {
        this.parseTypeOnlyImportExportSpecifier(
          specifier,
          /* isImport */ true,
          isInTypeOnlyImport,
        );
        return this.finishNode<N.ImportSpecifier>(specifier, "ImportSpecifier");
      }
      specifier.importKind = "value";
      return super.parseImportSpecifier(
        specifier,
        importedIsString,
        isInTypeOnlyImport,
        isMaybeTypeOnly,
      );
    }

    parseTypeOnlyImportExportSpecifier(
      node: any,
      isImport: boolean,
      isInTypeOnlyImportExport: boolean,
    ): void {
      const leftOfAsKey = isImport ? "imported" : "local";
      const rightOfAsKey = isImport ? "local" : "exported";

      let leftOfAs = node[leftOfAsKey];
      let rightOfAs;

      let hasTypeSpecifier = false;
      let canParseAsKeyword = true;

      const pos = leftOfAs.start;

      // https://github.com/microsoft/TypeScript/blob/fc4f9d83d5939047aa6bb2a43965c6e9bbfbc35b/src/compiler/parser.ts#L7411-L7456
      // import { type } from "mod";          - hasTypeSpecifier: false, leftOfAs: type
      // import { type as } from "mod";       - hasTypeSpecifier: true,  leftOfAs: as
      // import { type as as } from "mod";    - hasTypeSpecifier: false, leftOfAs: type, rightOfAs: as
      // import { type as as as } from "mod"; - hasTypeSpecifier: true,  leftOfAs: as,   rightOfAs: as
      if (this.isContextual(tt._as)) {
        // { type as ...? }
        const firstAs = this.parseIdentifier();
        if (this.isContextual(tt._as)) {
          // { type as as ...? }
          const secondAs = this.parseIdentifier();
          if (tokenIsKeywordOrIdentifier(this.state.type)) {
            // { type as as something }
            hasTypeSpecifier = true;
            leftOfAs = firstAs;
            rightOfAs = this.parseIdentifier();
            canParseAsKeyword = false;
          } else {
            // { type as as }
            rightOfAs = secondAs;
            canParseAsKeyword = false;
          }
        } else if (tokenIsKeywordOrIdentifier(this.state.type)) {
          // { type as something }
          canParseAsKeyword = false;
          rightOfAs = this.parseIdentifier();
        } else {
          // { type as }
          hasTypeSpecifier = true;
          leftOfAs = firstAs;
        }
      } else if (tokenIsKeywordOrIdentifier(this.state.type)) {
        // { type something ...? }
        hasTypeSpecifier = true;
        leftOfAs = this.parseIdentifier();
      }
      if (hasTypeSpecifier && isInTypeOnlyImportExport) {
        this.raise(
          pos,
          isImport
            ? TSErrors.TypeModifierIsUsedInTypeImports
            : TSErrors.TypeModifierIsUsedInTypeExports,
        );
      }

      node[leftOfAsKey] = leftOfAs;
      node[rightOfAsKey] = rightOfAs;

      const kindKey = isImport ? "importKind" : "exportKind";
      node[kindKey] = hasTypeSpecifier ? "type" : "value";

      if (canParseAsKeyword && this.eatContextual(tt._as)) {
        node[rightOfAsKey] = isImport
          ? this.parseIdentifier()
          : this.parseModuleExportName();
      }
      if (!node[rightOfAsKey]) {
        node[rightOfAsKey] = cloneIdentifier(node[leftOfAsKey]);
      }
      if (isImport) {
        this.checkLVal(node[rightOfAsKey], "import specifier", BIND_LEXICAL);
      }
    }
  };
