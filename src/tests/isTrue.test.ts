import {dataGenerator} from './benchmarks/dataGenerator';
import {FastDataEngine} from '../FastDataEngine';
import {notationName} from './utils/notationName';
import {convertToNode} from '../model/filters/convertToNode';
import {performBasicAssertions} from "./utils/performBasicAssertions";

describe('isTrue operator', () => {
    const data = dataGenerator(10);
    const engine = new FastDataEngine(data);
    const condition = {isTrue: 'eligible'};

    [convertToNode(condition), condition].forEach((expr, i) => {
        it(`filters records correctly (${notationName(i)})`, () => {
            const result = engine.filter(expr);
            performBasicAssertions(result, 3, 6);
        });
    });

    it('when filtering a non-boolean value no rows match filter', () => {
        const condition = {isTrue: 'firstName'};

        const result = engine.filter(condition);
        expect(result.length).toBe(0);
    });

});
