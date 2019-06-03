import ESGFSearchResultDTO from "../../model/dto/esgf-search-result.dto";
import IESGFSearchService from "./esgf-search.service.interface";
import EsgfSearchQuery from "../../model/dto/esgf-search-query";

export class ESGFSearchResultsProvider {
    private _results: Map<String, ESGFSearchResultDTO>;
    private _searchService: IESGFSearchService;

    /**
     * @param {ESGFSearchService} searchService
     */
    constructor(searchService) {
        this._searchService = searchService;
        this._results = new Map<String, ESGFSearchResultDTO>();
    }

    /**
     * @param {string} query
     *
     * @return {Promise<ESGFSearchResultDTO>}
     */
    async provide(query: EsgfSearchQuery) {
        if (!this._results.has(query.id)) {
            let results = await this._searchService.fetch(query.filterProperties);

            this._results.set(query.id, results);
        }

        return this._results.get(query.id);
    }
}