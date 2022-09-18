import {dataGenerator} from './benchmarks/dataGenerator';
import {FastDataEngine} from '../FastDataEngine';
import {notationName} from './utils/notationName';
import {convertToNode} from '../model/filters/convertToNode';
import {performBasicAssertions} from "./utils/performBasicAssertions";

describe('isTrue operator', () => {
    const data = dataGenerator(10);
    const condition = {isTrue: 'eligible'};

    [convertToNode(condition), condition].forEach((expr, i) => {
        it(`filters records correctly (${notationName(i)})`, () => {
            const { result } = FastDataEngine.filter(data, expr);
            performBasicAssertions(result, 3, 6);
        });
    });

    it('when filtering a non-boolean value no rows match filter', () => {
        const condition = {isTrue: 'firstName'};

        const { result } = FastDataEngine.filter(data, condition);
        expect(result.length).toBe(0);
    });

});
