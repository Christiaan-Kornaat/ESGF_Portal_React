import React, {Component} from "react";
import {ESGFFilterProvider} from "../../../providers/esgf-filter/esgf-filter.provider";

export class ESGFFilterList extends Component {
    render() {
        let items = (new ESGFFilterProvider()).provide().map(item =>
            <li>{item.shortName} ({item.itemCount})</li>
        );

        return (
            <ul>{items}</ul>
        )
    }
}