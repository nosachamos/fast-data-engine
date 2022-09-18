import { SupportedDataTypes } from './ObjectNotationTypes';
import { JsonRow } from '../JsonRow';
import { INode } from './INode';
import { ValueAccessor } from './accessor/ValueAccessor';

export class InListNode implements INode {
    constructor(
        private valueAccessor: ValueAccessor,
        private fieldName: string,
        private value: SupportedDataTypes[],
        private ignoreCase = false,
    ) {}

    filter = (row: JsonRow): boolean => {
        const rowValue = this.valueAccessor.access(row, this.fieldName);

        if (this.ignoreCase) {
            const rowValueIsStr = typeof rowValue === 'string';
            for (let i = 0; i < this.value.length; i++) {
                const v = this.value[i];
                if (rowValueIsStr && typeof v === 'string') {
                    if (rowValue.toLowerCase() === v.toLowerCase()) {
                        return true;
                    }
                }
            }
        } else {
            for (let i = 0; i < this.value.length; i++) {
                const v = this.value[i];
                if (rowValue === v) {
                    return true;
                }
            }
        }

        return false;
    };
}
