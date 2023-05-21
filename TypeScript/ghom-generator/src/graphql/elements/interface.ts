
import {
    FieldDefinitionNode,
    InterfaceTypeDefinitionNode,
} from 'graphql';
import { 
    ElementDefinition, 
    ElementDefinitionType 
} from './core';

import { ElementDefinition_StringValueNode } from './primitives';
import { ElementDefinition_Directive } from './directive';
import { ElementDefinition_Field } from './field';

export class ElementDefinition_InterfaceType extends ElementDefinition {

    constructor(name: string, properties?: Map<string, Array<ElementDefinition>>) {
        super(name, ElementDefinitionType.InterfaceType, properties);
    }

    public get Description(): string {
        return (this.properties?.get("Description") as ElementDefinition_StringValueNode).value;
    }
    public set Description(description: string) {
        this.properties?.set("Description", new ElementDefinition_StringValueNode("Description", description));
    }

    public get ImplementsInterfaces(): Array<ElementDefinition_StringValueNode> {
        return this.properties?.get("ImplementsInterfaces") as Array<ElementDefinition_StringValueNode>;
    }
    public set ImplementsInterfaces(implementedInterfaces: Array<ElementDefinition_StringValueNode>) {
        this.properties.set("ImplementsInterfaces", implementedInterfaces);
    }

    public get Directives(): Array<ElementDefinition_StringValueNode> {
        return this.properties?.get("Directives") as Array<ElementDefinition_StringValueNode>;
    }
    public set Directives(directives: Array<ElementDefinition_StringValueNode>) {
        this.properties?.set("Directives", directives); 
    }

    public get Fields(): Array<ElementDefinition_Field> {
        return this.properties?.get("Fields") as Array<ElementDefinition_Field>;
    }
    public set Fields(fields: Array<ElementDefinition_Field>) {
        this.properties?.set("Fields", fields);
    }

    static fromInterfaceTypeDefinitionNode(interfaceTypeDefinitionNode: InterfaceTypeDefinitionNode): ElementDefinition_InterfaceType {
        let interfaceType = new ElementDefinition_InterfaceType(interfaceTypeDefinitionNode.name.value);

        if (interfaceTypeDefinitionNode.description !== undefined) {
            interfaceType.Description = interfaceTypeDefinitionNode.description.value;
            interfaceType.properties?.set("Description", 
                new ElementDefinition_StringValueNode("Description", 
                    interfaceTypeDefinitionNode.description.value));
        }

        if (interfaceTypeDefinitionNode.interfaces !== undefined) {
            let implementedInterfaces = new Array<ElementDefinition_StringValueNode>();
            interfaceTypeDefinitionNode.interfaces.forEach((iinterface) => {
                implementedInterfaces.push(new ElementDefinition_StringValueNode(iinterface.name.value, ElementDefinitionType.InterfaceType));
            });
            interfaceType.Properties.set("ImplementsInterfaces", implementedInterfaces);
        }

        if (interfaceTypeDefinitionNode.directives !== undefined) {
            let directivesElements = new Array<ElementDefinition>();
            interfaceTypeDefinitionNode.directives.forEach((ddirective) => {
                let directiveElement = ElementDefinition_Directive.fromDirectiveNode(ddirective);
                directivesElements.push(directiveElement);
            });
            interfaceType.properties?.set("Directives", directivesElements);
        }

        if (interfaceTypeDefinitionNode.fields !== undefined) {
            let fieldsElements = new Array<ElementDefinition_Field>();
            
            interfaceTypeDefinitionNode.fields.forEach((ffield) => {
                let field = ElementDefinition_Field.fromFieldDefinitionNode(ffield);
                fieldsElements.push(field);
            });

            interfaceType.properties.set("Fields", fieldsElements)
        }
        
        return interfaceType;
    }
}   