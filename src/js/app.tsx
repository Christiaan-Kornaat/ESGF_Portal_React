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
import {filterComparator, propertyComparator} from "./sorters/comparators/esgf.comparator";
import {alphabeticalComparator} from "./sorters/comparators/primitive.comparator";
import {SorterFactoryFactory} from "./sorters/sorter.factory.factory";
import SorterManager from "./sorters/sorter.manager";
import InfoTabVM from "./model/view-model/InfoTabVM";
import {ESGFFilterDTO} from "./model/dto/esgf-filter.dto";
import {Comparator} from "./sorters/comparators/comparator";
import AdagucUrlBuilder from "./data/services/esgf-search/adaguc-url.builder";
import ESGFFilterPropertyDTO from "./model/dto/esgf-filter-property.dto";
import EsgfSearchManager from "./managers/esgf-search.manager";
import EsgfSearchQuery from "./model/dto/esgf-search-query";
import EsgfFilterPropertyVM from "./model/view-model/esgf-filter-property.viewmodel";
import { QFCWrapper } from "./components/quick-filter-customizer/wrapper/qfc-wrapper.component";

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
    private readonly filterService: IESGFFilterService;
    private readonly filterProvider: ESGFFilterProvider;
    private readonly searchService: any;
    private readonly searchResultProvider: ESGFSearchResultsProvider;
    private readonly searchManager: any;
    private readonly tileProvider: QFTileProvider;
    private readonly selectedPropertyManager: SelectedPropertyManager;
    private readonly quickFilterManager: QuickSelectManagerMock;
    private readonly adagucUrlBuilder: AdagucUrlBuilder;

    state: {
        selectedFilter: ESGFFilterDTO,
        selectedTabs: { filterColumn, propertyColumn, selectedColumn },
        columnTabs: { "left": {}, "center": {}, "right": {} },
        infoTabs: InfoTabVM[],
        sortState,
        columnState: {},
        filters: []
    };

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

        this.searchService = new SearchService(this.adagucUrlBuilder);
        this.searchResultProvider = new SearchResultsProvider(this.searchService);
        this.searchManager = new EsgfSearchManager(this.searchResultProvider);

        this.filterService = new FilterService(this.adagucUrlBuilder);
        this.filterProvider = new FilterProvider(this.filterService);

        let tileService = new QuickFilterTileService(this.filterProvider);
        this.tileProvider = new QuickFilterTileProvider(tileService);

        this.selectedPropertyManager = new SelectedPropertyManager();
        this.quickFilterManager = new QuickFilterManager(this.filterProvider);

        this.state = {
            selectedFilter: null,
            selectedTabs: {filterColumn: null, propertyColumn: null, selectedColumn: null},
            infoTabs: [],
            sortState: this.createSortState(),
            columnTabs: {"left": {}, "center": {}, "right": {}},
            columnState: {},
            filters: []
        };

        this.update = this.update.bind(this);
    }

    /**
     * @returns {Map<string, SorterManager>} sortState
     */
    createSortState() {
        let sorterFactoryFactory = new SorterFactoryFactory();
        let createSortState: ((key: string, comparator: Comparator<any>) => [string, SorterManager]) = (key: string, comparator: Comparator<any>) => [
            key,
            new SorterManager(new Map([
                ["A-Z", sorterFactoryFactory.createSorterFactory(comparator)]
            ]), "A-Z")
        ];

        //TODO find a way to solidify the keys
        /**
         *
         * @type {Map<string, SorterManager>}
         */
        return new Map<string, SorterManager>([
            createSortState("filters", filterComparator),
            createSortState("presets", alphabeticalComparator/*FIXME TEMP*/),
            createSortState("properties", propertyComparator),
            createSortState("properties-selected", propertyComparator)
        ]);
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
        let onSelectionChanged = (selection: ESGFFilterPropertyDTO[]) => this.searchManager.search(new EsgfSearchQuery(selection));
        this.selectedPropertyManager.events.selectionChanged.subscribe(onSelectionChanged);

        let QS = <QFWrapper selectionManager={this.selectedPropertyManager}
                            qfProvider={this.tileProvider}
                            filterProvider={this.filterProvider}
                            />;

        let XPF = <XPFWrapper filterProvider={this.filterProvider}
                              selectedPropertyManager={this.selectedPropertyManager}/>;


        let QSC = <QFCWrapper
            qfProvider={this.tileProvider}
            qfManager={this.quickFilterManager}
            filterProvider={this.filterProvider} />;


        return (
            <div>
                <ESGFSearchPortal
                    tabs={{"Quick select": QS, "Extended property finder": XPF, "Customize quick filters": QSC}}/>
                <ResultWrapper searchResultsManager={this.searchManager}/>
            </div>
        );
    }
}

export default App;