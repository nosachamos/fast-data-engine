import {FastDataEngine} from '../FastDataEngine';
import {notationName} from './utils/notationName';
import {convertToNode} from '../model/filters/convertToNode';
import {performBasicAssertions} from "./utils/performBasicAssertions";

describe('inArray operator', () => {
    const data = [
        {index: 0, categories: ['a', 'b', 'c'], notArray: 'data1', ages: [20, 10, 30], flags: [false, false, true]},
        {index: 1, categories: ['x', 'y', 'z'], notArray: 'data2', ages: [20, 10, 31], flags: [false, false, false]},
        {index: 2, categories: ['a', 'f', 'g'], notArray: 'data3', ages: [22, 12, 32], flags: [true, true, true]}
    ];
    const condition = {inArray: {field: 'categories', value: 'a'}};

    [convertToNode(condition), condition].forEach((expr, i) => {
        it(`filters records correctly (${notationName(i)})`, () => {
            const { result } = FastDataEngine.filter(data, expr);
            performBasicAssertions(result, 2, 0, 5);
        });
    });

    it('filters correctly when targeting a numeric field', () => {
        const condition = {inArray: {field: 'ages', value: 10}};

        const { result } = FastDataEngine.filter(data, condition);
        performBasicAssertions(result, 2, 0, 5);
    });

    it('filters correctly when targeting a boolean field', () => {
        const condition = {inArray: {field: 'flags', value: true}};

        const { result } = FastDataEngine.filter(data, condition);
        performBasicAssertions(result, 2, 0, 5);
    });

    it('filters correctly when targeting a non-array field', () => {
        const condition = {inArray: {field: 'notArray', value: 'data2'}};

        const { result } = FastDataEngine.filter(data, condition);
        performBasicAssertions(result, 1, 1, 5);
    });

    it('filters correctly when using ignore case', () => {
        {
            const condition = {inArray: {field: 'categories', value: 'A', ignoreCase: false}};

            const { result } = FastDataEngine.filter(data, condition);
            expect(result.length).toBe(0);
        }

        {
            const condition = {inArray: {field: 'categories', value: 'A', ignoreCase: true}};

            const { result } = FastDataEngine.filter(data, condition);
            performBasicAssertions(result, 2, 0, 5);
        }
    });

    it('when filtering a non-string value no rows match filter', () => {
        const condition = {inArray: {field: 'notList', value: 'a'}};

        const { result } = FastDataEngine.filter(data, condition);
        expect(result.length).toBe(0);
    });

});
