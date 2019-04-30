import React, { Component } from "react";
import ESGFPropertyDTOFormatter from "../../../model/formatters/esgf-property-dto.formatter";
import StringFormatter from "../../../model/formatters/string.formatter";
import { QFTile } from "../esgf-qfilter-tile/qf-tile.component";
import { QFSidebar } from "../qf-sidebar/qfsidebar.component";

export class QFWrapper extends Component {
    constructor(props) {
        super(props);

        let { filterProvider, selectedPropertyManager: selectionManager, QuickSelectManager} = this.props;
        this._filterProvider = filterProvider;
        this._selectedPropertyManager = selectionManager;
        this._quickFilterManager = QuickSelectManager;

        this.state = {
            QFSidebarShow: false,
            qfTiles: this._quickFilterManager.TileInfo
        };

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

        let selectProperty = () => {
            this.togglePropertySelected(item);
        };

        return <li className="qf-property"
                   onClick={selectProperty}>
            <span className="name">
                <input type={"checkbox"}
                checked={isSelected(item)}/> {item}
            </span>
        </li>;
    };

    createTiles(){
        //<DEMO CODE>
        let {qfTiles} = this.state;

        if (qfTiles.length ===0) return [];

        const tiles = qfTiles.map(({ color, icon, title, properties }) => {
             properties = properties.sort().slice(0, 7).map(ESGFPropertyDTOFormatter.toHumanText);

             title = StringFormatter.toHumanText(title);

            return <QFTile
                listItemFactory={this.QuickFilterListItemFactory}
                title={title}
                color={color}
                icon={icon}
                properties={properties}
                page = "qf"/>
                }
        );
        //</DEMO CODE>

        return tiles;
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
