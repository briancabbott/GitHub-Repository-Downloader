"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementDefinition_Field = void 0;
const core_1 = require("./core");
const primitives_1 = require("./primitives");
const input_value_definition_1 = require("./input_value_definition");
const directive_1 = require("./directive");
class ElementDefinition_Field extends core_1.ElementDefinition {
    constructor(name) {
        super(name, core_1.ElementDefinitionType.FieldDefinition);
    }
    get Name() {
        return this.name;
    }
    set Name(name) {
        this.name = name;
    }
    get Description() {
        return this.properties?.get("Description");
    }
    set Description(description) {
        this.properties?.set("Description", description);
    }
    get Arguments() {
        return this.properties?.get("Arguments");
    }
    set Arguments(ivd) {
        this.properties?.set("Arguments", ivd);
    }
    get Type() {
        return this.properties?.get("Type");
    }
    set Type(type) {
        this.properties?.set("Type", type);
    }
    get Directives() {
        return this.properties?.get("Directives");
    }
    set Directives(directives) {
        this.properties?.set("Directives", directives);
    }
    static fromFieldDefinitionNode(ffield) {
        let fieldName = ffield.name.value;
        let fieldElement = new ElementDefinition_Field(fieldName);
        if (ffield.description !== undefined) {
            let description = new primitives_1.ElementDefinition_StringValueNode("Description", ffield.description.value);
            fieldElement.properties?.set("Description", description);
        }
        if (ffield.arguments !== undefined) {
            let argumentsElements = new Array();
            ffield.arguments.forEach((aargument) => {
                let argumentElement = input_value_definition_1.ElementDefinition_InputValueDefinition.fromInputValueDefinitionNode(aargument);
                argumentsElements.push(argumentElement);
            });
            fieldElement.properties?.set("Arguments", argumentsElements);
        }
        if (ffield.type !== undefined) {
            if (ffield.type.kind === "NamedType") {
                fieldElement.properties?.set("Type", new primitives_1.ElementDefinition_NamedTypeNode(ffield.type.name.value));
            }
            else if (ffield.type.kind === "NonNullType") {
                fieldElement.properties?.set("Type", new primitives_1.ElementDefinition_NonNullType("Type"));
            }
            else if (ffield.type.kind === "ListType") {
                fieldElement.properties?.set("Type", new primitives_1.ElementDefinition_ListType(ffield.type.type.kind.toString()));
            }
        }
        if (ffield.directives !== undefined) {
            let directivesElements = new Array();
            ffield.directives.forEach((ddirective) => {
                ddirective.arguments?.forEach((aargument) => {
                    let directive = directive_1.ElementDefinition_Directive.fromDirectiveNode(ddirective);
                    directivesElements.push(directive);
                });
            });
            fieldElement.properties?.set("Directives", directivesElements);
        }
        return fieldElement;
    }
}
exports.ElementDefinition_Field = ElementDefinition_Field;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ3JhcGhxbC9lbGVtZW50cy9maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxpQ0FHZ0I7QUFDaEIsNkNBS3NCO0FBRXRCLHFFQUFrRjtBQUNsRiwyQ0FBMEQ7QUFHMUQsTUFBYSx1QkFBd0IsU0FBUSx3QkFBaUI7SUFFMUQsWUFBWSxJQUFZO1FBQ3BCLEtBQUssQ0FBQyxJQUFJLEVBQUUsNEJBQXFCLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQTtJQUNwQixDQUFDO0lBQ0QsSUFBVyxJQUFJLENBQUMsSUFBWTtRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFzQyxDQUFDO0lBQ3BGLENBQUM7SUFDRCxJQUFXLFdBQVcsQ0FBQyxXQUE4QztRQUNqRSxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELElBQVcsU0FBUztRQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBa0QsQ0FBQztJQUM5RixDQUFDO0lBQ0QsSUFBVyxTQUFTLENBQUMsR0FBa0Q7UUFDbkUsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBZ0MsQ0FBQztJQUN2RSxDQUFDO0lBQ0QsSUFBVyxJQUFJLENBQUMsSUFBaUM7UUFDN0MsSUFBSSxDQUFD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