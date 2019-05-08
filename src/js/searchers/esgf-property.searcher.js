import {isNullOrEmpty} from "../util/string.util";
import QueryValidator from "./query.validator";

class ESGFPropertySearcher {
    /**
     *
     * @param {string}query
     * @param {ESGFFilterPropertyDTO[]}items
     * @return {ESGFFilterPropertyDTO[]}
     */
    search(query, items) {
        let {isQueryValid} = QueryValidator;

        if (!isQueryValid(query)) return items;

        let searcher = query => items.filter(item => item.name.toLocaleLowerCase()
                                                         .includes(query.toLocaleLowerCase()));

        let searchedItems = new Set();

        let queries = query.split(",")
                           .map(item => item.trim())
                           .filter(item => !isNullOrEmpty(item));

        queries.forEach(query => searcher(query, items)
            .forEach(item => searchedItems.add(item)));

        return [...searchedItems];
    };

}

export default ESGFPropertySearcher;