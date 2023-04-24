
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
    DirectiveNode,
    FieldDefinitionNode,
    ArgumentNode,
} from 'graphql';

export enum ElementDefinitionType {
    ObjectType = "object",
    InterfaceType = "interface",
    NameType = "name",
    Directive = "directive",
    Argument = "argument",
    FieldDefinition = "field",
    NamedTypeNode = "namedTypeNode",
    ListType = "listType",
    NonNullType = "nonNullType",
    InputValueDefinitionNode = "inputValueDefinitionNode",

    // (Primitive) Value Nodes
    StringValueNode = "string",
    IntValueNode = "int",
    FloatValueNode = "float",
    BooleanValueNode = "boolean",
    NullValueNode = "null",
    EnumValueNode = "enum",
    ConstListValueNode = "constList",
    ConstObjectValueNode = "constObject",
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
    key?: string | number | undefined; 
    parent?: ASTNode | ReadonlyArray<ASTNode> | undefined; 
    path?: ReadonlyArray<string | number> | undefined;
    ancestors?: ReadonlyArray<ASTNode | ReadonlyArray<ASTNode>> | undefined;
    properties?: Map<string, ElementDefinition | Array<ElementDefinition>> | undefined;

    constructor(name: string, 
                type: ElementDefinitionType,
                key?: string | number | undefined, 
                parent?: ASTNode | ReadonlyArray<ASTNode> | undefined, 
                path?: ReadonlyArray<string | number> | undefined,
                ancestors?: ReadonlyArray<ASTNode | ReadonlyArray<ASTNode>> | undefined,
                properties?: Map<string, ElementDefinition | Array<ElementDefinition>> | undefined) {
        this.name = name;
        this.type = type;
    
        this.key = key;
        this.parent = parent;
        this.path = path;
        this.ancestors = ancestors;
        this.properties = properties;
    }
    
    equals(other: ElementDefinition): boolean {
        // TODO implement
        return true;
    }
}
export type ElementRefDef = {ref: ElementDefinition_Ref, def: ElementDefinition};

export class ElementDefinition_StringValueNode extends ElementDefinition {
    value: string;
    constructor(name: string, value: string) {
        super(name, ElementDefinitionType.StringValueNode);
        this.value = value;
    }
    
    equals(other: ElementDefinition): boolean {
        // TODO implement
        return true;
    }
}
export class ElementDefinition_IntValueNode extends ElementDefinition {
    value: number;
    constructor(name: string, value: number) {
        super(name, ElementDefinitionType.IntValueNode);
        this.value = value;
    }
}
export class ElementDefinition_FloatValueNode extends ElementDefinition {
    value: number;
    constructor(name: string, value: number) {
        super(name, ElementDefinitionType.FloatValueNode);
        this.value = value;
    }
}
export class ElementDefinition_BooleanValueNode extends ElementDefinition {
    value: boolean;
    constructor(name: string, value: boolean) {
        super(name, ElementDefinitionType.BooleanValueNode);
        this.value = value;
    }
}
export class ElementDefinition_NullValueNode extends ElementDefinition {
    constructor(name: string) {
        super(name, ElementDefinitionType.NullValueNode);
    }
}
export class ElementDefinition_EnumValueNode extends ElementDefinition {
    value: string;
    constructor(name: string, value: string) {
        super(name, ElementDefinitionType.EnumValueNode);
        this.value = value;
    }
}
export class ElementDefinition_ConstListValueNode extends ElementDefinition {
    values: Array<ElementDefinition>;
    constructor(name: string, values: Array<ElementDefinition>) {
        super(name, ElementDefinitionType.ConstListValueNode);
        this.values = values;
    }
}
export class ElementDefinition_ConstObjectValueNode extends ElementDefinition {
    object: any
    constructor(name: string, object: any) {
        super(name, ElementDefinitionType.ConstObjectValueNode);
        this.object = object;
    }
}

//
// Type Node Type
// 
export class ElementDefinition_NamedTypeNode extends ElementDefinition {
    name: string
    constructor(name: string) {
        super(name, ElementDefinitionType.NamedTypeNode);
        this.name = name;
    }
}

export class ElementDefinition_ListType extends ElementDefinition {
    listType: string;
    constructor(type: string) {
        super(type, ElementDefinitionType.ListType);
        this.listType = type;
    }
}

export class ElementDefinition_NonNullType extends ElementDefinition {
    nonNullType: string;
    constructor(type: string) {
        super(type, ElementDefinitionType.NonNullType);
        this.nonNullType = type;
    }
}

export class ElementDefinition_InterfaceType extends ElementDefinition {
    constructor(name: string, 
                type: ElementDefinitionType,
                key?: string | number | undefined, 
                parent?: ASTNode | ReadonlyArray<ASTNode> | undefined, 
                path?: ReadonlyArray<string | number> | undefined,
                ancestors?: ReadonlyArray<ASTNode | ReadonlyArray<ASTNode>>,
                properties?: Map<string, Array<ElementDefinition>>) {
        super(name, ElementDefinitionType.InterfaceType, key, parent, path, ancestors, properties);
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
            // readonly kind: Kind.FIELD_DEFINITION;
            // readonly loc?: Location;
            // readonly description?: StringValueNode;
            // readonly name: NameNode;
            // readonly arguments?: ReadonlyArray<InputValueDefinitionNode>;
            // readonly type: TypeNode;
            // readonly directives?: ReadonlyArray<ConstDirectiveNode>;
            
        });
        this.properties?.set("FieldsDefinition", fieldsElements);
    }
}

