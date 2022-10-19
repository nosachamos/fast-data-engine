import {
    ArrayOrListOperators,
    BooleanOperators,
    isArrayOrListOperators,
    isBooleanOperators,
    isLogicalGroupOperators,
    isLogicalOperators,
    isNumericOperator,
    isStringOperator,
    LogicalOperators,
    NumericOperators,
    StringOperators,
} from '../model/filters/ObjectNotationTypes';

describe('special and unusual setups', () => {
    [...StringOperators].forEach((operator) => {
        it(`correctly identifies operator [${operator}] as being a string operator`, () => {
            // it is a string operator
            expect(isStringOperator(operator)).toBe(true);

            // make sure it is not identified as other types
            if (operator !== 'equals') {
                // equals is both a string and a numeric operator
                expect(isNumericOperator(operator)).toBe(false);
            }
            expect(isBooleanOperators(operator)).toBe(false);
            expect(isLogicalOperators(operator)).toBe(false);
            expect(isLogicalGroupOperators(operator)).toBe(false);
            expect(isArrayOrListOperators(operator)).toBe(false);
        });
    });

    [...NumericOperators].forEach((operator) => {
        it(`correctly identifies operator [${operator}] as being a numeric operator`, () => {
            // it is a string operator
            expect(isNumericOperator(operator)).toBe(true);

            // make sure it is not identified as other types
            if (operator !== 'equals') {
                // equals is both a string and a numeric operator
                expect(isStringOperator(operator)).toBe(false);
            }
            expect(isBooleanOperators(operator)).toBe(false);
            expect(isLogicalOperators(operator)).toBe(false);
            expect(isLogicalGroupOperators(operator)).toBe(false);
            expect(isArrayOrListOperators(operator)).toBe(false);
        });
    });

    [...BooleanOperators].forEach((operator) => {
        it(`correctly identifies operator [${operator}] as being a boolean operator`, () => {
            // it is a string operator
            expect(isBooleanOperators(operator)).toBe(true);

            // make sure it is not identified as other types
            expect(isStringOperator(operator)).toBe(false);
            expect(isNumericOperator(operator)).toBe(false);
            expect(isLogicalOperators(operator)).toBe(false);
            expect(isLogicalGroupOperators(operator)).toBe(false);
            expect(isArrayOrListOperators(operator)).toBe(false);
        });
    });

    [...ArrayOrListOperators].forEach((operator) => {
        it(`correctly identifies operator [${operator}] as being an array or list operator`, () => {
            // it is a string operator
            expect(isArrayOrListOperators(operator)).toBe(true);

            // make sure it is not identified as other types
            expect(isStringOperator(operator)).toBe(false);
            expect(isBooleanOperators(operator)).toBe(false);
            expect(isLogicalOperators(operator)).toBe(false);
            expect(isLogicalGroupOperators(operator)).toBe(false);
            expect(isNumericOperator(operator)).toBe(false);
        });
    });

    [...LogicalOperators].forEach((operator) => {
        it(`correctly identifies operator [${operator}] as being a logical operator`, () => {
            // it is a string operator
            expect(isLogicalOperators(operator)).toBe(true);

            // make sure it is not identified as other types
            expect(isStringOperator(operator)).toBe(false);
            expect(isBooleanOperators(operator)).toBe(false);
            expect(isNumericOperator(operator)).toBe(false);
            expect(isArrayOrListOperators(operator)).toBe(false);
        });
    });
});
