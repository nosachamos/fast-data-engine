import { dataGenerator } from './benchmarks/dataGenerator';
import { FastDataEngine } from '../FastDataEngine';
import { notationName } from './utils/notationName';
import { convertToNode } from '../model/filters/convertToNode';
import { performBasicAssertions } from './utils/performBasicAssertions';
import { SupportedTypesOfs } from '../model/filters/ObjectNotationTypes';

describe('typeOf operator', () => {
    const typesTestData = [
        { index: 0, test: {} },
        { index: 1, test: { withProps: 'propValue' } },
        { index: 2, test: null },
        { index: 3, test: 10 },
        { index: 4, test: 10.7 },
        { index: 5, test: 'test' },
        { index: 6, test: false },
        { index: 7, test: true },
        { index: 8, test: undefined },
        { index: 9, test: [] },
        { index: 10, test: [1, 2, 3] },
    ];

    const data = dataGenerator(10);
    const condition = { typeOf: { field: 'firstName', value: SupportedTypesOfs.string } };

    [convertToNode(condition), condition].forEach((expr, i) => {
        it(`filters records correctly (${notationName(i)})`, () => {
            const { result } = FastDataEngine.filter(data, expr);
            performBasicAssertions(result, 10, 0);
        });
    });

    const assertTypeOf = (field: string, value: SupportedTypesOfs, found = true) => {
        const condition = { typeOf: { field, value } };
        const { result } = FastDataEngine.filter(data, condition);
        if (found) {
            performBasicAssertions(result, 10, 0);
        } else {
            expect(result.length).toBe(0);
        }
    };

    it(`can recognize a number field type`, () => {
        // positive cases
        assertTypeOf('age', SupportedTypesOfs.number);
        assertTypeOf('width', SupportedTypesOfs.number);

        // negative cases
        assertTypeOf('age', SupportedTypesOfs.string, false);
    });

    (
        [
            [SupportedTypesOfs.object, 2, 0],
            [SupportedTypesOfs.null, 1, 2],
            [SupportedTypesOfs.number, 2, 3],
            [SupportedTypesOfs.string, 1, 5],
            [SupportedTypesOfs.boolean, 2, 6],
            [SupportedTypesOfs.undefined, 1, 8],
            [SupportedTypesOfs.array, 2, 9],
        ] as [SupportedTypesOfs, number, number][]
    ).forEach(([type, resultsLength, firstIndex]) => {
        it(`can recognize a ${type} field type`, () => {
            const condition = { typeOf: { field: 'test', value: type } };
            const { result } = FastDataEngine.filter(typesTestData, condition);

            performBasicAssertions(result, resultsLength, firstIndex, 2);
        });
    });
});
