import {JsonRow} from '../JsonRow';
import {INode} from './INode';
import {ValueAccessor} from './accessor/ValueAccessor';

export class EndsWithNode implements INode {
    constructor(
        private valueAccessor: ValueAccessor,
        private fieldName: string,
        private value: string,
        private ignoreCase = false,
    ) {}

    // TODO: benchmark without arrow functions
    filter = (row: JsonRow): boolean => {
        const rowValue = this.valueAccessor.access(row, this.fieldName);

        if (typeof rowValue !== 'string') {
            return false;
        }

        if (this.ignoreCase) {
            // TODO: benchmark checking each char and lowering case only if letter does not match
            return (rowValue as string).toLowerCase().endsWith(this.value.toLowerCase());
        }

        return rowValue.endsWith(this.value);
    };
}
