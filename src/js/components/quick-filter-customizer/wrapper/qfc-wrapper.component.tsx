import * as React from "react";
import {Component} from "react";
import ESGFFilterPropertyDTO from "../../../model/dto/esgf-filter-property.dto";
import TileFactory from "../../../model/factories/tile.factory";
import { QFFilterTileDTO } from "../../../model/dto/qf-filter-tile.dto";
import { QFTileProvider } from "../../../data/providers/qf-tile/qf-tile.provider";
import LoadingIcons from "../../shared/icons/loading-icons.component";
import Overlays from "../../shared/overlay/overlays.component";
import OverlayFactory from "../../../model/factories/overlay.factory";
import { QFTileController } from "../../../controllers/localstorage/tiles/tileController-local";
import { ESGFFilterProvider } from "../../../data/providers/esgf-filter/esgf-filter.provider";

export class QFCWrapper extends Component<{ qfManager: any, qfProvider: any, filterProvider: any}> {

    private readonly _quickFilterProvider: QFTileProvider;
    private readonly _filterProvider: ESGFFilterProvider;
    private readonly _tileController: QFTileController;//TODO IQFTileController

    private qfFilterTileDTOs: QFFilterTileDTO[];

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

        this.quickFilterListItemFactory = this.quickFilterListItemFactory.bind(this);
        this.update = this.update.bind(this);
    }

    private async update() {
        let qfTileModels = await Promise.all(this._tileController.getTiles())
        this.setState({ qfTileModels: qfTileModels });
    }

    componentDidMount(): void {
        this.update()
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

    createTiles(qfTileModels: QFFilterTileDTO[]): JSX.Element[] {
        //TODO get with dependency injection
        let tileFactory = new TileFactory();
        let overlayFactory = new OverlayFactory();
        let overlay = <Overlays.QFTiles.PlusIcon/>;
        if (qfTileModels.length === 0) return [];

        return qfTileModels.map( ( QFFilterTileDTO, index ) => {

            let tile = tileFactory.createTile(QFFilterTileDTO, this.quickFilterListItemFactory);

            return overlayFactory.createOverlay(tile, overlay, ()=>{console.log("werkt")} , index);
        })
    }

    render() {
        let { qfTileModels } = this.state;

        let qfTiles = this.createTiles(qfTileModels);
        let hasTiles = qfTiles.length > 0;
        let tileFactory = new TileFactory();
        let iconTileAdd = new QFFilterTileDTO("test", "#3f3f3f", "fas fa-plus-circle", []); //TODO ergens anders? is kort maar niet mooi

        return (
            <section className="qf-wrapper">
                <div className="qf-main-container">
                    <div className="tiles">
                        {hasTiles ? qfTiles : <LoadingIcons.Spinner />}
                        {hasTiles ? tileFactory.createIconTile(iconTileAdd,()=> {console.log("Werkt")}) : null}
                    </div>
                </div>
            </section>
        );
    }
}

