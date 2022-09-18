import { SupportedDataTypes } from './ObjectNotationTypes';
import { JsonRow } from '../JsonRow';
import { INode } from './INode';
import { ValueAccessor } from './accessor/ValueAccessor';

export class InArrayNode implements INode {
    constructor(
        private valueAccessor: ValueAccessor,
        private fieldName: string,
        private value: SupportedDataTypes,
        private ignoreCase = false,
    ) {}

    filter = (row: JsonRow): boolean => {
        const rowValues = this.valueAccessor.access(row, this.fieldName);
        const rowValueArray = Array.isArray(rowValues) ? rowValues : [rowValues];

        if (this.ignoreCase) {
            for (let i = 0; i < rowValueArray.length; i++) {
                const rowValue = rowValueArray[i];
                if (typeof this.value === 'string' && typeof rowValue === 'string') {
                    if (rowValue.toLowerCase() === this.value.toLowerCase()) {
                        return true;
                    }
                }
            }
        } else {
            for (let i = 0; i < rowValueArray.length; i++) {
                const rowValue = rowValueArray[i];
                if (rowValue === this.value) {
                    return true;
                }
            }
        }

        return false;
    };
}
