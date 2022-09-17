import {dataGenerator} from './benchmarks/dataGenerator';
import {FastDataEngine} from '../FastDataEngine';
import {FilterExpression} from "../model/filters/ObjectNotationTypes";

describe('invalid filter', () => {
    const data = dataGenerator(10);
    const engine = new FastDataEngine(data);

    it('throws error as expected', () => {
        const condition = {
            invalid: {}
        } as unknown as FilterExpression;

        expect(() => {
            engine.filter(condition);
        }).toThrowError(`Unknown filter node type [invalid].`);
    });

});
