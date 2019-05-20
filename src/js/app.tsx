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
import StringFormatter from "./model/formatters/string.formatter";
import ESGFFilterSearcher from "./searchers/esgf-filter.searcher";
import ESGFPropertySearcher from "./searchers/esgf-property.searcher";
import {filterComparator, propertyComparator} from "./sorters/comparators/esgf.comparator";
import {alphabeticalComparator} from "./sorters/comparators/primitive.comparator";
import {SorterFactoryFactory} from "./sorters/sorter.factory.factory";
import SorterManager from "./sorters/sorter.manager";
import Buttons from "./components/shared/buttons/buttons.component";
import XpfColumnTabInfoContent
    from "./components/expanded-property-finder/column/xpf-column-tab-info-content.component";
import XpfColumnTabListContent
    from "./components/expanded-property-finder/column/xpf-column-tab-list-content.component";
import OptionsComponent from "./components/expanded-property-finder/wrapper/xpf-list-options.component";
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
    private filterService: IESGFFilterService;
    private filterProvider: ESGFFilterProvider;
    private searchService: any;
    private searchResultProvider: ESGFSearchResultsProvider;
    private searchManager: any;
    private tileProvider: QFTileProvider;
    private selectedPropertyManager: SelectedPropertyManager;
    private quickFilterManager: QuickSelectManagerMock;
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
        this.selectFilter = this.selectFilter.bind(this);
        this.showPropertyInfo = this.showPropertyInfo.bind(this);
        this.addInfoTab = this.addInfoTab.bind(this);
        this.getSelectedFilterProperties = this.getSelectedFilterProperties.bind(this);
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

    /**
     *
     * @param {ESGFFilterDTO}filter
     */
    selectFilter(filter) {
        if (this.state.selectedFilter === filter) return;

        this.filterProvider.provide(filter.shortName)
            .then(filter => this.setState(() => ({selectedFilter: filter})));
    }

    /**
     * NOTE Temporary content
     *
     * @param {ESGFFilterPropertyDTO} property
     */
    showPropertyInfo(property) {
        this.addInfoTab({
            title: property.name,
            paragraphs: {
                "Filter": property.filter.shortName
            }
        });
    }

    /**
     *
     * @param {InfoTabVM} viewModel
     */
    addInfoTab({title, paragraphs}) {
        let infoTabs = this.state.infoTabs.concat(new InfoTabVM("Info", title, paragraphs));

        this.setState({infoTabs: infoTabs});
    }

    /**
     * @param {string} columnName
     * @param {string} tabName
     */
    selectTab(columnName, tabName) {
        let {state: {selectedTabs}} = this;

        selectedTabs[columnName] = tabName;

        this.setState({selectedTabs});
    }

    getSelectedFilterProperties() {
        return (this.state.selectedFilter) ? this.state.selectedFilter.properties : [];
    }

    // Lifecycle methods

    update() {
        this.forceUpdate();
    }

    componentDidMount() {
        this.selectedPropertyManager.events.selectionChanged.subscribe(this.update);

        let setFilters = newFilters => this.setState(() => ({
            filters: Array.from(newFilters.values())
        }));

        this.filterProvider.provideMany()
            .then(setFilters);
    }

    componentWillUnmount() {
        this.selectedPropertyManager.events.selectionChanged.unsubscribe(this.update);
    }

    render() {
        let {
            selectFilter, showPropertyInfo, selectedPropertyManager, filterProvider, searchManager,
            state: {sortState, infoTabs, selectedTabs, filters, selectedFilter, columnTabs}
        } = this;

        let selectedManager = selectedPropertyManager;
        let filtersLoading = !filterProvider.hasFilters;
        let properties = selectedFilter ? selectedFilter.properties : [];
        let selectedProperties = selectedManager.selected;

        let searchFunctions = {
            filters: new ESGFFilterSearcher().search,
            properties: new ESGFPropertySearcher().search
        };

        /**
         * @summary creates method that sets selected state for list of properties
         *
         * @param {boolean} isSelected state to set it to
         * @param {function(): ESGFFilterPropertyDTO[]} propertyGetter
         *
         * @return {function(): void} function that sets selected state for properties
         */
        let createSetSelected = (isSelected, propertyGetter) => () => {
            (isSelected ?
                selectedManager.selectMany :
                selectedManager.deselectMany)(propertyGetter());
        };

        let filterFactory = filter =>
            <li key={filter.shortName}
                className="filter"
                onClick={() => selectFilter(filter)}>
                {StringFormatter.toHumanText(filter.shortName)}
            </li>;

        /**
         *
         * @param onClick
         * @return {function(ESGFFilterPropertyDTO): Component}
         */
        let propertyListItemFactoryFactory = (onClick) => item => {
            let viewModel = new EsgfFilterPropertyVM(item);

            let checked = selectedManager.isSelected(item);

            let onChange = () => onClick(item);

            let onInfoClick = async event => {
                event.stopPropagation();
                showPropertyInfo(item);
                this.selectTab("selectedColumn", "Info");
            };

            return (
                <li key={item.name}
                    className={checked ? "selected property" : "property"}
                    onClick={onChange}>
                    <input className={"checkbox"}
                           type={"checkbox"}
                           onChange={() => {
                           }} //prevents error message
                           checked={checked}/>
                    <span className={"icon-info"}
                          onClick={onInfoClick}>
                        <i className="fas fa-info-circle"/>
                    </span>
                    {viewModel.name}
                </li>
            );
        };

        let createInvertSort = (columnName) => () => {
            sortState.get(columnName).invert();

            this.update();
        };

        let sortFunctions = {
            filters: sortState.get("filters").getCurrent(),
            presets: sortState.get("presets").getCurrent(),
            properties: sortState.get("properties").getCurrent(),
            selectedProperties: sortState.get("properties-selected").getCurrent()
        };

        let createSortButton = (columnName) => <Buttons.Sort key={columnName}
                                                             title={"Sort A-Z"}
                                                             onToggle={createInvertSort(columnName)}/>;

        let optionComponents = {
            filters: <OptionsComponent key={"filters"} sortButtons={[createSortButton("filters")]}/>,
            presets: <OptionsComponent key={"presets"} sortButtons={[createSortButton("presets")]}/>,
            properties: <OptionsComponent key={"properties"} sortButtons={[createSortButton("properties")]}
                                          optionButtons={{
                                              "Select all": createSetSelected(true, this.getSelectedFilterProperties),
                                              "Deselect all": createSetSelected(false, this.getSelectedFilterProperties)
                                          }}/>,
            propertiesSelected: <OptionsComponent key={"selected-properties"}
                                                  sortButtons={[createSortButton("selected-properties")]}
                                                  optionButtons={{
                                                      "Deselect all": createSetSelected(false, () => this.selectedPropertyManager.selected)
                                                  }}/>
        };

        let FilterList = <XpfColumnTabListContent searchFunction={searchFunctions.filters}
                                                  key={"FilterList"}
                                                  items={filters}
                                                  sortFunction={sortFunctions.filters}
                                                  headerButtons={[optionComponents.filters]}
                                                  isLoading={filtersLoading}
                                                  listItemFactory={filterFactory}/>;

        let PresetList = <XpfColumnTabListContent searchFunction={searchFunctions.filters}
                                                  key={"PresetList"}
                                                  items={[]}
                                                  sortFunction={sortFunctions.filters}
                                                  headerButtons={[optionComponents.presets]}
                                                  isLoading={filtersLoading}
                                                  listItemFactory={filterFactory}/>;

        let PropertyList = <XpfColumnTabListContent searchFunction={searchFunctions.properties}
                                                    key={"PropertyList"}
                                                    items={properties}
                                                    headerButtons={[optionComponents.properties]}
                                                    sortFunction={sortFunctions.properties}
                                                    listItemFactory={propertyListItemFactoryFactory(selectedManager.toggle)}/>;

        let SelectedPropertyList = <XpfColumnTabListContent searchFunction={searchFunctions.properties}
                                                            key={"SelectedPropertyList"}
                                                            items={selectedProperties}
                                                            headerButtons={[optionComponents.propertiesSelected]}
                                                            listItemFactory={propertyListItemFactoryFactory(selectedManager.deselect)}/>;

        columnTabs.left = {"Filters": FilterList, "Presets": PresetList};
        columnTabs.center = {"Properties": PropertyList};
        columnTabs.right = {"Selected properties": SelectedPropertyList};

        let infoTab = Object.values(infoTabs).pop();

        const infoTabFactory = (infoTabVM) => <XpfColumnTabInfoContent key={"Info"} model={infoTabVM}/>;

        if (infoTab) columnTabs.right["Info"] = infoTabFactory(infoTab.content);

        let onSelectionChanged = (selection: ESGFFilterPropertyDTO[]) => searchManager.search(new EsgfSearchQuery(selection));
        selectedPropertyManager.events.selectionChanged.subscribe(onSelectionChanged);

        let QS = <QFWrapper selectionManager={selectedPropertyManager}
                            qfProvider={this.tileProvider}
                            qfManager={this.quickFilterManager}/>;

        let XPF = <XPFWrapper columnTabs={columnTabs}
                              selectedTabs={selectedTabs} />;


        let QSC = <QFCWrapper 
            qfProvider={this.tileProvider}
            qfManager={this.quickFilterManager}
            filterProvider={this.filterProvider} />;                      

        return (
            <div>
                <ESGFSearchPortal
                    tabs={{"Quick select": QS, "Extended property finder": XPF, "Customize quick filters": QSC}}/>
                <ResultWrapper searchResultsManager={searchManager}/>
            </div>
        );
    }
}

export default App;