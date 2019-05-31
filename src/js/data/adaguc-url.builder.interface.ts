import ESGFFilterPropertyDTO from "../model/dto/esgf-filter-property.dto";
import ESGFDataNodeResultDTO from "../model/dto/esgf-data-node-result.dto";

export default interface IAdagucUrlBuilder {
    buildSearchUrl(selectedProperties: ESGFFilterPropertyDTO[]): URL

    buildCatalogUrl(catalogItem: ESGFDataNodeResultDTO): URL
}