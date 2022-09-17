import {JsonRow} from '../JsonRow';
import {INode} from './INode';
import {ValueAccessor} from "./ObjectNotationTypes";

export class GreaterThanOrEqualsNode implements INode {
    constructor(private valueAccessor: ValueAccessor, private fieldName: string, private value: number) {
    }

    filter = (row: JsonRow): boolean => {
        const rowValue = this.valueAccessor(row, this.fieldName);

        if (typeof rowValue !== 'number') {
            return false;
        }

        return rowValue >= this.value;
    };
}
