import { FilterExpression } from '../../model/filters/ObjectNotationTypes';
import { INode } from '../../model/filters/INode';
import { NoopNode } from '../../model/filters/Noop';
import { EqualsNode } from '../../model/filters/Equals';
import { AndNode } from '../../model/filters/And';
import { IncludesNode } from '../../model/filters/Includes';

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
        rootChildren.push(new EqualsNode(value.field, value.value));
        break;

      case 'includes':
        rootChildren.push(new IncludesNode(value.field, value.value));
        break;

      case 'and':
        rootChildren.push(new AndNode(processLogicalNode(value as FilterExpression[])));
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
