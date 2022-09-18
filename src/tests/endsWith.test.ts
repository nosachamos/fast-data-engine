import { dataGenerator } from './benchmarks/dataGenerator';
import { FastDataEngine } from '../FastDataEngine';
import { notationName } from './utils/notationName';
import { convertToNode } from '../model/filters/convertToNode';
import { performBasicAssertions } from './utils/performBasicAssertions';

describe('endsWith operator', () => {
  const data = dataGenerator(10);
  const condition = { endsWith: { field: 'firstName', value: 'on' } };

  [convertToNode(condition), condition].forEach((expr, i) => {
    it(`filters records correctly (${notationName(i)})`, () => {
      const { result } = FastDataEngine.filter(data, expr);
      performBasicAssertions(result, 1, 0);
    });
  });

  it('filters a string value correctly when ignoring case', () => {
    const condition = { endsWith: { field: 'firstName', value: 'ON', ignoreCase: true } };

    const { result } = FastDataEngine.filter(data, condition);
    performBasicAssertions(result, 1, 0);
  });

  it('when filtering a non-string value no rows match filter', () => {
    const condition = { endsWith: { field: 'age', value: 'ZI', ignoreCase: true } };

    const { result } = FastDataEngine.filter(data, condition);
    expect(result.length).toBe(0);
  });
});
