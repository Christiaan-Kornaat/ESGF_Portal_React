import {sleep} from "../../util/async.util";
import {ESGFFilterDTO} from "../../model/dto/esgf-filter.dto";
import ESGFFilterPropertyDTO from "../../model/dto/esgf-filter-property.dto";
import ESGFFilterService from "./esgf-filter.service";

export class ESGFFilterProvider {
    private readonly filterService: ESGFFilterService;
    private readonly filterCache: Map<String, ESGFFilterDTO>;
    private propertyCache: Map<ESGFFilterDTO, ESGFFilterPropertyDTO[]>;

    private fetching: boolean;

    /**
     * @param {ESGFFilterService} filterService
     */
    constructor(filterService) {
        this.filterService = filterService;
        this.filterCache = new Map();
        this.propertyCache = new Map();

        this.fetching = false;
    }

    get hasFilters() {
        return this.filterCache.size > 0;
    }

    /**
     * @return {Promise<Map<String, ESGFFilterDTO>>}
     */
    async provideMany(): Promise<Map<String, ESGFFilterDTO>> {
        while (this.fetching) {
            await sleep(10);
        }

        if (!this.hasFilters) {
            this.fetching = true;

            let cacheFilter = (filter: ESGFFilterDTO) => {
                this.filterCache.set(filter.shortName, filter);
                this.propertyCache.set(filter, filter.properties);
            };

            let filters = await this.filterService.fetchList();
            filters.forEach(cacheFilter); //TODO standardize to filter.id

            this.fetching = false;
        }

        return this.filterCache;
    }

    /**
     * @param filterName
     * @return {Promise<ESGFFilterDTO>}
     */
    async provide(filterName): Promise<ESGFFilterDTO> {
        /**
         * @param {ESGFFilterDTO}filter
         * @return {ESGFFilterDTO}
         */
        let provideFilterProperties = async (filter) => {
            try {
                filter.properties = this.propertyCache.has(filter) ?
                    this.propertyCache.get(filter) :
                    await this.filterService.fetch(filter.shortName);
            } catch (e) {
                throw e;
            }

            this.propertyCache.set(filter, filter.properties);
            return filter;
        };

        let filters = await this.provideMany();

        if (!filters.has(filterName)) return Promise.reject();

        return provideFilterProperties(filters.get(filterName));
    }
}