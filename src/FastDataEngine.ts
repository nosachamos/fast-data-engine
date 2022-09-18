import {JsonData} from './model/JsonRow';
import {FilterExpression} from './model/filters/ObjectNotationTypes';
import {INode} from './model/filters/INode';
import {Engine} from "./Engine";

export class FastDataEngine {

  static filter = (data: JsonData, config: FilterExpression | INode) => {
      const engine = new Engine(data);
      return engine.filter(config);
  };

}
