import { JsonRow } from '../JsonRow';
import { INode } from './INode';

export class XorNode implements INode {
  constructor(private children: INode[]) {}

  filter = (row: JsonRow): boolean => {
    let result = false;
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].filter(row)) {
        if (result) {
          return false;
        } else {
          result = true;
        }
      }
    }
    return result;
  };
}

export const xor = (children: INode[]): INode => {
  return new XorNode(children);
};
