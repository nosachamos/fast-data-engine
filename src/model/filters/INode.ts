import { JsonRow } from '../JsonRow';
import { FilterExpression } from './ObjectNotationTypes';

export interface INode {
    filter: (row: JsonRow) => boolean;
}

/**
 * A single AST node, such as equals, or not.
 */
export interface INotNode extends INode {
    child: INode;
}

/**
 * A node that contains a list of children nodes, such as logical operators.
 */
export interface INodeListContainer extends INode {
    children: INode[];
}

export const isINode = (value: INode | FilterExpression): value is INode => {
    return (value as INode).filter !== undefined;
};
