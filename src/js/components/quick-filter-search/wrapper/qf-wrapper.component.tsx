import * as React from "react";
import {Component} from "react";
import StringFormatter from "../../../model/formatters/string.formatter";
import {QFSidebar} from "../qf-sidebar/qfsidebar.component";
import SelectedPropertyManager from "../../../managers/selected-property.manager";
import {QFTileProvider} from "../../../data/qf-tile/qf-tile.provider";
import ESGFFilterPropertyDTO from "../../../model/dto/esgf-filter-property.dto";
import {QFFilterTileDTO} from "../../../model/dto/qf-filter-tile.dto";
import LoadingIcons from "../../shared/icons/loading-icons.component";
import TileFactory from "../../../model/factories/tile.factory";
import {QFTileController} from "../../../controllers/localstorage/tiles/tileController-local";
import {ESGFFilterProvider} from "../../../data/esgf-filter/esgf-filter.provider";

enum ErrorState {
    NoError,
    ConnectionError,
    NotFoundError
}

export class QFWrapper extends Component<{ selectionManager: any, filterProvider: any, qfProvider: any }> {

    private readonly _selectedPropertyManager: SelectedPropertyManager;
    private readonly _quickFilterProvider: QFTileProvider;
    private readonly _filterProvider: ESGFFilterProvider;
    private readonly _tileController: QFTileController;//TODO IQFTileController

    state: { QFSidebarShow: boolean, qfTileModels: Array<QFFilterTileDTO>, errorState: ErrorState };

    get componentContent() {
        let {qfTileModels, errorState} = this.state;

        if (errorState == ErrorState.ConnectionError) {
            return <LoadingIcons.NoConnection className={"text-danger m-auto"}
                                              onClick={() => this.update()}/>;
        }

        let qfTiles = this.createTiles(qfTileModels);
        let hasTiles = qfTiles.length > 0;

        return hasTiles ? qfTiles : <LoadingIcons.Spinner/>;
    }

    constructor(props) {
        super(props);

        let {selectionManager, filterProvider, qfProvider} = props;
        this._selectedPropertyManager = selectionManager;
        this._quickFilterProvider = qfProvider;
        this._filterProvider = filterProvider;

        this._tileController = new QFTileController(this._filterProvider);


        this.state = {
            QFSidebarShow: false,
            qfTileModels: [],
            errorState: ErrorState.NoError
        };

        this.togglePropertySelected = this.togglePropertySelected.bind(this);
        this.update = this.update.bind(this);
        this.quickFilterListItemFactory = this.quickFilterListItemFactory.bind(this);
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
    }

    openNav() {
        this.setState({QFSidebarShow: true});
    }

    closeNav(event: MouseEvent): void {
        this.setState({QFSidebarShow: false});
    }

    /**
     *
     * @param {ESGFFilterPropertyDTO} property
     */
    togglePropertySelected(property: ESGFFilterPropertyDTO) {
        let {select, deselect, isSelected} = this._selectedPropertyManager;

        (isSelected(property) ? deselect : select)(property);

        this.update();
    }

    /**
     *
     * @param {ESGFFilterPropertyDTO}item
     * @return {Component}
     * @constructor
     */
    quickFilterListItemFactory(item: ESGFFilterPropertyDTO) {
        let {isSelected} = this._selectedPropertyManager;

        let selectProperty = () => this.togglePropertySelected(item);

        let createSliceWord = (nLetters: number) => (word: string) => word.split("")
                                                                          .slice(0, nLetters)
                                                                          .join("");

        let smallWord = createSliceWord(3)(item.filter.shortName);

        return (
            <li key={`${item.filter}-${item.name}`}
                className="qf-property"
                onClick={selectProperty}>
                <span className="name">
                    <input type="checkbox"
                           onChange={() => ({})} //prevents error message
                           checked={isSelected(item)}/>
                    {StringFormatter.toHumanText(item.name)} <span
                    className={"float-right text-right mr-1"}>({smallWord})</span>
                </span>
            </li>
        );
    };

    private async update() {
        try {
            let qfTileModels = await this._tileController.getTiles();
            this.setState({qfTileModels: qfTileModels});
        } catch (e) {
            this.setState({errorState: ErrorState.ConnectionError});
        }
    }

    componentDidMount(): void {
        this.update();
    }

    createTiles(qfTileModels: QFFilterTileDTO[]): JSX.Element[] {
        //TODO get with dependency injection
        let tileFactory = new TileFactory();

        if (qfTileModels.length === 0) return [];

        return qfTileModels.map(QFFilterTileDTO =>
            tileFactory.createTile(QFFilterTileDTO, this.quickFilterListItemFactory));
    }

    render() {
        let {QFSidebarShow} = this.state;

        return (
            <section className="qf-wrapper">
                {QFSidebarShow ? <QFSidebar close={this.closeNav}/> : ""}
                {/*<div className="button-open-presets" onClick={this.openNav}>&#9776; Presets</div>*/}
                <div className="qf-main-container">
                    <div className="tiles">
                        {this.componentContent}
                    </div>
                </div>
            </section>
        );
    }

}