import * as React from "react";
import {Component} from "react";
import {ESGFSearchPortal} from "./components/esgf-search-portaal/esgf-search-portal.component";
import XPFWrapper from "./components/expanded-property-finder/wrapper/xpf-wrapper.component";
import {QFWrapper} from "./components/quick-filter-search/wrapper/qf-wrapper.component";
import {ESGFFilterProvider} from "./data/esgf-filter/esgf-filter.provider";
import {ESGFSearchResultsProvider} from "./data/esgf-search/esgf-search-results.provider";
import {QFTileProvider} from "./data/qf-tile/qf-tile.provider";
import ESGFFilterService from "./data/esgf-filter/esgf-filter.service";
import {ESGFFilterServiceDemo} from "./data/esgf-filter/esgf-filter.service.demo";
import {ESGFFilterServiceMock} from "./data/esgf-filter/esgf-filter.service.mock";
import ESGFSearchService from "./data/esgf-search/esgf-search.service";
import {ESGFSearchServiceDemo} from "./data/esgf-search/esgf-search.service.demo";
import {ESGFSearchServiceMock} from "./data/esgf-search/esgf-search.service.mock";
import {QFTileService} from "./data/qf-tile/qf-tile.service";
import QFTileServiceDemo from "./data/qf-tile/qf-tile.service.demo";
import QuickSelectManagerMock from "./managers/quick-filter/quick-filter.manager.mock";
import SelectedPropertyManager from "./managers/selected-property.manager";
import IESGFFilterService from "./data/esgf-filter/esgf-filter.service.interface";
import {ResultWrapper} from "./components/results-search/result-wrapper/result-wrapper.component";
import AdagucUrlBuilder from "./data/adaguc-url.builder";
import ESGFFilterPropertyDTO from "./model/dto/esgf-filter-property.dto";
import EsgfSearchManager from "./managers/esgf-search.manager";
import QFCWrapper from "./components/quick-filter-customizer/wrapper/qfc-wrapper.component";
import ICatalogService from "./data/catalog/catalog.service.interface";
import CatalogService from "./data/catalog/catalog.service";
import ICatalogProvider from "./data/catalog/catalog.provider.interface";
import CatalogProvider from "./data/catalog/catalog.provider";

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
        DATA_HOST: "https://climate4impact.eu"
    }
};

const environment = "prod";

class App extends Component {
    private readonly catalogService: ICatalogService;
    private readonly catalogProvider: ICatalogProvider;
    private readonly filterService: IESGFFilterService;
    private readonly filterProvider: ESGFFilterProvider;
    private readonly searchService: any;
    private readonly searchResultProvider: ESGFSearchResultsProvider;
    private readonly searchManager: any;
    private readonly tileProvider: QFTileProvider;
    private readonly selectedPropertyManager: SelectedPropertyManager;
    private readonly quickFilterManager: QuickSelectManagerMock;
    private readonly adagucUrlBuilder: AdagucUrlBuilder;

    constructor(props) {
        super(props);

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

        this.adagucUrlBuilder = new AdagucUrlBuilder(new URL(DATA_HOST));

        this.catalogService = new CatalogService(this.adagucUrlBuilder);
        this.catalogProvider = new CatalogProvider(this.catalogService);

        this.searchService = new SearchService(this.adagucUrlBuilder);
        this.searchResultProvider = new SearchResultsProvider(this.searchService);
        this.searchManager = new EsgfSearchManager(this.searchResultProvider);

        this.filterService = new FilterService(this.adagucUrlBuilder);
        this.filterProvider = new FilterProvider(this.filterService);

        let tileService = new QuickFilterTileService(this.filterProvider);
        this.tileProvider = new QuickFilterTileProvider(tileService);

        this.selectedPropertyManager = new SelectedPropertyManager();
        this.quickFilterManager = new QuickFilterManager(this.filterProvider);

        this.update = this.update.bind(this);
    }

    // Lifecycle methods

    update() {
        this.forceUpdate();
    }

    componentDidMount() {
        let setFilters = newFilters => this.setState(() => ({
            filters: Array.from(newFilters.values())
        }));

        this.filterProvider.provideMany()
            .then(setFilters);
    }

    render() {
        let onSelectionChanged = (selection: ESGFFilterPropertyDTO[]) => this.searchManager.searchByProperties(selection);
        this.selectedPropertyManager.events.selectionChanged.subscribe(onSelectionChanged);

        let QF = <QFWrapper selectionManager={this.selectedPropertyManager}
                            qfProvider={this.tileProvider}
                            filterProvider={this.filterProvider}/>;

        let XPF = <XPFWrapper filterProvider={this.filterProvider}
                              selectedPropertyManager={this.selectedPropertyManager}/>;

        let QFC = <QFCWrapper qfProvider={this.tileProvider}
                              qfManager={this.quickFilterManager}
                              filterProvider={this.filterProvider}/>;


        return (
            <div>
                <ESGFSearchPortal
                    tabs={{"Quick filter": QF, "Extended property finder": XPF, "Quick filter customizer": QFC}}/>
                <ResultWrapper catalogProvider={this.catalogProvider}
                               searchResultsManager={this.searchManager}/>
            </div>
        );
    }
}

export default App;