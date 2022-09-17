import {dataGenerator} from './benchmarks/dataGenerator';
import {FastDataEngine} from '../FastDataEngine';
import {notationName} from './utils/notationName';
import {convertToNode} from '../model/filters/convertToNode';
import {performBasicAssertions} from "./utils/performBasicAssertions";

describe('not operator', () => {
    const data = dataGenerator(10);
    const engine = new FastDataEngine(data);
    const condition = {
        not: {
            or: [
                {includes: {field: 'firstName', value: 'Z'}},  // will match
                {endsWith: {field: 'firstName', value: 'xyz'}} // wont match
            ]
        }
    };

    [convertToNode(condition), condition].forEach((expr, i) => {
        it(`filters records correctly (${notationName(i)})`, () => {
            const result = engine.filter(expr);
            performBasicAssertions(result, 9, 1);
        });
    });

    it('negates a logical condition that returns false', () => {
        const condition = {
            not: {
                or: [
                    {includes: {field: 'firstName', value: 'xyz'}},
                    {endsWith: {field: 'firstName', value: 'Jon123'}}
                ]
            }
        };

        const result = engine.filter(condition);
        expect(result.length).toBe(10);
    });

    it('negates a simple filter expression', () => {
        const condition = {
            not: {
                equals: {
                    field: 'firstName',
                    value: 'Zion'
                }
            }
        };

        const result = engine.filter(condition);
        performBasicAssertions(result, 9, 1);
    });

});
