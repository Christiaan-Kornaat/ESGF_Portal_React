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
import { filterComparator, propertyComparator } from "./sorters/comparators/esgf.comparator";
import { alphabeticalComparator } from "./sorters/comparators/primitive.comparator";
import { SorterFactoryFactory } from "./sorters/sorter.factory.factory";
import SorterManager from "./sorters/sorter.manager";
import Buttons from "./components/shared/buttons/buttons.component";
import XpfColumnTabInfoContent from "./components/expanded-property-finder/column/xpf-column-tab-info-content.component";
import XpfColumnTabListContent from "./components/expanded-property-finder/column/xpf-column-tab-list-content.component";
import OptionsComponent from "./components/expanded-property-finder/wrapper/xpf-list-options.component";
import InfoTabVM from "./model/view-model/InfoTabVM";
import { ESGFFilterDTO } from "./model/dto/esgf-filter.dto";
import { Comparator } from "./sorters/comparators/comparator";

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
    private filterProvider: ESGFFilterProvider;
    private searchResultProvider: ESGFSearchResultsProvider;
    private tileProvider: QFTileProvider;
    private selectedPropertyManager: SelectedPropertyManager;
    private quickFilterManager: QuickSelectManagerMock;

    state: { 
        selectedFilter: ESGFFilterDTO,
        selectedTabs: { filterColumn, propertyColumn, selectedColumn },
        columnTabs: { "left": {}, "center": {}, "right": {}},
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
            QuickFilterTileProvider
        } = Dependencies[environment];

        let searchService = new SearchService();
        this.searchResultProvider = new SearchResultsProvider(searchService);

        let filterService: IESGFFilterService = new FilterService();
        this.filterProvider = new FilterProvider(filterService);

        let tileService = new QuickFilterTileService(this.filterProvider);
        this.tileProvider = new QuickFilterTileProvider(tileService);

        this.selectedPropertyManager = new SelectedPropertyManager();
        this.quickFilterManager = new QuickFilterManager(this.filterProvider);

        this.state = {
            selectedFilter: null,
            selectedTabs: { filterColumn: null, propertyColumn: null, selectedColumn: null },
            infoTabs: [],
            sortState: this.createSortState(),
            columnTabs: { "left": {}, "center": {}, "right": {}},
            columnState: {},
            filters: []
        };

        this.update = this.update.bind(this);
        this.selectTab = this.selectTab.bind(this);
        this.selectFilter = this.selectFilter.bind(this);
        this.showPropertyInfo = this.showPropertyInfo.bind(this);
        this.addInfoTab = this.addInfoTab.bind(this);
        this.getSelectedFilterProperties = this.getSelectedFilterProperties.bind(this);
    }

    /**
     * @returns {Map<string, SorterManager>} sortState
     */
    createSortState(){
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
            .then(filter => this.setState(() => ({ selectedFilter: filter })));
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
    addInfoTab({ title, paragraphs }) {
        let infoTabs = this.state.infoTabs.concat(new InfoTabVM("Info", title, paragraphs));

        this.setState({ infoTabs: infoTabs });
    }

    /**
     * @param {string} columnName
     * @param {string} tabName
     */
    selectTab(columnName, tabName) {
        let { state: { selectedTabs } } = this;

        selectedTabs[columnName] = tabName;

        this.setState({ selectedTabs });
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
            selectFilter, selectTab, showPropertyInfo, selectedPropertyManager, filterProvider,
            state: { sortState, infoTabs, selectedTabs, filters, selectedFilter, columnTabs }
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

        let filterFactory = property =>
            <li key={property.shortName}
                className="filter"
                onClick={() => selectFilter(property)}>
                {StringFormatter.toHumanText(property.shortName)}
            </li>;

        /**
         *
         * @param onClick
         * @return {function(ESGFFilterPropertyDTO): Component}
         */
        let propertyListItemFactoryFactory = (onClick) => item => {
            let name = StringFormatter.toHumanText(item.name);

            let checked = selectedManager.isSelected(item);

            let onChange = () => onClick(item);

            let onInfoClick = async event => {
                event.stopPropagation();
                showPropertyInfo(item)
                 this.selectTab("selectedColumn", "Info");
            };

            return (
                <li key={name}
                    className={checked ? "selected property" : "property"}
                    onClick={onChange}>
                    <input className={"checkbox"}
                        type={"checkbox"}
                        onChange={() => {
                        }} //prevents error message
                        checked={checked} />
                    <span className={"icon-info"}
                        onClick={onInfoClick}>
                        <i className="fas fa-info-circle" />
                    </span>
                    {name}
                </li>
            );
        };

        let createInvertSort = (columnName) => () => {
            sortState.get(columnName).invert();

            this.update();
        };

        let sorterManagers = {
            filters: sortState.get("filters"),
            presets: sortState.get("presets"),
            properties: sortState.get("properties"),
            selectedProperties: sortState.get("properties-selected")
        };
        let sortFunctions = {
            filters: sorterManagers.filters.getCurrent(),
            presets: sorterManagers.presets.getCurrent(),
            properties: sorterManagers.properties.getCurrent(),
            selectedProperties: sorterManagers.selectedProperties.getCurrent()
        };

        let createSortButton = (columnName) => <Buttons.Sort key={columnName} title={"Sort A-Z"}
            onToggle={createInvertSort(columnName)} />;

        let optionComponents = {
            filters: <OptionsComponent key={"filters"} sortButtons={[createSortButton("filters")]} />,
            presets: <OptionsComponent key={"presets"} sortButtons={[createSortButton("presets")]} />,
            properties: <OptionsComponent key={"properties"} sortButtons={[createSortButton("properties")]}
                optionButtons={{
                    "Select all": createSetSelected(true, this.getSelectedFilterProperties),
                    "Deselect all": createSetSelected(false, this.getSelectedFilterProperties)
                }} />,
            propertiesSelected: <OptionsComponent key={"selected-properties"} sortButtons={[createSortButton("selected-properties")]}
                optionButtons={{
                    "Deselect all": createSetSelected(false, () => this.selectedPropertyManager.selected)                
                }} />
        };

        let FilterList = <XpfColumnTabListContent searchFunction={searchFunctions.filters}
        key={"FilterList"}
        items={filters}
        sortFunction={sortFunctions.filters}
        headerButtons={[optionComponents.filters]}
        isLoading={filtersLoading}
        listItemFactory={filterFactory} />;

        let PresetList = <XpfColumnTabListContent searchFunction={searchFunctions.filters}
        key={"PresetList"}
        items={[]}
        sortFunction={sortFunctions.filters}
        headerButtons={[optionComponents.presets]}
        isLoading={filtersLoading}
        listItemFactory={filterFactory} />;

        let PropertyList = <XpfColumnTabListContent searchFunction={searchFunctions.properties}
        key={"PropertyList"}
        items={properties}
        headerButtons={[optionComponents.properties]}
        sortFunction={sortFunctions.properties}
        listItemFactory={propertyListItemFactoryFactory(selectedManager.toggle)} />;

        let SelectedPropertyList = <XpfColumnTabListContent searchFunction={searchFunctions.properties}
        key={"SelectedPropertyList"}
        items={selectedProperties}
        headerButtons={[optionComponents.propertiesSelected]}
        listItemFactory={propertyListItemFactoryFactory(selectedManager.deselect)} />;

        columnTabs.left = { "Filters": FilterList, "Presets": PresetList };
        columnTabs.center = { "Properties": PropertyList }; 
        columnTabs.right = { "Selected properties": SelectedPropertyList };

        let infoTab = Object.values(infoTabs).pop();

        /**
         * 
         * @param {ESGFFilterPropertyDTO} property 
         */
        const propertyInfoTabVMFactory = ({name, filter}) => new InfoTabVM(name, name, {"Filter": filter.shortName});        

        const infoTabFactory = (infoTabVM) => <XpfColumnTabInfoContent key={"Info"} model={infoTabVM} />;

        columnTabs.right["Info"] = infoTab != null ? infoTabFactory(infoTab.content) : null;

        let selectNewTab = columnName => newTab => selectTab(columnName, newTab);

        let QS = <QFWrapper selectionManager={selectedPropertyManager}
                            qfProvider={this.tileProvider}
                            qfManager={this.quickFilterManager}/>;

        let XPF = <XPFWrapper columnTabs={columnTabs}
                              selectedTabs={selectedTabs}
                              selectTab={selectTab}/>;

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