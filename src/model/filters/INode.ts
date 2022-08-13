import { JsonRow } from '../JsonRow';
import { FilterExpression } from './ObjectNotationTypes';

export interface INode {
  filter: (row: JsonRow) => boolean;
}

export const isINode = (value: INode | FilterExpression): value is INode => {
  return (value as INode).filter !== undefined;
};
