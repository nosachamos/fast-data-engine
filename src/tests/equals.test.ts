import {dataGenerator} from './benchmarks/dataGenerator';
import {FastDataEngine} from '../FastDataEngine';
import {notationName} from './utils/notationName';
import {convertToNode} from '../model/filters/convertToNode';
import {performBasicAssertions} from "./utils/performBasicAssertions";

describe('equals operator', () => {
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
                const { result } = FastDataEngine.filter(data, expr);
                performBasicAssertions(result, resultsLength, firstIndex);
            });
        });
    });

    it('filters a string value correctly when ignoring case', () => {
        const condition = {equals: {field: 'firstName', value: 'ZION', ignoreCase: true}};

        const { result } = FastDataEngine.filter(data, condition);
        performBasicAssertions(result, 1, 0);
    });

    it('setting ignore case when filtering a non-string value does not impact filtering', () => {
        const condition = {equals: {field: 'width', value: 1335.32, ignoreCase: true}};

        const { result } = FastDataEngine.filter(data, condition);
        performBasicAssertions(result, 1, 0);
    });

});
