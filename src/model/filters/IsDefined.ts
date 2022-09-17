import {JsonRow} from '../JsonRow';
import {INode} from './INode';
import {ValueAccessor} from "./ObjectNotationTypes";

export class IsDefinedNode implements INode {
    constructor(private valueAccessor: ValueAccessor, private fieldName: string) {
    }

    filter = (row: JsonRow): boolean => {
        const rowValue = this.valueAccessor(row, this.fieldName);

        return !(typeof rowValue === 'undefined' || rowValue === null);
    };
}
