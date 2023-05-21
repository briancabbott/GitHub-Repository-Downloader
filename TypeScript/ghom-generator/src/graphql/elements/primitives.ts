import { 
    ConstListValueNode, 
    ConstObjectFieldNode, 
    ConstObjectValueNode, 
    ListTypeNode, 
    NamedTypeNode, 
    NonNullTypeNode 
} from "graphql";
import { 
    ElementDefinition, 
    ElementDefinitionPrimitiveTypes, 
    ElementDefinitionType,
} from "./core";

export class ElementDefinition_StringValueNode extends ElementDefinition {
    value: string;
    constructor(name: string, value: string) {
        super(name, ElementDefinitionType.StringValueNode);
        this.value = value;
    }
    
    equals(other: ElementDefinition): boolean {
        return true;
    }
}

export class ElementDefinition_IntValueNode extends ElementDefinition {
    value: number;
    constructor(name: string, value: number) {
        super(name, ElementDefinitionType.IntValueNode);
        this.value = value;
    }
}

export class ElementDefinition_FloatValueNode extends ElementDefinition {
    value: number;
    constructor(name: string, value: number) {
        super(name, ElementDefinitionType.FloatValueNode);
        this.value = value;
    }
}

export class ElementDefinition_BooleanValueNode extends ElementDefinition {
    value: boolean;
    constructor(name: string, value: boolean) {
        super(name, ElementDefinitionType.BooleanValueNode);
        this.value = value;
    }
}

export class ElementDefinition_NullValueNode extends ElementDefinition {
    constructor(name: string) {
        super(name, ElementDefinitionType.NullValueNode);
    }
}

export class ElementDefinition_EnumValueNode extends ElementDefinition {
    value: string;
    constructor(name: string, value: string) {
        super(name, ElementDefinitionType.EnumValueNode);
        this.value = value;
    }
}

export class ElementDefinition_ConstListValueNode extends ElementDefinition {
    values: Array<ElementDefinitionPrimitiveTypes>;
    constructor(name: string, values: Array<ElementDefinitionPrimitiveTypes>) {
        super(name, ElementDefinitionType.ConstListValueNode);
        this.values = values;
    }

    static fromConstListValueNode(node: ConstListValueNode): ElementDefinition_ConstListValueNode {
        const values = node.values.map((value) => {
            if (value.kind === "IntValue") {
                return new ElementDefinition_IntValueNode("value", parseInt(value.value));
            } else if (value.kind === "FloatValue") {
                return new ElementDefinition_FloatValueNode("value", parseFloat(value.value));
            } else if (value.kind === "StringValue") {
                return new ElementDefinition_StringValueNode("value", value.value);
            } else if (value.kind === "BooleanValue") {
                return new ElementDefinition_BooleanValueNode("value", value.value);
            } else if (value.kind === "EnumValue") {
                return new ElementDefinition_EnumValueNode("value", value.value);
            } else if (value.kind === "NullValue") {
                return new ElementDefinition_NullValueNode("value");
            } else if (value.kind === "ListValue") {
                return ElementDefinition_ConstListValueNode.fromConstListValueNode(value);
            } else if (value.kind === "ObjectValue") {
                return ElementDefinition_ConstObjectValueNode.fromConstObjectValueNode(value);
            } else {
                throw new Error(`Unknown value kind ${value}`);
            }
        });
        return new ElementDefinition_ConstListValueNode(ElementDefinitionType.ConstListValueNode, values);
    }
}

export class ElementDefinition_ConstObjectValueNode extends ElementDefinition {
    fields: Array<ElementDefinition_ConstObjectFieldNode>;

    constructor(name: string, fields: Array<ElementDefinition_ConstObjectFieldNode>) {
        super(name, ElementDefinitionType.ConstObjectValueNode);
        this.fields = fields;
    }

    static fromConstObjectValueNode(node: ConstObjectValueNode): ElementDefinition_ConstObjectValueNode {
        let objFields = Array<ElementDefinition_ConstObjectFieldNode>();
        node.fields.forEach((ffield) => {
            objFields.push(ElementDefinition_ConstObjectFieldNode.fromConstObjectFieldNode(ffield));
        });

        return new ElementDefinition_ConstObjectValueNode(ElementDefinitionType.ConstObjectValueNode, objFields);
    }
}

