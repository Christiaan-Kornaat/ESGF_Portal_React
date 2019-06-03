import * as React from "react";
import {Component} from "react";
import TileFactory from "../../../model/factories/tile.factory";
import {QFFilterTileDTO} from "../../../model/dto/qf-filter-tile.dto";
import LoadingIcons from "../../shared/icons/loading-icons.component";
import Overlays from "../../shared/overlay/overlays.component";
import OverlayFactory from "../../../model/factories/overlay.factory";
import {ESGFFilterProvider} from "../../../data/esgf-filter/esgf-filter.provider";
import {ColumnedPageProps} from "../../shared/pages/page-columned/page-columned.component";
import ListItemFactoryFactory from "../../../model/factories/list-item-factory.factory";
import Buttons from "../../shared/buttons/buttons.component";
import {LocalStorageController} from "../../../controllers/localstorage/esgf-localstorage.controller";
import {QFFilterTileJSONDTO, QFTileConverter} from "../../../data/converters/qf-tile-converter";
import QfcCustomizerWrapper from "./qfc-customizer-wrapper.component";

type QFCProps =
    { qfManager: any, qfProvider: any, filterProvider: any }
    & ColumnedPageProps;
type QFCState = {
    qfTileModels: QFFilterTileDTO[],
    currentCustomTile,
} & ColumnedPageProps;

export default class QFCWrapper extends Component<QFCProps> {

    private readonly _filterProvider: ESGFFilterProvider;
    private readonly _tileController: LocalStorageController<QFFilterTileDTO, QFFilterTileJSONDTO>;

    state: QFCState;

    constructor(props) {
        super(props);

        this.saveTile = this.saveTile.bind(this);
        this.addTile = this.addTile.bind(this);

        let {filterProvider} = props;
        this._filterProvider = filterProvider;

        let defaultTiles = [
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

        this._tileController = new LocalStorageController<QFFilterTileDTO, QFFilterTileJSONDTO>(new QFTileConverter(filterProvider), "ESGFQFStorage", defaultTiles);

        this.state = {
            qfTileModels: [],
            currentCustomTile: null
        };

        this.update = this.update.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    private async update() {
        let qfTileModels = await Promise.all(this._tileController.getLocalstorage());
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

        this._tileController.setLocalstorage(tiles);
    }

    handleDeleteClick(tile: QFFilterTileDTO) {
        if (!window.confirm(`Delete tile ${tile.title}?`)) return;
        this.deleteTile(tile);
        this.handleBackClick();
    }

    handleBackClick() {
        this.setState({
            currentCustomTile: null
        });
    }

    deleteTile(tile) {
        let tiles = this.state.qfTileModels.filter(item => item != tile);

        this._tileController.setLocalstorage(tiles);

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

        let tab = (
            <div className="qf-main-container">
                <div className="tiles">
                    {hasTiles ? qfTiles : <LoadingIcons.Spinner/>}
                    {(hasTiles && !hasMaxTiles) ? tileFactory.createIconTile(iconTileAdd, this.addTile) : null}
                </div>
            </div>
        );

        if (currentCustomTile) {
            //<Buttons.Success title={"Save"} onClick={() => this.handleSaveClick(currentCustomTile)}/>
            let actionButtons = [
                <Buttons.Primary title={"Go back"} onClick={() => this.handleBackClick()}/>,
                <Buttons.Danger title={"Delete"} onClick={() => this.handleDeleteClick(currentCustomTile)}/>
            ];

            tab = <QfcCustomizerWrapper qfTile={currentCustomTile}
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

