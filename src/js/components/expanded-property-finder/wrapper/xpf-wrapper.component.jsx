import React, {Component} from "react";
import StringFormatter from "../../../model/formatters/string.formatter";
import InfoTabVM from "../../../model/view-model/InfoTabVM";
import ESGFFilterSearcher from "../../../searchers/esgf-filter.searcher";
import ESGFPropertySearcher from "../../../searchers/esgf-property.searcher";
import XpfColumnTabInfoContent from "../column/xpf-column-tab-info-content.component";
import XpfColumnTabListContent from "../column/xpf-column-tab-list-content.component";

import XpfColumn from "../column/xpf-column.component";

export default class XPFWrapper extends Component {
    constructor(props) {
        super(props);

        let {selectedPropertyManager, filterProvider} = props;

        this.state = {
            selectedFilter: null,
            selectedProperties: selectedPropertyManager.selected,
            properties: [],
            infoTabs: [],
            selectedTabs: {
                filterColumn: null,
                propertyColumn: null,
                selectedColumn: null
            },
            filters: [],
            filtersLoading: true,
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

        this.setState(() => ({properties: filter.properties}));
    }

    /**
     *
     * @param {string}property
     */
    selectProperty(property) {
        this.selectedPropertyManager.select(property);

        this.updateProperties();
    };

    /**
     * 
     * @param {array} properties 
     */
    selectManyProperties(properties){
        this.selectedPropertyManager.selectMany(properties);

        this.updateProperties();
    }

    /**
     *
     * @param {string}property
     */
    deselectProperty(property) {
        this.selectedPropertyManager.deselect(property);

        this.updateProperties();
    };

    /**
     * 
     * @param {array} properties 
     */
    deselectManyProperties(properties){
        this.selectedPropertyManager.deselectMany(properties);

        this.updateProperties();
    }

    /**
     * 
     * @param {string} property 
     */
    toggleProperty(property) {
        let selectionAction = this.isPropertySelected(property) ?
            this.deselectProperty :
            this.selectProperty;

        selectionAction(property);
    }

    /**
     * 
     * @param {string} property 
     * @returns {boolean}
     */
    isPropertySelected(property) {
        return (this.selectedPropertyManager.selected.includes(property));
    }

    updateProperties() {
        this.setState(() => ({selectedProperties: this.selectedPropertyManager.selected}));
    }

    componentDidMount() {
        this.filterProvider.provide()
            .then(filters => this.setState({filters: filters, filtersLoading: false})); //FIXME TEMP

        this.updateProperties();
    }

    /**
     * Temp content
     * @param {string} property 
     */
    showPropertyInfo(property) {
        this.addInfoTab({
            title: property,
            paragraphs: {
                "Paragraph 1!": "Lorem ipsum",
                "Paragraph 2!": "In enim justo"
            }
        });
    }

    /**
     * 
     * @param {viewModel} viewModel 
     */
    addInfoTab({title, paragraphs}) {
        let infoTabs = this.state.infoTabs.concat(new InfoTabVM("Info", title, paragraphs));

        this.setState({infoTabs: infoTabs});
    }

    /**
     * 
     * @param {viewModel} viewModel 
     */
    removeInfoTab(viewModel) {
        let {state, setState} = this;

        let infoTabs = state.infoTabs.filter(tab => tab.title !== viewModel.title);

        setState({infoTabs: infoTabs});
    }

    /**
     * 
     * @param {string} columnName 
     * @param {string} tabName 
     */
    selectTab(columnName, tabName) {
        let {state: {selectedTabs}} = this;

        selectedTabs[columnName] = tabName;

        this.setState({selectedTabs});
    }

    render() {
        let {selectFilter, toggleProperty, deselectProperty, state, selectTab, showPropertyInfo, selectedPropertyManager, selectManyProperties, deselectManyProperties} = this;

        let {properties, infoTabs, selectedTabs, filters, filtersLoading} = state;

        let selectedProperties = selectedPropertyManager.selected;

        let searchFunctions = {
            filters: (new ESGFFilterSearcher()).search,
            properties: new ESGFPropertySearcher().search
        };

        let sortFunction = (array => array.sort(({ shortName: item1 }, { shortName: item2 }) => (item1 !== item2) ?
        ((item1 > item2) ? 1 : -1) :
        0));

        let PropertyListButtons = { "Select all": selectManyProperties, "Deselect all": deselectManyProperties };

        let SelectedPropertyListButtons = { "Deselect all": deselectManyProperties };

        let filterFactory = property =>
            <li key={property.shortName}
                className="filter"
                onClick={() => selectFilter(property)}>
                {StringFormatter.toHumanText(property.shortName)}
            </li>;

        let propertyListItemFactoryFactory = (onClick) =>
            item => {
                let name = StringFormatter.toHumanText(item);

                let checked = this.isPropertySelected(item);

                let onChange = () => onClick(item);

                let onInfoClick = event => {
                    event.stopPropagation();
                    new Promise((resolve) => resolve(showPropertyInfo(item)))
                        .then(() => this.selectTab("selectedColumn", "Info"));
                };

                return (
                    <li key={name}
                        className={checked ? "selected property" : "property" }
                        onClick={onChange}>
                        <input className={"checkbox"}
                               type={"checkbox"}
                               onChange={() => {}} //prevents error message
                               checked={checked}/> 
                               {name}
                        <span className={"icon-info"}
                              onClick={onInfoClick}>
                            <i className="fas fa-info-circle"></i>
                        </span>
                    </li>
                    );
            };

        let FilterList = <XpfColumnTabListContent searchFunction={searchFunctions.filters}
                                                  items={filters}
                                                  sortFunction={sortFunction}
                                                  isLoading={filtersLoading}
                                                  listItemFactory={filterFactory}/>;

        let PresetList = <XpfColumnTabListContent searchFunction={searchFunctions.filters}
                                                  items={filters}
                                                  sortFunction={sortFunction}
                                                  isLoading={filtersLoading}
                                                  listItemFactory={filterFactory}/>;

        let PropertyList = <XpfColumnTabListContent searchFunction={searchFunctions.properties}
                                                    items={properties}
                                                    sortFunction={sortFunction}
                                                    optionButtons={PropertyListButtons}
                                                    listItemFactory={propertyListItemFactoryFactory(toggleProperty)}/>;
                                                    
        let SelectedPropertyList = <XpfColumnTabListContent searchFunction={searchFunctions.properties}
                                                            items={selectedProperties}
                                                            optionButtons={SelectedPropertyListButtons}
                                                            listItemFactory={propertyListItemFactoryFactory(deselectProperty)}/>;

        let infoTab = Object.values(infoTabs).pop();

        let propertyTabs = infoTab != null ? { "Info" : <XpfColumnTabInfoContent model={infoTab.content}/>} : {};
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