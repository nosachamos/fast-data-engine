import {JsonRow} from '../JsonRow';
import {INode} from './INode';

export class GreaterThanOrEqualsNode implements INode {
    constructor(private fieldName: string, private value: number) {
    }

    filter = (row: JsonRow): boolean => {
        const rowValue = row[this.fieldName];

        if (typeof rowValue !== 'number') {
            return false;
        }

        return rowValue >= this.value;
    };
}

export const greaterThanOrEquals = (fieldName: string, value: number): INode => {
    return new GreaterThanOrEqualsNode(fieldName, value);
};
