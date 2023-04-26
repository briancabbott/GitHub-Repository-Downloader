import { ElementDefinition, ElementDefinitionType } from "./core";

export class ElementDefinition_StringValueNode extends ElementDefinition {
    value: string;
    
    constructor(name: string, value: string) {
        super(name, ElementDefinitionType.StringValueNode);
        this.value = value;
    }
    
    equals(other: ElementDefinition): boolean {
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