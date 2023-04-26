
import {
    ASTNode,
    DocumentNode,
    InterfaceTypeDefinitionNode,
    ObjectTypeDefinitionNode,
    NameNode,
    visit
} from 'graphql';
import { ElementDefinition, ElementDefinitionType, ElementDefinition_Ref, ElementRefDef } from './graphql/elements/core';
import { ElementDefinition_StringValueNode } from './graphql/elements/primitives';
import { ElementDefinition_Argument } from './graphql/elements/argument';
import { ElementDefinition_Field } from './graphql/elements/field';
import { ElementDefinition_Directive } from './graphql/elements/directive';

export type ElementProcessorResultSet = {
    editedAST: DocumentNode, 
    elementsMap: Map<String, Map<string, ElementRefDef>>,
    elementTypesUnhandled: Map<string, number>
}

export class ElementProcessor {
    ElementsMap: Map<String, Map<string, ElementRefDef>>;
    ElementTypesUnhandled: Map<string, number>;
    // ElementsRefMap: Map<String, Map<string, Array<ElementDefinition_Ref>>>;
    
    constructor() {
        this.setupProcessing();
        this.ElementsMap = new Map();
        this.ElementTypesUnhandled = new Map();
    }

    setupProcessing() {
        this.ElementTypesUnhandled.clear();
        this.ElementsMap.clear();

        //  ElementDefinitionType
        this.ElementsMap.set(ElementDefinitionType.InterfaceType, new Map<string, ElementRefDef>());
        this.ElementsMap.set(ElementDefinitionType.ObjectType, new Map<string, ElementRefDef>());
        this.ElementsMap.set(ElementDefinitionType.NameType, new Map<string, ElementRefDef>());    
    }
    
    public async processDocumentAST(documentAst: DocumentNode): Promise<ElementProcessorResultSet> {
        this.setupProcessing();
        var editedAST = visit(documentAst, {
            enter(node, key, parent, path, ancestors) {
                super.performASTNode_EnterEvent(node, key, parent, path, ancestors);
            }, 
            leave(node, key, parent, path, ancestors) {
                super.performASTNode_LeaveEvent(node, key, parent, path, ancestors);
            }
        });
        return { 
            editedAST: editedAST, 
            elementsMap: this.ElementsMap, 
            elementTypesUnhandled: this.ElementTypesUnhandled
        };
    }

    private performASTNode_EnterEvent(node: ASTNode, 
                            key: string | number | undefined, 
                            parent: ASTNode | ReadonlyArray<ASTNode> | undefined, 
                            path: ReadonlyArray<string | number>, 
                            ancestors: ReadonlyArray<ASTNode | ReadonlyArray<ASTNode>>) {

        if (node.kind === "ObjectTypeDefinition") {
            this.processObjectTypeDefinition(node, key, parent, path, ancestors);
        } else if (node.kind === "InterfaceTypeDefinition") {
            this.processInterfaceTypeDefinition(node, key, parent, path, ancestors);
        } else if (node.kind === "Name") {

            this.processNameDefinition(node, key, parent, path, ancestors);
        } else {
            let count = this.ElementTypesUnhandled.get(node.kind);
            if (count === undefined) {
                count = 0;
            }

            this.ElementTypesUnhandled.set(node.kind, count + 1);
        }
    }

    private performASTNode_LeaveEvent(node: ASTNode, 
                            key: string | number | undefined, 
                            parent: ASTNode | ReadonlyArray<ASTNode> | undefined, 
                            path: ReadonlyArray<string | number>, 
                            ancestors: ReadonlyArray<ASTNode | ReadonlyArray<ASTNode>>) {
        // leave(node, key, parent, path, ancestors) {
            // @return
            //   undefined: no action
            //   false: no action
            //   visitor.BREAK: stop visiting altogether
            //   null: delete this node
            //   any value: replace this node with the returned value
            // }
        
    }

