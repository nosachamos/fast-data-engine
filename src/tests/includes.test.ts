import {dataGenerator} from './benchmarks/dataGenerator';
import {FastDataEngine} from '../FastDataEngine';
import {notationName} from './utils/notationName';
import {convertToNode} from '../model/filters/convertToNode';
import {performBasicAssertions} from "./utils/performBasicAssertions";

describe('includes operator', () => {
    const data = dataGenerator(10);
    const engine = new FastDataEngine(data);
    const condition = {includes: {field: 'firstName', value: 'a'}};

    [convertToNode(condition), condition].forEach((expr, i) => {
        it(`filters records correctly (${notationName(i)})`, () => {
            const result = engine.filter(expr);
            performBasicAssertions(result, 4, 1);
        });
    });

    it('filters a string value correctly when ignoring case', () => {
        const condition = {includes: {field: 'firstName', value: 'ZI', ignoreCase: true}};

        const result = engine.filter(condition);
        performBasicAssertions(result, 1, 0);
    });

    it('when filtering a non-string value no rows match filter', () => {
        const condition = {includes: {field: 'age', value: 'ZI', ignoreCase: true}};

        const result = engine.filter(condition);
        expect(result.length).toBe(0);
    });

});
