
import { ElementDefinition_Argument } from './argument';
import { 
    ElementDefinition_BooleanValueNode, 
    ElementDefinition_ConstListValueNode, 
    ElementDefinition_ConstObjectFieldNode, 
    ElementDefinition_ConstObjectValueNode, 
    ElementDefinition_EnumValueNode, 
    ElementDefinition_FloatValueNode, 
    ElementDefinition_IntValueNode, 
    ElementDefinition_ListType, 
    ElementDefinition_NamedTypeNode, 
    ElementDefinition_NonNullType, 
    ElementDefinition_NullValueNode, 
    ElementDefinition_StringValueNode 
} from './primitives';
import { ElementDefinition_Directive } from './directive';
import { ElementDefinition_Field } from './field';
import { ElementDefinition_InputValueDefinition } from './input_value_definition';
import { ElementDefinition_InterfaceType } from './interface';

// export enum ElementDefinitionType_Types {
//     NonNullType = "nonNullType",
//     NamedType = "namedType",
//     ListType= "listType",
//     Type = "nonNullType | namedType | listType"
// }

// export enum ElementDefinitionType_Primitives {
//     StringValueNode
//     IntValueNode = "IntValueNode",
//     FloatValueNode = "FloatValueNode",
//     BooleanValueNode = "BooleanValueNode",
//     NullValueNode = "NullValueNode",
//     EnumValueNode = "EnumValueNodeenum",
//     ConstListValueNode = "ConstListValueNode",
//     ConstObjectValueNode = "ConstObjectValueNode",
//     ConstObjectFieldNode = "ConstObjectFieldNode",
// }

// export enum ElementDefinitionType_Objects {
//     ObjectType = "ObjectType",
//     InterfaceType = "InterfaceType",
//     NameType = "NameType",
//     Directive = "Directive",
//     Argument = "Argument",
//     FieldDefinition = "FieldDefinition",
//     InputValueDefinitionNode = "InputValueDefinitionNode"
// }

// export const ElementDefinitionType = { 
// }
// export type ElementDefinitionType = typeof ElementDefinitionType

export enum ElementDefinitionType {
    NonNullType = "NonNullType",
    NamedType = "NamedType",
    ListType= "ListType",
    Type = "NonNullType | NamedType | ListType",


    BooleanValueNode = "BooleanValueNode",
    ConstListValueNode = "ConstListValueNode",
    ConstObjectValueNode = "ConstObjectValueNode",
    ConstObjectFieldNode = "ConstObjectFieldNode",

    EnumValueNode = "EnumValueNode",
    IntValueNode = "IntValueNode",
    FloatValueNode = "FloatValueNode",
    NullValueNode = "NullValueNode",
    StringValueNode = "StringValueNode",

    
    ObjectType = "ObjectType",
    InterfaceType = "InterfaceType",
    NameType = "NameType",
    Directive = "Directive",
    Argument = "Argument",
    FieldDefinition = "FieldDefinition",
    InputValueDefinition = "InputValueDefinition"
}


export class ElementDefinition_Ref {
    name: string
    type: ElementDefinitionType
    parentRefs: Array<ElementDefinition_Ref>
    childRefs: Array<ElementDefinition_Ref>

    constructor(name: string, 
            type: ElementDefinitionType, 
            parentRefs: Array<ElementDefinition_Ref>, 
            childRefs: Array<ElementDefinition_Ref>) {
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
    properties: ElementDefinition_PropertiesMap;

    constructor(name: string, 
                type: ElementDefinitionType,
                properties?: ElementDefinition_PropertiesMap | undefined) {
        this.name = name;
        this.type = type;
        if (properties === undefined) {
            this.properties = new Map<string, ElementDefinition_PropertiesType>();
        } else {
            this.properties = properties;
        }
    }

    public get Properties(): Map<string, ElementDefinition_PropertiesType> {
        return this.properties;
    }
    public set Properties(properties: Map<string, ElementDefinition_PropertiesType>) {
        if (properties === undefined) {
            this.properties = new Map<string, ElementDefinition_PropertiesType>();
        } else {
            this.properties = properties;
        }
    }
    
    equals(other: ElementDefinition_AggregateType): boolean {
        return true;
    }
}

export type ElementRefDef = {ref: ElementDefinition_Ref, def: ElementDefinition_AggregateType};

export type ElementDefinition_TypeTypes = 
    ElementDefinition_NamedTypeNode | 
    ElementDefinition_NonNullType | 
    ElementDefinition_ListType;

export type ElementDefinitionPrimitiveTypes =
    ElementDefinition_BooleanValueNode | 
    ElementDefinition_EnumValueNode | 
    ElementDefinition_FloatValueNode |
    ElementDefinition_IntValueNode | 
    ElementDefinition_ListType |
    ElementDefinition_NonNullType | 
    ElementDefinition_NullValueNode |
    ElementDefinition_StringValueNode | 
    ElementDefinition_ConstListValueNode | 
    ElementDefinition_ConstObjectValueNode | 
    ElementDefinition_ConstObjectFieldNode;

export type ElementDefinitionObjectTypes = 
    ElementDefinition_Argument | 
    ElementDefinition_Directive |
    ElementDefinition_Field |
    ElementDefinition_InputValueDefinition |
    ElementDefinition_InterfaceType |
    ElementDefinition_NamedTypeNode
    
export type ElementDefinition_AggregateType = 
    ElementDefinition & ElementDefinitionPrimitiveTypes & ElementDefinitionObjectTypes;
    
export type ElementDefinition_PropertiesType = ElementDefinition_AggregateType | Array<ElementDefinition_AggregateType>;
export type ElementDefinition_PropertiesMap = Map<string, ElementDefinition_PropertiesType>;
