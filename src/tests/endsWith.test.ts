import {dataGenerator} from './benchmarks/dataGenerator';
import {FastDataEngine} from '../FastDataEngine';
import {notationName} from './utils/notationName';
import {convertToNode} from '../model/filters/convertToNode';
import {performBasicAssertions} from "./utils/performBasicAssertions";

describe('endsWith operator', () => {
    const data = dataGenerator(10);
    const engine = new FastDataEngine(data);
    const condition = {endsWith: {field: 'firstName', value: 'on'}};

    [convertToNode(condition), condition].forEach((expr, i) => {
        it(`filters records correctly (${notationName(i)})`, () => {
            const result = engine.filter(expr);
            performBasicAssertions(result, 1, 0);
        });
    });

    it('filters a string value correctly when ignoring case', () => {
        const condition = {endsWith: {field: 'firstName', value: 'ON', ignoreCase: true}};

        const result = engine.filter(condition);
        performBasicAssertions(result, 1, 0);
    });

    it('when filtering a non-string value no rows match filter', () => {
        const condition = {endsWith: {field: 'age', value: 'ZI', ignoreCase: true}};

        const result = engine.filter(condition);
        expect(result.length).toBe(0);
    });


});
