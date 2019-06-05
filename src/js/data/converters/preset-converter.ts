import ESGFFilterPropertyDTO from "../../model/dto/esgf-filter-property.dto";
import { PresetDTO } from "../../model/dto/esgf-preset.dto";
import IConverter from "./converter.interface";
import { ESGFFilterProvider } from "../esgf-filter/esgf-filter.provider";

export type EsgfFilterPropertyJSONDTO = {
    name: string;
    esgfFilterName: any;
}

export type PresetJSONDTO = {
    title: string, description: string, properties: {
        name: string;
        esgfFilterName: any;
    }[]
};

export class PresetConverter implements IConverter<PresetDTO, PresetJSONDTO> {
    private _filterProvider: ESGFFilterProvider;

    constructor(filterProvider: ESGFFilterProvider) {
        this._filterProvider = filterProvider;

        this.fromJSONObject = this.fromJSONObject.bind(this);
    }

    toJSONObject(preset: PresetDTO): PresetJSONDTO {
        let properties = preset.properties.map(property => ({ name: property.name, esgfFilterName: property.filter.shortName }))

        return {
            title: preset.title,
            description: preset.description,
            properties: properties
        }
    }

    async fromJSONObject({ title, description, properties }: { colour, description, title, properties }): Promise<PresetDTO> {
        properties = await Promise.all(properties.map(async ({ name, esgfFilterName }) => new ESGFFilterPropertyDTO(name, await this._filterProvider.provide(esgfFilterName))));

        return new PresetDTO(title,description, properties);
    }
}