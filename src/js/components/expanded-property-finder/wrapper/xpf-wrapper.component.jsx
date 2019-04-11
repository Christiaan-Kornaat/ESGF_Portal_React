import React, {Component} from "react";
import {ESGFFilterProvider} from "../../../providers/esgf-filter/esgf-filter.provider";
import {ESGFFilterList} from "../esgf-filter-list/esgf-filter-list.component";
import {ESGFPropertyList} from "../esgf-property-list/esgf-property-list.component";

export class XPFWrapper extends Component {


    constructor(props) {
        super(props)
        this.state = {
            selectedItem: null
        }
    }

    render() {

        let items = (new ESGFFilterProvider()).provide();
        let properties = [
            "test",
            "test2",
        ];

        let selected_properties = [
            "test2"
        ];

        let handleSelect = (item) => {
            this.state.selectedItem = item;

            console.log(this.state.selectedItem);
        };

        return (
            <section>
                <ESGFFilterList
                    title={"Filters"}
                    properties={items}/>
                <ESGFPropertyList
                    title={"Properties"}
                    properties={{
                        items: properties,
                        onSelect: handleSelect
                    }}/>
                <ESGFPropertyList
                    title={"Selected properties"}
                    properties={{
                        items: selected_properties,
                        onSelect: handleSelect
                    }}/>
            </section>
        )
    }
}