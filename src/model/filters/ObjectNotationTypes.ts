import { INode } from './INode';

export type SupportedDataTypes = string | number | boolean | null | undefined | object;

export enum SupportedTypesOfs {
    string = 'string',
    number = 'number',
    boolean = 'boolean',
    object = 'object',
    array = 'array',
    null = 'null',
    undefined = 'undefined',
}

export type FieldAccessorConfig = {
    field: string;
};

export type AccessorConfig = FieldAccessorConfig;

export type BinaryExpressionValue<V> = {
    value: V;
};

export type StringBinaryExpressionValue<V> = BinaryExpressionValue<V> & {
    ignoreCase?: boolean;
};

type UnaryExpressionConfig = string;

export type NumericConfig = FieldAccessorConfig & BinaryExpressionValue<number>;
export type TypeOfConfig = FieldAccessorConfig & BinaryExpressionValue<SupportedTypesOfs>;
export type EndsWithConfig = FieldAccessorConfig & StringBinaryExpressionValue<string>;
export type StartsWithConfig = FieldAccessorConfig & StringBinaryExpressionValue<string>;
export type MatchesConfig = FieldAccessorConfig & StringBinaryExpressionValue<string | RegExp>;
export type IncludesConfig = FieldAccessorConfig & StringBinaryExpressionValue<string>;
export type InArrayConfig = FieldAccessorConfig & StringBinaryExpressionValue<SupportedDataTypes>;
export type InListConfig = FieldAccessorConfig & StringBinaryExpressionValue<SupportedDataTypes[]>;
export type EqualsConfig = AccessorConfig & StringBinaryExpressionValue<SupportedDataTypes>;

export type OperatorConfig =
    | NumericConfig
    | TypeOfConfig
    | EndsWithConfig
    | StartsWithConfig
    | MatchesConfig
    | IncludesConfig
    | InArrayConfig
    | InListConfig
    | EqualsConfig
    | FilterExpression
    | FilterExpression[]
    | string
    | undefined;

export const isEqualsConfig = (v: OperatorConfig, key: FilterKeys): v is EqualsConfig => {
    return typeof v === 'object' && key === 'equals';
};
export const isInListConfig = (v: OperatorConfig, key: FilterKeys): v is InListConfig => {
    return typeof v === 'object' && key === 'inList';
};
export const isInArrayConfig = (v: OperatorConfig, key: FilterKeys): v is InArrayConfig => {
    return typeof v === 'object' && key === 'inArray';
};
export const isIncludesConfig = (v: OperatorConfig, key: FilterKeys): v is IncludesConfig => {
    return typeof v === 'object' && key === 'includes';
};
export const isMatchesConfig = (v: OperatorConfig, key: FilterKeys): v is MatchesConfig => {
    return typeof v === 'object' && key === 'matches';
};
export const isStartsWithConfig = (v: OperatorConfig, key: FilterKeys): v is StartsWithConfig => {
    return typeof v === 'object' && key === 'startsWith';
};
export const isEndsWithConfig = (v: OperatorConfig, key: FilterKeys): v is EndsWithConfig => {
    return typeof v === 'object' && key === 'endsWith';
};
export const isTypeOfConfig = (v: OperatorConfig, key: FilterKeys): v is TypeOfConfig => {
    return typeof v === 'object' && key === 'typeOf';
};
export const isGreaterThanConfig = (v: OperatorConfig, key: FilterKeys): v is NumericConfig => {
    return typeof v === 'object' && key === 'greaterThan';
};
export const isGreaterThanOrEqualsConfig = (v: OperatorConfig, key: FilterKeys): v is NumericConfig => {
    return typeof v === 'object' && key === 'greaterThanOrEquals';
};
export const isLessThanConfig = (v: OperatorConfig, key: FilterKeys): v is NumericConfig => {
    return typeof v === 'object' && key === 'lessThan';
};
export const isLessThanOrEqualsConfig = (v: OperatorConfig, key: FilterKeys): v is NumericConfig => {
    return typeof v === 'object' && key === 'lessThanOrEquals';
};
export const isIsDefinedConfig = (v: OperatorConfig, key: FilterKeys): v is UnaryExpressionConfig => {
    return typeof v === 'string' && key === 'isDefined';
};
export const isTrueConfig = (v: OperatorConfig, key: FilterKeys): v is UnaryExpressionConfig => {
    return typeof v === 'string' && key === 'isTrue';
};
export const isFalseConfig = (v: OperatorConfig, key: FilterKeys): v is UnaryExpressionConfig => {
    return typeof v === 'string' && key === 'isFalse';
};
export const isAndConfig = (v: OperatorConfig, key: FilterKeys): v is FilterExpression[] => {
    return typeof v === 'object' && key === 'and';
};
export const isOrConfig = (v: OperatorConfig, key: FilterKeys): v is FilterExpression[] => {
    return typeof v === 'object' && key === 'or';
};
export const isXorConfig = (v: OperatorConfig, key: FilterKeys): v is FilterExpression[] => {
    return typeof v === 'object' && key === 'xor';
};
export const isNotConfig = (v: OperatorConfig, key: FilterKeys): v is FilterExpression => {
    return typeof v === 'object' && key === 'not';
};
export const isArrayNode = (v: INode | INode[]): v is INode[] => {
    return Array.isArray(v);
};

