import {JsonRow} from '../JsonRow';
import {INode} from './INode';

export class IsDefinedNode implements INode {
    constructor(private fieldName: string) {
    }

    filter = (row: JsonRow): boolean => {
        const rowValue = row[this.fieldName];

        return !(typeof rowValue === undefined || rowValue === null);
    };
}

export const isDefined = (fieldName: string): INode => {
    return new IsDefinedNode(fieldName);
};