    private processObjectTypeDefinition(node: ObjectTypeDefinitionNode, 
                                      key: string | number | undefined, 
                                      parent: ASTNode | ReadonlyArray<ASTNode> | undefined, 
                                      path: ReadonlyArray<string | number>,
                                      ancestors: ReadonlyArray<ASTNode | ReadonlyArray<ASTNode>>) {
        let name: string = node.name.value;
        let element: ElementDefinition = new ElementDefinition(name, ElementDefinitionType.ObjectType);        

        node.interfaces?.forEach((iinterface) => {
            let iinterfaceJson = JSON.stringify(iinterface, undefined, 4);
            // let iiRefName: string = iinterface.name?.value

            
        });
        node.directives?.forEach((ddirective) => {
            console.log("\t", "ddirective", ddirective.kind)

            // let ddirectiveJson = JSON.stringify(ddirective, undefined, 4)
            // console.log("\t", ddirectiveJson);

        });
        node.fields?.forEach((ffield) => {
            console.log("\tfield: ", ffield.kind)

            // let ffieldJson = JSON.stringify(ffield, undefined, 4)
            // console.log("\t", ffieldJson);

            let fieldDef = ElementDefinition_Field.fromFieldDefinitionNode(ffield);
        });

        this.addElementToDefsMap(element);
    }

    private processInterfaceTypeDefinition(node: InterfaceTypeDefinitionNode) {

        let name: string = node.name.value;
        let element = new ElementDefinition(name, ElementDefinitionType.InterfaceType);
        

        if (node.description !== undefined && node.description.value !== undefined && node.description.value !== "") {
            element.properties?.set("Description", new ElementDefinition_StringValueNode("Description", node.description.value));
        }


        if (node.interfaces !== undefined) {
            element.properties?.set("ImplementsInterfaces", new Array<ElementDefinition>());
            node.interfaces.forEach((iinterface) => {
                let interfaceName = iinterface.name?.value;
                let interfaceElement = new ElementDefinition(interfaceName, ElementDefinitionType.InterfaceType);

                (element.properties.get("ImplementsInterfaces") as Array<ElementDefinition>).push(interfaceElement);
            });
        }


        if (node.directives !== undefined) {
            element.properties?.set("Directives", new Array<ElementDefinition>());
            node.directives.forEach((ddirective) => {
                let directiveName = ddirective.name.value;
                let directiveElement = new ElementDefinition_Directive(directiveName);

                if (ddirective.arguments !== undefined) {
                    directiveElement.properties?.set("Arguments", new Array<ElementDefinition>());
                    ddirective.arguments.forEach((aargument) => {
                        let a = ElementDefinition_Argument.fromArgumentNode(aargument)
                        // directiveElement.
                        // TODO: "finish this"
                    });
                }
                (element.properties?.get("Directives") as Array<ElementDefinition>).push(directiveElement)
            });
        }


        if (node.fields !== undefined) {
            element.properties?.set("FieldsDefinition", new Array<ElementDefinition_Field>());
        }
        // node.description?. forEach((ddirective) => {});
        node.interfaces?.forEach((iinterface) => {
            let interfaceName = iinterface.name?.value;
            
        });
        node.fields?.forEach((ffield) => {  
            console.log("\tfield: ", ffield.kind)
            ffield.name.value
            ffield.type.kind
            ffield.kind 
        });

        this.addElementToDefsMap(element);
    }



    private processNameDefinition(node: NameNode) {
        let name: string = node.value
        let element: ElementDefinition = new ElementDefinition(name, ElementDefinitionType.NameType);

        this.addElementToDefsMap(element);
    }



    private produceReferenceForDefinition(element: ElementDefinition): ElementDefinition_Ref {
        let parentRefs: Array<ElementDefinition_Ref> = [];
        let childRefs: Array<ElementDefinition_Ref> = [];
        let ref = new ElementDefinition_Ref(element.name, element.type, parentRefs, childRefs);
        
        return ref;
    }




    private addElementToDefsMap(element: ElementDefinition) {
        if (!this.ElementsMap.has(element.type)) {
            this.ElementsMap.set(element.type, new Map<string, ElementRefDef>());
        }
    
        if (!this.ElementsMap.get(element.type)!!.has(element.name)) {
            let element_ref = this.produceReferenceForDefinition(element);
            let ref_def: ElementRefDef = { ref: element_ref, def: element };

            this.ElementsMap.get(element.type)!!.set(element.name, ref_def);
        } else {
            let existingElement = this.ElementsMap.get(element.type)!!.get(element.name);
            
            // When element is present but, property values or location in graph is different --- work-out: collision of some kind or a seperate instance?
            // if (!existingElement!!.) {
                // TODO: Determine what to do here for adding duplicates???
                console.log("ERROR: element already exists with different definition")
                let jsonElement = JSON.stringify(existingElement, undefined, 4)
                console.log()
            // }
        }
    }
}