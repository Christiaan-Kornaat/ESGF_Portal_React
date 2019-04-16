import React, {Component} from "react";
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

        {/* Replace bootstrap class with a refrence to scss class with extension to bootstrap */
        }
        let filterListItemFactory = item =>
            <li className="list-group-item"
                onClick={() => this.selectFilter(item)}>
                {item.shortName}
            </li>;

        {/* Replace bootstrap class with a refrence to scss class with extension to bootstrap */
        }
        let propertyListItemFactoryFactory = (onClick) => {
            return item =>
                <li className="list-group-item"
                    onClick={() => onClick(item)}>
                    {item}
                </li>;
        };

        let testObject = {Name: "Something"};

        return (
            <section className='XPF-Wrapper'>
                <XpfColumn className="QF"
                           tabs={{"Filters": testObject, "Presets": testObject}}
                           searchFunction={searchFunc}
                           items={items}
                           listItemFactory={filterListItemFactory}/>

                <XpfColumn className="XPF"
                           tabs={{"Properties": testObject}}
                           searchFunction={searchPropertyFunc}
                           items={properties}
                           listItemFactory={propertyListItemFactoryFactory(selectProperty)}/>

                <XpfColumn className="QFC"
                           tabs={{"Selected properties": testObject}}
                           searchFunction={searchPropertyFunc}
                           items={selectedProperties}
                           listItemFactory={propertyListItemFactoryFactory(deselectProperty)}/>
            </section>
        )
    }
}