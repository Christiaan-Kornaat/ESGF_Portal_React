import {ESGFSearchResultsProvider} from "../data/providers/esgf-search/esgf-search-results.provider";
import ESGFSearchResultDTO from "../model/dto/esgf-search-result.dto";
import {EventEmitter, EventSubscriber} from "../lib/event-emitter/events";
import EsgfSearchQuery from "../model/dto/esgf-search-query";

export default class EsgfSearchManager {
    private readonly _eventEmitter: any;
    private readonly _eventNames: { searched } = {searched: "searched"};

    private _currentQuery: string;
    private _currentResults: ESGFSearchResultDTO = null;
    private _resultsProvider: ESGFSearchResultsProvider;

    public readonly events: { searched: EventSubscriber };

    constructor(resultsProvider: ESGFSearchResultsProvider) {
        this._resultsProvider = resultsProvider;

        this._eventEmitter = new EventEmitter();

        this.events = {
            searched: new EventSubscriber(this._eventNames.searched, this._eventEmitter)
        };
    }

    async search(query: EsgfSearchQuery) {
        console.log("Searching for " + query.id);

        this._currentQuery = query.id;
        let results = await this._resultsProvider.provide(query);

        /* Check if request has changed in the meantime to ensure only the most recent query emits an event */
        if (this._currentQuery != query.id) return results;

        this._currentResults = results;
        this._eventEmitter.emit(this._eventNames.searched, results);

        return results;
    }

    get currentResults(): ESGFSearchResultDTO {
        return this._currentResults;
    }
}