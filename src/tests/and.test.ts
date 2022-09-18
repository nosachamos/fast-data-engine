import {dataGenerator} from './benchmarks/dataGenerator';
import {FastDataEngine} from '../FastDataEngine';
import {notationName} from './utils/notationName';
import {convertToNode} from '../model/filters/convertToNode';
import {performBasicAssertions} from "./utils/performBasicAssertions";

describe('and operator', () => {
    const data = dataGenerator(10);
    const condition = {
        and: [
            {includes: {field: 'firstName', value: 'Z'}},
            {endsWith: {field: 'firstName', value: 'on'}}
        ]
    };

    [convertToNode(condition), condition].forEach((expr, i) => {
        it(`filters records correctly (${notationName(i)})`, () => {
            const { result } = FastDataEngine.filter(data, expr);
            performBasicAssertions(result, 1, 0);
        });
    });

    it('filters correctly when using an implicit and operator', () => {
        const condition = {
            includes: {field: 'firstName', value: 'Zi'},
            endsWith: {field: 'firstName', value: 'on'}
        };

        const { result } = FastDataEngine.filter(data, condition);
        performBasicAssertions(result, 1, 0);
    });

    it('doesn\'t match anything if none of the conditions match', () => {
        const condition = {
            and: [
                {includes: {field: 'firstName', value: 'xyz'}},
                {endsWith: {field: 'firstName', value: 'Jon123'}}
            ]
        };

        const { result } = FastDataEngine.filter(data, condition);
        expect(result.length).toBe(0);
    });

    it('doesn\'t match anything if only one condition matches', () => {
        const condition = {
            and: [
                {startsWith: {field: 'firstName', value: 'xyz'}}, // wont match
                {endsWith: {field: 'firstName', value: 'on'}}   // will match
            ]
        };

        const { result } = FastDataEngine.filter(data, condition);
        expect(result.length).toBe(0);
    });

});