export type FilterExpression = {
    not?: FilterExpression;
    xor?: FilterExpression[];
    or?: FilterExpression[];
    and?: FilterExpression[];
    isFalse?: UnaryExpressionConfig;
    isTrue?: UnaryExpressionConfig;
    isDefined?: UnaryExpressionConfig;
    lessThanOrEquals?: NumericConfig;
    lessThan?: NumericConfig;
    greaterThanOrEquals?: NumericConfig;
    greaterThan?: NumericConfig;
    typeOf?: TypeOfConfig;
    endsWith?: EndsWithConfig;
    startsWith?: StartsWithConfig;
    matches?: MatchesConfig;
    includes?: IncludesConfig;
    inArray?: InArrayConfig;
    inList?: InListConfig;
    equals?: EqualsConfig;
};

export type KnownKeys<T> = {
    [K in keyof T]: string extends K ? never : number extends K ? never : K;
} extends infer R
    ? R extends { [_ in keyof T]: infer U }
        ? U
        : never
    : never;

export type FilterKeys = KnownKeys<FilterExpression>;

export const StringOperators = ['equals', 'matches', 'endsWith', 'startsWith', 'includes'] as const;
export const NumericOperators = [
    'greaterThan',
    'greaterThanOrEquals',
    'lessThan',
    'lessThanOrEquals',
    'equals',
] as const;
export const BooleanOperators = ['isTrue', 'isFalse', 'isDefined'] as const;
export const ArrayOrListOperators = ['inList', 'inArray'] as const;
export const LogicalGroupOperators = ['and', 'or', 'xor'] as const;
export const LogicalOperators = [...LogicalGroupOperators, 'not'] as const;

export const isStringOperator = (operator: FilterKeys): operator is typeof StringOperators[number] => {
    return StringOperators.includes(operator as typeof StringOperators[number]);
};
export const isNumericOperator = (operator: FilterKeys): operator is typeof NumericOperators[number] => {
    return NumericOperators.includes(operator as typeof NumericOperators[number]);
};
export const isBooleanOperators = (operator: FilterKeys): operator is typeof BooleanOperators[number] => {
    return BooleanOperators.includes(operator as typeof BooleanOperators[number]);
};
export const isLogicalGroupOperators = (operator: FilterKeys): operator is typeof LogicalGroupOperators[number] => {
    return LogicalGroupOperators.includes(operator as typeof LogicalGroupOperators[number]);
};
export const isLogicalOperators = (operator: FilterKeys): operator is typeof LogicalOperators[number] => {
    return LogicalOperators.includes(operator as typeof LogicalOperators[number]);
};
export const isArrayOrListOperators = (operator: FilterKeys): operator is typeof ArrayOrListOperators[number] => {
    return ArrayOrListOperators.includes(operator as typeof ArrayOrListOperators[number]);
};
