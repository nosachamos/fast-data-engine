import {dataGenerator} from './benchmarks/dataGenerator';
import {FastDataEngine} from '../FastDataEngine';
import {performBasicAssertions} from "./utils/performBasicAssertions";

describe('not operator', () => {
    const data = dataGenerator(10);
    const engine = new FastDataEngine(data);

    it('returns all rows when no filters are given', () => {
        const condition = {};

        const result = engine.filter(condition);
        performBasicAssertions(result, 10, 0);
    });

});
