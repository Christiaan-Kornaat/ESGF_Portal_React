import * as React from "react";
import ColumnedPage, {ColumnedPageState} from "../../shared/pages/page-columned/page-columned.component";
import {PageColumnModel} from "../../shared/pages/page-columned/page-column.component";
import PageColumnTabFactory, {
    FilterListItemFactoryFactory,
    SearchFunction
} from "../../../model/factories/page-column-tab.factory";
import {ESGFFilterDTO} from "../../../model/dto/esgf-filter.dto";
import Buttons from "../../shared/buttons/buttons.component";

import SelectedPropertyManager from "../../../managers/selected-property.manager";
import {ESGFFilterProvider} from "../../../data/esgf-filter/esgf-filter.provider";
import ESGFFilterSearcher from "../../../searchers/esgf-filter.searcher";
import ESGFPropertySearcher from "../../../searchers/esgf-property.searcher";
import ESGFFilterPropertyDTO from "../../../model/dto/esgf-filter-property.dto";
import ListItemFactoryFactory from "../../../model/factories/list-item-factory.factory";
import InfoTabVmFactory from "../../../model/factories/info-tab-vm.factory";
import SorterManager from "../../../sorters/sorter.manager";
import PageColumnListTab from "../../shared/pages/page-columned/page-column-list-tab.component";
import {SorterFactoryFactory} from "../../../sorters/sorter.factory.factory";
import {filterComparator, propertyComparator} from "../../../sorters/comparators/esgf.comparator";
import OptionsComponent from "../../expanded-property-finder/wrapper/xpf-list-options.component";
import {QFFilterTileDTO} from "../../../model/dto/qf-filter-tile.dto";
import {PreviewTab} from "../column/qfc-content-tab-preview.component";

type QfcCustomiserState = ColumnedPageState & {
    filters: ESGFFilterDTO[],
    selectedFilter: ESGFFilterDTO,
    sortState: Map<SortState, SorterManager>,
    columns: Map<ColumnPosition, PageColumnModel>
};
type QfcCustomiserProps = {
    className?: string,
    filterProvider: ESGFFilterProvider,
    qfController,
    qfTile: QFFilterTileDTO,
    onSave: (QFFilterTileDTO) => void,
    actionButtons: JSX.Element | JSX.Element[]
};

enum ColumnPosition {
    Left = "left", Centre = "centre", Right = "right"
}

enum SortState {
    Filter = "filter", Property = "property"
}

type ListItemFactory<TItem> = (item: TItem) => JSX.Element;

export default class QfcCustomiserWrapper extends ColumnedPage<QfcCustomiserProps> {

    public get selectedFilter(): ESGFFilterDTO {
        return this.state.selectedFilter;
    }

    public get properties() {
        return this.selectedFilter ? this.selectedFilter.properties : [];
    }

    public get selectedProperties() {
        return this._selectedPropertyManager.selected;
    }

    public state: QfcCustomiserState;

    private readonly _filterProvider: ESGFFilterProvider;
    private readonly _selectedPropertyManager: SelectedPropertyManager;

    private _searchFunctions: { filters: SearchFunction<ESGFFilterDTO>; properties: SearchFunction<ESGFFilterPropertyDTO> };
    private _optionComponents: { filters: JSX.Element; properties: JSX.Element };
    private _listItemFactories: { filters: ListItemFactory<ESGFFilterDTO>, properties: ListItemFactory<ESGFFilterPropertyDTO> };

    private sortFunctions = {
        sortState() { return this.state.sortState; },

        get filters() { return this.sortState().get(SortState.Filter).getCurrent(); },
        get properties() { return this.sortState().get(SortState.Property).getCurrent(); }
    };

    constructor(props: QfcCustomiserProps) {
        super(props);

        this.createInvertSort = this.createInvertSort.bind(this);
        this.sortFunctions.sortState = this.sortFunctions.sortState.bind(this);
        this.update = this.update.bind(this);
        this.deselectFilterProperty = this.deselectFilterProperty.bind(this);

        this._selectedPropertyManager = new SelectedPropertyManager();
        this.props.qfTile.properties.forEach(property => this._selectedPropertyManager.select(property));

        this._selectedPropertyManager.events.selectionChanged.subscribe(() => this.update());

        this._searchFunctions = {
            filters: new ESGFFilterSearcher().search,
            properties: new ESGFPropertySearcher().search
        };

        let {filterProvider} = props;

        this._filterProvider = filterProvider;

        this.state = {
            filters: [],
            columns: new Map<ColumnPosition, PageColumnModel>([
                [ColumnPosition.Left, {tabs: new Map(), id: ColumnPosition.Left, className: "Filters"}],
                [ColumnPosition.Centre, {tabs: new Map(), id: ColumnPosition.Centre, className: "Properties"}],
                [ColumnPosition.Right, {tabs: new Map(), id: ColumnPosition.Right, className: "SelectedProperties"}]
            ]),
            sortState: this.createSortState(),
            selectedFilter: null
        };

        this.initOptionComponents();
    }

