import React, { Component } from "react";
import StringFormatter from "../../../model/formatters/string.formatter";
import InfoTabVM from "../../../model/view-model/InfoTabVM";
import ESGFFilterSearcher from "../../../searchers/esgf-filter.searcher";
import ESGFPropertySearcher from "../../../searchers/esgf-property.searcher";
import { filterComparator, propertyComparator } from "../../../sorters/comparators/esgf.comparator";
import { alphabeticalComparator } from "../../../sorters/comparators/primitive.comparator";
import { SorterFactoryFactory } from "../../../sorters/sorter.factory.factory";
import SorterManager from "../../../sorters/sorter.manager";
import Buttons from "../../shared/buttons/buttons.component";
import XpfColumnTabInfoContent from "../column/xpf-column-tab-info-content.component";
import XpfColumnTabListContent from "../column/xpf-column-tab-list-content.component";

import XpfColumn from "../column/xpf-column.component";
import OptionsComponent from "./xpf-list-options.component";

export default class XPFWrapper extends Component {
    constructor(props) {
        super(props);

        let { selectedPropertyManager, filterProvider } = props;

        let sorterFactoryFactory = new SorterFactoryFactory();
        let createSortState = (key, defaultAscending, comparator) => [
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
        let sortState = new Map([
            createSortState("filters", true, filterComparator),
            createSortState("presets", true, alphabeticalComparator/*FIXME TEMP*/),
            createSortState("properties", true, propertyComparator),
            createSortState("properties-selected", true, propertyComparator)
        ]);

        this.state = {
            selectedFilter: null,
            infoTabs: [],
            selectedTabs: { filterColumn: null, propertyColumn: null, selectedColumn: null },
            sortState: sortState,
            columnState: {},
            filters: []
        };

        this.filterProvider = filterProvider;
        /** @type SelectedPropertyManager */
        this.selectedPropertyManager = selectedPropertyManager;

        this.update = this.update.bind(this);
        this.selectTab = this.selectTab.bind(this);
        this.selectFilter = this.selectFilter.bind(this);
        this.toggleProperty = this.toggleProperty.bind(this);
        this.showPropertyInfo = this.showPropertyInfo.bind(this);
        this.addInfoTab = this.addInfoTab.bind(this);
        this.removeInfoTab = this.removeInfoTab.bind(this);
        this.getSelectedFilterProperties = this.getSelectedFilterProperties.bind(this);
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
     *
     * @param {ESGFFilterPropertyDTO} property
     */
    toggleProperty(property) {
        let { select, deselect, isSelected } = this.selectedPropertyManager;

        (isSelected(property) ? deselect : select)(property);
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
     *
     * @param {InfoTabVM} viewModel
     */
    removeInfoTab(viewModel) {
        let { state, setState } = this;

        let infoTabs = state.infoTabs.filter(tab => tab.title !== viewModel.textTitle);

        setState({ infoTabs: infoTabs });
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

    getSelectedFilterProperties() {
        return (this.state.selectedFilter) ? this.state.selectedFilter.properties : [];
    }

    render() {
        let {
            selectFilter, toggleProperty, selectTab, showPropertyInfo,
            selectedPropertyManager: selectedManager,
            state: { sortState, infoTabs, selectedTabs, filters, selectedFilter }
        } = this;

        let filtersLoading = !this.filterProvider.hasFilters;
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

            let onInfoClick = event => {
                event.stopPropagation();
                new Promise((resolve) => resolve(showPropertyInfo(item)))
                    .then(() => this.selectTab("selectedColumn", "Info"));
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
            items={filters.filter(item => item.properties.length > 1)}
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
            listItemFactory={propertyListItemFactoryFactory(toggleProperty)} />;

        let SelectedPropertyList = <XpfColumnTabListContent searchFunction={searchFunctions.properties}
            key={"SelectedPropertyList"}
            items={selectedProperties}
            headerButtons={[optionComponents.propertiesSelected]}
            listItemFactory={propertyListItemFactoryFactory(selectedManager.deselect)} />;

        let infoTab = Object.values(infoTabs)
            .pop();

        let propertyTabs = infoTab != null ? { "Info": <XpfColumnTabInfoContent key={"info"} model={infoTab.content} /> } : {};
        propertyTabs["Selected properties"] = SelectedPropertyList;

        let createClearSelected = columnName => newTab => selectTab(columnName, newTab);

        return (
            <section className='XPF-Wrapper'>
                <XpfColumn className="Filters"
                    key={"Filters"}
                    tabs={{ "Filters": FilterList, "Presets": PresetList }}
                    activeTab={selectedTabs.filterColumn}
                    onSelect={createClearSelected("filterColumn")} />
                <XpfColumn className="Properties"
                    key={"Properties"}
                    tabs={{ "Properties": PropertyList }}
                    activeTab={selectedTabs.propertyColumn}
                    onSelect={createClearSelected("propertyColumn")} />
                <XpfColumn className="SelectedProperties"
                    key={"SelectedProperties"}
                    tabs={propertyTabs}
                    activeTab={selectedTabs.selectedColumn}
                    onSelect={createClearSelected("selectedColumn")} />
            </section>
        );
    }
}