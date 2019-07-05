import ESGFFilterPropertyDTO from "../dto/esgf-filter-property.dto";
import {ESGFFilterDTO} from "../dto/esgf-filter.dto";

export default class ESGFFilterFactory {
    /**
     * @param {string}shortName
     * @param {Array<string>}propertyNames
     *
     * @return ESGFFilterDTO
     */
    create(shortName, propertyNames) {
        let filter = new ESGFFilterDTO(shortName, propertyNames.length);
        filter.properties = propertyNames.map(propertyName => new ESGFFilterPropertyDTO(propertyName, filter));

        return filter;
    }
}