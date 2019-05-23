import * as React from "react";
import {Component} from "react";
import TileFactory from "../../../model/factories/tile.factory";
import {QFFilterTileDTO} from "../../../model/dto/qf-filter-tile.dto";
import {QFTileProvider} from "../../../data/providers/qf-tile/qf-tile.provider";
import LoadingIcons from "../../shared/icons/loading-icons.component";
import Overlays from "../../shared/overlay/overlays.component";
import OverlayFactory from "../../../model/factories/overlay.factory";
import {QFTileController} from "../../../controllers/localstorage/tiles/tileController-local";
import {ESGFFilterProvider} from "../../../data/providers/esgf-filter/esgf-filter.provider";
import {ColumnedPageProps} from "../../shared/pages/page-columned/page-columned.component";
import {Tab, Tabs} from "react-bootstrap";
import QfcCustomiserWrapper from "./qfc-customiser-wrapper.component";
import ListItemFactoryFactory from "../../../model/factories/list-item-factory.factory";
import Buttons from "../../shared/buttons/buttons.component";

type QFCProps =
    { qfManager: any, qfProvider: any, filterProvider: any }
    & ColumnedPageProps;
type QFCState = {
    qfTileModels: QFFilterTileDTO[],
    currentCustomTile,
} & ColumnedPageProps;

export default class QFCWrapper extends Component<QFCProps> {

    private readonly _quickFilterProvider: QFTileProvider;
    private readonly _filterProvider: ESGFFilterProvider;
    private readonly _tileController: QFTileController;//TODO IQFTileController

    state: QFCState;

    constructor(props) {
        super(props);

        this.saveTile = this.saveTile.bind(this);
        this.addTile = this.addTile.bind(this);

        let {qfProvider, filterProvider} = props;
        this._quickFilterProvider = qfProvider;
        this._filterProvider = filterProvider;

        this._tileController = new QFTileController(this._filterProvider);

        this.state = {
            qfTileModels: [],
            currentCustomTile: null,
        };

        this.update = this.update.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    private async update() {
        let qfTileModels = await Promise.all(this._tileController.getTiles());
        this.setState({qfTileModels: qfTileModels});
    }

    componentDidMount(): void {
        this.update();
    }

    openCustomiser(qfTile) {
        this.setState({currentCustomTile: qfTile});
    };

    createTiles(qfTileModels: QFFilterTileDTO[]): JSX.Element[] {
        //TODO get with dependency injection
        let tileFactory = new TileFactory();
        let overlayFactory = new OverlayFactory();
        let overlay = <Overlays.QFTiles.PlusIcon/>;
        if (qfTileModels.length === 0) return [];


        return qfTileModels.map((QFFilterTileDTO, index) => {
            let tile = tileFactory.createTile(QFFilterTileDTO, new ListItemFactoryFactory().createQuickFilterListItem);

            return overlayFactory.createOverlay(tile, overlay, () => this.openCustomiser(QFFilterTileDTO), index);
        });
    }

    addTile() {
        let tile = new QFFilterTileDTO("", "#000");
        this.state.qfTileModels.push(tile);
        this.openCustomiser(tile);
    }

    handleSaveClick(tile: QFFilterTileDTO) {
        this.saveTile(tile);

        window.alert("tile saved");
    }

    async saveTile(tile) {
        let tiles = this.state.qfTileModels;

        this._tileController.setTiles(tiles);
    }

    handleDeleteClick(tile: QFFilterTileDTO) {
        if (!window.confirm(`Delete tile ${tile.title}?`)) return;
        this.deleteTile(tile);
        this.handleBackClick();
    }

    handleBackClick(){
        this.setState({
            currentCustomTile: null
        });
    }

    deleteTile(tile) {
        let tiles = this.state.qfTileModels.filter(item => item != tile);

        this._tileController.setTiles(tiles);

        this.setState({qfTileModels: tiles});
    }


    render() {
        let {qfTileModels, currentCustomTile} = this.state;

        let qfTiles = this.createTiles(qfTileModels);
        let hasTiles = qfTiles.length > 0;
        let hasMaxTiles = qfTiles.length >= 8;
        let tileFactory = new TileFactory();
        let iconTileAdd = new QFFilterTileDTO("Add Quick Filter", "#3f3f3f", "fas fa-plus-circle", []);
        //TODO ergens anders? is kort maar niet mooi

        let tab = 
                <div className="qf-main-container">
                    <div className="tiles">
                        {hasTiles ? qfTiles : <LoadingIcons.Spinner/>}
                        {(hasTiles && !hasMaxTiles)? tileFactory.createIconTile(iconTileAdd, this.addTile) : null}
                    </div>
                </div>;

        if (currentCustomTile) {
            //<Buttons.Success title={"Save"} onClick={() => this.handleSaveClick(currentCustomTile)}/>
            let actionButtons = [
                <Buttons.Primary title={"Go back"} onClick={() => this.handleBackClick()}/>,
                <Buttons.Danger title={"Delete"} onClick={() => this.handleDeleteClick(currentCustomTile)}/>
            ];
            
            tab = <QfcCustomiserWrapper qfTile={currentCustomTile}
                                      onSave={this.saveTile}
                                      actionButtons={actionButtons}
                                      qfController={this._tileController}
                                      filterProvider={this._filterProvider}/>;
        }

        return (
            <section className="qf-wrapper">
                    {tab}
            </section>
        );
    }


}

