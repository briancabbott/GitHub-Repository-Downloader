import { DirectiveNode } from "graphql";
import { ElementDefinition_Argument } from "./argument";
import { ElementDefinition, ElementDefinitionType } from "./core";


export class ElementDefinition_Directive extends ElementDefinition {

    constructor(name: string) {
        super(name, ElementDefinitionType.Directive);
    }

    public get Name(): string {
        return this.name;
    }
    public set Name(name: string) {
        this.name = name;
    }

    public get Arguments(): Array<ElementDefinition_Argument> {
        return this.properties.get("Arguments") as Array<ElementDefinition_Argument>;
    }
    public set Arguments(aarguments: Array<ElementDefinition_Argument>) {
        this.properties.set("Arguments", aarguments);
    }

    static fromDirectiveNode(directiveNode: DirectiveNode): ElementDefinition_Directive {
        let directive = new ElementDefinition_Directive(directiveNode.name.value);

        if (directiveNode.arguments !== undefined) {
            let aarguments = new Array<ElementDefinition_Argument>();
            directiveNode.arguments.forEach((aargument) => {
                let argumentElement = ElementDefinition_Argument.fromArgumentNode(aargument);
                aarguments.push(argumentElement);
            });
            directive.properties.set("Arguments", aarguments);
        }

        return directive;
    }
}