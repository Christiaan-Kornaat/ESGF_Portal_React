import ESGFFilterPropertyDTO from "./esgf-filter-property.dto";
import {DefaultPageInfo, PageInfo} from "../../data/adaguc-url.builder";

export default class EsgfSearchQuery {
    get id(): string {

        let map = this.filterProperties.reduce((map, {name, filter}) => {
            if (!map.has(filter.shortName)) map.set(filter.shortName, []);

            map.get(filter.shortName).push(name);

            return map;
        }, new Map<string, string[]>());

        let entries = Array.from(map.entries()).sort();

        return entries.reduce((currentString, [filter, properties]) => currentString + `${filter}[${properties.join(",")}],`, `search-index=${this.pageInfo.index}-size=${this.pageInfo.size}`);
    }

    public readonly pageInfo: PageInfo;
    public readonly filterProperties: ESGFFilterPropertyDTO[];

    constructor(filterProperties: ESGFFilterPropertyDTO[], pageInfo?: PageInfo) {
        this.filterProperties = filterProperties;
        this.pageInfo = pageInfo ? pageInfo : DefaultPageInfo;
    }
}