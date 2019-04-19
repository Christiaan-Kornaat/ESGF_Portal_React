import React, { Component } from "react";
import { QFTile } from "../esgf-qfilter-tile/qf-tile.component";
import { QFSidebar } from "../qf-sidebar/qfsidebar.component";

export class QFWrapper extends Component {
    constructor(props) {
        super(props);
        let { filterProvider } = props;
        this._filterProvider = filterProvider;
        
    }
    render() {
        let items = this._filterProvider.provide();
        let tilesInfo = [
            { title: 'Temperature', color: '#f9a718', icon: 'fas fa-thermometer-three-quarters', properties: items },
            { title: 'Wind', color: '#14fc61', icon: 'fas fa-wind', properties: items },
            { title: 'Precipitation', color: '#dd14fc', icon: 'fas fa-tint', properties: items },
            { title: 'Evaporation', color: '#f91634', icon: 'fas fa-cloud-sun-rain', properties: items },
            { title: 'Radiation', color: '#24ccd8', icon: 'fas fa-radiation', properties: items },
        ]
        const tiles = tilesInfo.map(({title, color, icon, properties}) =>
            <QFTile
                title={title}
                color={color}
                icon={icon}
                properties={properties} />
        );

        return (
            <section className="qf-wrapper">
                <QFSidebar/>
                <div style={{ fontSize: 20, cursor: "pointer" }} onClick={this.openNav}>&#9776; Presets</div>
                <div className="qf-main-container container">
                    <div className="tiles">    
                        {tiles} 
                    </div>
                </div>
            </section>
        )
    }
}


