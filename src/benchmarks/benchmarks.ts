import { FastDataEngine } from '../FastDataEngine';
import * as fs from 'fs';
import * as path from 'path';
import { Row } from '../tests/benchmarks/GeneratorTypes';

type HRTime = [number, number];
const convertTimeToMillis = (time: HRTime) => {
  const [timeSec, timeNs] = time;
  return (timeSec * 1e9 + timeNs) / 1e6;
};

function parseHrtimeToMilliseconds(start: HRTime, end: HRTime) {
  return (convertTimeToMillis(end) - convertTimeToMillis(start)).toFixed(3);
}

export const runBenchmarks = async (dataFile: string) => {
  console.log(__dirname);
  console.log('Loading data...');
  let data: Row[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, dataFile)).toString());
  const makeRepeated = (arr: Row[], repeats: number) => Array.from({ length: repeats }, () => arr).flat();
  data = makeRepeated(data, 4);
  console.log(`Loaded ${data.length} rows.`);

  const start = process.hrtime();
  const condition = { includes: { field: 'firstName', value: 'A' } };
  const engine = new FastDataEngine(data);

  const result = engine.filter(condition);
  const end = process.hrtime();

  console.log(`Duration: ${parseHrtimeToMilliseconds(start, end)}ms`);
  console.log(`Result length: ${result.length}`);
};

runBenchmarks('../../src/tests/benchmarks/generated_data/data_500000.json');
