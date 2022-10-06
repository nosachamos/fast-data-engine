import {
    FilterExpression,
    FilterKeys,
    isAndConfig,
    isEndsWithConfig,
    isEqualsConfig,
    isFalseConfig,
    isGreaterThanConfig,
    isGreaterThanOrEqualsConfig,
    isInArrayConfig,
    isIncludesConfig,
    isInListConfig,
    isIsDefinedConfig,
    isLessThanConfig,
    isLessThanOrEqualsConfig,
    isMatchesConfig,
    isNotConfig,
    isOrConfig,
    isStartsWithConfig,
    isTrueConfig,
    isTypeOfConfig,
    isXorConfig,
    KnownKeys,
} from './ObjectNotationTypes';
import { INode } from './INode';
import { NoopNode } from './Noop';
import { EqualsNode } from './Equals';
import { AndNode } from './And';
import { IncludesNode } from './Includes';
import { OrNode } from './Or';
import { XorNode } from './Xor';
import { GreaterThanNode } from './GreaterThan';
import { GreaterThanOrEqualsNode } from './GreaterThanOrEquals';
import { LessThanOrEqualsNode } from './LessThanOrEquals';
import { LessThanNode } from './LessThan';
import { MatchesNode } from './Matches';
import { IsTrueNode } from './IsTrue';
import { IsFalseNode } from './IsFalse';
import { IsDefinedNode } from './IsDefined';
import { StartsWith } from './StartsWith';
import { EndsWith } from './EndsWith';
import { NotNode } from './Not';
import { InListNode } from './InList';
import { TypeOfNode } from './TypeOf';
import { FieldAccessor } from './accessor/FieldAccessor';
import { InArrayNode } from './InArray';

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
        const key: FilterKeys = keys[i];
        const value = expression[key];

        // more field accessors will be added in the future.
        const dataAccessor = new FieldAccessor();

        if (isEqualsConfig(value, key)) {
            rootChildren.push(new EqualsNode(dataAccessor, value[dataAccessor.key], value.value, value.ignoreCase));
        } else if (isStartsWithConfig(value, key)) {
            rootChildren.push(new StartsWith(dataAccessor, value[dataAccessor.key], value.value, value.ignoreCase));
        } else if (isEndsWithConfig(value, key)) {
            rootChildren.push(new EndsWith(dataAccessor, value[dataAccessor.key], value.value, value.ignoreCase));
        } else if (isIncludesConfig(value, key)) {
            rootChildren.push(new IncludesNode(dataAccessor, value[dataAccessor.key], value.value, value.ignoreCase));
        } else if (isMatchesConfig(value, key)) {
            rootChildren.push(new MatchesNode(dataAccessor, value[dataAccessor.key], value.value, value.ignoreCase));
        } else if (isTrueConfig(value, key)) {
            rootChildren.push(new IsTrueNode(dataAccessor, value));
        } else if (isFalseConfig(value, key)) {
            rootChildren.push(new IsFalseNode(dataAccessor, value));
        } else if (isIsDefinedConfig(value, key)) {
            rootChildren.push(new IsDefinedNode(dataAccessor, value));
        } else if (isGreaterThanConfig(value, key)) {
            rootChildren.push(new GreaterThanNode(dataAccessor, value[dataAccessor.key], value.value));
        } else if (isGreaterThanOrEqualsConfig(value, key)) {
            rootChildren.push(new GreaterThanOrEqualsNode(dataAccessor, value[dataAccessor.key], value.value));
        } else if (isLessThanConfig(value, key)) {
            rootChildren.push(new LessThanNode(dataAccessor, value[dataAccessor.key], value.value));
        } else if (isLessThanOrEqualsConfig(value, key)) {
            rootChildren.push(new LessThanOrEqualsNode(dataAccessor, value[dataAccessor.key], value.value));
        } else if (isTypeOfConfig(value, key)) {
            rootChildren.push(new TypeOfNode(dataAccessor, value[dataAccessor.key], value.value));
        } else if (isInArrayConfig(value, key)) {
            rootChildren.push(new InArrayNode(dataAccessor, value[dataAccessor.key], value.value, value.ignoreCase));
        } else if (isInListConfig(value, key)) {
            rootChildren.push(new InListNode(dataAccessor, value[dataAccessor.key], value.value, value.ignoreCase));
        } else if (isAndConfig(value, key)) {
            rootChildren.push(new AndNode(processLogicalNode(value as FilterExpression[])));
        } else if (isOrConfig(value, key)) {
            rootChildren.push(new OrNode(processLogicalNode(value as FilterExpression[])));
        } else if (isXorConfig(value, key)) {
            rootChildren.push(new XorNode(processLogicalNode(value as FilterExpression[])));
        } else if (isNotConfig(value, key)) {
            rootChildren.push(new NotNode(convertToNode(value as FilterExpression)));
        } else {
            throw new Error(`Unknown filter node type [${key}].`);
        }
    }

    if (rootChildren.length !== 1) {
        return new AndNode(rootChildren);
    } else {
        return rootChildren[0];
    }
};
