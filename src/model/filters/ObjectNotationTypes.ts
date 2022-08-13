export type SupportedDataTypes = string | number | boolean | null | undefined;

export type BinaryExpressionValue<O, V> = {
  field: O;
  value: V;
};

type UnaryExpressionValue = string;

interface isDefinedExpression {
  isDefined: UnaryExpressionValue;
}
interface EqualsExpression {
  equals: BinaryExpressionValue<string, SupportedDataTypes>;
}
interface IncludesExpression {
  includes: BinaryExpressionValue<string, string>;
}
interface MatchesExpression {
  matches: BinaryExpressionValue<string, string | RegExp>;
}
interface StartsWithExpression {
  startsWith: BinaryExpressionValue<string, string>;
}
interface EndsWithExpression {
  endsWith: BinaryExpressionValue<string, string>;
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
