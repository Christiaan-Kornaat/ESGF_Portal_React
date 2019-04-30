import {isNullOrEmpty} from "../util/string.util";
import QueryValidator from "./query.validator";

class ESGFFilterSearcher {
    /**
     *
     * @param {string}query
     * @param {ESGFFilterDTO[]}items
     * @return {ESGFFilterDTO[]}
     */
    search(query, items) {
        let {isQueryValid} = QueryValidator;

        if (!isQueryValid(query)) return items;

        let searcher = query => items.filter(({shortName}) => shortName.includes(query));

        let searchedItems = new Set();

        let queries = query.split(",")
                           .map(item => item.trim())
                           .filter(item => !isNullOrEmpty(item));

        queries.forEach(query => searcher(query, items)
            .forEach(item => searchedItems.add(item)));

        return [...searchedItems];
    };

}

export default ESGFFilterSearcher;