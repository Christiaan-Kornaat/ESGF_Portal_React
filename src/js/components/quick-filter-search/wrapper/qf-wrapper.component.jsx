import React, { Component } from "react";
import { QFMainPanel } from "../esgf-qfilter-main-panel/qf-main-panel.component";


export class QFWrapper extends Component {
    render() {
        return (
            <section className="qf-wrapper">
                <QFMainPanel/>
            </section>
        )
    }
}

