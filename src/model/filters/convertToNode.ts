import {
    Accessor,
    ArrayLengthAccessor,
    FieldAccessor,
    FilterExpression,
    ObjectKeysAccessor,
    ObjectValuesAccessor
} from './ObjectNotationTypes';
import {INode} from './INode';
import {NoopNode} from './Noop';
import {EqualsNode} from './Equals';
import {AndNode} from './And';
import {IncludesNode} from './Includes';
import {OrNode} from './Or';
import {XorNode} from './Xor';
import {GreaterThanNode} from './GreaterThan';
import {GreaterThanOrEqualsNode} from './GreaterThanOrEquals';
import {LessThanOrEqualsNode} from './LessThanOrEquals';
import {LessThanNode} from './LessThan';
import {MatchesNode} from './Matches';
import {IsTrueNode} from './IsTrue';
import {IsFalseNode} from './IsFalse';
import {IsDefinedNode} from './IsDefined';
import {StartsWith} from './StartsWith';
import {EndsWith} from './EndsWith';
import {NotNode} from './Not';
import {InListNode} from './InList';
import {InArrayNode} from "./InArray";
import {TypeOfNode} from "./TypeOf";
import {JsonRow} from "../JsonRow";

type KnownKeys<T> = {
    [K in keyof T]: string extends K ? never : number extends K ? never : K;
} extends infer R
    ? R extends { [_ in keyof T]: infer U }
        ? U
        : never
    : never;


const fieldAccessor = (row: JsonRow, key: string) => row[key];

const arrayLengthAccessor = (row: JsonRow, key: string) => {
    const value = row[key];
    if (!Array.isArray(value)) {
        throw new Error(`Cannot use arrayLength accessor: field ${key} is not of array type.`);
    }
    return value.length;
}

const objectKeysAccessor = (row: JsonRow, key: string) => {
    const value = row[key];
    if (typeof value !== 'object' || value === null) {
        throw new Error(`Cannot use objectKeys accessor: field ${key} is not of object type, or it is null.`);
    }
    return Object.keys(value);
}

const objectValuesAccessor = (row: JsonRow, key: string) => {
    const value = row[key];
    if (typeof value !== 'object' || value === null) {
        throw new Error(`Cannot use objectValues accessor: field ${key} is not of object type, or it is null.`);
    }
    return Object.values(value);
}

function isFieldAccessor(obj: Accessor): obj is FieldAccessor {
    return (obj as FieldAccessor).field !== undefined;
}

function isObjectKeysAccessor(obj: Accessor): obj is ObjectKeysAccessor {
    return (obj as ObjectKeysAccessor).objectKeys !== undefined;
}

function isObjectValuesAccessor(obj: Accessor): obj is ObjectValuesAccessor {
    return (obj as ObjectValuesAccessor).objectValues !== undefined;
}

function isArrayLengthAccessor(obj: Accessor): obj is ArrayLengthAccessor {
    return (obj as ArrayLengthAccessor).arrayLength !== undefined;
}

export const convertToNode = (expression: FilterExpression): INode => {
    const keys = Object.keys(expression) as KnownKeys<FilterExpression>[];

    if (keys.length === 0) {
        return new NoopNode();
    }

    // there is an implicit AND node at the top level
    const rootChildren: INode[] = [];

    const processLogicalNode = (value: FilterExpression[]) => {
        const convertedChildren: INode[] = [];
        const children = value;
        for (let j = 0; j < children.length; j++) {
            const child = children[j];
            convertedChildren.push(convertToNode(child));
        }
        return convertedChildren;
    };

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = (expression as any)[key];

        const getDataAccessor = <T extends Accessor>(value: T) => {
            const dataAccessor = isFieldAccessor(value)
                ? fieldAccessor
                : isArrayLengthAccessor(value)
                    ? arrayLengthAccessor
                    : isObjectKeysAccessor(value)
                        ? objectKeysAccessor
                        : isObjectValuesAccessor(value)
                            ? objectValuesAccessor
                            : undefined;

            if (!dataAccessor) {
                throw new Error(`Unknown field type: ${JSON.stringify(value)}`);
            }

            return dataAccessor;
        }

        switch (key) {
            case 'equals':
                rootChildren.push(new EqualsNode(getDataAccessor(value), value.field, value.value, value.ignoreCase));
                break;

            case 'startsWith':
                rootChildren.push(new StartsWith(getDataAccessor(value), value.field, value.value, value.ignoreCase));
                break;

            case 'endsWith':
                rootChildren.push(new EndsWith(getDataAccessor(value), value.field, value.value, value.ignoreCase));
                break;

            case 'includes':
                rootChildren.push(new IncludesNode(getDataAccessor(value), value.field, value.value, value.ignoreCase));
                break;

            case 'matches':
                rootChildren.push(new MatchesNode(getDataAccessor(value), value.field, value.value, value.ignoreCase));
                break;

            case 'isTrue':
                rootChildren.push(new IsTrueNode(fieldAccessor, value));
                break;

            case 'isFalse':
                rootChildren.push(new IsFalseNode(fieldAccessor, value));
                break;

            case 'isDefined':
                rootChildren.push(new IsDefinedNode(fieldAccessor, value));
                break;

            case 'greaterThan':
                rootChildren.push(new GreaterThanNode(getDataAccessor(value), value.field, value.value));
                break;

            case 'greaterThanOrEquals':
                rootChildren.push(new GreaterThanOrEqualsNode(getDataAccessor(value), value.field, value.value));
                break;

            case 'lessThan':
                rootChildren.push(new LessThanNode(getDataAccessor(value), value.field, value.value));
                break;

            case 'lessThanOrEquals':
                rootChildren.push(new LessThanOrEqualsNode(getDataAccessor(value), value.field, value.value));
                break;

            case 'typeOf':
                rootChildren.push(new TypeOfNode(getDataAccessor(value), value.field, value.value));
                break;

            case 'inList':
                rootChildren.push(new InListNode(getDataAccessor(value), value.field, value.value, value.ignoreCase));
                break;

            case 'inArray':
                rootChildren.push(new InArrayNode(getDataAccessor(value), value.field, value.value, value.ignoreCase));
                break;

            case 'and':
                rootChildren.push(new AndNode(processLogicalNode(value as FilterExpression[])));
                break;

            case 'or':
                rootChildren.push(new OrNode(processLogicalNode(value as FilterExpression[])));
                break;

            case 'xor':
                rootChildren.push(new XorNode(processLogicalNode(value as FilterExpression[])));
                break;

            case 'not':
                rootChildren.push(new NotNode(convertToNode(value as FilterExpression)));
                break;

            default:
                throw new Error(`Unknown filter node type [${key}].`);
        }
    }

    if (rootChildren.length !== 1) {
        return new AndNode(rootChildren);
    } else {
        return rootChildren[0];
    }
};
