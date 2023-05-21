
import { InputValueDefinitionNode } from "graphql";
import { ElementDefinition, ElementDefinitionPrimitiveTypes, ElementDefinitionType } from "./core";
import { 
    ElementDefinition_BooleanValueNode, 
    ElementDefinition_ConstListValueNode, 
    ElementDefinition_ConstObjectValueNode, 
    ElementDefinition_EnumValueNode, 
    ElementDefinition_FloatValueNode, 
    ElementDefinition_IntValueNode, 
    ElementDefinition_ListType, 
    ElementDefinition_NamedTypeNode, 
    ElementDefinition_NonNullType, 
    ElementDefinition_NullValueNode, 
    ElementDefinition_StringValueNode, 
    ElementDefinition_TypeNode 
} from "./primitives";
import { ElementDefinition_Directive } from "./directive";



export class ElementDefinition_InputValueDefinition extends ElementDefinition {

    constructor(name: string) {
        super(name, ElementDefinitionType.InputValueDefinition);
    }


    get Name(): string {
        return this.name;
    }
    set Name(name: string) {
        this.name = name;
    }

    
    get Type(): ElementDefinition_NamedTypeNode | ElementDefinition_NonNullType | ElementDefinition_ListType {
        return this.properties.get("Type") as ElementDefinition_NamedTypeNode | ElementDefinition_NonNullType | ElementDefinition_ListType;
    }
    set Type(type: ElementDefinition_NamedTypeNode | ElementDefinition_NonNullType | ElementDefinition_ListType) {
        this.properties.set("Type", type);
    }


    get Description(): ElementDefinition_StringValueNode {
        return this.properties.get("Description") as ElementDefinition_StringValueNode
    }
    set Description(description: ElementDefinition_StringValueNode) {
        this.properties.set("Description", description);
    }


    get DefaultValue(): ElementDefinitionPrimitiveTypes {
        return this.properties.get("DefaultValue") as ElementDefinitionPrimitiveTypes;
    }
    set DefaultValue(defaultValue: ElementDefinitionPrimitiveTypes) {
        this.properties.set("DefaultValue", defaultValue);
    }


    get Directives(): Array<ElementDefinition_Directive> {
        return this.properties.get("Directives") as Array<ElementDefinition_Directive>;
    }
    set Directives(directives: Array<ElementDefinition_Directive>) {
        this.properties.set("Directives", directives);
    }


    static fromInputValueDefinitionNode(inputValueDef: InputValueDefinitionNode): ElementDefinition_InputValueDefinition {
        let elementDefinition = new ElementDefinition_InputValueDefinition(inputValueDef.name.value);
        elementDefinition.Type = ElementDefinition_TypeNode.fromType(inputValueDef.type);

        if (inputValueDef.description !== undefined) {
            elementDefinition.Description = new ElementDefinition_StringValueNode("Description", inputValueDef.description?.value);
        }

        if (inputValueDef.defaultValue !== undefined) {
            switch (inputValueDef.defaultValue.kind) {
                case "BooleanValue":
                    elementDefinition.DefaultValue = new ElementDefinition_BooleanValueNode("DefaultValue", inputValueDef.defaultValue.value);
                    break;
                case "EnumValue":
                    elementDefinition.DefaultValue = new ElementDefinition_EnumValueNode("DefaultValue", inputValueDef.defaultValue.value);
                    break;
                case "FloatValue":
                    elementDefinition.DefaultValue = new ElementDefinition_FloatValueNode("DefaultValue", parseFloat(inputValueDef.defaultValue.value));
                    break;
                case "IntValue":
                    elementDefinition.DefaultValue = new ElementDefinition_IntValueNode("DefaultValue", parseInt(inputValueDef.defaultValue.value));
                    break;
                case "ListValue":
                    elementDefinition.DefaultValue = ElementDefinition_ConstListValueNode.fromConstListValueNode(inputValueDef.defaultValue);
                    break;
                case "NullValue":
                    elementDefinition.DefaultValue = new ElementDefinition_NullValueNode("DefaultValue");
                    break;
                case "ObjectValue":
                    elementDefinition.DefaultValue = ElementDefinition_ConstObjectValueNode.fromConstObjectValueNode(inputValueDef.defaultValue);
                    break;
                case "StringValue":
                    elementDefinition.DefaultValue = new ElementDefinition_StringValueNode("DefaultValue", inputValueDef.defaultValue.value);
                    break;
            }
        }
        inputValueDef.directives?.forEach(directive => {
            elementDefinition.Directives.push(ElementDefinition_Directive.fromDirectiveNode(directive));
        });

        return elementDefinition;
    }

}