import React, { Component } from "react";
import { QFTile } from "../esgf-qfilter-tile/qf-tile.component";
import { QFSidebar } from "../qf-sidebar/qfsidebar.component";

export class QFWrapper extends Component {
    constructor(props) {
        super(props);

        let { filterProvider, selectedPropertyManager: selectionManager, QuickSelectManager} = this.props;
        this._filterProvider = filterProvider;
        this._selectedPropertyManager = selectionManager;
        this._QuickSelectManager = QuickSelectManager;

        this.state = {
            QFSidebarShow: false,
            filters: [],
            tilesInfo: []
        }

        this.togglePropertySelected = this.togglePropertySelected.bind(this);
        this.QuickFilterListItemFactory = this.QuickFilterListItemFactory.bind(this);
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
    }

    openNav(){
        this.setState({ QFSidebarShow: true });
    }

    closeNav(){
        this.setState({ QFSidebarShow: false });
    }

    /**
     *
     * @param {ESGFFilterProperty} property
     */
    togglePropertySelected(property) {
        let {select, deselect, isSelected} = this._selectedPropertyManager;

        (isSelected(property) ? deselect : select)(property);

        this.forceUpdate();
    }

    /**
     *
     * @param item
     * @return {Component}
     * @constructor
     */
    QuickFilterListItemFactory(item) {
        let {isSelected} = this._selectedPropertyManager;

        let selectProperty = () => this.togglePropertySelected(item);

        return <li className="qf-property"
                   onClick={selectProperty}>
            <span className="name">
                <input type={"checkbox"}
                checked={isSelected(item)}
                onChange={selectProperty}/> {item}
            </span>
        </li>;
    };

    createTiles(){
        let tilesInfo = [
            { title: "Temperature", color: "#f9a718", icon: "fas fa-thermometer-three-quarters", properties: items, type: "properties" },
            { title: "Wind", color: "#14fc61", icon: "fas fa-wind", properties: items, type: "properties" },
            { title: "Precipitation", color: "#dd14fc", icon: "fas fa-tint", properties: items, type: "properties" },
            { title: "Evaporation", color: "#f91634", icon: "fas fa-cloud-sun-rain", properties: items, type: "properties" },
            { title: "Radiation", color: "#24ccd8", icon: "fas fa-radiation", properties: items, type: "properties" }
        ];

        this.state.tilesInfo = tilesInfo;

        const tiles = this.state.tilesInfo.map(({ title, color, icon, properties }) =>
            <QFTile
                listItemFactory={this.QuickFilterListItemFactory}
                title={title}
                color={color}
                icon={icon}
                properties={properties}
                />
        );

        return tiles;
    }

    componentDidMount() {
        this._filterProvider.provide()
            .then(filters => this.setState({ filters: filters })); //FIXME TEMP
    }

    render() {
        let { QFSidebarShow } = this.state;

        const tiles = this.createTiles();

        return (
            <section className="qf-wrapper">
                { QFSidebarShow? (
                     <QFSidebar close={this.closeNav}/>
                ): ""}
                <div className="button-open-presets" onClick={this.openNav}>&#9776; Presets</div>
                <div className="qf-main-container">
                    <div className="tiles">
                        {tiles}
                    </div>
                </div>
            </section>
        );
    }
}
