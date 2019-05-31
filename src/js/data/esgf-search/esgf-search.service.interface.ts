import ESGFFilterPropertyDTO from "../../model/dto/esgf-filter-property.dto";
import ESGFSearchResultDTO from "../../model/dto/esgf-search-result.dto";

export type SearchResultFactory = ({id, esgfid, data_node, url}) => ESGFSearchResultDTO;

export default interface IESGFSearchService {
    fetchAll(): Promise<ESGFSearchResultDTO>;

    fetch(properties: ESGFFilterPropertyDTO[]): Promise<ESGFSearchResultDTO>;
}