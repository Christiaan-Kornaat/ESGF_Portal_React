import { ESGFFilterProvider } from "../../../data/providers/esgf-filter/esgf-filter.provider";
import { PresetConverter } from "../../../data/converters/preset-converter";
import { PresetDTO } from "../../../model/dto/esgf-preset.dto";

export class PresetController {
    private converter: PresetConverter;
    private readonly storageKey: string;

    constructor(filterProvider: ESGFFilterProvider) {
        this.converter = new PresetConverter(filterProvider);
        this.storageKey = "Presets";
    }

    getPresets(): Promise<PresetDTO>[] {
        if (!this.isPresetsSet()) {
            return;
        }
        let presets = JSON.parse(localStorage.getItem(this.storageKey));
        let presetObjects = presets.map(this.converter.fromJSONObject);
        return presetObjects;
    }

    setPresets(presets: PresetDTO[]) {
        let presetObjects = presets.map(this.converter.toJSONObject);

        let presetsString = JSON.stringify(presetObjects);
        localStorage.setItem(this.storageKey, presetsString);
    }

    isPresetsSet(): boolean {
        return localStorage.getItem(this.storageKey) ? true : false;
    }
}