import {JsonRow} from '../JsonRow';
import {INode} from './INode';
import {ValueAccessor} from "./ObjectNotationTypes";

export class IncludesNode implements INode {
    // TODO benchmark with different nodes for ignore case true versus false to avoid ignore case ternary operator
    constructor(private valueAccessor: ValueAccessor, private fieldName: string, private value: string, private ignoreCase = false) {
    }

    filter = (row: JsonRow): boolean => {
        const rowValue = this.valueAccessor(row, this.fieldName);

        // TODO benchmark with indexOf > -1
        if (typeof rowValue !== 'string') {
            return false;
        }

        // TODO benchmark with checking one char at a time and lowering only if letters dont match
        return this.ignoreCase ? rowValue.toLowerCase().includes(this.value.toLowerCase()) : rowValue.includes(this.value);
    };
}
