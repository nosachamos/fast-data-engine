import { JsonRow } from '../JsonRow';
import { INode } from './INode';

export class OrNode implements INode {
    constructor(private children: INode[]) {}

    filter = (row: JsonRow): boolean => {
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].filter(row)) {
                return true;
            }
        }

        return this.children.length === 0;
    };
}
