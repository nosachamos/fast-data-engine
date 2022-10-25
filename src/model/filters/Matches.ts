import { JsonRow } from '../JsonRow';
import { INode } from './INode';
import { ValueAccessor } from './accessor/ValueAccessor';

export class MatchesNode implements INode {
    regex: RegExp;

    constructor(
        private valueAccessor: ValueAccessor,
        private fieldName: string,
        value: string | RegExp,
        ignoreCase = false,
    ) {
        this.regex = value instanceof RegExp ? value : new RegExp(value, ignoreCase ? 'i' : undefined);
    }

    filter = (row: JsonRow): boolean => {
        const rowValue = this.valueAccessor.access(row, this.fieldName);

        if (typeof rowValue !== 'string') {
            return false;
        }

        return this.regex.test(rowValue);
    };
}
