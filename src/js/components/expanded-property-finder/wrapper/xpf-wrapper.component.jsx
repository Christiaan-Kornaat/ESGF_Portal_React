import React, {Component} from "react";
import {ESGFFilterProvider} from "../../../providers/esgf-filter/esgf-filter.provider";
import {ESGFFilterList} from "../esgf-filter-list/esgf-filter-list.component";
import {ESGFPropertyList} from "../esgf-property-list/esgf-property-list.component";

export class XPFWrapper extends Component {
    render() {
        let items = (new ESGFFilterProvider()).provide();
        let properties = [
            "test",
            "test2",
        ];

        let selected_properties = [
            "test2"
        ];

        return (
            <section>
                <ESGFFilterList
                    title={"Filters"}
                    items={items}/>
                <ESGFPropertyList
                    title={"Properties"}
                    items={properties}/>
                <ESGFPropertyList
                    title={"Selected properties"}
                    items={selected_properties}/>
            </section>
        )
    }
}