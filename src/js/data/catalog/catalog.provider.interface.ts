import ESGFDataNodeResultDTO from "../../model/dto/esgf-data-node-result.dto";

export default interface ICatalogProvider {
    provide(item: ESGFDataNodeResultDTO): Promise<any>;
}