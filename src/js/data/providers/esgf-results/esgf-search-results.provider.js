import {ESGFFilterDTO} from "../../../model/dto/esgf-filter.dto";

export class ESGFSearchResultsProvider {

    /**
     * @param {ESGFFilterService} filterService
     */
    constructor(filterService) {
        this.filterService = filterService;
    }

    /**
     *
     * @return {Promise<ESGFFilterDTO>}
     */
    provide() {
        // if (this.filters.size <= 0) {
        //     return this.filterService.fetchList()
        //                .then(filters => {
        //                    this.filters = filters;
        //                    return filters;
        //                });
        // }

        // return new Promise(resolve => resolve(this.filters));
    }
}