import * as React from "react";
import {Component} from "react";
import ESGFFilterPropertyDTO from "../../../model/dto/esgf-filter-property.dto";
import TileFactory from "../../../model/factories/tile.factory";
import { QFFilterTileDTO } from "../../../model/dto/qf-filter-tile.dto";
import { QFTileProvider } from "../../../data/providers/qf-tile/qf-tile.provider";
import LoadingIcons from "../../shared/icons/loading-icons.component";
import OverlayFactory from "../../../model/factories/overlay.factory";

export class QFCWrapper extends Component<{ qfManager: any, qfProvider: any}> {

    private readonly _quickFilterProvider: QFTileProvider;
    
    state: { qfTileModels: Array<QFFilterTileDTO> };

    constructor(props) {
        super(props);

        let { qfProvider } = props;
        this._quickFilterProvider = qfProvider;

        this.state = {
            qfTileModels: []
        };

        this.quickFilterListItemFactory = this.quickFilterListItemFactory.bind(this);

    }

    private update() {
        this._quickFilterProvider.provide()
            .then(qfTileModels => this.setState({ qfTileModels: qfTileModels }));
    }
    
    componentDidMount(): void {
        this.update();
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
        let overlay = <div className="h-100"><i className="fa fa-pencil-alt overlayIcon" aria-hidden="true"></i></div>;
        if (qfTileModels.length === 0) return [];

        return qfTileModels.map( ( QFFilterTileDTO, index ) => {
            return overlayFactory.createOverlay(tileFactory.createTile(QFFilterTileDTO, this.quickFilterListItemFactory), overlay, ()=>{console.log("werkt")} , index);
        }
        );
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

