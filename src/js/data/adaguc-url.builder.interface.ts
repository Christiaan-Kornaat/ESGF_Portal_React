import ESGFFilterPropertyDTO from "../model/dto/esgf-filter-property.dto";
import ESGFDataNodeResultDTO from "../model/dto/esgf-data-node-result.dto";
import {PageInfo} from "./adaguc-url.builder";

export default interface IAdagucUrlBuilder {
    buildSearchUrl(selectedProperties: ESGFFilterPropertyDTO[], pageInfo: PageInfo): URL

    buildCatalogUrl(catalogItem: ESGFDataNodeResultDTO): URL
}