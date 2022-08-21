import {JsonRow} from '../JsonRow';
import {INode} from './INode';

export class IsTrueNode implements INode {
    constructor(private fieldName: string) {
    }

    filter = (row: JsonRow): boolean => {
        const rowValue = row[this.fieldName];

        if (typeof rowValue !== 'boolean') {
            return false;
        }

        return rowValue;
    };
}

export const isTrue = (fieldName: string): INode => {
    return new IsTrueNode(fieldName);
};
