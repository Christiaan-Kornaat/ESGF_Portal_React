import React, { Component } from "react";
import { ESGFFilterProvider } from "../../../providers/esgf-filter/esgf-filter.provider";
import { QFTile } from "../esgf-qfilter-tile/qf-tile.component";

export class QFMainPanel extends Component {
    render() {
        let items = (new ESGFFilterProvider()).provide();

        return (
            <div id="qf-main-panel">
                <QFTile
                    title={"Filters"}
                    properties={items} />
            </div>
        )
    }
}