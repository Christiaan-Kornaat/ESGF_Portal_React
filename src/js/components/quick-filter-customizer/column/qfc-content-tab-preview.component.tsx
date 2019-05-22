import * as React from "react";
import { Component } from "react";
import ESGFFilterPropertyDTO from "../../../model/dto/esgf-filter-property.dto";
import TileFactory from "../../../model/factories/tile.factory";
import { QFFilterTileDTO } from "../../../model/dto/qf-filter-tile.dto";
import { QFTileProvider } from "../../../data/providers/qf-tile/qf-tile.provider";
import LoadingIcons from "../../shared/icons/loading-icons.component";
import Overlays from "../../shared/overlay/overlays.component";
import OverlayFactory from "../../../model/factories/overlay.factory";
import { QFTileController } from "../../../controllers/localstorage/tiles/tileController-local";
import { ESGFFilterProvider } from "../../../data/providers/esgf-filter/esgf-filter.provider";

export class PreviewTab extends Component<{ qfManager: any, qfProvider: any, filterProvider: any }> {
    private readonly _quickFilterProvider: QFTileProvider;
    private readonly _filterProvider: ESGFFilterProvider;
    private readonly _tileController: QFTileController;//TODO IQFTileController

    state: { qfTileModels: Array<QFFilterTileDTO> };

    constructor(props) {
        super(props);

        let { qfProvider, filterProvider } = props;
        this._quickFilterProvider = qfProvider;
        this._filterProvider = filterProvider;

        this._tileController = new QFTileController(this._filterProvider);

        this.state = {
            qfTileModels: []
        };
    }

    /**
     *
     * @param {ESGFFilterPropertyDTO}item
     * @return {Component}
     * @constructor
     */
    quickFilterListItemFactory(item: ESGFFilterPropertyDTO) {

        let createSliceWord = (nLetters: number) => (word: string) => word.split("")
            .slice(0, nLetters)
            .join("");

        let smallWord = createSliceWord(3)(item.filter.shortName);

        return (
            <li key={`${item.filter}-${item.name}`}
                className="qf-property">
                <span className="name">
                    {item.name}
                    <span
                        className={"float-right text-right mr-1"}>({smallWord})</span>
                </span>
            </li>
        );
    };

    render() {
        let tileFactory = new TileFactory();
        let iconTileAdd = new QFFilterTileDTO("test", "#3f3f3f", "fas fa-plus-circle", []); //TODO ergens anders? is kort maar niet mooi

        let qfTile = tileFactory.createTile(iconTileAdd, this.quickFilterListItemFactory);

        return (
            <div className="content-tab-customizer-wrapper">
                <div className="preview">
                    {qfTile != null ? qfTile : <LoadingIcons.Spinner />}
                </div>
                <div className="customizer-userinput">
                    <label className="qfc-input-label"> Titel
                    <input type="text" className="form-control inputfield" placeholder="Quick filter Name"></input>
                    </label><br></br>
                    <label className="qfc-input-label"> Color
                    <input type="color" className="form-control"></input>
                    </label><br></br>
                    <label className="qfc-input-label"> Icon
                    <input type="text" className="form-control inputfield" placeholder="Font awesome Icon"></input>
                    </label>
                </div>
            </div>
        );
    }
}

