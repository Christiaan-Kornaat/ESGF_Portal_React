import ESGFFilterPropertyDTO from "./esgf-filter-property.dto";

export default class EsgfSearchQuery {
    get id(): string {

        let map = this.filterProperties.reduce((map, {name, filter}) => {
            if (!map.has(filter.shortName)) map.set(filter.shortName, []);

            map.get(filter.shortName).push(name);

            return map;
        }, new Map<string, string[]>());

        let entries = Array.from(map.entries()).sort();

        return entries.reduce((currentString, [filter, properties]) => `${filter}[${properties.join(",")}],`, "search-");
    }

    public readonly filterProperties: ESGFFilterPropertyDTO[];

    constructor(filterProperties: ESGFFilterPropertyDTO[]) {
        this.filterProperties = filterProperties;
    }
}