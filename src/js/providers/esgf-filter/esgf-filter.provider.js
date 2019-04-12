import {ESGFFilterDTO} from "../../model/dto/ESGFFilterDTO";

export class ESGFFilterProvider {

    constructor(filterService) {

        this.filterService = filterService;
    }

    /**
     *
     * @return {ESGFFilterDTO[]}
     */
    provide() {
        if (this.filters == null) {
            this.filters = this.filterService.fetch();
        }

        return this.filters;
    }
}