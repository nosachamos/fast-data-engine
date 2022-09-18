import {dataGenerator} from './benchmarks/dataGenerator';
import {FastDataEngine} from '../FastDataEngine';
import {notationName} from './utils/notationName';
import {convertToNode} from '../model/filters/convertToNode';
import {performBasicAssertions} from "./utils/performBasicAssertions";

describe('greaterThan operator', () => {
    const data = dataGenerator(10);
    const condition = {greaterThan: {field: 'age', value: 21}};

    [convertToNode(condition), condition].forEach((expr, i) => {
        it(`filters records correctly (${notationName(i)})`, () => {
            const { result } = FastDataEngine.filter(data, expr);
            performBasicAssertions(result, 8, 0);
        });
    });

    it('when filtering a non-string value no rows match filter', () => {
        const condition = {greaterThan: {field: 'firstName', value: 10}};

        const { result } = FastDataEngine.filter(data, condition);
        expect(result.length).toBe(0);
    });

});
