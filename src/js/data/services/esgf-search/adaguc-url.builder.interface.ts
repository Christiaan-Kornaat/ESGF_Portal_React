import ESGFFilterPropertyDTO from "../../../model/dto/esgf-filter-property.dto";

export default interface IAdagucUrlBuilder {
    buildSearchUrl(selectedProperties: ESGFFilterPropertyDTO[]): URL
}