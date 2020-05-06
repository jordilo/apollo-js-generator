export interface QueryType {
    name: string;
}

export interface MutationType {
    name: string;
}

export interface SubscriptionType {
    name: string;
}

export interface OfType {
    kind: string;
    name: string;
    ofType: OfType;
}

export interface Type2 {
    kind: string;
    name: string;
    ofType: OfType;
}

export interface Arg {
    name: string;
    description: string;
    type: Type2;
    defaultValue: string;
}

export interface OfType6 {
    kind: string;
    name: string;
    ofType?: any;
}

export interface OfType5 {
    kind: string;
    name: string;
    ofType: OfType6;
}

export interface OfType4 {
    kind: string;
    name: string;
    ofType: OfType5;
}

export interface Type3 {
    kind: string;
    name: string;
    ofType: OfType4;
}

export interface Field {
    name: string;
    description: string;
    args: Arg[];
    type: OfType;
    isDeprecated: boolean;
    deprecationReason?: any;
}

export interface OfType9 {
    kind: string;
    name: string;
    ofType?: any;
}

export interface OfType8 {
    kind: string;
    name: string;
    ofType: OfType9;
}

export interface OfType7 {
    kind: string;
    name: string;
    ofType: OfType8;
}

export interface Type4 {
    kind: string;
    name: string;
    ofType: OfType7;
}

export interface InputField {
    name: string;
    description?: any;
    type: Type4;
    defaultValue?: any;
}

export interface EnumValue {
    name: string;
    description: string;
    isDeprecated: boolean;
    deprecationReason?: any;
}

export interface Type {
    kind: string;
    name: string;
    description: string;
    fields: Field[];
    inputFields: InputField[];
    interfaces: any[];
    enumValues: EnumValue[];
    possibleTypes?: any;
}

export interface OfType10 {
    kind: string;
    name: string;
    ofType?: any;
}

export interface Type5 {
    kind: string;
    name?: any;
    ofType: OfType10;
}

export interface Arg2 {
    name: string;
    description?: any;
    type: Type5;
    defaultValue?: any;
}

export interface Directive {
    name: string;
    description?: any;
    locations: string[];
    args: Arg2[];
}

export interface Schema {
    queryType: QueryType;
    mutationType: MutationType;
    subscriptionType: SubscriptionType;
    types: Type[];
    directives: Directive[];
}

export interface RootObject {
    __schema: Schema;
}

