import { JsonData } from './model/JsonRow';
import { FilterExpression } from './model/filters/ObjectNotationTypes';
import { INode, isINode } from './model/filters/INode';
import { convertToNode } from './model/filters/convertToNode';

export class Engine {

  constructor(private data: JsonData) {}

  filter = (config: FilterExpression | INode) => {
    const node = isINode(config) ? config : convertToNode(config);

    const result: JsonData = [];
    for (let i = 0; i < this.data.length; i++) {
      const row = this.data[i];
      if (node.filter(row)) {
        result.push(row);
      }
    }

    this.data = result;
    return this;
  };

  get result() {
      return this.data;
  }

}
