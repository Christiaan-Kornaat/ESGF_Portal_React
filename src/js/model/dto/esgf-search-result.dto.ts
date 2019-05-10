import ESGFDataNodeResultDTO from "./esgf-data-node-result.dto";

class ESGFSearchResultDTO {

    private readonly _results: ESGFDataNodeResultDTO[];
    private readonly _query: string;
    private readonly _numfound: number;
    private readonly _limit: number;

    get results() {
        return this._results;
    }

    get limit(): number {
        return this._limit;
    }

    get numfound(): number {
        return this._numfound;
    }

    get query(): string {
        return this._query;
    }

    constructor(results: ESGFDataNodeResultDTO[], query: string, numfound: number, limit: number) {
        this._results = results;
        this._query = query;
        this._numfound = numfound;
        this._limit = limit;
    }

    getNodeResults(dataNode: string) {
        return this._results.filter(result => result.data_node == dataNode);
    }
}

export default ESGFSearchResultDTO;