import React, {Component} from "react";
import ResultItem from "../result-items/result-item.component";
import EsgfSearchManager from "../../../managers/esgf-search.manager";
import ESGFDataNodeResultDTO from "../../../model/dto/esgf-data-node-result.dto";
import ESGFSearchResultDTO from "../../../model/dto/esgf-search-result.dto";
import LoadingIcons from "../../shared/icons/loading-icons.component";

export class ResultWrapper extends Component<{ searchResultsManager: EsgfSearchManager }> {
    private _searchManager: EsgfSearchManager;

    state: { searchResult: ESGFSearchResultDTO };

    constructor(props) {
        super(props);

        let {searchResultsManager} = props;

        this.state = {
            searchResult: null
        };

        this._searchManager = searchResultsManager;

        this._searchManager.events.searched.subscribe(this.setResults.bind(this));

        this.forceUpdate = this.forceUpdate.bind(this);
        this.setResults = this.setResults.bind(this);
    }

    setResults(searchResult): void {
        this.setState(() => ({searchResult: searchResult}));
    }


    render() {
        let {searchResult} = this.state;
        let isLoading = !searchResult;

        let createResultItem = (result: ESGFDataNodeResultDTO) => <ResultItem labelModel={result}/>;

        let resultComponents = !isLoading ? searchResult.results.map(createResultItem) : <LoadingIcons.Spinner/>;
        let numFoundComponent = !isLoading ?
            `(${new Intl.NumberFormat("en-US").format(searchResult.numfound)})` :
            <LoadingIcons.SpinnerInline/>;

        return (
            <div className="result-wrapper">
                <div className="result-header">
                    Results {numFoundComponent}
                </div>
                {resultComponents}
            </div>
        );
    }
}
