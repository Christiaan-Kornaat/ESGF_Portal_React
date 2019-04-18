import React, {Component} from "react";
import XpfColumn from "../column/xpf-column.component";
import XpfColumnTab from "../column/xpf-column-tab.component";

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

    updateProperties() {
        this.setState(() => ({selectedProperties: this.selectedPropertyManager.getSelected()}));
    }

    render() {
        let {selectProperty, deselectProperty, filterProvider, state} = this;

        let items = filterProvider.provide(); //FIXME TEMP

        let {properties, selectedProperties} = state;

        let searchFunc = (query, items) => {
            return query == null || query.trim() === "" ? items : items.filter(({shortName: name}) => name.includes(query));
        };
        let searchPropertyFunc = (query, items) =>
            query == null || query.trim() === "" ? items : items.filter(property => property.includes(query));

        let filterListItemFactory = item =>
            <li className="filter"
                onClick={() => this.selectFilter(item)}>
                {item.shortName}
            </li>;

        let propertyListItemFactoryFactory = (onClick) => {
            return item =>
                <li className="property"
                    onClick={() => onClick(item)}>
                    {item}
                </li>;
        };

        let FilterList = <XpfColumnTab 
            searchFunction={searchFunc}
            items={items}
            listItemFactory={filterListItemFactory}
        />;

        let PropertyFilterList = <XpfColumnTab 
            searchFunction={searchPropertyFunc}
            items={properties}
            listItemFactory={propertyListItemFactoryFactory(selectProperty)}
        />;

        let SelectedPropertyFilterList = <XpfColumnTab 
            searchFunction={searchPropertyFunc}
            items={selectedProperties}
            listItemFactory={propertyListItemFactoryFactory(deselectProperty)}
        />;

        return (
            <section className='XPF-Wrapper'> 
                <XpfColumn className="Filters" tabs={{"Filters": FilterList, "Presets": FilterList}}/>
                <XpfColumn className="Properties" tabs={{"Properties": PropertyFilterList}}/>
                <XpfColumn className="SelectedProperties" tabs={{"Selected properties": SelectedPropertyFilterList}}/>
            </section>
        )
    }
}