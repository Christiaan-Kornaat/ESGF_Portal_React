import * as React from "react";
import { Component } from "react";
import LoadingIcons from "../../shared/icons/loading-icons.component";
import ListItemFactoryFactory from "../../../model/factories/list-item-factory.factory";
import ESGFFilterPropertyDTO from "../../../model/dto/esgf-filter-property.dto";
import { PresetDTO } from "../../../model/dto/esgf-preset.dto";
import UnorderedList from "../../shared/list-unordered/list-unordered.component";

type PreviewTabProps = { preset: PresetDTO, properties: ESGFFilterPropertyDTO[], onSave?: (PresetDTO) => void, actionButtons?: JSX.Element[] | JSX.Element, propertyPresetListItemFactory: (property: ESGFFilterPropertyDTO) => JSX.Element };

export class PresetsPreviewTab extends Component<PreviewTabProps> {
    state: { preset: PresetDTO };

    private _listItemFactory: ListItemFactoryFactory;

    constructor(props: PreviewTabProps) {
        super(props);

        this._listItemFactory = new ListItemFactoryFactory();

        this.state = {
            preset: props.preset
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handlePropertiesChange = this.handlePropertiesChange.bind(this);
    }

    componentWillReceiveProps({ properties }: PreviewTabProps): void {
        this.handlePropertiesChange(properties);
    }

    handlePropertiesChange(properties) {
        let preset = this.props.preset;
        preset.properties = properties;
    }

    handleTitleChange(event) {
        let preset = this.props.preset;
        preset.title = event.target.value;
    }

    handleDescriptionChange(event) {
        let preset = this.props.preset;
        preset.description = event.target.value;
    }

    savePreset(preset) {
        this.setState({ preset: preset });
        this.props.onSave(preset);
    }

    render() {

        this.state.preset.properties = this.props.properties;

        return (
            <div className="content-tab-preset-customizer-wrapper">
                <div className="preview-presets">
                    {this.state.preset != null ?
                        <UnorderedList className="ListPresets" items={this.state.preset.properties} 
                                    createListItem={this.props.propertyPresetListItemFactory}/>
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
                    <label className="qfc-input-label-100"> Description
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


