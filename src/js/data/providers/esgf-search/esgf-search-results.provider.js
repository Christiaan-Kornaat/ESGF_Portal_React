export class ESGFSearchResultsProvider {

    /**
     * @param {ESGFSearchService} searchService
     */
    constructor(searchService) {
        this.searchService = searchService;
        this.results = new Map();
    }

    /**
     * @param {string} query
     *
     * @return {Promise<ESGFSearchResultDTO>}
     */
    provide(query) {
        if (!this.results.has(query)) {
            return this.searchService.fetchList(query)
                       .then(searchResults => this.results.set(query, searchResults))
                       .then(() => this.results.get(query));
        }

        return new Promise(resolve => resolve(this.results.get(query)));
    }
}