import * as React from "react";
import {ChangeEvent, Component} from "react";
import {QFFilterTileDTO} from "../../../model/dto/qf-filter-tile.dto";
import LoadingIcons from "../../shared/icons/loading-icons.component";
import TileFactory from "../../../model/factories/tile.factory";
import ListItemFactoryFactory from "../../../model/factories/list-item-factory.factory";
import ESGFFilterPropertyDTO from "../../../model/dto/esgf-filter-property.dto";

type PreviewTabProps = { qfTile: QFFilterTileDTO, properties: ESGFFilterPropertyDTO[], onSave?: (QFFilterTileDTO) => void, actionButtons?: JSX.Element[] | JSX.Element, deselectProperty: (property: ESGFFilterPropertyDTO) => void };
type State = { qfTile: QFFilterTileDTO }

export class PreviewTab extends Component<PreviewTabProps> {
    state: State;

    constructor(props: PreviewTabProps) {
        super(props);

        this.handleColourChange = this.handleColourChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);

        this.state = {
            qfTile: props.qfTile
        };
    }

    handleColourChange(event: ChangeEvent<HTMLInputElement>): void {
        let qfTile = this.props.qfTile;
        qfTile.color = event.target.value;

        this.saveTile(qfTile);
    }

    handleTitleChange(event: ChangeEvent<HTMLInputElement>): void {
        let qfTile = this.props.qfTile;

        qfTile.title = event.target.value;

        this.saveTile(qfTile);
    }

    componentWillReceiveProps({properties}: PreviewTabProps): void {
        this.handlePropertiesChange(properties);
    }

    handlePropertiesChange(properties: ESGFFilterPropertyDTO[]): void {
        let qfTile = this.props.qfTile;

        qfTile.properties = properties;

        this.saveTile(qfTile);
    }

    saveTile(tile: QFFilterTileDTO): void {
        this.setState({qfTile: tile});
        this.props.onSave(tile);
    }

    render(): any {
        let {deselectProperty} = this.props;

        let handleDeselectProperty = (item) => {
            deselectProperty(item);
            this.saveTile(this.props.qfTile);
        };

        let tileFactory = new TileFactory();
        let createQFListItem = (item) => new ListItemFactoryFactory().createQFCTileListItem(item, handleDeselectProperty);

        this.state.qfTile.properties = this.props.properties;

        let previewContent = this.state.qfTile !== null ?
            tileFactory.createTile(this.state.qfTile, createQFListItem) :
            <LoadingIcons.Spinner/>;

        return (
            <div className="content-tab-customizer-wrapper">
                <div className="preview">
                    {previewContent}
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

