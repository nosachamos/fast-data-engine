import { JsonRow } from '../JsonRow';
import {INode, INotNode} from './INode';

export class NotNode implements INotNode {
    constructor(public child: INode) {}

    filter = (row: JsonRow): boolean => {
        return !this.child.filter(row);
    };
}
