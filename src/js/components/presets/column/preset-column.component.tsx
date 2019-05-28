import * as React from "react";
import { Component } from "react";
import LoadingIcons from "../../shared/icons/loading-icons.component";
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
        let preset = this.props.presets;

        preset.properties = properties;

        this.savePreset(preset);
    }

    savePreset(preset) {
        this.setState({ preset: preset });
        this.props.onSave(preset);
    }

    render() {
        let { deselectProperty } = this.props;

        let handleDeselectProperty = (item) => {
            deselectProperty(item);
            this.savePreset(this.props.presets);
        };

        let createQFListItem = (item) => new ListItemFactoryFactory().createQFCTileListItem(item, handleDeselectProperty);

        this.state.presets.properties = this.props.properties;

        return (
            <div className="content-tab-customizer-wrapper">
                <div className="preview">
                    {this.state.presets != null ?
                        createQFListItem :
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
                    <div className="button-container">
                        {this.props.actionButtons ? this.props.actionButtons : null}
                    </div>
                </div>
            </div>
        );
    }
}

