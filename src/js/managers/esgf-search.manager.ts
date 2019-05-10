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
        this._currentQuery = query.id;
        this._currentResults = await this._resultsProvider.provide(query);

        this._eventEmitter.emit(this._eventNames.searched, this._currentResults);

        return this._currentResults;
    }

    get currentResults(): ESGFSearchResultDTO {
        return this._currentResults;
    }
}