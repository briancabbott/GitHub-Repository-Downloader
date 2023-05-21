"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementDefinition_InterfaceType = void 0;
const core_1 = require("./core");
const primitives_1 = require("./primitives");
const directive_1 = require("./directive");
const field_1 = require("./field");
class ElementDefinition_InterfaceType extends core_1.ElementDefinition {
    constructor(name, properties) {
        super(name, core_1.ElementDefinitionType.InterfaceType, properties);
    }
    get Description() {
        return (this.properties?.get("Description")).value;
    }
    set Description(description) {
        this.properties?.set("Description", new primitives_1.ElementDefinition_StringValueNode("Description", description));
    }
    get ImplementsInterfaces() {
        return this.properties?.get("ImplementsInterfaces");
    }
    set ImplementsInterfaces(implementedInterfaces) {
        this.properties.set("ImplementsInterfaces", implementedInterfaces);
    }
    get Directives() {
        return this.properties?.get("Directives");
    }
    set Directives(directives) {
        this.properties?.set("Directives", directives);
    }
    get Fields() {
        return this.properties?.get("Fields");
    }
    set Fields(fields) {
        this.properties?.set("Fields", fields);
    }
    static fromInterfaceTypeDefinitionNode(interfaceTypeDefinitionNode) {
        let interfaceType = new ElementDefinition_InterfaceType(interfaceTypeDefinitionNode.name.value);
        if (interfaceTypeDefinitionNode.description !== undefined) {
            interfaceType.Description = interfaceTypeDefinitionNode.description.value;
            interfaceType.properties?.set("Description", new primitives_1.ElementDefinition_StringValueNode("Description", interfaceTypeDefinitionNode.description.value));
        }
        if (interfaceTypeDefinitionNode.interfaces !== undefined) {
            let implementedInterfaces = new Array();
            interfaceTypeDefinitionNode.interfaces.forEach((iinterface) => {
                implementedInterfaces.push(new primitives_1.ElementDefinition_StringValueNode(iinterface.name.value, core_1.ElementDefinitionType.InterfaceType));
            });
            interfaceType.Properties.set("ImplementsInterfaces", implementedInterfaces);
        }
        if (interfaceTypeDefinitionNode.directives !== undefined) {
            let directivesElements = new Array();
            interfaceTypeDefinitionNode.directives.forEach((ddirective) => {
                let directiveElement = directive_1.ElementDefinition_Directive.fromDirectiveNode(ddirective);
                directivesElements.push(directiveElement);
            });
            interfaceType.properties?.set("Directives", directivesElements);
        }
        if (interfaceTypeDefinitionNode.fields !== undefined) {
            let fieldsElements = new Array();
            interfaceTypeDefinitionNode.fields.forEach((ffield) => {
                let field = field_1.ElementDefinition_Field.fromFieldDefinitionNode(ffield);
                fieldsElements.push(field);
            });
            interfaceType.properties.set("Fields", fieldsElements);
        }
        return interfaceType;
    }
}
exports.ElementDefinition_InterfaceType = ElementDefinition_InterfaceType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2dyYXBocWwvZWxlbWVudHMvaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLGlDQUdnQjtBQUVoQiw2Q0FBaUU7QUFDakUsMkNBQTBEO0FBQzFELG1DQUFrRDtBQUVsRCxNQUFhLCtCQUFnQyxTQUFRLHdCQUFpQjtJQUVsRSxZQUFZLElBQVksRUFBRSxVQUFrRDtRQUN4RSxLQUFLLENBQUMsSUFBSSxFQUFFLDRCQUFxQixDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQXVDLENBQUEsQ0FBQyxLQUFLLENBQUM7SUFDNUYsQ0FBQztJQUNELElBQVcsV0FBVyxDQUFDLFdBQW1CO1FBQ3RDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLDhDQUFpQyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQzNHLENBQUM7SUFFRCxJQUFXLG9CQUFvQjtRQUMzQixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLHNCQUFzQixDQUE2QyxDQUFDO0lBQ3BHLENBQUM7SUFDRCxJQUFXLG9CQUFvQixDQUFDLHFCQUErRDtRQUMzRixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDakIsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQTZDLENBQUM7SUFDMUYsQ0FBQztJQUNELElBQVcsVUFBVSxDQUFDLFVBQW9EO1FBQ3RFLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLFlBQVksRUFBRSxVQUFV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