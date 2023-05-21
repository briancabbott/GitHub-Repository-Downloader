"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementDefinition_InputValueDefinition = void 0;
const core_1 = require("./core");
const primitives_1 = require("./primitives");
const directive_1 = require("./directive");
class ElementDefinition_InputValueDefinition extends core_1.ElementDefinition {
    constructor(name) {
        super(name, core_1.ElementDefinitionType.InputValueDefinition);
    }
    get Name() {
        return this.name;
    }
    set Name(name) {
        this.name = name;
    }
    get Type() {
        return this.properties.get("Type");
    }
    set Type(type) {
        this.properties.set("Type", type);
    }
    get Description() {
        return this.properties.get("Description");
    }
    set Description(description) {
        this.properties.set("Description", description);
    }
    get DefaultValue() {
        return this.properties.get("DefaultValue");
    }
    set DefaultValue(defaultValue) {
        this.properties.set("DefaultValue", defaultValue);
    }
    get Directives() {
        return this.properties.get("Directives");
    }
    set Directives(directives) {
        this.properties.set("Directives", directives);
    }
    static fromInputValueDefinitionNode(inputValueDef) {
        let elementDefinition = new ElementDefinition_InputValueDefinition(inputValueDef.name.value);
        elementDefinition.Type = primitives_1.ElementDefinition_TypeNode.fromType(inputValueDef.type);
        if (inputValueDef.description !== undefined) {
            elementDefinition.Description = new primitives_1.ElementDefinition_StringValueNode("Description", inputValueDef.description?.value);
        }
        if (inputValueDef.defaultValue !== undefined) {
            switch (inputValueDef.defaultValue.kind) {
                case "BooleanValue":
                    elementDefinition.DefaultValue = new primitives_1.ElementDefinition_BooleanValueNode("DefaultValue", inputValueDef.defaultValue.value);
                    break;
                case "EnumValue":
                    elementDefinition.DefaultValue = new primitives_1.ElementDefinition_EnumValueNode("DefaultValue", inputValueDef.defaultValue.value);
                    break;
                case "FloatValue":
                    elementDefinition.DefaultValue = new primitives_1.ElementDefinition_FloatValueNode("DefaultValue", parseFloat(inputValueDef.defaultValue.value));
                    break;
                case "IntValue":
                    elementDefinition.DefaultValue = new primitives_1.ElementDefinition_IntValueNode("DefaultValue", parseInt(inputValueDef.defaultValue.value));
                    break;
                case "ListValue":
                    elementDefinition.DefaultValue = primitives_1.ElementDefinition_ConstListValueNode.fromConstListValueNode(inputValueDef.defaultValue);
                    break;
                case "NullValue":
                    elementDefinition.DefaultValue = new primitives_1.ElementDefinition_NullValueNode("DefaultValue");
                    break;
                case "ObjectValue":
                    elementDefinition.DefaultValue = primitives_1.ElementDefinition_ConstObjectValueNode.fromConstObjectValueNode(inputValueDef.defaultValue);
                    break;
                case "StringValue":
                    elementDefinition.DefaultValue = new primitives_1.ElementDefinition_StringValueNode("DefaultValue", inputValueDef.defaultValue.value);
                    break;
            }
        }
        inputValueDef.directives?.forEach(directive => {
            elementDefinition.Directives.push(directive_1.ElementDefinition_Directive.fromDirectiveNode(directive));
        });
        return elementDefinition;
    }
}
exports.ElementDefinition_InputValueDefinition = ElementDefinition_InputValueDefinition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRfdmFsdWVfZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL2VsZW1lbnRzL2lucHV0X3ZhbHVlX2RlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsaUNBQW1HO0FBQ25HLDZDQWFzQjtBQUN0QiwyQ0FBMEQ7QUFJMUQsTUFBYSxzQ0FBdUMsU0FBUSx3QkFBaUI7SUFFekUsWUFBWSxJQUFZO1FBQ3BCLEtBQUssQ0FBQyxJQUFJLEVBQUUsNEJBQXFCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBR0QsSUFBSSxJQUFJO1FBQ0osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFJLElBQUksQ0FBQyxJQUFZO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFHRCxJQUFJLElBQUk7UUFDSixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBaUcsQ0FBQztJQUN2SSxDQUFDO0lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBa0c7UUFDdkcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFHRCxJQUFJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBc0MsQ0FBQTtJQUNsRixDQUFDO0lBQ0QsSUFBSSxXQUFXLENBQUMsV0FBOEM7UUFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFHRCxJQUFJLFlBQVk7UUFDWixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBb0MsQ0FBQztJQUNsRixDQUFDO0lBQ0QsSUFBSSxZQUFZLENBQUMsWUFBNkM7UUFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFHRCxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBdUMsQ0FBQztJQUNuRixDQUFDO0lBQ0QsSUFBSSxVQUFVLENBQUMsVUFBOEM7UUFDekQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFHRCxNQUFNLENBQUMsNEJBQTRCLENBQUMsYUFBdUM7UUFDdkUsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHNDQUFzQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0YsaUJBQWlCLENBQUMsSUFBSSxHQUFHLHVDQUEwQixDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFakYsSUFBSSxhQUFhLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRTtZQUN6QyxpQkFBaUIsQ0FBQyxXQUFXLEdBQUcsSUFBSSw4Q0FBaUMsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMxSDtRQUVELElBQUksYUFBYSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7WUFDMUMsUUFBUSxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRTtnQkFDckMsS0FBSyxjQUFjO29CQUNmLGlCQUFpQixDQUFDLFlBQVksR0FBRyxJQUFJLCtDQUFrQyxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxSCxNQUFNO2dCQUNWLEtBQUssV0FBVztvQkFDWixpQkFBaUIsQ0FBQyxZQUFZLEdBQUcsSUFBSSw0Q0FBK0IsQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdkgsTUFBTTtnQkFDVixLQUFLLFlBQVk7b0JBQ2IsaUJBQWlCLENBQUMsWUFBWSxHQUFHLElBQUksNkNBQWdDLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3BJLE1BQU07Z0JBQ1YsS0FBSyxVQUFVO29CQUNYLGlCQUFpQixDQUFDLFlBQVksR0FBRyxJQUFJLDJDQUE4QixDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNoSSxNQUFNO2dCQUNWLEtBQUssV0FBVztvQkFDWixpQkFBaUIsQ0FBQyxZQUFZLEdBQUcsaURBQW9DLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUN6SCxNQUFNO2dCQUNWLEtBQUssV0FBVztvQkFDWixpQkFBaUIsQ0FBQyxZQUFZLEdBQUcsSUFBSSw0Q0FBK0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDckYsTUFBTTtnQkFDVixLQUFLLGFBQWE7b0JBQ2QsaUJBQWlCLENBQUMsWUFBWSxHQUFHLG1EQUFzQyxDQUFDLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDN0gsTUFBTTtnQkFDVixLQUFLLGFBQWE7b0JBQ2QsaUJBQWlCLENBQUMsWUFBWSxHQUFHLElBQUksOENBQWlDLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3pILE1BQU07YUFDYjtTQUNKO1FBQ0QsYUFBYSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDMUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyx1Q0FBMkIsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2hHLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxpQkFBaUIsQ0FBQztJQUM3QixDQUFDO0NBRUo7QUExRkQsd0ZBMEZDIn0=