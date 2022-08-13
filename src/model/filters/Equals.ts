import { SupportedDataTypes } from './ObjectNotationTypes';
import { JsonRow } from '../JsonRow';
import { INode } from './INode';

export class EqualsNode implements INode {
  // TODO benchmark creating a different node for each value data type to avoid type checks
  constructor(private fieldName: string, private value: SupportedDataTypes, private ignoreCase = false) {}

  // TODO: benchmark without arrow functions
  filter = (row: JsonRow): boolean => {
    const rowValue = row[this.fieldName];

    if (this.ignoreCase) {
      // TODO: benchmark checking each char and lowering case only if letter does not match
      if (typeof rowValue === 'string' && typeof this.value === 'string') {
        return (rowValue as string).toLowerCase() === this.value.toLowerCase();
      }
    }

    return rowValue === this.value;
  };
}

export const equals = (fieldName: string, value: SupportedDataTypes): INode => {
  return new EqualsNode(fieldName, value);
};
