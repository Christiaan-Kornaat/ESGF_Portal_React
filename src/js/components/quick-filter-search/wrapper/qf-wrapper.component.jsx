import React, { Component } from "react";
import { QFMainPanel } from "../esgf-qfilter-main-panel/qf-main-panel.component";


export class QFWrapper extends Component {
    constructor(props) {
        super(props);
        let { filterProvider } = props;
        this._filterProvider = filterProvider;
    }
    render() {
        return (
            <section className="qf-wrapper">
                <QFMainPanel filterProvider={this._filterProvider}/>
            </section>
        )
    }
}

