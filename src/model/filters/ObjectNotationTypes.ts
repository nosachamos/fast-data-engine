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

type UnaryExpressionValue = string;

interface EqualsExpression {
  equals: AccessorConfig & StringBinaryExpressionValue<SupportedDataTypes>;
}

interface InListExpression {
  inList: FieldAccessorConfig & StringBinaryExpressionValue<SupportedDataTypes[]>;
}

interface InArrayExpression {
  inArray: FieldAccessorConfig & StringBinaryExpressionValue<SupportedDataTypes>;
}

interface IncludesExpression {
  includes: FieldAccessorConfig & StringBinaryExpressionValue<string>;
}

interface MatchesExpression {
  matches: FieldAccessorConfig & StringBinaryExpressionValue<string | RegExp>;
}

interface StartsWithExpression {
  startsWith: FieldAccessorConfig & StringBinaryExpressionValue<string>;
}

interface EndsWithExpression {
  endsWith: FieldAccessorConfig & StringBinaryExpressionValue<string>;
}

interface TypeOfExpression {
  typeOf: FieldAccessorConfig & BinaryExpressionValue<SupportedTypesOfs>;
}

interface GreaterThanExpression {
  greaterThan: FieldAccessorConfig & BinaryExpressionValue<number>;
}

interface GreaterThanOrEqualsExpression {
  greaterThanOrEquals: FieldAccessorConfig & BinaryExpressionValue<number>;
}

interface LessThanExpression {
  lessThan: FieldAccessorConfig & BinaryExpressionValue<number>;
}

interface LessThanOrEqualsExpression {
  lessThanOrEquals: FieldAccessorConfig & BinaryExpressionValue<number>;
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

export type FilterExpression =
  | Record<string, never>
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
