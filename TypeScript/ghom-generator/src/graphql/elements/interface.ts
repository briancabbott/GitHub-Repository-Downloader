
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
import { ElementDefinition_Argument } from './argument';

export class ElementDefinition_InterfaceType extends ElementDefinition {

    // key?: string | number | undefined, 
    // parent?: ASTNode | ReadonlyArray<ASTNode> | undefined, 
    // path?: ReadonlyArray<string | number> | undefined,
    // ancestors?: ReadonlyArray<ASTNode | ReadonlyArray<ASTNode>>,

    constructor(name: string, properties?: Map<string, Array<ElementDefinition>>) {
        super(name, ElementDefinitionType.InterfaceType, properties);
    }

    set Description(description: string) {
        this.properties?.set("Description", new ElementDefinition_StringValueNode("Description", description));
    }


    set ImplementsInterfaces(interfaces: Array<InterfaceTypeDefinitionNode>) {
        let implementedInterfaces = new Array<ElementDefinition>();
        interfaces.forEach((iinterface) => {
            let interfaceName = iinterface.name.value;
            let interfaceElement = 
                new ElementDefinition(interfaceName, ElementDefinitionType.InterfaceType);
            implementedInterfaces.push(interfaceElement);
        });
        this.properties.set("ImplementsInterfaces", implementedInterfaces);
    }

    get Directives(): Array<ElementDefinition_StringValueNode> {
        return this.properties?.get("Directives") as Array<ElementDefinition_StringValueNode>;
    }
    set Directives(directives: Array<ElementDefinition_StringValueNode>) {
        this.properties?.set("Directives", directives); 
    }
    set FieldsDefinition(fields: Array<FieldDefinitionNode>) {
        let fieldsElements = new Array<ElementDefinition_Field>();
        fields.forEach((ffield) => {
            let field = ElementDefinition_Field.fromFieldDefinitionNode(ffield);
            fieldsElements.push(field);
        });
        this.properties?.set("FieldsDefinition", fieldsElements);
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
            let implementedInterfaces = new Array<ElementDefinition>();
            interfaceTypeDefinitionNode.interfaces.forEach((iinterface) => {
                implementedInterfaces.push(new ElementDefinition_StringValueNode(iinterface.name.value, ElementDefinitionType.InterfaceType));
            });
            interfaceType.Properties.set("ImplementsInterfaces", implementedInterfaces);
        }



        // readonly name: NameNode;
        // readonly arguments?: ReadonlyArray<ConstArgumentNode>;
        if (interfaceTypeDefinitionNode.directives !== undefined) {
            let directivesElements = new Array<ElementDefinition>();
            interfaceTypeDefinitionNode.directives.forEach((ddirective) => {
            
                let directiveName = ddirective.name.value;
                let directiveElement =
                    new ElementDefinition_Directive(directiveName);

                if (ddirective.arguments !== undefined) {
                    let argumentsElements = new Array<ElementDefinition_Argument>();
                    ddirective.arguments.forEach((aargument) => {
                        argumentsElements.push(ElementDefinition_Argument.fromArgumentNode(aargument));
                    });
                    directiveElement.properties.set("Arguments", argumentsElements);
                }
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

            interfaceType.properties.set("FieldsDefinition", fieldsElements)
        }
        
        return interfaceType;
    }
}   