import React, {Component} from "react";
import XpfColumn from "../column/xpf-column.component";

export default class XPFWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedProperties: [],
            properties: [
                "test",
                "test2"
            ]
        };

        this.filterProvider = props.filterProvider;

        this.selectProperty = this.selectProperty.bind(this);
        this.deselectProperty = this.deselectProperty.bind(this);
    }

    selectProperty(property) {
        if (this.state.selectedProperties.includes(property)) return;

        let selectedProperties = this.state.selectedProperties.concat(property);

        this.setState(() => ({selectedProperties: selectedProperties}));
    };

    deselectProperty(property) {
        if (!this.state.selectedProperties.includes(property)) return;

        let selectedProperties = this.state.selectedProperties.filter(item => item !== property);

        this.setState(() => ({selectedProperties: selectedProperties}));
    };

    render() {
        let {selectProperty, deselectProperty} = this;

        let items = this.filterProvider.provide(); //FIXME TEMP

        let {properties, selectedProperties} = this.state;

        let searchFunc = (query, items) => {
            return query == null || query.trim() === "" ? items : items.filter(({shortName: name}) => name.includes(query));
        };
        let searchPropertyFunc = (query, items) =>
            query == null || query.trim() === "" ? items : items.filter(property => property.includes(query));

            {/* Replace bootstrap class with a refrence to scss class with extension to bootstrap */}
        let filterListItemFactory = item => <li className="list-group-item">{item.shortName}</li>;

            {/* Replace bootstrap class with a refrence to scss class with extension to bootstrap */}
        let propertyListItemFactoryFactory = (onClick) => {
            return item =>
                <li className="list-group-item"
                    onClick={() => onClick(item)}>
                    {item}
                </li>;
        };

        let testObject = { Name: "Something" };

        return (
            <section className='XPF-Wrapper'>
                <XpfColumn className="QF"
                           tabs={ { "Filters": testObject, "Presets": testObject } }
                           searchFunction={searchFunc}
                           items={items}
                           listItemFactory={filterListItemFactory}/>

                <XpfColumn className="XPF"
                           tabs={ { "Properties": testObject } }
                           searchFunction={searchPropertyFunc}
                           items={properties}
                           listItemFactory={propertyListItemFactoryFactory(selectProperty)}/>

                <XpfColumn className="QFC"
                           tabs={ { "Selected properties": testObject } }
                           searchFunction={searchPropertyFunc}
                           items={selectedProperties}
                           listItemFactory={propertyListItemFactoryFactory(deselectProperty)}/>
            </section>
        )
    }
}