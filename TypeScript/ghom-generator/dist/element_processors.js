"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementProcessor = void 0;
const graphql_1 = require("graphql");
const core_1 = require("./graphql/elements/core");
const primitives_1 = require("./graphql/elements/primitives");
const argument_1 = require("./graphql/elements/argument");
const field_1 = require("./graphql/elements/field");
const directive_1 = require("./graphql/elements/directive");
class ElementProcessor {
    ElementsMap;
    ElementTypesUnhandled;
    constructor() {
        this.setupProcessing();
        this.ElementsMap = new Map();
        this.ElementTypesUnhandled = new Map();
    }
    setupProcessing() {
        this.ElementTypesUnhandled.clear();
        this.ElementsMap.clear();
        //  ElementDefinitionType
        this.ElementsMap.set(core_1.ElementDefinitionType.InterfaceType, new Map());
        this.ElementsMap.set(core_1.ElementDefinitionType.ObjectType, new Map());
        this.ElementsMap.set(core_1.ElementDefinitionType.NameType, new Map());
    }
    async processDocumentAST(documentAst) {
        this.setupProcessing();
        var editedAST = (0, graphql_1.visit)(documentAst, {
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
    performASTNode_EnterEvent(node, key, parent, path, ancestors) {
        if (node.kind === "ObjectTypeDefinition") {
            this.processObjectTypeDefinition(node);
        }
        else if (node.kind === "InterfaceTypeDefinition") {
            this.processInterfaceTypeDefinition(node);
        }
        else if (node.kind === "Name") {
            this.processNameDefinition(node);
        }
        else {
            let count = this.ElementTypesUnhandled.get(node.kind);
            if (count === undefined) {
                count = 0;
            }
            this.ElementTypesUnhandled.set(node.kind, count + 1);
        }
    }
    performASTNode_LeaveEvent(node, key, parent, path, ancestors) {
    }
    processObjectTypeDefinition(node) {
        let name = node.name.value;
        let element = new core_1.ElementDefinition(name, core_1.ElementDefinitionType.ObjectType);
        node.interfaces?.forEach((iinterface) => {
            let iinterfaceJson = JSON.stringify(iinterface, undefined, 4);
            // let iiRefName: string = iinterface.name?.value
        });
        node.directives?.forEach((ddirective) => {
            console.log("\t", "ddirective", ddirective.kind);
            // let ddirectiveJson = JSON.stringify(ddirective, undefined, 4)
        });
        node.fields?.forEach((ffield) => {
            console.log("\tfield: ", ffield.kind);
            let fieldDef = field_1.ElementDefinition_Field.fromFieldDefinitionNode(ffield);
        });
        this.addElementToDefsMap(element);
    }
    processInterfaceTypeDefinition(node) {
        let name = node.name.value;
        let element = new core_1.ElementDefinition(name, core_1.ElementDefinitionType.InterfaceType);
        if (node.description !== undefined && node.description.value !== undefined && node.description.value !== "") {
            element.properties?.set("Description", new primitives_1.ElementDefinition_StringValueNode("Description", node.description.value));
        }
        if (node.interfaces !== undefined) {
            element.properties?.set("ImplementsInterfaces", new Array());
            node.interfaces.forEach((iinterface) => {
                let interfaceName = iinterface.name?.value;
                let interfaceElement = new core_1.ElementDefinition(interfaceName, core_1.ElementDefinitionType.InterfaceType);
                element.properties.get("ImplementsInterfaces").push(interfaceElement);
            });
        }
        if (node.directives !== undefined) {
            element.properties?.set("Directives", new Array());
            node.directives.forEach((ddirective) => {
                let directiveName = ddirective.name.value;
                let directiveElement = new directive_1.ElementDefinition_Directive(directiveName);
                if (ddirective.arguments !== undefined) {
                    directiveElement.properties?.set("Arguments", new Array());
                    ddirective.arguments.forEach((aargument) => {
                        let a = argument_1.ElementDefinition_Argument.fromArgumentNode(aargument);
                    });
                }
                (element.properties?.get("Directives")).push(directiveElement);
            });
        }
        if (node.fields !== undefined) {
            element.properties?.set("FieldsDefinition", new Array());
        }
        // node.description?. forEach((ddirective) => {});
        node.interfaces?.forEach((iinterface) => {
            let interfaceName = iinterface.name?.value;
        });
        node.fields?.forEach((ffield) => {
            console.log("\tfield: ", ffield.kind);
            ffield.name.value;
            ffield.type.kind;
            ffield.kind;
        });
        this.addElementToDefsMap(element);
    }
    processNameDefinition(node) {
        let name = node.value;
        let element = new core_1.ElementDefinition(name, core_1.ElementDefinitionType.NameType);
        this.addElementToDefsMap(element);
    }
    produceReferenceForDefinition(element) {
        let parentRefs = [];
        let childRefs = [];
        let ref = new core_1.ElementDefinition_Ref(element.name, element.type, parentRefs, childRefs);
        return ref;
    }
    addElementToDefsMap(element) {
        if (!this.ElementsMap.has(element.type)) {
            this.ElementsMap.set(element.type, new Map());
        }
        if (!this.ElementsMap.get(element.type).has(element.name)) {
            let element_ref = this.produceReferenceForDefinition(element);
            let ref_def = { ref: element_ref, def: element };
            this.ElementsMap.get(element.type).set(element.name, ref_def);
        }
        else {
            let existingElement = this.ElementsMap.get(element.type).get(element.name);
            // When element is present but, property values or location in graph is different --- work-out: collision of some kind or a seperate instance?
            // if (!existingElement!!.) {
            // TODO: Determine what to do here for adding duplicates???
            console.log("ERROR: element already exists with different definition");
            let jsonElement = JSON.stringify(existingElement, undefined, 4);
            console.log();
        }
    }
}
exports.ElementProcessor = ElementProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudF9wcm9jZXNzb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2VsZW1lbnRfcHJvY2Vzc29ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FPaUI7QUFDakIsa0RBS2lDO0FBQ2pDLDhEQUFrRjtBQUNsRiwwREFBeUU7QUFDekUsb0RBQW1FO0FBQ25FLDREQUEyRTtBQVEzRSxNQUFhLGdCQUFnQjtJQUN6QixXQUFXLENBQTBDO0lBQ3JELHFCQUFxQixDQUFzQjtJQUUzQztRQUNJLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUV6Qix5QkFBeUI7UUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsNEJBQXFCLENBQUMsYUFBYSxFQUFFLElBQUksR0FBRyxFQUF5QixDQUFDLENBQUM7UUFDNUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsNEJBQXFCLENBQUMsVUFBVSxFQUFFLElBQUksR0FBRyxFQUF5QixDQUFDLENBQUM7UUFDekYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsNEJBQXFCLENBQUMsUUFBUSxFQUFFLElBQUksR0FBRyxFQUF5QixDQUFDLENBQUM7SUFDM0YsQ0FBQztJQUVNLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxXQUF5QjtRQUNyRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxTQUFTLEdBQ1QsSUFBQSxlQUFLLEVBQUMsV0FBVyxFQUFFO1lBQ2YsS0FBSyxDQUFDLElBQUks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