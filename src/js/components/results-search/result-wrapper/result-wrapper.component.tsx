import React, {Component} from "react";
import ResultItem from "../result-items/result-item.component";
import EsgfSearchManager from "../../../managers/esgf-search.manager";
import ESGFDataNodeResultDTO from "../../../model/dto/esgf-data-node-result.dto";
import ESGFSearchResultDTO from "../../../model/dto/esgf-search-result.dto";
import LoadingIcons from "../../shared/icons/loading-icons.component";
import EsgfSearchQuery from "../../../model/dto/esgf-search-query";
import ICatalogProvider from "../../../data/catalog/catalog.provider.interface";
import PageSelector from "../../shared/paging/page-selector.component";

type ResultWrapperProps = { catalogProvider: ICatalogProvider, searchResultsManager: EsgfSearchManager, selectPage: (index: number) => Promise<any>, defaultCurrentPage?: number };

export class ResultWrapper extends Component<ResultWrapperProps> {
    private _searchManager: EsgfSearchManager;

    state: { searchResult: ESGFSearchResultDTO, isLoading: boolean, currentPageIndex };


    constructor(props: ResultWrapperProps) {
        super(props);

        let {searchResultsManager, defaultCurrentPage} = props;

        this.state = {
            searchResult: searchResultsManager.currentResults,
            isLoading: false,
            currentPageIndex: defaultCurrentPage || 0
        };

        this._searchManager = searchResultsManager;

        this.forceUpdate = this.forceUpdate.bind(this);
        this.setResults = this.setResults.bind(this);
        this.setLoading = this.setLoading.bind(this);

        this._searchManager.events.searchStarted.subscribe(this.setLoading);
        this._searchManager.events.searched.subscribe(this.setResults);
    }

    setLoading(isLoading = true) {
        this.setState(() => ({isLoading: isLoading}));
    }

    setResults(searchResult): void {
        this.setState(() => ({searchResult: searchResult, isLoading: false}));
    }

    componentDidMount(): void {
        this._searchManager.search(new EsgfSearchQuery([]));
    }


    render() {
        let {searchResult, isLoading} = this.state;

        isLoading = isLoading || !searchResult;

        let createResultItem = (result: ESGFDataNodeResultDTO) => <ResultItem key={result.esgfid} labelModel={result}
                                                                              resultProvider={this.props.catalogProvider}/>;

        let resultComponents = !isLoading ? searchResult.results.map(createResultItem) : <LoadingIcons.Spinner/>;
        let numFoundComponent = !isLoading ?
            `(${new Intl.NumberFormat("en-US").format(searchResult.numfound)})` :
            <LoadingIcons.SpinnerInline/>;

        let maxPage = !isLoading ? Math.ceil(searchResult.numfound / searchResult.limit) : 1;

        return (
            <div className="result-wrapper">
                <div className="result-header">
                    Results {numFoundComponent} <PageSelector onPageChange={index => this.props.selectPage(index - 1)}
                                                              maxPage={maxPage}
                                                              className={"float-right"}/>
                </div>
                {resultComponents}
            </div>
        );
    }
}
