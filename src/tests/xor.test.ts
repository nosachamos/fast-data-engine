import {dataGenerator} from './benchmarks/dataGenerator';
import {FastDataEngine} from '../FastDataEngine';
import {notationName} from './utils/notationName';
import {convertToNode} from '../model/filters/convertToNode';
import {performBasicAssertions} from "./utils/performBasicAssertions";

describe('xor operator', () => {
    const data = dataGenerator(10);
    const engine = new FastDataEngine(data);
    const condition = {
        xor: [
            {includes: {field: 'firstName', value: 'Z'}},  // will match
            {endsWith: {field: 'firstName', value: 'xyz'}} // wont match
        ]
    };

    [convertToNode(condition), condition].forEach((expr, i) => {
        it(`filters records correctly (${notationName(i)})`, () => {
            const result = engine.filter(expr);
            performBasicAssertions(result, 1, 0);
        });
    });

    it('doesn\'t match anything if none of the conditions match', () => {
        const condition = {
            xor: [
                {includes: {field: 'firstName', value: 'xyz'}},
                {endsWith: {field: 'firstName', value: 'Jon123'}}
            ]
        };

        const result = engine.filter(condition);
        expect(result.length).toBe(0);
    });

    it('doesn\'t match anything when all of the conditions match', () => {
        const condition = {
            xor: [
                {includes: {field: 'firstName', value: 'Zi'}},
                {endsWith: {field: 'firstName', value: 'on'}}
            ]
        };

        const result = engine.filter(condition);
        expect(result.length).toBe(0);
    });

});
