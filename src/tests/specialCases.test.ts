import {dataGenerator} from './benchmarks/dataGenerator';
import {FastDataEngine} from '../FastDataEngine';
import {performBasicAssertions} from './utils/performBasicAssertions';

describe('special and unusual setups', () => {
    const data = dataGenerator(10);

    it('filters ignoring sibling empty logical nodes', () => {
        const condition = {includes: {field: 'firstName', value: 'ZI', ignoreCase: true}, and: [], or: [], xor: []};

        const {result} = FastDataEngine.filter(data, condition);
        performBasicAssertions(result, 1, 0);
    });

    it('filters ignoring sibling empty nested logical nodes', () => {
        const condition = {
            includes: {field: 'firstName', value: 'ZI', ignoreCase: true},
            not: {not: {and: []}},
            and: [{or: [{xor: []}]}],
            or: [{not: {not: {}}}],
            xor: [{and: [{or: [{not: {not: {and: []}}}]}]}]
        };

        const {result} = FastDataEngine.filter(data, condition);
        performBasicAssertions(result, 1, 0);
    });

    it('filters ignoring empty filter conditions', () => {
        const condition = {
            includes: {field: 'firstName', value: 'ZI', ignoreCase: true},
            not: {not: {}},
            and: [{}],
            or: [{}],
            xor: [{}]
        };

        const {result} = FastDataEngine.filter(data, condition);
        performBasicAssertions(result, 1, 0);
    });

});
