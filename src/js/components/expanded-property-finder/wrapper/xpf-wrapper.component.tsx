import * as React from "react";
import ColumnedPage, {ColumnedPageState} from "../../shared/pages/page-columned/page-columned.component";
import {PageColumnModel} from "../../shared/pages/page-columned/page-column.component";
import PageColumnTabFactory, {
    FilterListItemFactoryFactory,
    SearchFunction
} from "../../../model/factories/page-column-tab.factory";
import {ESGFFilterDTO} from "../../../model/dto/esgf-filter.dto";
import Buttons from "../../shared/buttons/buttons.component";
import OptionsComponent from "./xpf-list-options.component";
import SelectedPropertyManager from "../../../managers/selected-property.manager";
import {ESGFFilterProvider} from "../../../data/providers/esgf-filter/esgf-filter.provider";
import ESGFFilterSearcher from "../../../searchers/esgf-filter.searcher";
import ESGFPropertySearcher from "../../../searchers/esgf-property.searcher";
import ESGFFilterPropertyDTO from "../../../model/dto/esgf-filter-property.dto";
import ListItemFactoryFactory from "../../../model/factories/list-item-factory.factory";
import InfoTabVmFactory from "../../../model/factories/info-tab-vm.factory";
import SorterManager from "../../../sorters/sorter.manager";
import PageColumnListTab from "../../shared/pages/page-columned/page-column-list-tab.component";
import {SorterFactoryFactory} from "../../../sorters/sorter.factory.factory";
import {filterComparator, propertyComparator} from "../../../sorters/comparators/esgf.comparator";
import {alphabeticalComparator} from "../../../sorters/comparators/primitive.comparator";
import { PresetDTO } from "../../../model/dto/esgf-preset.dto";
import { PresetJSONDTO, PresetConverter } from "../../../data/converters/preset-converter";
import { LocalStorageController } from "../../../controllers/localstorage/esgf-localstorage.controller";

type XpfWrapperState = ColumnedPageState & {
    filters: ESGFFilterDTO[],
    selectedFilter: ESGFFilterDTO,
    selectedPropertyManager: SelectedPropertyManager,
    sortState: Map<SortState, SorterManager>,
    columns: Map<ColumnPosition, PageColumnModel>,
    presetsListItems: PresetDTO[]
};
type XpfWrapperProps = {
    className?: string,
    selectedPropertyManager: SelectedPropertyManager,
    filterProvider: ESGFFilterProvider
};

enum ColumnPosition {
    Left = "left", Centre = "centre", Right = "right"
}

enum SortState {
    Filter = "filter", Preset = "preset", Property = "property", SelectedProperty = "property-selected"
}

type ListItemFactory<TItem> = (item: TItem) => JSX.Element;

export default class XPFWrapper extends ColumnedPage<XpfWrapperProps> {

    public get selectedFilter(): ESGFFilterDTO {
        return this.state.selectedFilter;
    }

    public get properties() {
        return this.selectedFilter ? this.selectedFilter.properties : [];
    }

    public state: XpfWrapperState;

    private readonly _selectedPropertyManager: SelectedPropertyManager;
    private readonly _filterProvider: ESGFFilterProvider;
    private readonly _presetController: LocalStorageController<PresetDTO, PresetJSONDTO>;

    private _searchFunctions: { filters: SearchFunction<ESGFFilterDTO>; properties: SearchFunction<ESGFFilterPropertyDTO> };
    private _optionComponents: { presets: JSX.Element; filters: JSX.Element; propertiesSelected: JSX.Element; properties: JSX.Element };
    private _listItemFactories: { filters: ListItemFactory<ESGFFilterDTO>, presets: ListItemFactory<PresetDTO>,properties: ListItemFactory<ESGFFilterPropertyDTO>, propertiesSelected: ListItemFactory<ESGFFilterPropertyDTO> };



    private sortFunctions = {
        sortState() { return this.state.sortState; },

        get filters() { return this.sortState().get(SortState.Filter).getCurrent(); },
        get presets() { return this.sortState().get(SortState.Preset).getCurrent(); },
        get properties() { return this.sortState().get(SortState.Property).getCurrent(); },
        get selectedProperties() { return this.sortState().get(SortState.SelectedProperty).getCurrent(); }
    };

