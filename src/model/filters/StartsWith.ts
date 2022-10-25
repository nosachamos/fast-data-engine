import {JsonRow} from '../JsonRow';
import {INode} from './INode';
import {ValueAccessor} from './accessor/ValueAccessor';

export class StartsWithNode implements INode {
    constructor(
        private valueAccessor: ValueAccessor,
        private fieldName: string,
        private value: string,
        private ignoreCase = false,
    ) {}

    filter = (row: JsonRow): boolean => {
        const rowValue = this.valueAccessor.access(row, this.fieldName);

        if (typeof rowValue !== 'string') {
            return false;
        }

        if (this.ignoreCase) {
            return (rowValue as string).toLowerCase().startsWith(this.value.toLowerCase());
        }

        return rowValue.startsWith(this.value);
    };
}
