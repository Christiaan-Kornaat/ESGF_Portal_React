import * as React from "react";
import {Component} from "react";
import {ESGFSearchPortal} from "./components/esgf-search-portaal/esgf-search-portal.component";
import XPFWrapper from "./components/expanded-property-finder/wrapper/xpf-wrapper.component";
import {QFWrapper} from "./components/quick-filter-search/wrapper/qf-wrapper.component";
import {ESGFFilterProvider} from "./data/providers/esgf-filter/esgf-filter.provider";
import {ESGFSearchResultsProvider} from "./data/providers/esgf-search/esgf-search-results.provider";
import {QFTileProvider} from "./data/providers/qf-tile/qf-tile.provider";
import ESGFFilterService from "./data/services/esgf-filter/esgf-filter.service";
import {ESGFFilterServiceDemo} from "./data/services/esgf-filter/esgf-filter.service.demo";
import {ESGFFilterServiceMock} from "./data/services/esgf-filter/esgf-filter.service.mock";
import ESGFSearchService from "./data/services/esgf-search/esgf-search.service";
import {ESGFSearchServiceDemo} from "./data/services/esgf-search/esgf-search.service.demo";
import {ESGFSearchServiceMock} from "./data/services/esgf-search/esgf-search.service.mock";
import {QFTileService} from "./data/services/qf-tile/qf-tile.service";
import QFTileServiceDemo from "./data/services/qf-tile/qf-tile.service.demo";
import QuickSelectManagerMock from "./managers/quick-filter/quick-filter.manager.mock";
import SelectedPropertyManager from "./managers/selected-property.manager";
import IESGFFilterService from "./data/services/esgf-filter/esgf-filter.service.interface";
import {ResultWrapper} from "./components/results-search/result-wrapper/result-wrapper.component";

const Dependencies = {
    dev: {
        SearchService: ESGFSearchServiceMock,
        FilterService: ESGFFilterServiceMock,
        QFTileService: QFTileService,
        SearchResultsProvider: ESGFSearchResultsProvider,
        FilterProvider: ESGFFilterProvider,
        QuickFilterTileProvider: QFTileProvider,
        SelectedPropertyManager: SelectedPropertyManager,
        QuickFilterManager: QuickSelectManagerMock
    },
    demo: {
        SearchService: ESGFSearchServiceDemo,
        FilterService: ESGFFilterServiceDemo,
        QFTileService: QFTileServiceDemo,
        SearchResultsProvider: ESGFSearchResultsProvider,
        FilterProvider: ESGFFilterProvider,
        QuickFilterTileProvider: QFTileProvider,
        SelectedPropertyManager: SelectedPropertyManager,
        QuickFilterManager: QuickSelectManagerMock
    },
    prod: {
        SearchService: ESGFSearchService,
        FilterService: ESGFFilterService,
        QFTileService: QFTileServiceDemo,
        SearchResultsProvider: ESGFSearchResultsProvider,
        FilterProvider: ESGFFilterProvider,
        QuickFilterTileProvider: QFTileProvider,
        SelectedPropertyManager: SelectedPropertyManager,
        QuickFilterManager: QuickSelectManagerMock
    }
};

const environment = "prod";

class App extends Component {
    render() {
        let {
            FilterService,
            FilterProvider,
            SearchService,
            SearchResultsProvider,
            SelectedPropertyManager,
            QFTileService: QuickFilterTileService,
            QuickFilterManager,
            QuickFilterTileProvider
        } = Dependencies[environment];

        let searchService = new SearchService();
        let searchResultProvider = new SearchResultsProvider(searchService);

        let filterService: IESGFFilterService = new FilterService();
        let filterProvider = new FilterProvider(filterService);

        let tileService = new QuickFilterTileService(filterProvider);
        let tileProvider = new QuickFilterTileProvider(tileService);

        let selectedPropertyManager = new SelectedPropertyManager();
        let quickFilterManager = new QuickFilterManager(filterProvider);

        let QS = <QFWrapper selectionManager={selectedPropertyManager}
                            searchResultProvider={searchResultProvider}
                            qfProvider={tileProvider}
                            qfManager={quickFilterManager}/>;

        let XPF = <XPFWrapper filterProvider={filterProvider}
                              searchResultProvider={searchResultProvider}
                              selectedPropertyManager={selectedPropertyManager}/>;

        return (
            <div>
                <ESGFSearchPortal
                    tabs={{"Quick select": QS, "Extended property finder": XPF, "Customize quick filters": QS}}/>
                <ResultWrapper />
            </div>
        );
    }
}

export default App;