import * as React from "react";
import {Component} from "react";
import {QFFilterTileDTO} from "../../../model/dto/qf-filter-tile.dto";
import LoadingIcons from "../../shared/icons/loading-icons.component";
import {QFTileController} from "../../../controllers/localstorage/tiles/tileController-local";
import TileFactory from "../../../model/factories/tile.factory";
import ListItemFactoryFactory from "../../../model/factories/list-item-factory.factory";
import ESGFFilterPropertyDTO from "../../../model/dto/esgf-filter-property.dto";

type PreviewTabProps = { qfTile: QFFilterTileDTO, properties: ESGFFilterPropertyDTO[], onSave?: (QFFilterTileDTO) => void, actionButtons?: JSX.Element[] | JSX.Element, deselectProperty: (property: ESGFFilterPropertyDTO)=> void };

export class PreviewTab extends Component<PreviewTabProps> {
    state: { qfTile };

    constructor(props: PreviewTabProps) {
        super(props);

        this.handleColourChange = this.handleColourChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);

        this.state = {
            qfTile: props.qfTile
        };
    }

    handleColourChange(event) {
        let qfTile = this.props.qfTile;
        qfTile.color = event.target.value;

        this.saveTile(qfTile);
    }

    handleTitleChange(event) {
        let qfTile = this.props.qfTile;

        qfTile.title = event.target.value;

        this.saveTile(qfTile);
    }

    componentWillReceiveProps({properties}: PreviewTabProps): void {
        this.handlePropertiesChange(properties);
    }

    handlePropertiesChange(properties) {
        let qfTile = this.props.qfTile;

        qfTile.properties = properties;

        this.saveTile(qfTile);
    }

    saveTile(tile) {
        this.setState({qfTile: tile});
        this.props.onSave(tile);
    }

    render() {
        let {deselectProperty} = this.props;

        let handleDeselectProperty = (item) => {
            deselectProperty(item);
            this.saveTile(this.props.qfTile);
        }

        let tileFactory = new TileFactory();
        let createQFListItem = (item) => new ListItemFactoryFactory().createQFCTileListItem(item, handleDeselectProperty);

        this.state.qfTile.properties = this.props.properties;

        return (
            <div className="content-tab-customizer-wrapper">
                <div className="preview">
                    {this.state.qfTile != null ?
                        tileFactory.createTile(this.state.qfTile, createQFListItem) :
                        <LoadingIcons.Spinner/>}
                </div>
                <div className="customizer-userinput">
                    <label className="qfc-input-label-100"> Title
                        <input type="text"
                               defaultValue={this.state.qfTile.title}
                               onChange={this.handleTitleChange}
                               className="form-control inputfield"
                               placeholder="Quick filter Name"/>
                    </label>
                    <label className="qfc-input-label-25"> Color 
                        <input type="color"
                               className="form-control"
                               onChange={this.handleColourChange}
                               defaultValue={this.props.qfTile.color}/>
                    </label>
                    <label className="qfc-input-label-75"> Icon
                        <input type="text" className="form-control inputfield" placeholder="Font awesome Icon"/>
                    </label>
                    <div className="button-container">
                        {this.props.actionButtons ? this.props.actionButtons : null}
                    </div>
                </div>
            </div>
        );
    }
}

