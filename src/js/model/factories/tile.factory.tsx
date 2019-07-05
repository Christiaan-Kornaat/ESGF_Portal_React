import React from "react";
import {QFFilterTileDTO} from "../dto/qf-filter-tile.dto";
import {Tiles} from "../../components/quick-filter-search/esgf-qfilter-tile/tiles.component";
import ListTile = Tiles.ListTile;
import IconTile = Tiles.IconTile;

export default class TileFactory {
    /**
     *
     *@summary Creates qf tile
     */
    createTile(QFFilterTileDTO: QFFilterTileDTO, listItemFactory: any): JSX.Element {
        let {properties, title, icon, color} = QFFilterTileDTO;

        return <ListTile key={QFFilterTileDTO.title}
                         listItemFactory={listItemFactory}
                         listItems={properties}
                         tileModel={{title, icon, style: {backgroundColor: color}}}/>;
    }

    /**
     *
     * @summary Creates an add new tile tile
     */
    createIconTile(QFFilterTileDTO: QFFilterTileDTO, onClick: any): JSX.Element {
        let {title, icon, color} = QFFilterTileDTO;

        return <IconTile key={QFFilterTileDTO.title}
                         onClick={onClick}
                         icon={QFFilterTileDTO.icon}
                         tileModel={{title, icon, style: {backgroundColor: color}}}/>;
    }
}