export class ElementDefinition_Argument extends ElementDefinition {
    constructor(argumentName: string) {
        super(argumentName, ElementDefinitionType.Argument);
    }

    static fromArgumentNode(aargument: ArgumentNode): ElementDefinition_Argument {
        let argumentName = aargument.name.value;
        let argumentElement = new ElementDefinition_Argument(argumentName)

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

export class ElementDefinition_InputValueDefinitionNode extends ElementDefinition {
    // readonly description?: StringValueNode;
    // readonly name: NameNode;
    // readonly type: TypeNode;
    // readonly defaultValue?: ConstValueNode;
// readonly directives?: ReadonlyArray<ConstDirectiveNode>;
    constructor(name: string) {
        // , description: ElementDefinition_StringValueNode | undefined, 
        //     defaultValue: ConstValueNode | undefined, 
        //     directives: ReadonlyArray<ConstDirectiveNode> | undefined) {
        super(name, ElementDefinitionType.InputValueDefinitionNode);
    }
}

export class ElementDefinition_Field extends ElementDefinition {
    // readonly description?: StringValueNode;
    // readonly name: NameNode;
    // readonly arguments?: ReadonlyArray<InputValueDefinitionNode>;
    // readonly type: TypeNode;
    // readonly directives?: ReadonlyArray<ConstDirectiveNode>;
    constructor(name: string) {
        super(name, ElementDefinitionType.FieldDefinition);
    }

    static fromFieldDefinitionNode(ffield: FieldDefinitionNode): ElementDefinition_Field {
        let fieldName = ffield.name.value;
        let fieldElement =
            new ElementDefinition_Field(fieldName);
        if (ffield.description !== undefined) {
            fieldElement.properties?.set("Description", new ElementDefinition_StringValueNode("Description", ffield.description.value));
        }
        if (ffield.arguments !== undefined) {
            let argumentsElements = new Array<ElementDefinition>();
            ffield.arguments.forEach((aargument) => {
                let argumentName = aargument.name.value;
                let argumentElement = new ElementDefinition_InputValueDefinitionNode(argumentName, 
                    aargument.description, aargument.defaultValue, aargument.directives);
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
                    
                // let ddirectiveElement = new ElementDefinition_InputValueDefinitionNode(ddirectiveName, 
                //     ddirective.description, ddirective.defaultValue, ddirective.directives);
                // directivesElements.push(ddirectiveElement);
                });
            });
            fieldElement.properties?.set("Directives", directivesElements);
        }
        return fieldElement;
    }
}

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
        let element: ElementDefinition = new ElementDefinition(name, 
                ElementDefinitionType.InterfaceType, key, parent, path, ancestors, new Map<string, ElementDefinition[]>());
        
        if (node.description !== undefined) {
            element.properties?.set("Description", new ElementDefinition());
        }
        if (node.interfaces !== undefined) {
            element.properties?.set("ImplementsInterfaces", new Array<ElementDefinition>());
            node.interfaces.forEach((iinterface) => {
                let interfaceName = iinterface.name?.value;
                let interfaceElement = 
                    new ElementDefinition(interfaceName, ElementDefinitionType.InterfaceType, 
                        key, parent, path, ancestors, new Map<string, ElementDefinition[]>());
                (element.properties?.get("ImplementsInterfaces") as Array<ElementDefinition>).push(interfaceElement);
            });
        }
        if (node.directives !== undefined) {
            element.properties?.set("Directives", new Array<ElementDefinition>());
            node.directives.forEach((ddirective) => {
                let directiveName = ddirective.name.value;
                let directiveElement = 
                    new ElementDefinition(directiveName, ElementDefinitionType.Directive, 
                        key, parent, path, ancestors, new Map<string, ElementDefinition[]>());
                if (ddirective.arguments !== undefined) {
                    directiveElement.properties?.set("Arguments", new Array<ElementDefinition>());
                    ddirective.arguments.forEach((aargument) => {
                        let argumentName = aargument.name.value;
                        let argumentElement =
                            new ElementDefinition(argumentName, ElementDefinitionType.Argument, 
                        readonly name: NameNode;
                        readonly arguments?: ReadonlyArray<ConstArgumentNode>;
                (element.properties?.get("Directives") as Array<ElementDefinition>).push(directiveElement);
            });
        }
        if (node.fields !== undefined) {
            element.properties?.set("FieldsDefinition", new Array<ElementDefinition>());
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



    private processNameDefinition(node: NameNode,
                            key: string | number | undefined, 
                            parent: ASTNode | ReadonlyArray<ASTNode> | undefined, 
                            path: ReadonlyArray<string | number>,
                            ancestors: ReadonlyArray<ASTNode | ReadonlyArray<ASTNode>>) {
        let name: string = node.value
        let element: ElementDefinition = new ElementDefinition(name, ElementDefinitionType.NameType, key, parent, path, ancestors, );

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