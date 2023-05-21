"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementDefinition_NonNullType = exports.ElementDefinition_ListType = exports.ElementDefinition_NamedTypeNode = exports.ElementDefinition_TypeNode = exports.ElementDefinition_ConstObjectFieldNode = exports.ElementDefinition_ConstObjectValueNode = exports.ElementDefinition_ConstListValueNode = exports.ElementDefinition_EnumValueNode = exports.ElementDefinition_NullValueNode = exports.ElementDefinition_BooleanValueNode = exports.ElementDefinition_FloatValueNode = exports.ElementDefinition_IntValueNode = exports.ElementDefinition_StringValueNode = void 0;
const core_1 = require("./core");
class ElementDefinition_StringValueNode extends core_1.ElementDefinition {
    value;
    constructor(name, value) {
        super(name, core_1.ElementDefinitionType.StringValueNode);
        this.value = value;
    }
    equals(other) {
        return true;
    }
}
exports.ElementDefinition_StringValueNode = ElementDefinition_StringValueNode;
class ElementDefinition_IntValueNode extends core_1.ElementDefinition {
    value;
    constructor(name, value) {
        super(name, core_1.ElementDefinitionType.IntValueNode);
        this.value = value;
    }
}
exports.ElementDefinition_IntValueNode = ElementDefinition_IntValueNode;
class ElementDefinition_FloatValueNode extends core_1.ElementDefinition {
    value;
    constructor(name, value) {
        super(name, core_1.ElementDefinitionType.FloatValueNode);
        this.value = value;
    }
}
exports.ElementDefinition_FloatValueNode = ElementDefinition_FloatValueNode;
class ElementDefinition_BooleanValueNode extends core_1.ElementDefinition {
    value;
    constructor(name, value) {
        super(name, core_1.ElementDefinitionType.BooleanValueNode);
        this.value = value;
    }
}
exports.ElementDefinition_BooleanValueNode = ElementDefinition_BooleanValueNode;
class ElementDefinition_NullValueNode extends core_1.ElementDefinition {
    constructor(name) {
        super(name, core_1.ElementDefinitionType.NullValueNode);
    }
}
exports.ElementDefinition_NullValueNode = ElementDefinition_NullValueNode;
class ElementDefinition_EnumValueNode extends core_1.ElementDefinition {
    value;
    constructor(name, value) {
        super(name, core_1.ElementDefinitionType.EnumValueNode);
        this.value = value;
    }
}
exports.ElementDefinition_EnumValueNode = ElementDefinition_EnumValueNode;
class ElementDefinition_ConstListValueNode extends core_1.ElementDefinition {
    values;
    constructor(name, values) {
        super(name, core_1.ElementDefinitionType.ConstListValueNode);
        this.values = values;
    }
    static fromConstListValueNode(node) {
        const values = node.values.map((value) => {
            if (value.kind === "IntValue") {
                return new ElementDefinition_IntValueNode("value", parseInt(value.value));
            }
            else if (value.kind === "FloatValue") {
                return new ElementDefinition_FloatValueNode("value", parseFloat(value.value));
            }
            else if (value.kind === "StringValue") {
                return new ElementDefinition_StringValueNode("value", value.value);
            }
            else if (value.kind === "BooleanValue") {
                return new ElementDefinition_BooleanValueNode("value", value.value);
            }
            else if (value.kind === "EnumValue") {
                return new ElementDefinition_EnumValueNode("value", value.value);
            }
            else if (value.kind === "NullValue") {
                return new ElementDefinition_NullValueNode("value");
            }
            else if (value.kind === "ListValue") {
                return ElementDefinition_ConstListValueNode.fromConstListValueNode(value);
            }
            else if (value.kind === "ObjectValue") {
                return ElementDefinition_ConstObjectValueNode.fromConstObjectValueNode(value);
            }
            else {
                throw new Error(`Unknown value kind ${value}`);
            }
        });
        return new ElementDefinition_ConstListValueNode(core_1.ElementDefinitionType.ConstListValueNode, values);
    }
}
exports.ElementDefinition_ConstListValueNode = ElementDefinition_ConstListValueNode;
class ElementDefinition_ConstObjectValueNode extends core_1.ElementDefinition {
    fields;
    constructor(name, fields) {
        super(name, core_1.ElementDefinitionType.ConstObjectValueNode);
        this.fields = fields;
    }
    static fromConstObjectValueNode(node) {
        let objFields = Array();
        node.fields.forEach((ffield) => {
            objFields.push(ElementDefinition_ConstObjectFieldNode.fromConstObjectFieldNode(ffield));
        });
        return new ElementDefinition_ConstObjectValueNode(core_1.ElementDefinitionType.ConstObjectValueNode, objFields);
    }
}
exports.ElementDefinition_ConstObjectValueNode = ElementDefinition_ConstObjectValueNode;
class ElementDefinition_ConstObjectFieldNode extends core_1.ElementDefinition {
    name;
    value;
    constructor(name, value) {
        super(name, core_1.ElementDefinitionType.ConstObjectFieldNode);
        this.name = name;
        this.value = value;
    }
    static fromConstObjectFieldNode(fieldNode) {
        let value = fieldNode.value;
        let vvalue;
        if (value.kind === "IntValue") {
            vvalue = new ElementDefinition_IntValueNode("value", parseInt(value.value));
        }
        else if (value.kind === "FloatValue") {
            vvalue = new ElementDefinition_FloatValueNode("value", parseFloat(value.value));
        }
        else if (value.kind === "StringValue") {
            vvalue = new ElementDefinition_StringValueNode("value", value.value);
        }
        else if (value.kind === "BooleanValue") {
            vvalue = new ElementDefinition_BooleanValueNode("value", value.value);
        }
        else if (value.kind === "EnumValue") {
            vvalue = new ElementDefinition_EnumValueNode("value", value.value);
        }
        else if (value.kind === "NullValue") {
            vvalue = new ElementDefinition_NullValueNode("value");
        }
        else if (value.kind === "ListValue") {
            vvalue = ElementDefinition_ConstListValueNode.fromConstListValueNode(value);
        }
        else if (value.kind === "ObjectValue") {
            vvalue = ElementDefinition_ConstObjectValueNode.fromConstObjectValueNode(value);
        }
        else {
            throw new Error(`Unknown value kind ${value}`);
        }
        return new ElementDefinition_ConstObjectFieldNode(fieldNode.name.value, vvalue);
    }
}
exports.ElementDefinition_ConstObjectFieldNode = ElementDefinition_ConstObjectFieldNode;
class ElementDefinition_TypeNode {
    static fromType(ntype) {
        if (ntype.kind === "NamedType") {
            return new ElementDefinition_NamedTypeNode(ntype.name.value);
        }
        else if (ntype.kind === "NonNullType") {
            return new ElementDefinition_NonNullType(ntype.type.kind.toString());
        }
        else if (ntype.kind === "ListType") {
            return new ElementDefinition_ListType(ntype.type.kind.toString());
        }
        else {
            throw new Error(`Unknown type kind ${ntype}`);
        }
    }
}
exports.ElementDefinition_TypeNode = ElementDefinition_TypeNode;
class ElementDefinition_NamedTypeNode extends core_1.ElementDefinition {
    constructor(name) {
        super(name, core_1.ElementDefinitionType.NameType);
    }
    static fromType(ntype) {
        return ElementDefinition_TypeNode.fromType(ntype);
    }
}
exports.ElementDefinition_NamedTypeNode = ElementDefinition_NamedTypeNode;
class ElementDefinition_ListType extends core_1.ElementDefinition {
    listType;
    constructor(name) {
        super(name, core_1.ElementDefinitionType.ListType);
        this.listType = name;
    }
    static fromType(ntype) {
        return ElementDefinition_TypeNode.fromType(ntype);
    }
}
exports.ElementDefinition_ListType = ElementDefinition_ListType;
class ElementDefinition_NonNullType extends core_1.ElementDefinition {
    nonNullType;
    constructor(name) {
        super(name, core_1.ElementDefinitionType.NonNullType);
        this.nonNullType = name;
    }
    static fromType(ntype) {
        return ElementDefinition_TypeNode.fromType(ntype);
    }
}
exports.ElementDefinition_NonNullType = ElementDefinition_NonNullType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWl0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL2VsZW1lbnRzL3ByaW1pdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBUUEsaUNBSWdCO0FBRWhCLE1BQWEsaUNBQWtDLFNBQVEsd0JBQWlCO0lBQ3BFLEtBQUssQ0FBUztJQUNkLFlBQVksSUFBWSxFQUFFLEtBQWE7UUFDbkMsS0FBSyxDQUFDLElBQUksRUFBRSw0QkFBcUIsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQXdCO1FBQzNCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSjtBQVZELDhFQVVDO0FBRUQsTUFBYSw4QkFBK0IsU0FBUSx3QkFBaUI7SUFDakUsS0FBSyxDQUFTO0lBQ2QsWUFBWSxJQUFZLEVBQUUsS0FBYTtRQUNuQyxLQUFLLENBQUMsSUFBSSxFQUFFLDRCQUFxQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7Q0FDSjtBQU5ELHdFQU1DO0FBRUQsTUFBYSxnQ0FBaUMsU0FBUSx3QkFBaUI7SUFDbkUsS0FBSyxDQUFTO0lBQ2QsWUFBWSxJQUFZLEVBQUUsS0FBYTtRQUNuQyxLQUFLLENBQUMsSUFBSSxFQUFFLDRCQUFxQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7Q0FDSjtBQU5ELDRFQU1DO0FBRUQsTUFBYSxrQ0FBbUMsU0FBUSx3QkFBaUI7SUFDckUsS0FBSyxDQUFVO0lBQ2YsWUFBWSxJQUFZLEVBQUUsS0FBYztRQUNwQyxLQUFLLENBQUMsSUFBSSxFQUFFLDRCQUFxQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFD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