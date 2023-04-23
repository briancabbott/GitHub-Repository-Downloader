
import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    buildASTSchema,
    parse,
    Source,
    DefinitionNode,
    ASTNode,
    visit,
    DocumentNode,
    ObjectTypeDefinitionNode,
    InterfaceTypeDefinitionNode,
    NameNode,
} from 'graphql';

export enum ElementDefinitionType {
    ObjectType = "object",
    InterfaceType = "interface",
    NameType = "name"
}

export class ElementDefinition_Ref {
    name: string
    type: ElementDefinitionType
    parentRefs: Array<ElementDefinition_Ref>
    childRefs: Array<ElementDefinition_Ref>

    constructor(name: string, type: ElementDefinitionType, parentRefs: Array<ElementDefinition_Ref>, childRefs: Array<ElementDefinition_Ref>) {
        this.name = name;
        this.type = type;
        this.parentRefs = parentRefs;
        this.childRefs = childRefs;
    }

    isRelativelyEqual(other: ElementDefinition_Ref): boolean {
        if (this.name === other.name && this.type === other.type) {
            return true;
        } 
        return false;
    }

    isAbsolutelyEqual(other: ElementDefinition_Ref): boolean {
        let relEquals: boolean = this.isRelativelyEqual(other)
        let parentRefsEqual: boolean = this.parentRefs.length === other.parentRefs.length && this.parentRefs.every((parentRef, index) => {
            other.parentRefs[index].isRelativelyEqual(parentRef)
        });
        return relEquals && parentRefsEqual;
    }
}

export class ElementDefinition {
    name: string;
    type: ElementDefinitionType;
    key: string | number | undefined; 
    parent: ASTNode | ReadonlyArray<ASTNode> | undefined; 
    path: ReadonlyArray<string | number>;
    ancestors: ReadonlyArray<ASTNode | ReadonlyArray<ASTNode>>;
    
    constructor(name: string, 
                type: ElementDefinitionType,
                key: string | number | undefined, 
                parent: ASTNode | ReadonlyArray<ASTNode> | undefined, 
                path: ReadonlyArray<string | number>,
                ancestors: ReadonlyArray<ASTNode | ReadonlyArray<ASTNode>>) {
        this.name = name;
        this.type = type;
    
        this.key = key;
        this.parent = parent;
        this.path = path;
        this.ancestors = ancestors;
    }
    
    equals(other: ElementDefinition): boolean {
        // TODO implement
        return true;
    }
}

export type ElementRefDef = {ref: ElementDefinition_Ref, def: ElementDefinition};

export type ElementProcessorResultSet = {
    editedAST: DocumentNode, 
    elementsMap: Map<String, Map<string, ElementRefDef>>,
    elementTypesUnhandled: Map<string, number>
}

export class ElementProcessor {
    ElementsMap: Map<String, Map<string, ElementRefDef>>;
    // ElementsRefMap: Map<String, Map<string, Array<ElementDefinition_Ref>>>;
    ElementTypesUnhandled: Map<string, number>;
    
    constructor() {
        this.setupProcessing();
        this.ElementsMap = new Map();
        // this.ElementsRefMap = new Map();
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
        let name: string = node.name.value
        let element: ElementDefinition = new ElementDefinition(name, ElementDefinitionType.ObjectType, key, parent, path, ancestors);        

        node.interfaces?.forEach((iinterface) => {
            let iinterfaceJson = JSON.stringify(iinterface, undefined, 4);
            let iiRefName: string = iinterface.name?.value

            console.log("iinterfaceJson")
            console.log(iinterfaceJson)
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
        });

        this.addElementToDefsMap(element);
    }



    private processInterfaceTypeDefinition(node: InterfaceTypeDefinitionNode,
                                     key: string | number | undefined, 
                                    parent: ASTNode | ReadonlyArray<ASTNode> | undefined, 
                                    path: ReadonlyArray<string | number>,
                                    ancestors: ReadonlyArray<ASTNode | ReadonlyArray<ASTNode>>) {
        let name: string = node.name.value
        let element: ElementDefinition = new ElementDefinition(name, ElementDefinitionType.InterfaceType, key, parent, path, ancestors);

        this.addElementToDefsMap(element);
    }



    private processNameDefinition(node: NameNode,
                            key: string | number | undefined, 
                            parent: ASTNode | ReadonlyArray<ASTNode> | undefined, 
                            path: ReadonlyArray<string | number>,
                            ancestors: ReadonlyArray<ASTNode | ReadonlyArray<ASTNode>>) {
        let name: string = node.value
        let element: ElementDefinition = new ElementDefinition(name, ElementDefinitionType.NameType, key, parent, path, ancestors);

        this.addElementToDefsMap(element);
    }



    private produceReferenceForDefinition(element: ElementDefinition): ElementDefinition_Ref {
        let parentRefs: Array<ElementDefinition_Ref> = [];
        let childRefs: Array<ElementDefinition_Ref> = [];
        let ref: ElementDefinition_Ref = new ElementDefinition_Ref(element.name, element.type, parentRefs, childRefs);
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
            let existingElement = this.ElementsMap.get(element.type)!!.get(element.name)
            if (!existingElement!!.(element)) {
                // TODO: Determine what to do here for adding duplicates???
                console.log("ERROR: element already exists with different definition")
                console.log(JSON.stringify(existingElement, undefined, 4))
            }
        }
    }

    
}