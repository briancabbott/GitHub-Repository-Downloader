import { ArgumentNode } from "graphql";
import { ElementDefinition, ElementDefinitionType } from "./core";
import { 
    ElementDefinition_BooleanValueNode, 
    ElementDefinition_EnumValueNode, 
    ElementDefinition_FloatValueNode, 
    ElementDefinition_IntValueNode, 
    ElementDefinition_NullValueNode, 
    ElementDefinition_StringValueNode 
} from "./primitives";

export class ElementDefinition_Argument extends ElementDefinition {
    constructor(argumentName: string) {
        super(argumentName, ElementDefinitionType.Argument);
    }

    public get Name(): string {
        return this.name;
    }
    public set Name(name: string) {
        this.name = name;
    }

    public get Value(): ElementDefinition_StringValueNode | ElementDefinition_IntValueNode | ElementDefinition_FloatValueNode | ElementDefinition_BooleanValueNode | ElementDefinition_EnumValueNode | ElementDefinition_NullValueNode | undefined {
        return this.properties?.get("Value") as 
            ElementDefinition_StringValueNode | ElementDefinition_IntValueNode | 
            ElementDefinition_FloatValueNode | ElementDefinition_BooleanValueNode | 
            ElementDefinition_EnumValueNode | ElementDefinition_NullValueNode | undefined;
    }
    public set Value(value: ElementDefinition_StringValueNode | ElementDefinition_IntValueNode | ElementDefinition_FloatValueNode | ElementDefinition_BooleanValueNode | ElementDefinition_EnumValueNode | ElementDefinition_NullValueNode | undefined) {
        if (value !== undefined) {
            this.properties?.set("Value", value);
        }
    }

    static fromArgumentNode(aargument: ArgumentNode): ElementDefinition_Argument {
        let argumentName = aargument.name.value;
        let argumentElement = new ElementDefinition_Argument(argumentName);


        if (aargument.value.kind === "StringValue") {
            argumentElement.properties?.set("Value", new ElementDefinition_StringValueNode("Value", aargument.value.value));
        } else if (aargument.value.kind === "IntValue") {
            argumentElement.properties?.set("Value", new ElementDefinition_IntValueNode("Value", parseInt(aargument.value.value)));
        } else if (aargument.value.kind === "FloatValue") {
            argumentElement.properties?.set("Value", new ElementDefinition_FloatValueNode("Value", parseFloat(aargument.value.value)));
        } else if (aargument.value.kind === "BooleanValue") {
            argumentElement.properties?.set("Value", new ElementDefinition_BooleanValueNode("Value", aargument.value.value));
        } else if (aargument.value.kind === "EnumValue") {
            argumentElement.properties?.set("Value", new ElementDefinition_EnumValueNode("Value", aargument.value.value));
        } else if (aargument.value.kind === "ListValue") {
            // argumentElement.properties?.set("Value", new ElementDefinition_ListValueNode("Value", aargument.value.values));
            throw new Error("ListValue not implemented");
        } else if (aargument.value.kind === "ObjectValue") {
            // argumentElement.properties?.set("Value", new ElementDefinition_ObjectValueNode("Value", aargument.value.fields));
            throw new Error("ObjectValue not implemented");
        } else if (aargument.value.kind === "NullValue") {
            argumentElement.properties?.set("Value", new ElementDefinition_NullValueNode("Value"));
        }

        return argumentElement;
    }
}