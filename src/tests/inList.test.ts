import {FastDataEngine} from '../FastDataEngine';
import {notationName} from './utils/notationName';
import {convertToNode} from '../model/filters/convertToNode';
import {performBasicAssertions} from "./utils/performBasicAssertions";

describe('inList operator', () => {
    const data = [
        { index: 0, category: 'a', notArray: 'data1' },
        { index: 1, category: 'b', notArray: 'data2' },
        { index: 2, category: 'c', notArray: 'data3' },
        { index: 3, category: 'x', notArray: 'data4' },
        { index: 4, category: 'a', notArray: 'data5' }
    ];
    const condition = {inList: {field: 'category', value: ['a', 'x']}};

    [convertToNode(condition), condition].forEach((expr, i) => {
        it(`filters records correctly (${notationName(i)})`, () => {
            const { result } = FastDataEngine.filter(data, expr);
            performBasicAssertions(result, 3, 0, 3);
        });
    });

    it('filters correctly when using ignore case', () => {
        {
            const condition = {inList: {field: 'category', value: ['A', 'X'], ignoreCase: false}};

            const { result } = FastDataEngine.filter(data, condition);
            expect(result.length).toBe(0);
        }

        {
            const condition = {inList: {field: 'category', value: ['A', 'X'], ignoreCase: true}};

            const { result } = FastDataEngine.filter(data, condition);
            performBasicAssertions(result, 3, 0, 3);
        }
    });

    it('when filtering a non-string value no rows match filter', () => {
        const condition = {inList: {field: 'notList', value: ['a']}};

        const { result } = FastDataEngine.filter(data, condition);
        expect(result.length).toBe(0);
    });

    it('when filtering a non-existing field no rows match filter', () => {
        const condition = {inList: {field: 'notExisting', value: ['a']}};

        const { result } = FastDataEngine.filter(data, condition);
        expect(result.length).toBe(0);
    });

});
