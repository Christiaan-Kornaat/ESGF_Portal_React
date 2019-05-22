import { Tile } from "../../components/quick-filter-search/esgf-qfilter-tile/qf-tile.component";
import React from "react";
import { QFFilterTileDTO } from "../dto/qf-filter-tile.dto";
import { IconTile } from "../../components/quick-filter-search/esgf-qfilter-tile/qf-icon-tile.component";

export default class TileFactory {
    /**
     *
    *@summary Creates qf tile
    */
    createTile(QFFilterTileDTO: QFFilterTileDTO, quickFilterListItemFactory: any): JSX.Element {
        return <Tile key={QFFilterTileDTO.title}
            listItemFactory={quickFilterListItemFactory}
            QFFilterTileDTO={QFFilterTileDTO}
        />
    }

    /**
     *
     * @summary Creates an add new tile tile
     */
    createIconTile(QFFilterTileDTO: QFFilterTileDTO, onClick: any): JSX.Element {
        return <IconTile key={QFFilterTileDTO.title}
            QFFilterTileDTO={QFFilterTileDTO}
            onClick={onClick}
        />
    }
}