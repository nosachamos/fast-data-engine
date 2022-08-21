import {JsonRow} from '../JsonRow';
import {INode} from './INode';

export class MatchesNode implements INode {
    regex: RegExp;

    constructor(private fieldName: string, value: string, ignoreCase = false) {
        this.regex = new RegExp(value, ignoreCase ? 'i' : undefined);
    }

    // TODO: benchmark without arrow functions
    filter = (row: JsonRow): boolean => {
        const rowValue = row[this.fieldName];

        if (typeof rowValue !== 'string') {
            return false;
        }

        return this.regex.test(rowValue);
    };
}

export const matches = (fieldName: string, value: string, ignoreCase = false): INode => {
    return new MatchesNode(fieldName, value, ignoreCase);
};
