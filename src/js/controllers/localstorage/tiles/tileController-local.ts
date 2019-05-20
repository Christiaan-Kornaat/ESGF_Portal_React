import { QFFilterTileDTO } from "../../../model/dto/qf-filter-tile.dto";
import { QFTileConverter } from "../../../data/converters/qf-tile-converter";
import { ESGFFilterProvider } from "../../../data/providers/esgf-filter/esgf-filter.provider";

export class QFTileController {
    private readonly _defaultTiles;
    private converter: QFTileConverter;
    
    constructor(filterProvider: ESGFFilterProvider) {
        this.converter = new QFTileConverter(filterProvider);
    }

    getTiles(): QFFilterTileDTO[]{
        // TODO enable if default times is defined 
        // if (!this.isTilesSet()){
        //     this.setTiles(this._defaultTiles);
        // }
        let tiles = JSON.parse(localStorage.getItem("tiles"));
        let tileObjects = tiles.map(this.converter.fromJSONObject);
        return tileObjects;
    }

    setTiles(tiles: QFFilterTileDTO[]){
        let tileObjects = tiles.map(this.converter.toJSONObject);

        let tilesString = JSON.stringify(tileObjects);
        localStorage.setItem("tiles", tilesString);
    }

    isTilesSet(): boolean{
        return localStorage.getItem("tiles")? true : false;
    }
}