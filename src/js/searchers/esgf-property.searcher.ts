/// <reference path="facet-search.strategy.ts" />

import {isNullOrEmpty} from "../util/string.util";
import QueryValidator from "./query.validator";
import Searcher, {SearchComparator} from "./searcher";
import ESGFFilterPropertyDTO from "../model/dto/esgf-filter-property.dto";
import ESGFPropertyDTOFormatter from "../model/formatters/esgf-property-dto.formatter";

export namespace SearchStrategies {
    export namespace Esgf {
        export class PropertySearchStrategy {

            private _searcherFactory: Searcher<ESGFFilterPropertyDTO>;

            constructor() {
                let comparator: SearchComparator<ESGFFilterPropertyDTO> = (query, possibleMatch) =>
                    ESGFPropertyDTOFormatter.toHumanText(possibleMatch)
                                            .name
                                            .toLowerCase()
                                            .includes(query.toLowerCase());

                this._searcherFactory = new Searcher<ESGFFilterPropertyDTO>(comparator);

                this.search = this.search.bind(this);
            }

            /**
             * @summary Searches through filters, returns items that match
             */
            public search(query: string, items: ESGFFilterPropertyDTO[]): ESGFFilterPropertyDTO[] {
                let {isQueryValid} = QueryValidator;

                if (!isQueryValid(query)) return items;


                let queries = query.split(",")
                                   .map(item => item.trim())
                                   .filter(item => !isNullOrEmpty(item));

                return this._searcherFactory.search(queries, items);
            };

        }
    }
}

export default SearchStrategies.Esgf.PropertySearchStrategy;