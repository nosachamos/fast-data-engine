import {JsonData} from "../../model/JsonRow";
import {ROW_FIELDS} from "./Constants";

export const performBasicAssertions = (result: JsonData,
                                       numResults: number,
                                       firstResultIndex: number,
                                       numFields = ROW_FIELDS, debug = false) => {

    if (debug) {
        console.log('result.length: ' + result.length);
        console.log(JSON.stringify(result, null, 2));
    }

    expect(result.length).toBe(numResults);
    if (numResults > 0) {
        expect(result[0]['index']).toBe(firstResultIndex);
        expect(Object.keys(result[0]).length).toBe(numFields);
    }
}