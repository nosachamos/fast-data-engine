import { dataGenerator } from './benchmarks/dataGenerator';
import { FastDataEngine } from '../FastDataEngine';
import { FilterExpression } from '../model/filters/ObjectNotationTypes';

describe('invalid filter', () => {
  const data = dataGenerator(10);

  it('throws error as expected', () => {
    const condition = {
      invalid: {},
    } as unknown as FilterExpression;

    expect(() => {
      FastDataEngine.filter(data, condition);
    }).toThrowError(`Unknown filter node type [invalid].`);
  });
});
