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
import {QuickFilterTiles} from "../../../data/qf-tile/qf-tile-defaults.data";

export namespace QuickFilterCustomizer {
    type Props =
        { qfManager: any, filterProvider: any }
        & ColumnedPageProps;
    type State = {
        qfTileModels: QFFilterTileDTO[],
        currentCustomTile,
    } & ColumnedPageProps;

    export class Wrapper extends Component<Props> {

        private readonly _filterProvider: ESGFFilterProvider;
        private readonly _tileController: LocalStorageController<QFFilterTileDTO, QFFilterTileJSONDTO>;

        state: State;

        constructor(props) {
            super(props);

            this.saveTile = this.saveTile.bind(this);
            this.addTile = this.addTile.bind(this);

            let {filterProvider} = props;
            this._filterProvider = filterProvider;

            this._tileController = new LocalStorageController<QFFilterTileDTO, QFFilterTileJSONDTO>(new QFTileConverter(filterProvider), "ESGFQFStorage", QuickFilterTiles.Defaults);

            this.state = {
                qfTileModels: null,
                currentCustomTile: null
            };

            this.update = this.update.bind(this);
            this.handleBackClick = this.handleBackClick.bind(this);
        }

        private async update(): Promise<void> {
            let qfTileModels = await Promise.all(this._tileController.getLocalstorage());
            this.setState({qfTileModels: qfTileModels});
        }

        componentDidMount(): void {
            this.update();
        }

        openCustomiser(qfTile): void {
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

        async handleSaveClick(tile: QFFilterTileDTO): Promise<void> {
            await this.saveTile(tile);

            window.alert("tile saved");
        }

        async saveTile(tile): Promise<void> {
            let tiles = this.state.qfTileModels;

            this._tileController.setLocalstorage(tiles);
        }

        handleDeleteClick(tile: QFFilterTileDTO): void {
            if (!window.confirm(`Delete tile ${tile.title}?`)) return;
            this.deleteTile(tile);
            this.handleBackClick();
        }

        handleBackClick(): void {
            this.setState({
                currentCustomTile: null
            });
        }

        deleteTile(tile): void {
            let tiles = this.state.qfTileModels.filter(item => item != tile);

            this._tileController.setLocalstorage(tiles);

            this.setState({qfTileModels: tiles});
        }


        render(): JSX.Element {
            let {qfTileModels, currentCustomTile} = this.state;

            let qfTiles, hasMaxTiles;
            if (qfTileModels !== null) {
                qfTiles = this.createTiles(qfTileModels);

                hasMaxTiles = qfTiles.length >= 8;
            }
            let isLoading = qfTileModels === null;

            let tileFactory = new TileFactory();

            let iconTileAdd = new QFFilterTileDTO("Add Quick Filter", "#3f3f3f", "fas fa-plus-circle", []);
            //TODO ergens anders? is kort maar niet mooi

            let tab = (
                <div className="qf-main-container">
                    <div className="tiles">
                        {!isLoading ? qfTiles : <LoadingIcons.Spinner/>}
                        {(!isLoading && !hasMaxTiles) ? tileFactory.createIconTile(iconTileAdd, this.addTile) : null}
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
}

export default QuickFilterCustomizer.Wrapper;