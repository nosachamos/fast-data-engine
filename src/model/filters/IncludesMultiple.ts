import { JsonRow } from '../JsonRow';
import { INode } from './INode';
import { ValueAccessor } from './accessor/ValueAccessor';
import { SupportedDataTypes } from './ObjectNotationTypes';

export class IncludesMultipleNode implements INode {
    constructor(
        private valueAccessor: ValueAccessor,
        private fieldName: string,
        private value: string[],
        private ignoreCase = false,
    ) {}

    filter = (row: JsonRow): boolean => {
        const rowValue = this.valueAccessor.access(row, this.fieldName) as SupportedDataTypes;

        for (let i = 0; i < this.value.length; i++) {
            const v = this.value[i];
            const match =
                typeof rowValue === 'string'
                    ? this.ignoreCase
                        ? rowValue.toLowerCase().includes(v.toLowerCase())
                        : rowValue.includes(v)
                    : false;

            if (match) return true;
        }

        return false;
    };
}