    update() {
        this.forceUpdate();
    }

    createSortState(): Map<SortState, SorterManager> {
        let sorterFactoryFactory = new SorterFactoryFactory();
        let createSortState = (defaultAscending, comparator) =>
            new SorterManager(new Map([["A-Z", sorterFactoryFactory.createSorterFactory(comparator)]]), "A-Z");

        return new Map<SortState, SorterManager>([
            [SortState.Filter, createSortState(true, filterComparator)],
            [SortState.Property, createSortState(true, propertyComparator)]
        ]);
    }

    initOptionComponents() {
        let {isSelected, toggle: toggleSelected} = this._selectedPropertyManager;

        let listItemFactory = new ListItemFactoryFactory();
        let infoTabVMFactory = new InfoTabVmFactory();
        let columnTabFactory = new PageColumnTabFactory();

        let createOnInfoClickFactory = (showInfo, selectTab, infoTabName) => property => async event => {
            event.stopPropagation();
            await showInfo(property);
            selectTab(ColumnPosition.Right, infoTabName);
        };

        let createPropertyInfoTab = (property: ESGFFilterPropertyDTO) => columnTabFactory.createInfoTab(infoTabVMFactory.createPropertyVM(property));

        let showInfo = async (columnTab: JSX.Element) => this.setTab(ColumnPosition.Right, columnTab, "property-info");
        let showPropertyInfo = (property: ESGFFilterPropertyDTO) => showInfo(createPropertyInfoTab(property));

        let createOnInfoClick = createOnInfoClickFactory(showPropertyInfo, this.selectTab, "property-info");

        let createPropertyListItemFactory = ((createOnInfoClick, isSelectedFunction) => (onClick: (ESGFFilterPropertyDTO) => void) =>
            listItemFactory.createPropertyListItemFactory(onClick, createOnInfoClick, isSelectedFunction))(createOnInfoClick, isSelected);

        this._listItemFactories = {
            filters: new FilterListItemFactoryFactory().createFactory(this.selectFilter.bind(this)),
            properties: createPropertyListItemFactory(toggleSelected)
        };

        let createSortButtonFactory = createInvertSort => (columnName: SortState) => <Buttons.Sort key={columnName}
                                                                                                   title={"Sort A-Z"}
                                                                                                   onToggle={createInvertSort(columnName)}/>;
        let createSortButton = createSortButtonFactory(this.createInvertSort);
        this._optionComponents = {
            filters: <OptionsComponent key={"filters"} sortButtons={[createSortButton(SortState.Filter)]}/>,
            properties: <OptionsComponent key={"properties"} sortButtons={[createSortButton(SortState.Property)]}/>
        };
    }

    selectFilter(filter) {
        this.setState({selectedFilter: filter});
    }

    deselectFilterProperty(property) {
        this._selectedPropertyManager.deselect(property);
    }

    componentDidMount(): void {
        //FIXME find better way of getting initial data
        this._filterProvider.provideMany()
            .then(filters => Array.from(filters.values()))
            .then(filters => filters.filter(filter => filter.properties.length > 1))
            .then(filters => this.setState({filters: filters}));
    }

    render() {
        let {_optionComponents: optionComponents, _searchFunctions: searchFunctions, _listItemFactories, sortFunctions} = this;
        let {filters} = this.state;
        let {filters: filterListItemFactory, properties: propertyListItemFactory} = _listItemFactories;

        let filtersLoading = !this._filterProvider.hasFilters;

        let FilterList = <PageColumnListTab title={"Filters"}
                                            key={"filter-list"}
                                            items={filters}
                                            sortFunction={sortFunctions.filters}
                                            listItemFactory={filterListItemFactory}
                                            isLoading={filtersLoading}
                                            searchComponentModel={{
                                                searchMethod: searchFunctions.filters,
                                                headerButtons: [optionComponents.filters]
                                            }}/>;

        let PropertyList = <PageColumnListTab title={"Properties"}
                                              key={"PropertyList"}
                                              items={this.properties}
                                              sortFunction={sortFunctions.properties}
                                              listItemFactory={propertyListItemFactory}
                                              isLoading={false}
                                              searchComponentModel={{
                                                  searchMethod: searchFunctions.properties,
                                                  headerButtons: [optionComponents.properties]
                                              }}/>;

        let QuickFilterTab = <PreviewTab qfTile={this.props.qfTile}
                                         actionButtons={this.props.actionButtons}
                                         onSave={this.props.onSave}
                                         deselectProperty={this.deselectFilterProperty}
                                         properties={this.selectedProperties}/>;

        this.state.columns.get(ColumnPosition.Left).tabs.set("Filters", FilterList);
        this.state.columns.get(ColumnPosition.Centre).tabs.set("Properties", PropertyList);
        this.state.columns.get(ColumnPosition.Right).tabs.set("Quick Filter", QuickFilterTab);

        this.state.className += " XPF-Wrapper";

        return super.render();
    }

    createInvertSort(columnName) {
        return () => {
            this.state.sortState.get(columnName).invert();
            this.forceUpdate();
        };
    }
}