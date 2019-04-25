class QueryValidator {

    /**
     *
     * @param {string}query
     * @return {boolean}
     */
    static isQueryValid(query){
        return !(query == null || query.trim() === "");
    }
}

export default QueryValidator;