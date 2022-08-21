import {SupportedDataTypes} from './ObjectNotationTypes';
import {JsonRow} from '../JsonRow';
import {INode} from './INode';

export class EndsWith implements INode {

    constructor(private fieldName: string, private value: SupportedDataTypes, private ignoreCase = false) {
    }

    // TODO: benchmark without arrow functions
    filter = (row: JsonRow): boolean => {
        const rowValue = row[this.fieldName];

        if (typeof rowValue !== 'string' || typeof this.value !== 'string') {
            return false;
        }

        if (this.ignoreCase) {
            // TODO: benchmark checking each char and lowering case only if letter does not match
            return (rowValue as string).toLowerCase().endsWith(this.value.toLowerCase());
        }


        return rowValue.endsWith(this.value);
    };
}

export const endsWith = (fieldName: string, value: SupportedDataTypes, ignoreCase = false): INode => {
    return new EndsWith(fieldName, value, ignoreCase);
};
