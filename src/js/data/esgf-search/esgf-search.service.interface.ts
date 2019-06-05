import ESGFFilterPropertyDTO from "../../model/dto/esgf-filter-property.dto";
import ESGFSearchResultDTO from "../../model/dto/esgf-search-result.dto";
import {PageInfo} from "../adaguc-url.builder";

export type SearchResultFactory = ({id, esgfid, data_node, url}) => ESGFSearchResultDTO;

export default interface IESGFSearchService {
    fetchAll(): Promise<ESGFSearchResultDTO>;

    fetch(properties: ESGFFilterPropertyDTO[], pageInfo?: PageInfo): Promise<ESGFSearchResultDTO>;
}