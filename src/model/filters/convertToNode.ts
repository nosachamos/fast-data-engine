import { FilterExpression } from './ObjectNotationTypes';
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
import { InArrayNode } from './InArray';
import { TypeOfNode } from './TypeOf';
import { FieldAccessor } from './accessor/FieldAccessor';

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
    const children = value;
    for (let j = 0; j < children.length; j++) {
      const child = children[j];
      convertedChildren.push(convertToNode(child));
    }
    return convertedChildren;
  };

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    // @ts-ignore
    const value = (expression as any)[key];

    // more field accessors will be added in the future.
    const dataAccessor = new FieldAccessor();
    const accessorKey = value[dataAccessor.key];
    switch (key) {
      case 'equals':
        rootChildren.push(new EqualsNode(dataAccessor, accessorKey, value.value, value.ignoreCase));
        break;

      case 'startsWith':
        rootChildren.push(new StartsWith(dataAccessor, accessorKey, value.value, value.ignoreCase));
        break;

      case 'endsWith':
        rootChildren.push(new EndsWith(dataAccessor, accessorKey, value.value, value.ignoreCase));
        break;

      case 'includes':
        rootChildren.push(new IncludesNode(dataAccessor, accessorKey, value.value, value.ignoreCase));
        break;

      case 'matches':
        rootChildren.push(new MatchesNode(dataAccessor, accessorKey, value.value, value.ignoreCase));
        break;

      case 'isTrue':
        rootChildren.push(new IsTrueNode(dataAccessor, value));
        break;

      case 'isFalse':
        rootChildren.push(new IsFalseNode(dataAccessor, value));
        break;

      case 'isDefined':
        rootChildren.push(new IsDefinedNode(dataAccessor, value));
        break;

      case 'greaterThan':
        rootChildren.push(new GreaterThanNode(dataAccessor, accessorKey, value.value));
        break;

      case 'greaterThanOrEquals':
        rootChildren.push(new GreaterThanOrEqualsNode(dataAccessor, accessorKey, value.value));
        break;

      case 'lessThan':
        rootChildren.push(new LessThanNode(dataAccessor, accessorKey, value.value));
        break;

      case 'lessThanOrEquals':
        rootChildren.push(new LessThanOrEqualsNode(dataAccessor, accessorKey, value.value));
        break;

      case 'typeOf':
        rootChildren.push(new TypeOfNode(dataAccessor, accessorKey, value.value));
        break;

      case 'inList':
        rootChildren.push(new InListNode(dataAccessor, accessorKey, value.value, value.ignoreCase));
        break;

      case 'inArray':
        rootChildren.push(new InArrayNode(dataAccessor, accessorKey, value.value, value.ignoreCase));
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
