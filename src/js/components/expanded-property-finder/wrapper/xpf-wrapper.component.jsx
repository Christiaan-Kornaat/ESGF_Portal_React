import React, {Component} from "react";
import XpfColumnTab from "../column/xpf-column-tab.component";
import XpfColumn from "../column/xpf-column.component";

export default class XPFWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFilter: null,
            selectedProperties: [],
            properties: []
        };

        let {selectedPropertyManager: selectedManager, filterProvider} = props;

        this.filterProvider = filterProvider;
        this.selectedPropertyManager = selectedManager;


        this.updateProperties();

        this.selectFilter = this.selectFilter.bind(this);
        this.selectProperty = this.selectProperty.bind(this);
        this.deselectProperty = this.deselectProperty.bind(this);
        this.toggleProperty = this.toggleProperty.bind(this);
        this.isPropertySelected = this.isPropertySelected.bind(this);
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
     * @param {string}property
     */
    deselectProperty(property) {
        this.selectedPropertyManager.deselect(property);

        this.updateProperties();
    };

    toggleProperty(property) {
        let selectionAction = this.isPropertySelected(property) ?
            this.deselectProperty :
            this.selectProperty;

        selectionAction(property);
    }

    isPropertySelected(property) {
        return (this.state.selectedProperties.includes(property));
    }

    updateProperties() {
        this.setState(() => ({selectedProperties: this.selectedPropertyManager.getSelected()}));
    }

    render() {
        let {toggleProperty, deselectProperty, filterProvider, state} = this;

        let items = filterProvider.provide(); //FIXME TEMP

        let {properties, selectedProperties} = state;

        let isQueryValid = query => !(query == null || query.trim() === "");

        let searchFunctions = {
            filters: (query, items) => !isQueryValid(query) ?
                items.filter(({shortName}) => shortName.includes(query)) :
                items,
            properties: (query, items) => !isQueryValid(query) ?
                items.filter(property => property.includes(query)) :
                items
        };

        let filterListItemFactory = item =>
            <li className="filter"
                onClick={() => this.selectFilter(item)}>
                {item.shortName}
            </li>;

        let showPropertyInfo = console.log;

        let propertyListItemFactoryFactory = (onClick) => {
            return item => {
                let checked = this.isPropertySelected(item);

                return <li className="property">
                    <span className="name" 
                        onClick={() => onClick(item)}>
                        <input type={"checkbox"}
                               checked={checked}/> {item}
                    </span>
                    <span className={"icon-info"}
                          onClick={() => showPropertyInfo(item)}><i className="fas fa-info-circle"></i></span>
                </li>;
            };
        };

        let FilterList = <XpfColumnTab
            searchFunction={searchFunctions.filters}
            items={items}
            listItemFactory={filterListItemFactory}
        />;

        let PresetList = <XpfColumnTab
            searchFunction={searchFunctions.properties}
            items={items}
            listItemFactory={filterListItemFactory}
        />;

        let PropertyFilterList = <XpfColumnTab
            searchFunction={searchFunctions.properties}
            items={properties}
            listItemFactory={propertyListItemFactoryFactory(toggleProperty, "O")}
        />;

        let SelectedPropertyFilterList = <XpfColumnTab
            searchFunction={searchFunctions.properties}
            items={selectedProperties}
            listItemFactory={propertyListItemFactoryFactory(deselectProperty, "X")}
        />;

        return (
            <section className='XPF-Wrapper'>
                <XpfColumn className="Filters" tabs={{"Filters": FilterList, "Presets": PresetList}}/>
                <XpfColumn className="Properties" tabs={{"Properties": PropertyFilterList}}/>
                <XpfColumn className="SelectedProperties" tabs={{"Selected properties": SelectedPropertyFilterList}}/>
            </section>
        );
    }
}