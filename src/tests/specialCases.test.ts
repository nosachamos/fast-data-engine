import { dataGenerator } from './benchmarks/dataGenerator';
import { FastDataEngine } from '../FastDataEngine';
import { performBasicAssertions } from './utils/performBasicAssertions';
import {FilterExpression} from "../model/filters/ObjectNotationTypes";

describe('special and unusual setups', () => {
    const data = dataGenerator(10);

    it('filters ignoring sibling empty logical nodes', () => {
        const condition = { includes: { field: 'firstName', value: 'ZI', ignoreCase: true }, and: [], or: [], xor: [] };

        const { result } = FastDataEngine.filter(data, condition);
        performBasicAssertions(result, 1, 0);
    });

    it('filters ignoring sibling empty nested logical nodes', () => {
        const condition = {
            includes: { field: 'firstName', value: 'ZI', ignoreCase: true },
            not: { not: { and: [] } },
            and: [{ or: [{ xor: [] }] }],
            or: [{ not: { not: {} } }],
            xor: [{ and: [{ or: [{ not: { not: { and: [] } } }] }] }],
        };

        const { result } = FastDataEngine.filter(data, condition);
        performBasicAssertions(result, 1, 0);
    });

    it('filters ignoring empty filter conditions', () => {
        const condition = {
            includes: { field: 'firstName', value: 'ZI', ignoreCase: true },
            not: { not: {} },
            and: [{}],
            or: [{}],
            xor: [{}],
        };

        const { result } = FastDataEngine.filter(data, condition);
        performBasicAssertions(result, 1, 0);
    });

    it.each([
        ['OR', {or: []}],
        ['AND', {and: []}],
        ['XOR', {xor: []}],
        ['NOT', {not: {}}],
        ['nested NOT', {not: {not: {not: {}}}}],
        ['nested AND', {and: [{and: [{and: []}]}]}],
        ['nested XOR', {xor: [{xor: [{xor: []}]}]}],
        ['nested OR', {or: [{or: [{or: []}]}]}],
    ] as [string, FilterExpression][])('ignores empty %s conditions', (_, expression) => {
        const condition = {
            or: [
                {includes: {field: 'firstName', value: 'ZI', ignoreCase: true } },
                expression,
            ]
        };

        const { result } = FastDataEngine.filter(data, condition);
        performBasicAssertions(result, 1, 0);
    });

});
