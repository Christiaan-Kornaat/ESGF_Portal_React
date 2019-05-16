import {isNullOrEmpty} from "../util/string.util";
import QueryValidator from "./query.validator";
import {ESGFFilterDTO} from "../model/dto/esgf-filter.dto";
import ESGFFilterDTOFormatter from "../model/formatters/esgf-filter-dto.formatter";
import Searcher, {SearchComparator} from "./searcher";

class ESGFFilterSearcher {
    private _searcherFactory: Searcher<ESGFFilterDTO>;

    constructor() {
        let comparator: SearchComparator<ESGFFilterDTO> = (query, possibleMatch) => ESGFFilterDTOFormatter.toHumanText(possibleMatch)
                                                                                                          .shortName
                                                                                                          .toLowerCase()
                                                                                                          .includes(query.toLowerCase());

        this._searcherFactory = new Searcher<ESGFFilterDTO>(comparator);

        this.search = this.search.bind(this);
    }

    /**
     * @summary Searches through filters, returns items that match
     */
    search(query: string, items: ESGFFilterDTO[]): ESGFFilterDTO[] {
        let {isQueryValid} = QueryValidator;

        if (!isQueryValid(query)) return items;


        let queries = query.split(",")
                           .map(item => item.trim())
                           .filter(item => !isNullOrEmpty(item));

        return this._searcherFactory.search(queries, items);
    };

}

export default ESGFFilterSearcher;