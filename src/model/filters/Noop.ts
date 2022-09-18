import { INode } from './INode';

/**
 * The noop node accepts all rows.
 */
export class NoopNode implements INode {
  filter = (): boolean => {
    return true;
  };
}
