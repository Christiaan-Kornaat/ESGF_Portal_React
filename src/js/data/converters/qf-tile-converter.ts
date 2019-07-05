import {QFFilterTileDTO} from "../../model/dto/qf-filter-tile.dto";
import ESGFFilterPropertyDTO from "../../model/dto/esgf-filter-property.dto";
import {ESGFFilterProvider} from "../esgf-filter/esgf-filter.provider";
import IConverter from "./converter.interface";
import { EsgfFilterPropertyJSONDTO } from "./preset-converter";

export type QFFilterTileJSONDTO = { colour:string, icon:string, title:string, properties: EsgfFilterPropertyJSONDTO[]};

export class QFTileConverter implements IConverter<QFFilterTileDTO, QFFilterTileJSONDTO> {
    private _filterProvider: ESGFFilterProvider;

    constructor(filterProvider: ESGFFilterProvider) {
        this._filterProvider = filterProvider;

        this.fromJSONObject = this.fromJSONObject.bind(this);
    }

    toJSONObject(tile: QFFilterTileDTO): QFFilterTileJSONDTO {
        let properties = tile.properties.map(property => ({
            name: property.name,
            esgfFilterName: property.filter.shortName
        }));

        return {
            colour: tile.color,
            icon: tile.icon,
            title: tile.title,
            properties: properties
        };
    }

    async fromJSONObject({title, colour, icon, properties}: { colour, icon, title, properties }): Promise<QFFilterTileDTO> {
        properties = await Promise.all(properties.map(async ({name, esgfFilterName}) => new ESGFFilterPropertyDTO(name, await this._filterProvider.provide(esgfFilterName))));

        return new QFFilterTileDTO(title, colour, icon, properties);
    }
}