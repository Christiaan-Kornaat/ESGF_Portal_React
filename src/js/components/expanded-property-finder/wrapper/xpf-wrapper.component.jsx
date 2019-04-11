import React, {Component} from "react";
import {ESGFFilterProvider} from "../../../providers/esgf-filter/esgf-filter.provider";
import {ESGFFilterList} from "../esgf-filter-list/esgf-filter-list.component";
import {ESGFPropertyList} from "../esgf-property-list/esgf-property-list.component";

export class XPFWrapper extends Component {


    constructor(props) {
        super(props);

        this.state = {
            selectedProperties: [],
        };

        this.selectProperty = this.selectProperty.bind(this);
    }

    selectProperty(item) {
        if (this.state.selectedProperties.includes(item)) return;

        let selectedProperties = this.state.selectedProperties.concat(item);

        this.setState(() => ({selectedProperties: selectedProperties}));
    };

    render() {

        let items = (new ESGFFilterProvider()).provide();
        let properties = [
            "test",
            "test2",
        ];

        let selectProperty = this.selectProperty;

        let selectedProperties = this.state.selectedProperties;

        return (
            <section class="row">
                <ESGFFilterList
                    title={"Filters"}
                    properties={items}/>
                <ESGFPropertyList
                    title={"Properties"}
                    properties={{
                        items: properties,
                        onSelect: selectProperty
                    }}/>
                <ESGFPropertyList
                    title={"Selected properties"}
                    properties={{
                        items: selectedProperties,
                        onSelect: selectProperty
                    }}/>
            </section>
        )
    }
}