import * as React from "react";
import {Component} from "react";
import StringFormatter from "../../../model/formatters/string.formatter";
import {QFTile} from "../esgf-qfilter-tile/qf-tile.component";
import {QFSidebar} from "../qf-sidebar/qfsidebar.component";
import SelectedPropertyManager from "../../../managers/selected-property.manager";
import IQuickFilterManager from "../../../managers/quick-filter/quick-filter.manager.interface";
import {QFTileProvider} from "../../../data/providers/qf-tile/qf-tile.provider";
import ESGFFilterPropertyDTO from "../../../model/dto/esgf-filter-property.dto";
import {QFFilterTileDTO} from "../../../model/dto/qf-filter-tile.dto";


export class QFWrapper extends Component<{ searchResultProvider: any, selectionManager: any, qfManager: any, qfProvider: any }> {

    private readonly _selectedPropertyManager: SelectedPropertyManager;
    private readonly _quickFilterManager: IQuickFilterManager;
    private readonly _quickFilterProvider: QFTileProvider;

    state: { QFSidebarShow: boolean, qfTileModels: Array<QFFilterTileDTO> };

    constructor(props: { searchResultProvider: any, selectionManager: any, qfManager: any, qfProvider: any }) {
        super(props);

        // @ts-ignore
        let {selectionManager, qfManager, qfProvider} = props;
        this._selectedPropertyManager = selectionManager;
        this._quickFilterManager = qfManager;
        this._quickFilterProvider = qfProvider;

        this.state = {
            QFSidebarShow: false,
            qfTileModels: []
        };

        this.togglePropertySelected = this.togglePropertySelected.bind(this);
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

    private update() {
        this._quickFilterProvider.provide()
            .then(qfTileModels => this.setState({qfTileModels: qfTileModels}));
    }

    createTiles(qfTileModels: QFFilterTileDTO[]): JSX.Element[] {
        //<DEMO CODE>
        if (qfTileModels.length === 0) return [];

        return qfTileModels.map(({color, icon, title, properties}) => {
                title = StringFormatter.toHumanText(title);

                return <QFTile key={title}
                               listItemFactory={this.quickFilterListItemFactory}
                               title={title}
                               color={color}
                               icon={icon}
                               properties={properties}
                               page="qf"/>;
            }
        );
        //</DEMO CODE>
    }

    componentDidMount(): void {
        this.update();
    }

    render() {
        let {QFSidebarShow, qfTileModels} = this.state;

        let qfTiles = this.createTiles(qfTileModels);

        return (
            <section className="qf-wrapper">
                {QFSidebarShow ? <QFSidebar close={this.closeNav}/> : ""}
                <div className="button-open-presets" onClick={this.openNav}>&#9776; Presets</div>
                <div className="qf-main-container">
                    <div className="tiles">
                        {qfTiles}
                    </div>
                </div>
            </section>
        );
    }

}