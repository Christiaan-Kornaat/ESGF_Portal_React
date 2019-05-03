import React, {Component} from "react";
import StringFormatter from "../../../model/formatters/string.formatter";
import InfoTabVM from "../../../model/view-model/InfoTabVM";
import ESGFFilterSearcher from "../../../searchers/esgf-filter.searcher";
import ESGFPropertySearcher from "../../../searchers/esgf-property.searcher";
import {filterComparator, propertyComparator} from "../../../sorters/comparators/esgf.comparator";
import {alphabeticalComparator} from "../../../sorters/comparators/primitive.comparator";
import {SorterFactoryFactory} from "../../../sorters/sorter.factory.factory";
import SorterManager from "../../../sorters/sorter.manager";
import Buttons from "../../shared/buttons/buttons.component";
import XpfColumnTabInfoContent from "../column/xpf-column-tab-info-content.component";
import XpfColumnTabListContent from "../column/xpf-column-tab-list-content.component";

import XpfColumn from "../column/xpf-column.component";
import OptionsComponent from "./xpf-list-options.component";

export default class XPFWrapper extends Component {
    constructor(props) {
        super(props);

        let {selectedPropertyManager, filterProvider} = props;

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
            selectedTabs: {filterColumn: null, propertyColumn: null, selectedColumn: null},
            sortState: sortState,
            columnState: {},
            filters: []
        };

        this.filterProvider = filterProvider;
        this.selectedPropertyManager = selectedPropertyManager;

        this.selectTab = this.selectTab.bind(this);
        this.selectFilter = this.selectFilter.bind(this);
        this.selectProperty = this.selectProperty.bind(this);
        this.selectManyProperties = this.selectManyProperties.bind(this);
        this.deselectProperty = this.deselectProperty.bind(this);
        this.deselectManyProperties = this.deselectManyProperties.bind(this);
        this.toggleProperty = this.toggleProperty.bind(this);
        this.isPropertySelected = this.isPropertySelected.bind(this);
        this.showPropertyInfo = this.showPropertyInfo.bind(this);
        this.addInfoTab = this.addInfoTab.bind(this);
        this.removeInfoTab = this.removeInfoTab.bind(this);
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
     *
     * @param {string}property
     */
    selectProperty(property) {
        this.selectedPropertyManager.select(property);

        this.update();
    };

    /**
     *
     * @param {array} properties
     */
    selectManyProperties(properties) {
        this.selectedPropertyManager.selectMany(properties);

        this.update();
    }

    /**
     *
     * @param {string}property
     */
    deselectProperty(property) {
        this.selectedPropertyManager.deselect(property);

        this.update();
    };

    /**
     *
     * @param {array} properties
     */
    deselectManyProperties(properties) {
        this.selectedPropertyManager.deselectMany(properties);

        this.update();
    }

    /**
     *
     * @param {ESGFFilterPropertyDTO} property
     */
    toggleProperty(property) {
        let selectionAction = this.isPropertySelected(property) ?
            this.deselectProperty :
            this.selectProperty;

        selectionAction(property);
    }

    /**
     *
     * @param {ESGFFilterPropertyDTO} property
     * @returns {boolean}
     */
    isPropertySelected(property) {
        return this.selectedPropertyManager.isSelected(property);
    }

    update() {
        this.forceUpdate();
    }

    componentDidMount() {
        this.filterProvider.provideMany()
            .then(filters => this.setState({filters: Array.from(filters.values())}));
    }

