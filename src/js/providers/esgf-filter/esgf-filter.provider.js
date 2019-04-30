import {ESGFFilterDTO} from "../../model/dto/ESGFFilterDTO";

export class ESGFFilterProvider {

    /**
     * 
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
        if (this.filters == null) {
            return this.filterService.fetch().then(filters => {
                this.filters = filters;
                return filters;
            });
        }

        return new Promise(resolve=> resolve(this.filters));
    }
}