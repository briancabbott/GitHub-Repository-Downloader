
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
import { ElementDefinition, ElementDefinitionType } from './core';
import { ElementDefinition_StringValueNode } from './primitives';



export class ElementDefinition_InterfaceType extends ElementDefinition {
    constructor(name: string,
                // key?: string | number | undefined, 
                // parent?: ASTNode | ReadonlyArray<ASTNode> | undefined, 
                // path?: ReadonlyArray<string | number> | undefined,
                // ancestors?: ReadonlyArray<ASTNode | ReadonlyArray<ASTNode>>,
                properties?: Map<string, Array<ElementDefinition>>) {
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
        this.properties?.set("ImplementsInterfaces", implementedInterfaces);
    }
    set Directives(directives: Array<DirectiveNode>) {
        let directivesElements = new Array<ElementDefinition>();
        directives.forEach((ddirective) => {
            let directiveName = ddirective.name.value;
            let directiveElement =
                new ElementDefinition(directiveName, ElementDefinitionType.Directive);
            if (ddirective.arguments !== undefined) {
                let argumentsElements = new Array<ElementDefinition>();
                ddirective.arguments.forEach((aargument) => {
                    argumentsElements.push(ElementDefinition_Argument.fromArgumentNode(aargument));
                });
                directiveElement.properties?.set("Arguments", argumentsElements);
            }
            directivesElements.push(directiveElement);
        });
        this.properties?.set("Directives", directivesElements);
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
        let interfaceType = new ElementDefinition_InterfaceType(interfaceTypeDefinitionNode.name.value, new Map<string, Array<ElementDefinition>>());
        if (interfaceTypeDefinitionNode.description !== undefined) {
            interfaceType.Description = interfaceTypeDefinitionNode.description.value;
        }
        if (interfaceTypeDefinitionNode.interfaces !== undefined) {
            interfaceType.ImplementsInterfaces = interfaceTypeDefinitionNode.interfaces;
        }
        if (interfaceTypeDefinitionNode.directives !== undefined) {
            interfaceType.Directives = interfaceTypeDefinitionNode.directives;
        }
        if (interfaceTypeDefinitionNode.fields !== undefined) {
            interfaceType.FieldsDefinition = interfaceTypeDefinitionNode.fields;
        }
        return interfaceType;
    }
}