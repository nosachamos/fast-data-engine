import {SupportedDataTypes} from "../ObjectNotationTypes";
import {JsonRow} from "../../JsonRow";


export interface ValueAccessor {

    /**
     * Actually performs the data access.
     */
    access(row: JsonRow, key: string): SupportedDataTypes | SupportedDataTypes[];

    /**
     * The key used by the user to configure this accessor.
     */
    key: string;
}
