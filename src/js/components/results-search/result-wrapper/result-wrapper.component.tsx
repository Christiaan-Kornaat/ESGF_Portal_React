import React, {Component} from "react";
import ResultItem from "../result-items/result-item.component";
import EsgfSearchManager from "../../../managers/esgf-search.manager";
import ESGFDataNodeResultDTO from "../../../model/dto/esgf-data-node-result.dto";

export class ResultWrapper extends Component<{ searchResultsManager: EsgfSearchManager }> {
    private _searchManager: EsgfSearchManager;

    constructor(props) {
        super(props);

        let {searchResultsManager} = props;

        this._searchManager = searchResultsManager;

        this._searchManager.events.searched.subscribe(this.update.bind(this));

        this.update = this.update.bind(this);
    }

    update() {
        this.forceUpdate();
    }

    render() {
        let results = this._searchManager.currentResults ? this._searchManager.currentResults.results : [];

        let createTableRow = (result: ESGFDataNodeResultDTO) => <ResultItem labelModel={result}/>;

        return (
            <div className="result-wrapper">
                <div className="result-header">
                    Results
                </div>
                {results.map(createTableRow)}
            </div>
        );
    }
}
