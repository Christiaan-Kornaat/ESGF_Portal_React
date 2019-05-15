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
import AdagucUrlBuilder from "./data/services/esgf-search/adaguc-url.builder";
import ESGFFilterPropertyDTO from "./model/dto/esgf-filter-property.dto";
import EsgfSearchManager from "./managers/esgf-search.manager";
import EsgfSearchQuery from "./model/dto/esgf-search-query";

interface AppEnvironment {
    FilterService: any,
    FilterProvider: any,
    SearchService: any,
    SearchResultsProvider: any,
    SelectedPropertyManager: any,
    QFTileService: any,
    QuickFilterManager: any,
    QuickFilterTileProvider: any,
    DATA_HOST: string
}

const Dependencies = {
    dev: {
        SearchService: ESGFSearchServiceMock,
        FilterService: ESGFFilterServiceMock,
        QFTileService: QFTileService,
        SearchResultsProvider: ESGFSearchResultsProvider,
        FilterProvider: ESGFFilterProvider,
        QuickFilterTileProvider: QFTileProvider,
        SelectedPropertyManager: SelectedPropertyManager,
        QuickFilterManager: QuickSelectManagerMock,
        DATA_HOST: "http://localhost:8080"
    },
    demo: {
        SearchService: ESGFSearchServiceDemo,
        FilterService: ESGFFilterServiceDemo,
        QFTileService: QFTileServiceDemo,
        SearchResultsProvider: ESGFSearchResultsProvider,
        FilterProvider: ESGFFilterProvider,
        QuickFilterTileProvider: QFTileProvider,
        SelectedPropertyManager: SelectedPropertyManager,
        QuickFilterManager: QuickSelectManagerMock,
        DATA_HOST: "http://localhost:8080"
    },
    prod: {
        SearchService: ESGFSearchService,
        FilterService: ESGFFilterService,
        QFTileService: QFTileServiceDemo,
        SearchResultsProvider: ESGFSearchResultsProvider,
        FilterProvider: ESGFFilterProvider,
        QuickFilterTileProvider: QFTileProvider,
        SelectedPropertyManager: SelectedPropertyManager,
        QuickFilterManager: QuickSelectManagerMock,
        DATA_HOST: "http://jan-mouwes-2.knmi.nl:8080"
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
            QuickFilterTileProvider,
            DATA_HOST
        } = Dependencies[environment] as AppEnvironment;

        const adagucUrlBuilder = new AdagucUrlBuilder(new URL(DATA_HOST));

        let searchService = new SearchService(adagucUrlBuilder);
        let searchResultProvider = new SearchResultsProvider(searchService);
        let searchManager = new EsgfSearchManager(searchResultProvider);

        let filterService: IESGFFilterService = new FilterService(adagucUrlBuilder);
        let filterProvider = new FilterProvider(filterService);

        let tileService = new QuickFilterTileService(filterProvider);
        let tileProvider = new QuickFilterTileProvider(tileService);

        let selectedPropertyManager = new SelectedPropertyManager();
        let quickFilterManager = new QuickFilterManager(filterProvider);

        let onSelectionChanged = (selection: ESGFFilterPropertyDTO[]) => searchManager.search(new EsgfSearchQuery(selection));
        selectedPropertyManager.events.selectionChanged.subscribe(onSelectionChanged);

        let QS = <QFWrapper selectionManager={selectedPropertyManager}
                            qfProvider={tileProvider}
                            qfManager={quickFilterManager}/>;

        let XPF = <XPFWrapper filterProvider={filterProvider}
                              selectedPropertyManager={selectedPropertyManager}/>;

        return (
            <div>
                <ESGFSearchPortal
                    tabs={{"Quick select": QS, "Extended property finder": XPF, "Customize quick filters": QS}}/>
                <ResultWrapper searchResultsManager={searchManager}/>
            </div>
        );
    }
}

export default App;