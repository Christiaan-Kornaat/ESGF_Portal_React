import React, {Component} from "react";
import XpfColumn from "../column/xpf-column";

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
        let selectProperty = this.selectProperty;
        let deselectProperty = this.deselectProperty;

        let items = this.filterProvider.provide(); //FIXME TEMP


        let {properties, selectedProperties} = this.state;

        let searchFunc = (query, items) => {

            return query == null || query.trim() === "" ? items : items.filter(({shortName: name}) => name.includes(query));
        };
        let searchPropertyFunc = (query, items) =>
            query == null || query.trim() === "" ? items : items.filter((property) => property.includes(query));

        let filterListItemFactory = item => <li className="list-group-item">{item.shortName}</li>;

        let propertyListItemFactoryFactory = (onClick) => {
            return item =>
                <li className="list-group-item"
                    onClick={() => onClick(item)}>
                    {item}
                </li>;
        };

        return (
            <section className='row'>
                <XpfColumn className="col-sm border-right border-left"
                           tabs={["Filters"]}
                           searchFunction={searchFunc}
                           items={items}
                           listItemFactory={filterListItemFactory}/>

                <XpfColumn className="col-sm border-right border-left"
                           tabs={["Properties"]}
                           searchFunction={searchPropertyFunc}
                           items={properties}
                           listItemFactory={propertyListItemFactoryFactory(selectProperty)}/>

                <XpfColumn className="col-sm border-right border-left"
                           tabs={["Selected properties"]}
                           searchFunction={searchPropertyFunc}
                           items={selectedProperties}
                           listItemFactory={propertyListItemFactoryFactory(deselectProperty)}/>
            </section>
        )
    }
}