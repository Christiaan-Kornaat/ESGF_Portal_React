import {isNullOrEmpty} from "../util/string.util";

class QueryValidator {

    /**
     *
     * @param {string}query
     * @return {boolean}
     */
    static isQueryValid(query){
        return !isNullOrEmpty(query);
    }
}

export default QueryValidator;