import {
    ASTNode,
    ArgumentNode,

    ConstValueNode,
    ConstDirectiveNode,

    DirectiveNode,
    DocumentNode,

    FieldDefinitionNode,
    InterfaceTypeDefinitionNode,

    ObjectTypeDefinitionNode,

    visit,
    NameNode
} from 'graphql';


export enum ElementDefinitionType {
    ObjectType = "object",
    InterfaceType = "interface",
    NameType = "name",
    Directive = "directive",
    Argument = "argument",
    FieldDefinition = "field",
    NamedTypeNode = "namedTypeNode",
    ListType = "listType",
    NonNullType = "nonNullType",
    InputValueDefinitionNode = "inputValueDefinitionNode",

    // (Primitive) Value Nodes
    StringValueNode = "string",
    IntValueNode = "int",
    FloatValueNode = "float",
    BooleanValueNode = "boolean",
    NullValueNode = "null",
    EnumValueNode = "enum",
    ConstListValueNode = "constList",
    ConstObjectValueNode = "constObject",
}

export class ElementDefinition_Ref {
    name: string
    type: ElementDefinitionType
    parentRefs: Array<ElementDefinition_Ref>
    childRefs: Array<ElementDefinition_Ref>

    constructor(name: string, type: ElementDefinitionType, parentRefs: Array<ElementDefinition_Ref>, childRefs: Array<ElementDefinition_Ref>) {
        this.name = name;
        this.type = type;
        this.parentRefs = parentRefs;
        this.childRefs = childRefs;
    }

    isRelativelyEqual(other: ElementDefinition_Ref): boolean {
        if (this.name === other.name && this.type === other.type) {
            return true;
        }
        return false;
    }

    isAbsolutelyEqual(other: ElementDefinition_Ref): boolean {
        let relEquals: boolean = this.isRelativelyEqual(other)
        let parentRefsEqual: boolean = this.parentRefs.length === other.parentRefs.length && this.parentRefs.every((parentRef, index) => {
            other.parentRefs[index].isRelativelyEqual(parentRef)
        });
        return relEquals && parentRefsEqual;
    }
}

export class ElementDefinition {
    name: string;
    type: ElementDefinitionType;

    // Graph Path Elements --- Move to differant super-structure ---- Elements is object-value/primitive-value artifacts...
    // key?: string | number | undefined; 
    // parent?: ASTNode | ReadonlyArray<ASTNode> | undefined; 
    // path?: ReadonlyArray<string | number> | undefined;
    // ancestors?: ReadonlyArray<ASTNode | ReadonlyArray<ASTNode>> | undefined;
    properties?: Map<string, ElementDefinition | Array<ElementDefinition>> | undefined;

    constructor(name: string, 
                type: ElementDefinitionType,
                // key?: string | number | undefined, 
                // parent?: ASTNode | ReadonlyArray<ASTNode> | undefined, 
                // path?: ReadonlyArray<string | number> | undefined,
                // ancestors?: ReadonlyArray<ASTNode | ReadonlyArray<ASTNode>> | undefined,
                properties?: Map<string, ElementDefinition | Array<ElementDefinition>> | undefined) {
        this.name = name;
        this.type = type;
    
        // this.key = key;
        // this.parent = parent;
        // this.path = path;
        // this.ancestors = ancestors;
        this.properties = properties;
    }
    
    equals(other: ElementDefinition): boolean {
        return true;
    }
}

export type ElementRefDef = {ref: ElementDefinition_Ref, def: ElementDefinition};