    constructor(props: XpfWrapperProps) {
        super(props);

        this.createInvertSort = this.createInvertSort.bind(this);
        this.sortFunctions.sortState = this.sortFunctions.sortState.bind(this);
        this.update = this.update.bind(this);

        this._searchFunctions = {
            filters: new ESGFFilterSearcher().search,
            properties: new ESGFPropertySearcher().search
        };

        let {selectedPropertyManager: selectedManager, filterProvider} = props;

        this._selectedPropertyManager = selectedManager;
        this._filterProvider = filterProvider;

        this._selectedPropertyManager.events.selectionChanged.subscribe(this.update);
        this._presetController = new LocalStorageController<PresetDTO, PresetJSONDTO>(new PresetConverter(filterProvider), "ESGFPresetStorage");

        this.state = {
            filters: [],
            columns: new Map<ColumnPosition, PageColumnModel>([
                [ColumnPosition.Left, {tabs: new Map(), id: ColumnPosition.Left, className: "Filters"}],
                [ColumnPosition.Centre, {tabs: new Map(), id: ColumnPosition.Centre, className: "Properties"}],
                [ColumnPosition.Right, {tabs: new Map(), id: ColumnPosition.Right, className: "SelectedProperties"}]
            ]),
            sortState: this.createSortState(),
            selectedPropertyManager: selectedManager,
            selectedFilter: null,
            presetsListItems: []
        };

        this.initOptionComponents();
        this.updatePresets = this.updatePresets.bind(this);
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
            [SortState.Preset, createSortState(true, alphabeticalComparator)], /*FIXME temp*/
            [SortState.Property, createSortState(true, propertyComparator)],
            [SortState.SelectedProperty, createSortState(true, propertyComparator)]
        ]);
    }

    initOptionComponents() {
        let {_selectedPropertyManager: selectedManager} = this;
        let {toggle: toggleSelected, deselect} = selectedManager;

        let listItemFactory = new ListItemFactoryFactory();
        let infoTabVMFactory = new InfoTabVmFactory();
        let columnTabFactory = new PageColumnTabFactory();

        let {isSelected} = this._selectedPropertyManager;

        let createSetSelected = this.createSetSelectedFactory(selectedManager);

        let createOnInfoClickFactory = (showInfo, selectTab, infoTabName) => property => async event => {
            event.stopPropagation();
            await showInfo(property);
            selectTab(ColumnPosition.Right, infoTabName);
        };

        let createPropertyInfoTab = (property: ESGFFilterPropertyDTO) => columnTabFactory.createInfoTab(infoTabVMFactory.createPropertyVM(property));

        let showInfo = async (columnTab: JSX.Element) => this.setTab(ColumnPosition.Right, columnTab, "property-info");
        let showPropertyInfo = (property: ESGFFilterPropertyDTO) => showInfo(createPropertyInfoTab(property));

        let createOnInfoClick = createOnInfoClickFactory(showPropertyInfo, this.selectTab, "property-info");

        let createPresetInfoTab = (preset: PresetDTO) => columnTabFactory.createInfoTab(infoTabVMFactory.createPresetVM(preset));
        let showPresetInfo = (preset: PresetDTO) => showInfo(createPresetInfoTab(preset));
        let createOnInfoPresetClick = createOnInfoClickFactory(showPresetInfo, this.selectTab, "Preset-info");

        let createPropertyListItemFactory = ((createOnInfoClick, isSelectedFunction) => (onClick: (ESGFFilterPropertyDTO) => void) =>
            listItemFactory.createPropertyListItemFactory(onClick, createOnInfoClick, isSelectedFunction))(createOnInfoClick, isSelected);

        this._listItemFactories = {
            filters: new FilterListItemFactoryFactory().createFactory(this.selectFilter.bind(this)),
            presets: listItemFactory.createPresetListItemFactory(({ properties }: PresetDTO) => selectedManager.selectMany(properties) , createOnInfoPresetClick, () => (null) ),
            properties: createPropertyListItemFactory(toggleSelected),
            propertiesSelected: createPropertyListItemFactory(deselect),
        };

        let createSortButtonFactory = createInvertSort => (columnName: SortState) => <Buttons.Sort key={columnName}
                                                                                                   title={"Sort A-Z"}
                                                                                                   onToggle={createInvertSort(columnName)}/>;
        let createSortButton = createSortButtonFactory(this.createInvertSort);
        this._optionComponents = {
            filters: <OptionsComponent key={"filters"} sortButtons={[createSortButton(SortState.Filter)]}/>,
            presets: <OptionsComponent key={"presets"} sortButtons={[createSortButton(SortState.Preset)]}/>,
            properties: <OptionsComponent key={"properties"} sortButtons={[createSortButton(SortState.Property)]}
                                          optionButtons={{
                                              "Select all": createSetSelected(true, () => this.properties),
                                              "Deselect all": createSetSelected(false, () => this.properties)
                                          }}/>,
            propertiesSelected: <OptionsComponent key={"propertiesSelected"} sortButtons={[createSortButton(SortState.SelectedProperty)]}
                                                  optionButtons={{
                                                      "Deselect all": createSetSelected(false, () => this._selectedPropertyManager.selected)
                                                  }}/>
        };
    }


    private async updatePresets() {
        let presets = await Promise.all(this._presetController.getLocalstorage());
        this.setState({ presetsListItems: presets });
    }

    selectFilter(filter) {
        this.setState({selectedFilter: filter});
    }

    componentDidMount(): void {
        //FIXME find better way of getting initial data
        this._filterProvider.provideMany()
            .then(filters => Array.from(filters.values()))
            .then(filters => filters.filter(filter => filter.properties.length > 1))
            .then(filters => this.setState({filters: filters}));
        this.updatePresets();
    }

    /**
     * @summary creates method that sets selected state for list of properties
     *
     * @param {SelectedPropertyManager} isSelected state to set it to
     *
     * @return {function(boolean, function(): ESGFFilterPropertyDTO[]): function(): void} function that creates a
     *     function that sets selected state for properties
     */
    private createSetSelectedFactory = ({selectMany, deselectMany}) => (isSelected, propertyGetter) => () =>
        (isSelected ? selectMany : deselectMany)(propertyGetter());

    render() {
        let {_optionComponents: optionComponents, _searchFunctions: searchFunctions, _listItemFactories, sortFunctions} = this;
        let { filters, presetsListItems} = this.state;
        let {filters: filterListItemFactory, presets: presetsListItemFactory, properties: propertyListItemFactory, propertiesSelected: selectedPropertyListItemFactory} = _listItemFactories;

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

        let PresetList = <PageColumnListTab title={"Presets"}
                                            key={"PresetList"}
                                            items={presetsListItems}
                                            sortFunction={sortFunctions.filters}
                                            listItemFactory={presetsListItemFactory}
                                            isLoading={false}
                                            searchComponentModel={{
                                                searchMethod: searchFunctions.filters,
                                                headerButtons: [optionComponents.presets]
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

        let SelectedPropertyList = <PageColumnListTab title={"Properties"}
                                                      key={"SelectedPropertyList"}
                                                      items={this._selectedPropertyManager.selected}
                                                      sortFunction={sortFunctions.selectedProperties}
                                                      listItemFactory={selectedPropertyListItemFactory}
                                                      isLoading={false}
                                                      searchComponentModel={{
                                                          searchMethod: searchFunctions.properties,
                                                          headerButtons: [optionComponents.propertiesSelected]
                                                      }}/>;

        this.state.columns.get(ColumnPosition.Left).tabs.set("Filters", FilterList);
        this.state.columns.get(ColumnPosition.Left).tabs.set("Presets", PresetList);
        this.state.columns.get(ColumnPosition.Centre).tabs.set("Properties", PropertyList);
        this.state.columns.get(ColumnPosition.Right).tabs.set("Selected Properties", SelectedPropertyList);

        // let createSelectColumnTab = columnName => newTab => this.selectTab(columnName, newTab);

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