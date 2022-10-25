import { JsonRow } from '../JsonRow';
import { INode } from './INode';
import { SupportedDataTypes } from './ObjectNotationTypes';
import { ValueAccessor } from './accessor/ValueAccessor';

export class EqualsNode implements INode {
    constructor(
        private valueAccessor: ValueAccessor,
        private fieldName: string,
        private value: SupportedDataTypes,
        private ignoreCase = false,
    ) {}

    filter = (row: JsonRow): boolean => {
        const rowValue = this.valueAccessor.access(row, this.fieldName);

        if (this.ignoreCase) {
            if (typeof rowValue === 'string' && typeof this.value === 'string') {
                return (rowValue as string).toLowerCase() === this.value.toLowerCase();
            }
        }
        return rowValue === this.value;
    };
}
