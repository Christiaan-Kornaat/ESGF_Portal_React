import { QFFilterTileDTO } from "../../model/dto/qf-filter-tile.dto";
import ESGFFilterPropertyDTO from "../../model/dto/esgf-filter-property.dto";
import { ESGFFilterProvider } from "../providers/esgf-filter/esgf-filter.provider";
import { PresetDTO } from "../../model/dto/esgf-preset.dto";

export class PresetConverter {
    private _filterProvider: ESGFFilterProvider;

    constructor(filterProvider: ESGFFilterProvider) {
        this._filterProvider = filterProvider;

        this.fromJSONObject = this.fromJSONObject.bind(this);
    }

    toJSONObject(preset: PresetDTO) {
        let properties = preset.properties.map(property => ({ name: property.name, esgfFilterName: property.filter.shortName }))

        return {
            name: preset.title,
            description: preset.description,
            properties: properties
        }
    }

    async fromJSONObject({ title, description, properties }: { colour, description, title, properties }): Promise<PresetDTO> {
        properties = await Promise.all(properties.map(async ({ name, esgfFilterName }) => new ESGFFilterPropertyDTO(name, await this._filterProvider.provide(esgfFilterName))));

        return new PresetDTO(title,description, properties);
    }
}