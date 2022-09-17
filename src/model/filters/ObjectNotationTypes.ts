import {JsonRow} from "../JsonRow";

export type SupportedDataTypes = string | number | boolean | null | undefined | object;

export enum SupportedTypesOfs {
    string = 'string',
    number = 'number',
    boolean = 'boolean',
    object = 'object',
    array = 'array',
    null = 'null',
    undefined = 'undefined'
}

export type ValueAccessor = (row: JsonRow, key: string) => SupportedDataTypes;

export type FieldAccessor = {
    field: string;
}

export type ObjectKeysAccessor = {
    objectKeys: string;
}

export type ObjectValuesAccessor = {
    objectValues: string;
}

export type ArrayLengthAccessor = {
    arrayLength: string;
}

export type Accessor = FieldAccessor | ObjectKeysAccessor | ObjectValuesAccessor | ArrayLengthAccessor;

export type BinaryExpressionValue<V> = {
    value: V;
};

export type StringBinaryExpressionValue<V> = BinaryExpressionValue<V> & {
    ignoreCase?: boolean;
};

type UnaryExpressionValue = string;

interface EqualsExpression {
    equals: Accessor & StringBinaryExpressionValue<SupportedDataTypes>;
}

interface InListExpression {
    inList: (FieldAccessor | ArrayLengthAccessor) & StringBinaryExpressionValue<SupportedDataTypes[]>;
}

interface InArrayExpression {
    inArray: (ObjectKeysAccessor | ObjectValuesAccessor | FieldAccessor) & StringBinaryExpressionValue<SupportedDataTypes>;
}

interface IncludesExpression {
    includes: FieldAccessor & StringBinaryExpressionValue<string>;
}

interface MatchesExpression {
    matches: FieldAccessor & StringBinaryExpressionValue<string | RegExp>;
}

interface StartsWithExpression {
    startsWith: FieldAccessor & StringBinaryExpressionValue<string>;
}

interface EndsWithExpression {
    endsWith: FieldAccessor & StringBinaryExpressionValue<string>;
}

interface TypeOfExpression {
    typeOf: FieldAccessor & BinaryExpressionValue<SupportedTypesOfs>;
}

interface GreaterThanExpression {
    greaterThan: (FieldAccessor | ArrayLengthAccessor) & BinaryExpressionValue<number>;
}

interface GreaterThanOrEqualsExpression {
    greaterThanOrEquals: (FieldAccessor | ArrayLengthAccessor) & BinaryExpressionValue<number>;
}

interface LessThanExpression {
    lessThan: (FieldAccessor | ArrayLengthAccessor) & BinaryExpressionValue<number>;
}

interface LessThanOrEqualsExpression {
    lessThanOrEquals: (FieldAccessor | ArrayLengthAccessor) & BinaryExpressionValue<number>;
}

interface IsDefinedExpression {
    isDefined: UnaryExpressionValue;
}

interface IsTrueExpression {
    isTrue: UnaryExpressionValue;
}

interface IsFalseExpression {
    isFalse: UnaryExpressionValue;
}

interface AndExpression {
    and: FilterExpression[];
}

interface OrExpression {
    or: FilterExpression[];
}

interface XorExpression {
    xor: FilterExpression[];
}

interface NotExpression {
    not: FilterExpression;
}

export type FilterExpression = Record<string, never>
    | InListExpression
    | InArrayExpression
    | NotExpression
    | IsDefinedExpression
    | EqualsExpression
    | IncludesExpression
    | MatchesExpression
    | StartsWithExpression
    | EndsWithExpression
    | GreaterThanExpression
    | GreaterThanOrEqualsExpression
    | LessThanExpression
    | LessThanOrEqualsExpression
    | IsTrueExpression
    | IsFalseExpression
    | TypeOfExpression
    | AndExpression
    | OrExpression
    | XorExpression;
