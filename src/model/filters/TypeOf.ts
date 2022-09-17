import {JsonRow} from '../JsonRow';
import {INode} from './INode';
import {SupportedTypesOfs, ValueAccessor} from "./ObjectNotationTypes";

export class TypeOfNode implements INode {
    constructor(private valueAccessor: ValueAccessor, private fieldName: string, private value: SupportedTypesOfs) {
    }

    filter = (row: JsonRow): boolean => {
        const rowValue = this.valueAccessor(row, this.fieldName);

        switch (this.value) {
            case SupportedTypesOfs.array:
                return Array.isArray(rowValue);
            case SupportedTypesOfs.boolean:
                return typeof rowValue === 'boolean';
            case SupportedTypesOfs.object:
                return typeof rowValue === 'object' && rowValue !== null && !Array.isArray(rowValue);
            case SupportedTypesOfs.string:
                return typeof rowValue === 'string';
            case SupportedTypesOfs.undefined:
                return typeof rowValue === "undefined";
            case SupportedTypesOfs.null:
                return rowValue === null;
            case SupportedTypesOfs.number:
                return typeof rowValue === 'number';
        }
    };
}
