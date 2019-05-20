import { QFFilterTileDTO } from "../../model/dto/qf-filter-tile.dto";
import ESGFFilterPropertyDTO from "../../model/dto/esgf-filter-property.dto";
import { ESGFFilterProvider } from "../providers/esgf-filter/esgf-filter.provider";

export class QFTileConverter {
    private _filterProvider: ESGFFilterProvider;

    constructor(filterProvider: ESGFFilterProvider){
        this._filterProvider = filterProvider;

        this.fromJSONObject = this.fromJSONObject.bind(this);
    }

    toJSONObject(tile: QFFilterTileDTO) {
        let properties = tile.properties.map(property => ({ name: property.name, esgfFilterName: property.filter.shortName }))

        return {
            colour: tile.color,
            icon: tile.icon,
            title: tile.title,
            properties: properties
        }
    }
    
    async fromJSONObject({ title, colour, icon, properties }: { colour, icon, title, properties }): Promise<QFFilterTileDTO> {
        properties = await Promise.all(properties.map(async ({ name, esgfFilterName }) => new ESGFFilterPropertyDTO(name, await this._filterProvider.provide(esgfFilterName))));

        return new QFFilterTileDTO(title, colour, icon, properties);
    }
}