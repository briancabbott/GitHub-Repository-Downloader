"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementDefinition_Directive = void 0;
const argument_1 = require("./argument");
const core_1 = require("./core");
class ElementDefinition_Directive extends core_1.ElementDefinition {
    constructor(name) {
        super(name, core_1.ElementDefinitionType.Directive);
    }
    get Name() {
        return this.name;
    }
    set Name(name) {
        this.name = name;
    }
    get Arguments() {
        return this.properties.get("Arguments");
    }
    set Arguments(aarguments) {
        this.properties.set("Arguments", aarguments);
    }
    static fromDirectiveNode(directiveNode) {
        let directive = new ElementDefinition_Directive(directiveNode.name.value);
        if (directiveNode.arguments !== undefined) {
            let aarguments = new Array();
            directiveNode.arguments.forEach((aargument) => {
                let argumentElement = argument_1.ElementDefinition_Argument.fromArgumentNode(aargument);
                aarguments.push(argumentElement);
            });
            directive.properties.set("Arguments", aarguments);
        }
        return directive;
    }
}
exports.ElementDefinition_Directive = ElementDefinition_Directive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2dyYXBocWwvZWxlbWVudHMvZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHlDQUF3RDtBQUN4RCxpQ0FBa0U7QUFHbEUsTUFBYSwyQkFBNEIsU0FBUSx3QkFBaUI7SUFFOUQsWUFBWSxJQUFZO1FBQ3BCLEtBQUssQ0FBQyxJQUFJLEVBQUUsNEJBQXFCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ0QsSUFBVyxJQUFJLENBQUMsSUFBWTtRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBVyxTQUFTO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFzQyxDQUFDO0lBQ2pGLENBQUM7SUFDRCxJQUFXLFNBQVMsQ0FBQyxVQUE2QztRQUM5RCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxhQUE0QjtRQUNqRCxJQUFJLFNBQVMsR0FBRyxJQUFJLDJCQUEyQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFMUUsSUFBSSxhQUFhLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUN2QyxJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBOEIsQ0FBQztZQUN6RCxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUMxQyxJQUFJLGVBQWUsR0FBRyxxQ0FBMEIsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDN0UsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztZQUNILFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNyRDtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7Q0FDSjtBQWxDRCxrRUFrQ0MifQ==