import { FieldDefinitionNode, StringValueNode } from "graphql";
import { ElementDefinition, ElementDefinitionType } from "./core";
import { ElementDefinition_ListType, ElementDefinition_NamedTypeNode, ElementDefinition_NonNullType, ElementDefinition_StringValueNode } from "./primitives";
import { ElementDefinition_InputValueDefinition } from "./input_value_definition";
import { ElementDefinition_Directive } from "./directive";
import { ElementDefinition_TypeTypes } from "./core";

export class ElementDefinition_Field extends ElementDefinition {
    constructor(name: string) {
        super(name, ElementDefinitionType.FieldDefinition);
    }

    public get Name(): string {
        return this.name
    }
    public set Name(name: string) {
        this.name = name;
    }

    public get Description(): ElementDefinition_StringValueNode {
        return this.properties?.get("Description") as ElementDefinition_StringValueNode;
    }
    public set Description(description: ElementDefinition_StringValueNode) {
        this.properties?.set("Description", description);
    }

    public get Arguments(): Array<ElementDefinition_InputValueDefinition> {
        return this.properties?.get("Arguments") as Array<ElementDefinition_InputValueDefinition>;
    }
    public set Arguments(ivd: Array<ElementDefinition_InputValueDefinition>) {
        this.properties?.set("Arguments", ivd);
    }

    public get Type(): ElementDefinition_TypeTypes {
        return this.properties?.get("Type") as ElementDefinition_TypeTypes;
    }
    public set Type(type: ElementDefinition_TypeTypes) {
        this.properties?.set("Type", type);
    }

    public get Directives(): Array<ElementDefinition_Directive> {
        return this.properties?.get("Directives") as Array<ElementDefinition_Directive>;
    }
    public set Directives(directives: Array<ElementDefinition_Directive>) {
        this.properties?.set("Directives", directives);
    }

    public static fromFieldDefinitionNode(ffield: FieldDefinitionNode): ElementDefinition_Field {
        let fieldName = ffield.name.value;
        let fieldElement = new ElementDefinition_Field(fieldName);

        if (ffield.description !== undefined) {
            let description = new ElementDefinition_StringValueNode("Description", ffield.description.value);
            fieldElement.properties?.set("Description", description);
        }

        if (ffield.arguments !== undefined) {
            let argumentsElements = new Array<ElementDefinition_InputValueDefinition>();
            ffield.arguments.forEach((aargument) => {
                let argumentElement = ElementDefinition_InputValueDefinition.fromInputValueDefinitionNode(aargument);
                argumentsElements.push(argumentElement);
            });
            fieldElement.properties?.set("Arguments", argumentsElements);
        }

        if (ffield.type !== undefined) {
            if (ffield.type.kind === "NamedType") {
                fieldElement.properties?.set("Type", new ElementDefinition_NamedTypeNode(ffield.type.name.value));
            } else if (ffield.type.kind === "NonNullType") {
                fieldElement.properties?.set("Type", new ElementDefinition_NonNullType("Type"));    
            } else if (ffield.type.kind === "ListType") {
                fieldElement.properties?.set("Type", new ElementDefinition_ListType(ffield.type.type.kind.toString()));
            }
        }

        if (ffield.directives !== undefined) {
            let directivesElements = new Array<ElementDefinition>();
            ffield.directives.forEach((ddirective) => {
                let ddirectiveName = ddirective.name.value;
                ddirective.arguments?.forEach((aargument) => {

                });
            });
            fieldElement.properties?.set("Directives", directivesElements);
        }
        return fieldElement;
    }
}
