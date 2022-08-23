import {FastDataEngine} from '../FastDataEngine';
import {Row} from '../tests/benchmarks/GeneratorTypes';
import {FilterExpression} from "../model/filters/ObjectNotationTypes";

const timeInMillis = (start: number, end: number) => (end - start).toFixed(3);

const makeRepeated = (arr: Row[], repeats: number) => Array.from({length: repeats}, () => arr).flat();

const prepareData = (data: Row[], repeatTestData: number = 1) => {
    const dataLoadStart = performance.now();
    data = makeRepeated(data, repeatTestData);
    console.log(`Loaded ${data.length} data rows,${timeInMillis(dataLoadStart, performance.now())}`);
    return data;
}

const runSingleBenchmark = (title: string, engine: FastDataEngine, condition: FilterExpression) => {
    const start = performance.now();
    const result = engine.filter(condition);
    console.log(`>> ${title},${timeInMillis(start, performance.now())} + ${result.length}`);
}

// @ts-ignore
window.runBenchmarks = function (data: Row[], repeatTestData = 1, numberOfRuns = 10) {
    data = prepareData(data, repeatTestData);

    const engine = new FastDataEngine(data);
    for (let i = 0; i < numberOfRuns; i++) {
        console.log(`\n====== STARTING RUN #${i} ======`)
        // logic expressions
        runSingleBenchmark('And expression filter - 2 terms', engine, {
            and: [{equals: {field: 'firstName', value: 'Zion'}}, {includes: {field: 'firstName', value: 'i'}}]
        });
        runSingleBenchmark('And expression filter - 8 terms', engine, {
            and: [
                {includes: {field: 'firstName', value: 'a', ignoreCase: true}},
                {greaterThanOrEquals: {field: 'gpa', value: 0.5}},
                {lessThanOrEquals: {field: 'gpa', value: 4.5}},
                {lessThan: {field: 'age', value: 95}},
                {greaterThan: {field: 'age', value: 5}},
                {equals: {field: 'optionalCode', value: null}},
                {equals: {field: 'eligible', value: true}}
            ]
        });

        runSingleBenchmark('Or expression filter - 2 terms', engine, {
            or: [{equals: {field: 'firstName', value: 'Zion'}}, {includes: {field: 'firstName', value: 'i'}}]
        });
        runSingleBenchmark('Or expression filter - 8 terms', engine, {
            or: [
                {includes: {field: 'firstName', value: 'a', ignoreCase: true}},
                {greaterThanOrEquals: {field: 'gpa', value: 4.5}},
                {lessThanOrEquals: {field: 'gpa', value: 0.5}},
                {lessThan: {field: 'age', value: 2}},
                {greaterThan: {field: 'age', value: 98}},
                {equals: {field: 'optionalCode', value: null}},
                {equals: {field: 'eligible', value: true}}
            ]
        });

        runSingleBenchmark('Xor expression filter - 2 terms', engine, {
            xor: [{equals: {field: 'firstName', value: 'Zion'}}, {includes: {field: 'firstName', value: 'i'}}]
        });
        runSingleBenchmark('Xor expression filter - 8 terms', engine, {
            xor: [
                {includes: {field: 'firstName', value: 'a', ignoreCase: true}},
                {greaterThanOrEquals: {field: 'gpa', value: 4.95}},
                {lessThanOrEquals: {field: 'gpa', value: 0.1}},
                {lessThan: {field: 'age', value: 1}},
                {greaterThan: {field: 'age', value: 98}},
                {equals: {field: 'optionalCode', value: null}},
                {equals: {field: 'eligible', value: true}}
            ]
        });

        runSingleBenchmark('Not expression filter', engine, {
            not: {equals: {field: 'firstName', value: 'Zion'}}
        });

        // string filters
        runSingleBenchmark('Single equals string filter', engine, {equals: {field: 'firstName', value: 'Zion'}});
        runSingleBenchmark('Single equals numeric filter', engine, {equals: {field: 'age', value: 20}});
        runSingleBenchmark('Single equals boolean filter', engine, {equals: {field: 'eligible', value: true}});
        runSingleBenchmark('Single equals null filter', engine, {equals: {field: 'optionalCode', value: null}});
        runSingleBenchmark('Single starts with filter', engine, {startsWith: {field: 'firstName', value: 'A'}});
        runSingleBenchmark('Single ends with filter', engine, {endsWith: {field: 'firstName', value: 'n'}});
        runSingleBenchmark('Single includes string filter', engine, {includes: {field: 'firstName', value: 'A'}});
        runSingleBenchmark('Single matches filter', engine, {
            matches: {
                field: 'firstName',
                value: '^a.*[a-z]$',
                ignoreCase: true
            }
        });

        // list filters
        runSingleBenchmark('In list string filter - 5 items', engine, {
            inList: {
                field: 'firstName',
                value: ['John', 'Mary', 'Albert', 'Michelle', 'Karen']
            }
        });
        runSingleBenchmark('In list string filter - case insensitive - 5 items', engine, {
            inList: {
                field: 'firstName',
                value: ['john', 'mary', 'albert', 'michelle', 'karen'],
                ignoreCase: true
            }
        });
        runSingleBenchmark('In list numeric filter - 10 items', engine, {
            inList: {
                field: 'age',
                value: [1, 4, 2, 8, 3, 10, 40, 45, 47, 50]
            }
        });

        // numeric filters
        runSingleBenchmark('Greater than filter', engine, {greaterThan: {field: 'gpa', value: 3}});
        runSingleBenchmark('Greater than or equals filter', engine, {greaterThanOrEquals: {field: 'gpa', value: 3}});
        runSingleBenchmark('Less than filter', engine, {lessThan: {field: 'gpa', value: 2}});
        runSingleBenchmark('Less than or equals filter', engine, {lessThanOrEquals: {field: 'gpa', value: 2}});

        // boolean filters
        runSingleBenchmark('isTrue filter', engine, {isTrue: 'eligible'});
        runSingleBenchmark('isFalse filter', engine, {isFalse: 'eligible'});

        // other filters
        runSingleBenchmark('isDefined filter', engine, {isDefined: 'optionalCode'});
    }
}

// @ts-ignore
console.log(window.runBenchmarks);
