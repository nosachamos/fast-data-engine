import { dataGenerator } from './benchmarks/dataGenerator';
import { FastDataEngine } from '../FastDataEngine';
import { notationName } from './utils/notationName';
import { convertToNode } from '../model/filters/convertToNode';
import { performBasicAssertions } from './utils/performBasicAssertions';

describe('lessThan operator', () => {
    const data = dataGenerator(10);
    const condition = { lessThan: { field: 'age', value: 52 } };

    [convertToNode(condition), condition].forEach((expr, i) => {
        it(`filters records correctly (${notationName(i)})`, () => {
            const { result } = FastDataEngine.filter(data, expr);
            performBasicAssertions(result, 6, 0);
        });
    });

    it('when filtering a non-string value no rows match filter', () => {
        const condition = { lessThan: { field: 'firstName', value: 10 } };

        const { result } = FastDataEngine.filter(data, condition);
        expect(result.length).toBe(0);
    });
});
