import {FilterExpression} from '../../model/filters/ObjectNotationTypes';
import {INode} from '../../model/filters/INode';
import {NoopNode} from '../../model/filters/Noop';
import {EqualsNode} from '../../model/filters/Equals';
import {AndNode} from '../../model/filters/And';
import {IncludesNode} from '../../model/filters/Includes';
import {OrNode} from "../../model/filters/Or";
import {XorNode} from "../../model/filters/Xor";
import {GreaterThanNode} from "../../model/filters/GreaterThan";
import {GreaterThanOrEqualsNode} from "../../model/filters/GreaterThanOrEquals";
import {LessThanOrEqualsNode} from "../../model/filters/LessThanOrEquals";
import {LessThanNode} from "../../model/filters/LessThan";
import {MatchesNode} from "../../model/filters/Matches";
import {IsTrueNode} from "../../model/filters/IsTrue";
import {IsFalseNode} from "../../model/filters/IsFalse";
import {IsDefinedNode} from "../../model/filters/IsDefined";
import {StartsWith} from "../../model/filters/StartsWith";
import {EndsWith} from "../../model/filters/EndsWith";

type KnownKeys<T> = {
    [K in keyof T]: string extends K ? never : number extends K ? never : K;
} extends infer R
    ? R extends { [_ in keyof T]: infer U }
        ? U
        : never
    : never;

export const convertToNode = (expression: FilterExpression): INode => {
    const keys = Object.keys(expression) as KnownKeys<FilterExpression>[];
    if (keys.length === 0) {
        return new NoopNode();
    }

    // there is an implicit AND node at the top level
    const rootChildren: INode[] = [];

    const processLogicalNode = (value: FilterExpression[]) => {
        const convertedChildren: INode[] = [];
        const children = value as FilterExpression[];
        for (let j = 0; j < children.length; j++) {
            const child = children[j];
            convertedChildren.push(convertToNode(child));
        }
        return convertedChildren;
    };

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = (expression as any)[key];
        switch (key) {
            case 'equals':
                rootChildren.push(new EqualsNode(value.field, value.value, value.ignoreCase));
                break;

            case 'startsWith':
                rootChildren.push(new StartsWith(value.field, value.value, value.ignoreCase));
                break;

            case 'endsWith':
                rootChildren.push(new EndsWith(value.field, value.value, value.ignoreCase));
                break;

            case 'includes':
                rootChildren.push(new IncludesNode(value.field, value.value, value.ignoreCase));
                break;

            case 'matches':
                rootChildren.push(new MatchesNode(value.field, value.value, value.ignoreCase));
                break;

            case 'isTrue':
                rootChildren.push(new IsTrueNode(value));
                break;

            case 'isFalse':
                rootChildren.push(new IsFalseNode(value));
                break;

            case 'isDefined':
                rootChildren.push(new IsDefinedNode(value));
                break;

            case 'greaterThan':
                rootChildren.push(new GreaterThanNode(value.field, value.value));
                break;

            case 'greaterThanOrEquals':
                rootChildren.push(new GreaterThanOrEqualsNode(value.field, value.value));
                break;

            case 'lessThan':
                rootChildren.push(new LessThanNode(value.field, value.value));
                break;

            case 'lessThanOrEquals':
                rootChildren.push(new LessThanOrEqualsNode(value.field, value.value));
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
