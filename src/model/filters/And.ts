import { JsonRow } from '../JsonRow';
import { INode } from './INode';

export class AndNode implements INode {
    constructor(private children: INode[]) {}

    // TODO: benchmark without arrow functions
    filter = (row: JsonRow): boolean => {
        for (let i = 0; i < this.children.length; i++) {
            if (!this.children[i].filter(row)) {
                return false;
            }
        }
        return true;
    };
}
