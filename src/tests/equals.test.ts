import {dataGenerator} from './benchmarks/dataGenerator';
import {FastDataEngine} from '../FastDataEngine';
import {notationName} from './utils/notationName';
import {convertToNode} from './utils/convertToNode';

describe('Equals operator', () => {
    const data = dataGenerator(10);

    (
        [
            ['strings', 'firstName', 'Zion', 1, 0],
            ['int', 'itemsReported', 234, 1, 0],
            ['float', 'width', 1335.32, 1, 0],
            ['null', 'optionalCode', null, 2, 1],
            ['undefined', 'nonExistent', undefined, 10, 0],
        ] as [string, string, string, number, number][]
    ).forEach(([dataType, field, name, resultsLength, firstIndex]) => {
        const condition = {equals: {field, value: name}};

        [convertToNode(condition), condition].forEach((expr, i) => {
            it(`filters ${dataType} correctly (${notationName(i)})`, () => {
                const engine = new FastDataEngine(data);
                const result = engine.filter(expr);
                expect(result.length).toBe(resultsLength);
                expect(result[0]['index']).toBe(firstIndex);
                expect(Object.keys(result[0]).length).toBe(32);
            });
        });
    });
});
