export type SupportedDataTypes = string | number | boolean | null | undefined;

export type BinaryExpressionValue<O, V> = {
    field: O;
    value: V;
};
export type StringBinaryExpressionValue<O, V> = BinaryExpressionValue<O, V> & {
    ignoreCase?: boolean;
};

type UnaryExpressionValue = string;

interface isDefinedExpression {
    isDefined: UnaryExpressionValue;
}

interface EqualsExpression {
    equals: StringBinaryExpressionValue<string, SupportedDataTypes>;
}

interface InListExpression {
    inList: StringBinaryExpressionValue<string, SupportedDataTypes[]>;
}

interface IncludesExpression {
    includes: StringBinaryExpressionValue<string, string>;
}

interface MatchesExpression {
    matches: StringBinaryExpressionValue<string, string | RegExp>;
}

interface StartsWithExpression {
    startsWith: StringBinaryExpressionValue<string, string>;
}

interface EndsWithExpression {
    endsWith: StringBinaryExpressionValue<string, string>;
}

interface GreaterThanExpression {
    greaterThan: BinaryExpressionValue<string, number>;
}

interface GreaterThanOrEqualsExpression {
    greaterThanOrEquals: BinaryExpressionValue<string, number>;
}

interface LessThanExpression {
    lessThan: BinaryExpressionValue<string, number>;
}

interface LessThanOrEqualsExpression {
    lessThanOrEquals: BinaryExpressionValue<string, number>;
}

interface isTrueExpression {
    isTrue: UnaryExpressionValue;
}

interface isFalseExpression {
    isFalse: UnaryExpressionValue;
}

interface AndExpression {
    and: [FilterExpression, FilterExpression, ...FilterExpression[]];
}

interface OrExpression {
    or: [FilterExpression, FilterExpression, ...FilterExpression[]];
}

interface XorExpression {
    xor: [FilterExpression, FilterExpression, ...FilterExpression[]];
}

interface NotExpression {
    not: FilterExpression;
}

export type FilterExpression =
    | InListExpression
    | NotExpression
    | isDefinedExpression
    | EqualsExpression
    | IncludesExpression
    | MatchesExpression
    | StartsWithExpression
    | EndsWithExpression
    | GreaterThanExpression
    | GreaterThanOrEqualsExpression
    | LessThanExpression
    | LessThanOrEqualsExpression
    | isTrueExpression
    | isFalseExpression
    | AndExpression
    | OrExpression
    | XorExpression;
