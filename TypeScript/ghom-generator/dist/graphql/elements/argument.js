"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementDefinition_Argument = void 0;
const core_1 = require("./core");
const primitives_1 = require("./primitives");
class ElementDefinition_Argument extends core_1.ElementDefinition {
    constructor(argumentName) {
        super(argumentName, core_1.ElementDefinitionType.Argument);
    }
    get Name() {
        return this.name;
    }
    set Name(name) {
        this.name = name;
    }
    get Value() {
        return this.properties?.get("Value");
    }
    set Value(value) {
        if (value !== undefined) {
            this.properties?.set("Value", value);
        }
    }
    static fromArgumentNode(aargument) {
        let argumentName = aargument.name.value;
        let argumentElement = new ElementDefinition_Argument(argumentName);
        if (aargument.value.kind === "StringValue") {
            argumentElement.properties?.set("Value", new primitives_1.ElementDefinition_StringValueNode("Value", aargument.value.value));
        }
        else if (aargument.value.kind === "IntValue") {
            argumentElement.properties?.set("Value", new primitives_1.ElementDefinition_IntValueNode("Value", parseInt(aargument.value.value)));
        }
        else if (aargument.value.kind === "FloatValue") {
            argumentElement.properties?.set("Value", new primitives_1.ElementDefinition_FloatValueNode("Value", parseFloat(aargument.value.value)));
        }
        else if (aargument.value.kind === "BooleanValue") {
            argumentElement.properties?.set("Value", new primitives_1.ElementDefinition_BooleanValueNode("Value", aargument.value.value));
        }
        else if (aargument.value.kind === "EnumValue") {
            argumentElement.properties?.set("Value", new primitives_1.ElementDefinition_EnumValueNode("Value", aargument.value.value));
        }
        else if (aargument.value.kind === "ListValue") {
            // argumentElement.properties?.set("Value", new ElementDefinition_ListValueNode("Value", aargument.value.values));
            throw new Error("ListValue not implemented");
        }
        else if (aargument.value.kind === "ObjectValue") {
            // argumentElement.properties?.set("Value", new ElementDefinition_ObjectValueNode("Value", aargument.value.fields));
            throw new Error("ObjectValue not implemented");
        }
        else if (aargument.value.kind === "NullValue") {
            argumentElement.properties?.set("Value", new primitives_1.ElementDefinition_NullValueNode("Value"));
        }
        return argumentElement;
    }
}
exports.ElementDefinition_Argument = ElementDefinition_Argument;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJndW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ3JhcGhxbC9lbGVtZW50cy9hcmd1bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxpQ0FBa0U7QUFDbEUsNkNBT3NCO0FBRXRCLE1BQWEsMEJBQTJCLFNBQVEsd0JBQWlCO0lBQzdELFlBQVksWUFBb0I7UUFDNUIsS0FBSyxDQUFDLFlBQVksRUFBRSw0QkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFXLElBQUksQ0FBQyxJQUFZO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFXLEtBQUs7UUFDWixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FHOEMsQ0FBQztJQUN0RixDQUFDO0lBQ0QsSUFBVyxLQUFLLENBQUMsS0FBaU87UUFDOU8sSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN4QztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBdUI7UUFDM0MsSUFBSSxZQUFZLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEMsSUFBSSxlQUFlLEdBQUcsSUFBSSwwQkFBMEIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUduRSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLGFBQWEsRUFBRTtZQUN4QyxlQUFlLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSw4Q0FBaUMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ25IO2FBQU0sSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7WUFDNUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksMkNBQThCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxSDthQUFNLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssWUFBWSxFQUFFO1lBQzlDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLDZDQUFnQyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUg7YUFBTSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLGNBQWMsRUFBRTtZQUNoRCxlQUFlLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSwrQ0FBa0MsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3BIO2FBQU0sSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDN0MsZUFBZSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksNENBQStCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNqSDthQUFNLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQzdDLGtIQUFrSDtZQUNsSCxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7U0FDaEQ7YUFBTSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLGFBQWEsRUFBRTtZQUMvQyxvSEFBb0g7WUFDcEgsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1NBQ2xEO2FBQU0sSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDN0MsZUFBZSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksNENBQStCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUMxRjtRQUVELE9BQU8sZUFBZSxDQUFDO0lBQzNCLENBQUM7Q0FDSjtBQW5ERCxnRUFtREMifQ==