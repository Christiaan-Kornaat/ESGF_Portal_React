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

type QFCProps = { qfManager: any, qfProvider: any, filterProvider: any } & ColumnedPageProps;
type QFCState = {
    qfTileModels: QFFilterTileDTO[],
    currentCustomTile,
    currentSelectedTab: QfcTab
} & ColumnedPageProps;

enum QfcTab {
    Overview = "overview",
    Customizer = "customizer"
}

export default class QFCWrapper extends Component<QFCProps> {

    private readonly _quickFilterProvider: QFTileProvider;
    private readonly _filterProvider: ESGFFilterProvider;
    private readonly _tileController: QFTileController;//TODO IQFTileController

    state: QFCState;

    constructor(props) {
        super(props);

        this.selectTab = this.selectTab.bind(this);

        let {qfProvider, filterProvider} = props;
        this._quickFilterProvider = qfProvider;
        this._filterProvider = filterProvider;

        this._tileController = new QFTileController(this._filterProvider);

        this.state = {
            qfTileModels: [],
            currentCustomTile: null,
            currentSelectedTab: QfcTab.Overview
        };

        this.update = this.update.bind(this);
    }

    private async update() {
        let qfTileModels = await Promise.all(this._tileController.getTiles());
        this.setState({qfTileModels: qfTileModels});
    }

    componentDidMount(): void {
        this.update();
    }

    selectTab(tabName: QfcTab) {
        this.setState({currentSelectedTab: tabName});
    }

    createTiles(qfTileModels: QFFilterTileDTO[]): JSX.Element[] {
        //TODO get with dependency injection
        let tileFactory = new TileFactory();
        let overlayFactory = new OverlayFactory();
        let overlay = <Overlays.QFTiles.PlusIcon/>;
        if (qfTileModels.length === 0) return [];

        let openCustomiser = (qfTile) => {
            this.state.currentCustomTile = qfTile;
            this.selectTab(QfcTab.Customizer);
        };

        return qfTileModels.map((QFFilterTileDTO, index) => {
            let tile = tileFactory.createTile(QFFilterTileDTO, new ListItemFactoryFactory().createQuickFilterListItem);

            return overlayFactory.createOverlay(tile, overlay, () => openCustomiser(QFFilterTileDTO), index);
        });
    }

    render() {
        let {qfTileModels, currentCustomTile} = this.state;

        let qfTiles = this.createTiles(qfTileModels);
        let hasTiles = qfTiles.length > 0;
        let tileFactory = new TileFactory();
        let iconTileAdd = new QFFilterTileDTO("test", "#3f3f3f", "fas fa-plus-circle", []);
        //TODO ergens anders? is kort maar niet mooi

        let tabs = [
            <Tab title={"Overview"}
                 eventKey={QfcTab.Overview}
                 key={QfcTab.Overview}
                 tabClassName={""}>
                <div className="qf-main-container">
                    <div className="tiles">
                        {hasTiles ? qfTiles : <LoadingIcons.Spinner/>}
                        {hasTiles ? tileFactory.createIconTile(iconTileAdd, () => console.log("Werkt")) : null}
                    </div>
                </div>
            </Tab>

        ];

        if (currentCustomTile) {
            tabs.push(<Tab title={"Custom Tile"}
                           eventKey={QfcTab.Customizer}
                           key={QfcTab.Customizer}>
                <QfcCustomiserWrapper qfTile={currentCustomTile}
                                      filterProvider={this._filterProvider}/>
            </Tab>);
        }

        return (
            <section className="qf-wrapper">
                <Tabs id={"qfc-tabs"}
                      mountOnEnter={true}
                      onSelect={this.selectTab}
                      activeKey={this.state.currentSelectedTab}>
                    {tabs}
                </Tabs>
            </section>
        );
    }


}

