import {SupportedDataTypes} from "./filters/ObjectNotationTypes";

export type JsonRow = { [key: number | string]: Record<string, unknown> | SupportedDataTypes | SupportedDataTypes[] | JsonRow };
export type JsonData = JsonRow[];
