import {dataGenerator} from './benchmarks/dataGenerator';
import {FastDataEngine} from '../FastDataEngine';
import {notationName} from './utils/notationName';
import {convertToNode} from './utils/convertToNode';

describe('Includes operator', () => {
    const data = dataGenerator(10);
    const condition = {includes: {field: 'firstName', value: 'a'}};

    [convertToNode(condition), condition].forEach((expr, i) => {
        it(`filters records correctly (${notationName(i)})`, () => {
            const engine = new FastDataEngine(data);
            const result = engine.filter(expr);
            expect(result.length).toBe(4);
            expect(result[0]['index']).toBe(1);
        });
    });
});
