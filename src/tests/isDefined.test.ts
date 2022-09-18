import { dataGenerator } from './benchmarks/dataGenerator';
import { FastDataEngine } from '../FastDataEngine';
import { notationName } from './utils/notationName';
import { convertToNode } from '../model/filters/convertToNode';
import { performBasicAssertions } from './utils/performBasicAssertions';

describe('isDefined operator', () => {
  const data = dataGenerator(10);

  (
    [
      ['string', 'firstName', 10, 0],
      ['boolean', 'eligible', 10, 0],
      ['number', 'age', 10, 0],
      ['undefined', 'nonExistent', 0, 0],
    ] as [string, string, number, number][]
  ).forEach(([dataType, field, resultsLength, firstIndex]) => {
    const condition = { isDefined: field };

    [convertToNode(condition), condition].forEach((expr, i) => {
      it(`filters ${dataType} correctly (${notationName(i)})`, () => {
        const { result } = FastDataEngine.filter(data, expr);
        performBasicAssertions(result, resultsLength, firstIndex);
      });
    });
  });
});
