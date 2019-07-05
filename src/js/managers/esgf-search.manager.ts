import {ESGFSearchResultsProvider} from "../data/esgf-search/esgf-search-results.provider";
import ESGFSearchResultDTO from "../model/dto/esgf-search-result.dto";
import {EventEmitter, EventSubscriber} from "../lib/event-emitter/events";
import EsgfSearchQuery from "../model/dto/esgf-search-query";
import ESGFFilterPropertyDTO from "../model/dto/esgf-filter-property.dto";

export default class EsgfSearchManager {
    get currentQuery(): EsgfSearchQuery {
        return this._currentQuery;
    }

    get currentResults(): ESGFSearchResultDTO {
        return this._currentResults;
    }

    private readonly _eventEmitter: any;
    private readonly _eventNames: { searched, searchStarted } = {searched: "searched", searchStarted: "search-started"};

    private _currentQuery: EsgfSearchQuery;
    private _currentResults: ESGFSearchResultDTO = null;
    private _resultsProvider: ESGFSearchResultsProvider;

    public readonly events: { searched: EventSubscriber, searchStarted: EventSubscriber };

    constructor(resultsProvider: ESGFSearchResultsProvider) {
        this._resultsProvider = resultsProvider;

        this._eventEmitter = new EventEmitter();

        this.events = {
            searched: new EventSubscriber(this._eventNames.searched, this._eventEmitter),
            searchStarted: new EventSubscriber(this._eventNames.searchStarted, this._eventEmitter)
        };
    }

    async searchByProperties(properties: ESGFFilterPropertyDTO[]) {
        return await this.search(new EsgfSearchQuery(properties));
    }

    async search(query: EsgfSearchQuery) {
        this._currentQuery = query;

        this._eventEmitter.emit(this._eventNames.searchStarted);
        let results = await this._resultsProvider.provide(query);

        /* Check if request has changed in the meantime to ensure only the most recent query emits an event */
        if (this._currentQuery.id != query.id) return results;

        this._currentResults = results;
        this._eventEmitter.emit(this._eventNames.searched, results);

        return results;
    }


}