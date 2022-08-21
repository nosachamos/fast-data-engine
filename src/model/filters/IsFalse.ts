import {JsonRow} from '../JsonRow';
import {INode} from './INode';

export class IsFalseNode implements INode {
    constructor(private fieldName: string) {
    }

    filter = (row: JsonRow): boolean => {
        const rowValue = row[this.fieldName];

        if (typeof rowValue !== 'boolean') {
            return false;
        }

        return !rowValue;
    };
}

export const isFalse = (fieldName: string): INode => {
    return new IsFalseNode(fieldName);
};
