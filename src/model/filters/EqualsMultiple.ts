import { JsonRow } from '../JsonRow';
import { INode } from './INode';
import { ValueAccessor } from './accessor/ValueAccessor';
import { SupportedDataTypes } from './ObjectNotationTypes';

export class EqualsMultipleNode implements INode {
    constructor(
        private valueAccessor: ValueAccessor,
        private fieldName: string,
        private value: SupportedDataTypes[],
        private ignoreCase = false,
    ) {}

    filter = (row: JsonRow): boolean => {
        const rowValue = this.valueAccessor.access(row, this.fieldName) as SupportedDataTypes;

        for (let i = 0; i < this.value.length; i++) {
            const v = this.value[i];
            const equals =
                typeof v === 'string'
                    ? this.ignoreCase
                        ? typeof rowValue === 'string' && rowValue.toLowerCase() === v.toLowerCase()
                        : rowValue === v
                    : rowValue === v;

            if (equals) return true;
        }

        return false;
    };
}
