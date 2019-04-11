import React, { Component } from "react";
import { ESGFFilterProvider } from "../../../providers/esgf-filter/esgf-filter.provider";
import { QFTile } from "../esgf-qfilter-tile/qf-tile.component";

export class QFMainPanel extends Component {
    render() {
        let items = (new ESGFFilterProvider()).provide();

        return (
            <div className="qf-main-container container">
                <div className="d">
                    <QFTile
                        title={"Temperature"}
                        color={"#f9a718"}
                        icon={"fas fa-thermometer-three-quarters"}
                        properties={items} />
                    <QFTile
                        title={"Precipitation"}
                        color={"#14fc61"}
                        icon={"fas fa-wind"}
                        properties={items} />
                    <QFTile
                        title={"Wind"}
                        color={"#dd14fc"}
                        icon={"fas fa-tint"}
                        properties={items} />
                    <QFTile
                        title={"Evaporation"}
                        color={"#f91634"}
                        icon={"fas fa-cloud-sun-rain"}
                        properties={items} />
                    <QFTile
                        title={"Radiation"}
                        color={"#24ccd8"}
                        icon={"fas fa-radiation"}
                        properties={items} />         
                </div>
            </div>
        )
    }
}