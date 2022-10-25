import { dataGenerator } from './benchmarks/dataGenerator';
import { FastDataEngine } from '../FastDataEngine';
import { notationName } from './utils/notationName';
import { convertToNode } from '../model/filters/convertToNode';
import { performBasicAssertions } from './utils/performBasicAssertions';

describe('matches operator', () => {
    const data = dataGenerator(10);
    const condition = { matches: { field: 'firstName', value: '^Zi' } };

    [convertToNode(condition), condition].forEach((expr, i) => {
        it(`filters records correctly (${notationName(i)})`, () => {
            const { result } = FastDataEngine.filter(data, expr);
            performBasicAssertions(result, 1, 0);
        });
    });

    it('filters a string value correctly when ignoring case', () => {
        {
            const condition = { matches: { field: 'firstName', value: '^zi', ignoreCase: false } };

            const { result } = FastDataEngine.filter(data, condition);
            expect(result.length).toBe(0);
        }
        {
            const condition = { matches: { field: 'firstName', value: '^zi', ignoreCase: true } };

            const { result } = FastDataEngine.filter(data, condition);
            performBasicAssertions(result, 1, 0);
        }
        {
            const condition = { matches: { field: 'firstName', value: ['^Zi', '^Ar'], ignoreCase: false } };

            const { result } = FastDataEngine.filter(data, condition);
            performBasicAssertions(result, 2, 0);
        }
        {
            const condition = { matches: { field: 'firstName', value: ['^zi', '^ar'], ignoreCase: true } };

            const { result } = FastDataEngine.filter(data, condition);
            performBasicAssertions(result, 2, 0);
        }
    });

    it('filters a string value correctly when supplying a Regex instance', () => {
        {
            const condition = { matches: { field: 'firstName', value: /^zi.*n$/i } };

            const { result } = FastDataEngine.filter(data, condition);
            performBasicAssertions(result, 1, 0);
        }
    });

    it('when filtering a non-string value no rows match filter', () => {
        const condition = { matches: { field: 'age', value: 'ZI' } };

        const { result } = FastDataEngine.filter(data, condition);
        expect(result.length).toBe(0);
    });

    it('filters a string array value correctly when supplying a Regex instance', () => {
        {
            const condition = { matches: { field: 'firstName', value: [/^zi.*n$/i, /^ar.*n$/i] } };

            const { result } = FastDataEngine.filter(data, condition);
            performBasicAssertions(result, 2, 0);
        }
    });

    it('when filtering a non-string array value no rows match filter', () => {
        const condition = { matches: { field: 'age', value: ['ZI', 'Ar'] } };

        const { result } = FastDataEngine.filter(data, condition);
        expect(result.length).toBe(0);
    });
});
