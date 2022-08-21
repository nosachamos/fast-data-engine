import {JsonRow} from '../JsonRow';
import {INode} from './INode';

export class NotNode implements INode {
    constructor(private child: INode) {
    }

    filter = (row: JsonRow): boolean => {
        return !this.child.filter(row);
    };
}

export const not = (child: INode): INode => {
    return new NotNode(child);
};
