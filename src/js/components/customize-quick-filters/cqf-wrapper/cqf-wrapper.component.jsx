import React, { Component } from "react";
import { QFTile } from "../../quick-filter-search/esgf-qfilter-tile/qf-tile.component";

export class CQFWrapper extends Component {
    constructor(props) {
        super(props);

        let { filterProvider } = this.props;
        this._filterProvider = filterProvider;

        this.state = {
            filters: []
        }
    }

    QuickFilterListItemFactory(item) {
        return <li className="qf-property">
            <span className="name"
                onClick={() => onClick(item)}>
                <input type={"checkbox"}
                /> {item}
            </span>
        </li>;
    };

    createTiles() {
        let [item] = this.state.filters; 
        
        let items = item != null ? item.properties : [];
        let tilesInfo = [
            { title: "Temperature", color: "#f9a718", icon: "fas fa-thermometer-three-quarters", properties: items, type: "properties" },
            { title: "Wind", color: "#14fc61", icon: "fas fa-wind", properties: items, type: "properties" },
            { title: "Precipitation", color: "#dd14fc", icon: "fas fa-tint", properties: items, type: "properties" },
            { title: "Evaporation", color: "#f91634", icon: "fas fa-cloud-sun-rain", properties: items, type: "properties" },
            { title: "Radiation", color: "#24ccd8", icon: "fas fa-radiation", properties: items, type: "properties" },
            { title: "Add new", color: "#24ccd8", icon: "fas fa-plus-circle", properties: items, type: "add" }
        ];

        const tiles = tilesInfo.map(({ title, color, icon, properties, type }) =>
            <QFTile
                listItemFactory={this.QuickFilterListItemFactory}
                title={title}
                color={color}
                icon={icon}
                type={type}
                properties={properties}
                page="cqf" />
        );

        return tiles;
    }

    componentDidMount() {
        this._filterProvider.provide()
            .then(filters => this.setState({ filters: filters })); //FIXME TEMP
    }

    render() {
        const tiles = this.createTiles();

        return (
            <section className="cqf-wrapper">
                <div className="cqf-main-container">
                    <div className="tiles">
                        {tiles}
                    </div>
                </div>
            </section>
        );
    }
}
