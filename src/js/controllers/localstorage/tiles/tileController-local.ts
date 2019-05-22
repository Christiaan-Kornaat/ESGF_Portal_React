import {QFFilterTileDTO} from "../../../model/dto/qf-filter-tile.dto";
import {QFTileConverter} from "../../../data/converters/qf-tile-converter";
import {ESGFFilterProvider} from "../../../data/providers/esgf-filter/esgf-filter.provider";

export class QFTileController {
    private readonly _defaultTiles: any;
    private converter: QFTileConverter;
    private readonly storageKey: string;

    constructor(filterProvider: ESGFFilterProvider) {
        this.converter = new QFTileConverter(filterProvider);
        this.storageKey = "ESGFQFStorage";
        this._defaultTiles = [
            {
                "colour": "#f9a718",
                "icon": "fas fa-thermometer-three-quarters",
                "title": "Temperature",
                "properties": [
                    {"name": "tas", "esgfFilterName": "variable"},
                    {"name": "tasmin", "esgfFilterName": "variable"},
                    {"name": "tasmax", "esgfFilterName": "variable"},
                    {"name": "ta", "esgfFilterName": "variable"}
                ]
            },
            {
                "colour": "#00a8ec",
                "icon": "fas fa-cloud-showers-heavy",
                "title": "Precipitation",
                "properties": [
                    {"name": "pr", "esgfFilterName": "variable"},
                    {"name": "prc", "esgfFilterName": "variable"},
                    {"name": "prsn", "esgfFilterName": "variable"}
                ]
            },
            {
                "colour": "#4CAF50",
                "icon": "fas fa-tint",
                "title": "Humidity",
                "properties": [
                    {"name": "huss", "esgfFilterName": "variable"},
                    {"name": "hurs", "esgfFilterName": "variable"},
                    {"name": "rhsmax", "esgfFilterName": "variable"},
                    {"name": "rhsmin", "esgfFilterName": "variable"},
                    {"name": "rhs", "esgfFilterName": "variable"},
                    {"name": "hus", "esgfFilterName": "variable"},
                    {"name": "hur", "esgfFilterName": "variable"}
                ]
            },
            {
                "colour": "#AEB404",
                "icon": "fas fa-wind",
                "title": "Wind",
                "properties": [
                    {"name": "sfcWind", "esgfFilterName": "variable"},
                    {"name": "sfcWindmax", "esgfFilterName": "variable"},
                    {"name": "uas", "esgfFilterName": "variable"},
                    {"name": "vas", "esgfFilterName": "variable"}
                ]
            },
            {
                "colour": "#e35c5c",
                "icon": "fas fa-sun",
                "title": "Radiation",
                "properties": [
                    {"name": "rsds", "esgfFilterName": "variable"},
                    {"name": "rsus", "esgfFilterName": "variable"},
                    {"name": "rlds", "esgfFilterName": "variable"},
                    {"name": "rlus", "esgfFilterName": "variable"},
                    {"name": "rsdsdiff", "esgfFilterName": "variable"},
                    {"name": "clt", "esgfFilterName": "variable"}
                ]
            },
            {
                "colour": "#9268FF",
                "icon": "fas fa-tachometer-alt",
                "title": "Pressure",
                "properties": [
                    {"name": "ps", "esgfFilterName": "variable"},
                    {"name": "psl", "esgfFilterName": "variable"},
                    {"name": "pfull", "esgfFilterName": "variable"}
                ]
            },
            {
                "colour": "#dda606",
                "icon": "fas fa-cloud-sun-rain",
                "title": "Evaporation",
                "properties": [
                    {"name": "evspsbl", "esgfFilterName": "variable"},
                    {"name": "evspsblpot", "esgfFilterName": "variable"},
                    {"name": "evspsblsoi", "esgfFilterName": "variable"},
                    {"name": "evspsblveg", "esgfFilterName": "variable"}
                ]
            }
        ];
    }

    getTiles(): Promise<QFFilterTileDTO>[] {
        if (!this.isTilesSet()) {
            localStorage.setItem(this.storageKey, JSON.stringify(this._defaultTiles));
        }
        let tiles = JSON.parse(localStorage.getItem(this.storageKey));
        let tileObjects = tiles.map(this.converter.fromJSONObject);
        return tileObjects;
    }

    setTiles(tiles: QFFilterTileDTO[]) {
        let tileObjects = tiles.map(this.converter.toJSONObject);

        let tilesString = JSON.stringify(tileObjects);
        localStorage.setItem(this.storageKey, tilesString);
    }

    isTilesSet(): boolean {
        return localStorage.getItem(this.storageKey) ? true : false;
    }
}