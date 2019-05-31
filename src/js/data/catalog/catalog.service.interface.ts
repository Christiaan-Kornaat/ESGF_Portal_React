import ESGFDataNodeResultDTO from "../../model/dto/esgf-data-node-result.dto";
import EsgfCatalogItem from "../../model/dto/esgf-catalog-item.dto";

export default interface ICatalogService {
    fetch(node: ESGFDataNodeResultDTO): Promise<EsgfCatalogItem>
}