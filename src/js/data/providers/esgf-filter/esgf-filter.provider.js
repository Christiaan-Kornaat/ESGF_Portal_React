export class ESGFFilterProvider {

    /**
     * @param {ESGFFilterService} filterService
     */
    constructor(filterService) {
        this.filterService = filterService;
        this.filterCache = new Map();
        this.propertyCache = new Map();
    }

    get ready() {
        return this.filterCache.size > 0;
    }

    /**
     * @return {Promise<Map<String, ESGFFilterDTO>>}
     */
    provideMany() {
        if (!this.ready) {
            return this.filterService.fetchList()
                       .then(filters => filters.forEach(filter => {
                           this.filterCache.set(filter.shortName, filter);
                           this.propertyCache.set(filter, filter.properties);
                       })) //TODO standardize to filter.id
                       .then(() => this.filterCache);

        }

        return new Promise(resolve => resolve(this.filterCache));
    }

    /**
     * @param filterName
     * @return {Promise<ESGFFilterDTO>}
     */
    provide(filterName) {
        /**
         * @param {ESGFFilterDTO}filter
         * @return {ESGFFilterDTO}
         */
        let provideFilterProperties = (filter) => {
            filter.properties = this.propertyCache.has(filter) ?
                this.propertyCache.get(filter) :
                this.filterService.fetch(filter.shortName);
            this.propertyCache.set(filter, filter.properties);
            return filter;
        };

        return this.provideMany()
                   .then(filters => filters.has(filterName) ? filters.get(filterName) : Promise.reject())
                   .then(provideFilterProperties);
    }
}