import * as React from "react";
import { Component } from "react";
import LoadingIcons from "../../shared/icons/loading-icons.component";
import ListItemFactoryFactory from "../../../model/factories/list-item-factory.factory";
import ESGFFilterPropertyDTO from "../../../model/dto/esgf-filter-property.dto";
import { PresetDTO } from "../../../model/dto/esgf-preset.dto";

type PreviewTabProps = { preset: PresetDTO, properties: ESGFFilterPropertyDTO[], onSave?: (PresetDTO) => void, actionButtons?: JSX.Element[] | JSX.Element, deselectProperty: (property: ESGFFilterPropertyDTO) => void };

export class PresetsPreviewTab extends Component<PreviewTabProps> {
    state: { preset };

    constructor(props: PreviewTabProps) {
        super(props);

        this.state = {
            preset: props.preset
        };
    }

    componentWillReceiveProps({ properties }: PreviewTabProps): void {
        this.handlePropertiesChange(properties);
    }

    handlePropertiesChange(properties) {
        let preset = this.props.preset;

        preset.properties = properties;

        this.savePreset(preset);
    }

    handleTitleChange(event) {
        let preset = this.props.preset;

        preset.title = event.target.value;

        this.savePreset(preset);
    }

    handleDescriptionChange(event) {
        let preset = this.props.preset;

        preset.description = event.target.value;

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
            this.savePreset(this.props.preset);
        };

        let createQFListItem = (item) => new ListItemFactoryFactory().createQFCTileListItem(item, handleDeselectProperty);

        this.state.preset.properties = this.props.properties;

        return (
            <div className="content-tab-customizer-wrapper">
                <div className="preview">
                    {this.state.preset != null ?
                    this.state.preset.properties.forEach(element => {
                        createQFListItem(element)
                    })
                         :
                        <LoadingIcons.Spinner />}
                </div>
                <div className="customizer-userinput">
                    <label className="qfc-input-label-100"> Title
                        <input type="text"
                            defaultValue={this.state.preset.title}
                            onChange={this.handleTitleChange}
                            className="form-control inputfield"
                            placeholder="Preset name" />
                    </label>
                    <label className="qfc-input-label-100"> Title
                        <textarea
                            defaultValue={this.state.preset.description}
                            onChange={this.handleDescriptionChange}
                            className="form-control inputfield"
                            placeholder="Preset description" />
                    </label>
                    <div className="button-container">
                        {this.props.actionButtons ? this.props.actionButtons : null}
                    </div>
                </div>
            </div>
        );
    }
}

