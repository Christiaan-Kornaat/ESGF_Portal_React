import * as React from "react";
import { Component } from "react";
import { QFFilterTileDTO } from "../../../model/dto/qf-filter-tile.dto";
import LoadingIcons from "../../shared/icons/loading-icons.component";
import TileFactory from "../../../model/factories/tile.factory";
import ListItemFactoryFactory from "../../../model/factories/list-item-factory.factory";
import ESGFFilterPropertyDTO from "../../../model/dto/esgf-filter-property.dto";
import { PresetDTO } from "../../../model/dto/esgf-preset.dto";

type PreviewTabProps = { presets: PresetDTO, properties: ESGFFilterPropertyDTO[], onSave?: (PresetDTO) => void, actionButtons?: JSX.Element[] | JSX.Element, deselectProperty: (property: ESGFFilterPropertyDTO) => void };

export class PresetsPreviewTab extends Component<PreviewTabProps> {
    state: { presets };

    constructor(props: PreviewTabProps) {
        super(props);

        this.state = {
            presets: props.presets
        };
    }

    componentWillReceiveProps({ properties }: PreviewTabProps): void {
        this.handlePropertiesChange(properties);
    }

    handlePropertiesChange(properties) {
        let qfTile = this.props.presets;

        qfTile.properties = properties;

        this.saveTile(qfTile);
    }

    saveTile(tile) {
        this.setState({ qfTile: tile });
        this.props.onSave(tile);
    }

    render() {
        let { deselectProperty } = this.props;

        let handleDeselectProperty = (item) => {
            deselectProperty(item);
            this.saveTile(this.props.presets);
        };

        let createQFListItem = (item) => new ListItemFactoryFactory().createQFCTileListItem(item, handleDeselectProperty);

        this.state.presets.properties = this.props.properties;

        return (
            <div className="content-tab-customizer-wrapper">
                <div className="preview">
                    {this.state.presets != null ?
                        null :
                        <LoadingIcons.Spinner />}
                </div>
                <div className="customizer-userinput">
                    <label className="qfc-input-label-100"> Title
                        <input type="text"
                            defaultValue={this.state.presets.title}
                            // onChange={this.handleTitleChange}
                            className="form-control inputfield"
                            placeholder="Quick filter Name" />
                    </label>
                    <label className="qfc-input-label-75"> Icon
                        <input type="text" className="form-control inputfield" placeholder="Font awesome Icon" />
                    </label>
                    <div className="button-container">
                        {this.props.actionButtons ? this.props.actionButtons : null}
                    </div>
                </div>
            </div>
        );
    }
}

