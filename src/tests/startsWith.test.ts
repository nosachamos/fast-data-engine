import {dataGenerator} from './benchmarks/dataGenerator';
import {FastDataEngine} from '../FastDataEngine';
import {notationName} from './utils/notationName';
import {convertToNode} from '../model/filters/convertToNode';
import {performBasicAssertions} from "./utils/performBasicAssertions";

describe('startsWith operator', () => {
    const data = dataGenerator(10);
    const engine = new FastDataEngine(data);
    const condition = {startsWith: {field: 'firstName', value: 'Zi'}};

    [convertToNode(condition), condition].forEach((expr, i) => {
        it(`filters records correctly (${notationName(i)})`, () => {
            const result = engine.filter(expr);
            performBasicAssertions(result, 1, 0);
        });
    });

    it('filters a string value correctly when ignoring case', () => {
        const condition = {startsWith: {field: 'firstName', value: 'ZI', ignoreCase: true}};

        const result = engine.filter(condition);
        performBasicAssertions(result, 1, 0);
    });

    it('when filtering a non-string value no rows match filter', () => {
        const condition = {startsWith: {field: 'age', value: 'zi', ignoreCase: true}};

        const result = engine.filter(condition);
        expect(result.length).toBe(0);
    });


});