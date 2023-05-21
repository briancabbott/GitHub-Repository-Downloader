"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementDefinition = exports.ElementDefinition_Ref = exports.ElementDefinitionType = void 0;
// export enum ElementDefinitionType_Types {
//     NonNullType = "nonNullType",
//     NamedType = "namedType",
//     ListType= "listType",
//     Type = "nonNullType | namedType | listType"
// }
// export enum ElementDefinitionType_Primitives {
//     StringValueNode
//     IntValueNode = "IntValueNode",
//     FloatValueNode = "FloatValueNode",
//     BooleanValueNode = "BooleanValueNode",
//     NullValueNode = "NullValueNode",
//     EnumValueNode = "EnumValueNodeenum",
//     ConstListValueNode = "ConstListValueNode",
//     ConstObjectValueNode = "ConstObjectValueNode",
//     ConstObjectFieldNode = "ConstObjectFieldNode",
// }
// export enum ElementDefinitionType_Objects {
//     ObjectType = "ObjectType",
//     InterfaceType = "InterfaceType",
//     NameType = "NameType",
//     Directive = "Directive",
//     Argument = "Argument",
//     FieldDefinition = "FieldDefinition",
//     InputValueDefinitionNode = "InputValueDefinitionNode"
// }
// export const ElementDefinitionType = { 
// }
// export type ElementDefinitionType = typeof ElementDefinitionType
var ElementDefinitionType;
(function (ElementDefinitionType) {
    ElementDefinitionType["NonNullType"] = "NonNullType";
    ElementDefinitionType["NamedType"] = "NamedType";
    ElementDefinitionType["ListType"] = "ListType";
    ElementDefinitionType["Type"] = "NonNullType | NamedType | ListType";
    ElementDefinitionType["BooleanValueNode"] = "BooleanValueNode";
    ElementDefinitionType["ConstListValueNode"] = "ConstListValueNode";
    ElementDefinitionType["ConstObjectValueNode"] = "ConstObjectValueNode";
    ElementDefinitionType["ConstObjectFieldNode"] = "ConstObjectFieldNode";
    ElementDefinitionType["EnumValueNode"] = "EnumValueNode";
    ElementDefinitionType["IntValueNode"] = "IntValueNode";
    ElementDefinitionType["FloatValueNode"] = "FloatValueNode";
    ElementDefinitionType["NullValueNode"] = "NullValueNode";
    ElementDefinitionType["StringValueNode"] = "StringValueNode";
    ElementDefinitionType["ObjectType"] = "ObjectType";
    ElementDefinitionType["InterfaceType"] = "InterfaceType";
    ElementDefinitionType["NameType"] = "NameType";
    ElementDefinitionType["Directive"] = "Directive";
    ElementDefinitionType["Argument"] = "Argument";
    ElementDefinitionType["FieldDefinition"] = "FieldDefinition";
    ElementDefinitionType["InputValueDefinition"] = "InputValueDefinition";
})(ElementDefinitionType = exports.ElementDefinitionType || (exports.ElementDefinitionType = {}));
class ElementDefinition_Ref {
    name;
    type;
    parentRefs;
    childRefs;
    constructor(name, type, parentRefs, childRefs) {
        this.name = name;
        this.type = type;
        this.parentRefs = parentRefs;
        this.childRefs = childRefs;
    }
    isRelativelyEqual(other) {
        if (this.name === other.name && this.type === other.type) {
            return true;
        }
        return false;
    }
    isAbsolutelyEqual(other) {
        let relEquals = this.isRelativelyEqual(other);
        let parentRefsEqual = this.parentRefs.length === other.parentRefs.length && this.parentRefs.every((parentRef, index) => {
            other.parentRefs[index].isRelativelyEqual(parentRef);
        });
        return relEquals && parentRefsEqual;
    }
}
exports.ElementDefinition_Ref = ElementDefinition_Ref;
class ElementDefinition {
    name;
    type;
    properties;
    constructor(name, type, properties) {
        this.name = name;
        this.type = type;
        if (properties === undefined) {
            this.properties = new Map();
        }
        else {
            this.properties = properties;
        }
    }
    get Properties() {
        return this.properties;
    }
    set Properties(properties) {
        if (properties === undefined) {
            this.properties = new Map();
        }
        else {
            this.properties = properties;
        }
    }
    equals(other) {
        return true;
    }
}
exports.ElementDefinition = ElementDefinition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL2VsZW1lbnRzL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBcUJBLDRDQUE0QztBQUM1QyxtQ0FBbUM7QUFDbkMsK0JBQStCO0FBQy9CLDRCQUE0QjtBQUM1QixrREFBa0Q7QUFDbEQsSUFBSTtBQUVKLGlEQUFpRDtBQUNqRCxzQkFBc0I7QUFDdEIscUNBQXFDO0FBQ3JDLHlDQUF5QztBQUN6Qyw2Q0FBNkM7QUFDN0MsdUNBQXVDO0FBQ3ZDLDJDQUEyQztBQUMzQyxpREFBaUQ7QUFDakQscURBQXFEO0FBQ3JELHFEQUFxRDtBQUNyRCxJQUFJO0FBRUosOENBQThDO0FBQzlDLGlDQUFpQztBQUNqQyx1Q0FBdUM7QUFDdkMsNkJBQTZCO0FBQzdCLCtCQUErQjtBQUMvQiw2QkFBNkI7QUFDN0IsMkNBQTJDO0FBQzNDLDREQUE0RDtBQUM1RCxJQUFJO0FBRUosMENBQTBDO0FBQzFDLElBQUk7QUFDSixtRUFBbUU7QUFFbkUsSUFBWSxxQkEwQlg7QUExQkQsV0FBWSxxQkFBcUI7SUFDN0Isb0RBQTJCLENBQUE7SUFDM0IsZ0RBQXVCLENBQUE7SUFDdkIsOENBQW9CLENBQUE7SUFDcEIsb0VBQTJDLENBQUE7SUFHM0MsOERBQXFDLENBQUE7SUFDckMsa0VBQXlDLENBQUE7SUFDekMsc0VBQTZDLENBQUE7SUFDN0Msc0VBQTZDLENBQUE7SUFFN0Msd0RBQStCLENBQUE7SUFDL0Isc0RBQTZCLENBQUE7SUFDN0IsMERBQWlDLENBQUE7SUFDakMsd0RBQStCLENBQUE7SUFDL0IsNERBQW1DLENBQUE7SUFHbkMsa0RBQXlCLENBQUE7SUFDekIsd0RBQStCLENBQUE7SUFDL0IsOENBQXFCLENBQUE7SUFDckIsZ0RBQXVCLENBQUE7SUFDdkIsOENBQXFCLENBQUE7SUFDckIsNERBQW1DLENBQUE7SUFDbkMsc0VBQTZDLENBQUE7QUFDakQsQ0FBQyxFQTFCVyxxQkFBcUIsR0FBckIsNkJBQXFCLEtBQXJCLDZCQUFxQixRQTBCaEM7QUFHRCxNQUFhLHFCQUFxQjtJQUM5QixJQUFJLENBQVE7SUFDWixJQUFJLENBQXVCO0lBQzNCLFVBQVUsQ0FBOEI7SUFDeEMsU0FBUyxDQUE4QjtJQUV2QyxZQUFZLElBQVksRUFDaEIsSUFBMkIsRUFDM0IsVUFBd0MsRUFDeEMsU0FBdUM7UUFDM0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQUVELGlCQUFpQixDQUFDLEtBQTRCO1FBQzFDLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksRUFBRTtZQUN0RCxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEtBQTRCO1FBQzFDLElBQUksU0FBUyxHQUFZLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN0RCxJQUFJLGVBQWUsR0FBWSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUM1SCxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3hELENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxTQUFTLElBQUksZUFBZSxDQUFDO0lBQ3hDLENBQUM7Q0FDSjtBQTlCRCxzREE4QkM7QUFFRCxNQUFhLGlCQUFpQjtJQUMxQixJQUFJLENBQVM7SUFDYixJQUFJLENBQXdCO0lBQzVCLFVBQVUsQ0FBa0M7SUFFNUMsWUFBWSxJQUFZLEVBQ1osSUFBMkIsRUFDM0IsVUFBd0Q7UUFDaEUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQTRDLENBQUM7U0FDekU7YUFBTTtZQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNqQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUNELElBQVcsVUFBVSxDQUFDLFVBQXlEO1FBQzNFLElBQUksVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxFQUE0QyxDQUFDO1NBQ3pFO2FBQU07WUFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztTQUNoQztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBc0M7UUFDekMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKO0FBL0JELDhDQStCQyJ9