export class ElementDefinition_ConstObjectFieldNode extends ElementDefinition {
    name: string;
    value: ElementDefinitionPrimitiveTypes;
    constructor(name: string, value: ElementDefinitionPrimitiveTypes) {
        super(name, ElementDefinitionType.ConstObjectFieldNode);
        this.name = name;
        this.value = value;
    }

    static fromConstObjectFieldNode(fieldNode: ConstObjectFieldNode): ElementDefinition_ConstObjectFieldNode {
        let value = fieldNode.value;
        let vvalue: ElementDefinitionPrimitiveTypes;
        
        if (value.kind === "IntValue") {
            vvalue = new ElementDefinition_IntValueNode("value", parseInt(value.value));
        } else if (value.kind === "FloatValue") {
            vvalue = new ElementDefinition_FloatValueNode("value", parseFloat(value.value));
        } else if (value.kind === "StringValue") {
            vvalue = new ElementDefinition_StringValueNode("value", value.value);
        } else if (value.kind === "BooleanValue") {
            vvalue = new ElementDefinition_BooleanValueNode("value", value.value);
        } else if (value.kind === "EnumValue") {
            vvalue = new ElementDefinition_EnumValueNode("value", value.value);
        } else if (value.kind === "NullValue") {
            vvalue = new ElementDefinition_NullValueNode("value");
        } else if (value.kind === "ListValue") {
            vvalue = ElementDefinition_ConstListValueNode.fromConstListValueNode(value);
        } else if (value.kind === "ObjectValue") {
            vvalue = ElementDefinition_ConstObjectValueNode.fromConstObjectValueNode(value);
        } else {
            throw new Error(`Unknown value kind ${value}`);
        }

        return new ElementDefinition_ConstObjectFieldNode(fieldNode.name.value, vvalue);
    }
}

export class ElementDefinition_TypeNode {
    static fromType(ntype: NamedTypeNode | ListTypeNode | NonNullTypeNode): ElementDefinition_NamedTypeNode | ElementDefinition_NonNullType | ElementDefinition_ListType {        
        if (ntype.kind === "NamedType") {
            return new ElementDefinition_NamedTypeNode(ntype.name.value);
        } else if (ntype.kind === "NonNullType") {
            return new ElementDefinition_NonNullType(ntype.type.kind.toString());
        } else if (ntype.kind === "ListType") {
            return new ElementDefinition_ListType(ntype.type.kind.toString());
        } else {
            throw new Error(`Unknown type kind ${ntype}`);
        }
    }
} 

export class ElementDefinition_NamedTypeNode extends ElementDefinition {
    
    constructor(name: string) {
        super(name, ElementDefinitionType.NameType);
    }

    static fromType(ntype: NamedTypeNode | ListTypeNode | NonNullTypeNode): ElementDefinition_NamedTypeNode | ElementDefinition_NonNullType | ElementDefinition_ListType {
        return ElementDefinition_TypeNode.fromType(ntype) as ElementDefinition_NamedTypeNode;
    }
}

export class ElementDefinition_ListType extends ElementDefinition {
    listType: string;
    constructor(name: string) {
        super(name, ElementDefinitionType.ListType);
        this.listType = name;
    }

    static fromType(ntype: NamedTypeNode | ListTypeNode | NonNullTypeNode): ElementDefinition_NamedTypeNode | ElementDefinition_NonNullType | ElementDefinition_ListType {
        return ElementDefinition_TypeNode.fromType(ntype) as ElementDefinition_NamedTypeNode;
    }
}

export class ElementDefinition_NonNullType extends ElementDefinition {
    nonNullType: string;
    constructor(name: string) {
        super(name, ElementDefinitionType.NonNullType);
        this.nonNullType = name;
    }

    static fromType(ntype: NamedTypeNode | ListTypeNode | NonNullTypeNode): ElementDefinition_NamedTypeNode | ElementDefinition_NonNullType | ElementDefinition_ListType {
        return ElementDefinition_TypeNode.fromType(ntype) as ElementDefinition_NamedTypeNode;
    }
}