    /**
     * Temp content
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
     *
     * @param {InfoTabVM} viewModel
     */
    removeInfoTab(viewModel) {
        let {state, setState} = this;

        let infoTabs = state.infoTabs.filter(tab => tab.title !== viewModel.textTitle);

        setState({infoTabs: infoTabs});
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

    render() {
        let {selectFilter, toggleProperty, deselectProperty, selectTab, showPropertyInfo, selectedPropertyManager, selectManyProperties, deselectManyProperties, state: {sortState, infoTabs, selectedTabs, filters, selectedFilter}} = this;

        let filtersLoading = !this.filterProvider.ready;
        let properties = selectedFilter ? selectedFilter.properties : [];
        let selectedProperties = selectedPropertyManager.selected;
        let searchFunctions = {
            filters: (new ESGFFilterSearcher()).search,
            properties: new ESGFPropertySearcher().search
        };

        let SelectedPropertyListButtons = {"Deselect all": deselectManyProperties};

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

            let checked = this.isPropertySelected(item);

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
                           checked={checked}/>
                    <span className={"icon-info"}
                          onClick={onInfoClick}>
                            <i className="fas fa-info-circle"/>
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

        let createSortButton = (columnName) => <Buttons.Sort title={"Sort A-Z"}
                                                             onToggle={createInvertSort(columnName)}/>;

        let optionComponents = {
            filters: <OptionsComponent sortButtons={[createSortButton("filters")]}/>,
            presets: <OptionsComponent sortButtons={[createSortButton("presets")]}/>,
            properties: <OptionsComponent sortButtons={[createSortButton("properties")]}
                                          optionButtons={{
                                              "Select all": selectManyProperties,
                                              "Deselect all": deselectManyProperties
                                          }}/>,
            propertiesSelected: <OptionsComponent sortButtons={[createSortButton("selected-properties")]}
                                                  optionButtons={{
                                                      "Deselect all": deselectManyProperties
                                                  }}/>
        };


        let FilterList = <XpfColumnTabListContent searchFunction={searchFunctions.filters}
                                                  items={filters}
                                                  sortFunction={sortFunctions.filters}
                                                  headerButtons={[optionComponents.filters]}
                                                  isLoading={filtersLoading}
                                                  listItemFactory={filterFactory}/>;

        let PresetList = <XpfColumnTabListContent searchFunction={searchFunctions.filters}
                                                  items={[]}
                                                  sortFunction={sortFunctions.filters}
                                                  headerButtons={[optionComponents.presets]}
                                                  isLoading={filtersLoading}
                                                  listItemFactory={filterFactory}/>;

        let PropertyList = <XpfColumnTabListContent searchFunction={searchFunctions.properties}
                                                    items={properties}
                                                    headerButtons={[optionComponents.properties]}
                                                    sortFunction={sortFunctions.properties}
                                                    listItemFactory={propertyListItemFactoryFactory(toggleProperty)}/>;

        let SelectedPropertyList = <XpfColumnTabListContent searchFunction={searchFunctions.properties}
                                                            items={selectedProperties}
                                                            headerButtons={[optionComponents.propertiesSelected]}
                                                            optionButtons={SelectedPropertyListButtons}
                                                            listItemFactory={propertyListItemFactoryFactory(deselectProperty)}/>;

        let infoTab = Object.values(infoTabs)
                            .pop();

        let propertyTabs = infoTab != null ? {"Info": <XpfColumnTabInfoContent model={infoTab.content}/>} : {};
        propertyTabs["Selected properties"] = SelectedPropertyList;

        let createClearSelected = columnName => newTab => selectTab(columnName, newTab);

        return (
            <section className='XPF-Wrapper'>
                <XpfColumn className="Filters"
                           tabs={{"Filters": FilterList, "Presets": PresetList}}
                           activeTab={selectedTabs.filterColumn}
                           onSelect={createClearSelected("filterColumn")}/>
                <XpfColumn className="Properties"
                           tabs={{"Properties": PropertyList}}
                           activeTab={selectedTabs.propertyColumn}
                           onSelect={createClearSelected("propertyColumn")}/>
                <XpfColumn className="SelectedProperties"
                           tabs={propertyTabs}
                           activeTab={selectedTabs.selectedColumn}
                           onSelect={createClearSelected("selectedColumn")}/>
            </section>
        );
    }
}