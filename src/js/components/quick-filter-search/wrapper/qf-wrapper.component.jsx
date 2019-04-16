import React, { Component } from "react";
import { QFMainPanel } from "../esgf-qfilter-main-panel/qf-main-panel.component";
import { QFTile } from "../esgf-qfilter-tile/qf-tile.component";
import { Testing } from "../../expending-side-test/testing.component";

export class QFWrapper extends Component {
    constructor(props) {
        super(props);
        let { filterProvider } = props;
        this._filterProvider = filterProvider;
    }
    render() {
        let items = this._filterProvider.provide();

        return (
            
            <section className="qf-wrapper">
                <div className="qf-main-container container">
                    <Testing />
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
                            icon={"fas fa-tint"} å
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
            </section>
        )
    }
}

