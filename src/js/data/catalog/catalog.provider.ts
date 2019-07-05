import ICatalogProvider from "./catalog.provider.interface";
import ESGFDataNodeResultDTO from "../../model/dto/esgf-data-node-result.dto";
import ICatalogService from "./catalog.service.interface";
import EsgfCatalogItem from "../../model/dto/esgf-catalog-item.dto";

export default class CatalogProvider implements ICatalogProvider {
    private readonly _cache: Map<string, EsgfCatalogItem>;
    private readonly _catalogService: ICatalogService;

    constructor(catalogService: ICatalogService) {
        this._catalogService = catalogService;
        this._cache = new Map<string, any>();
    }

    async provide(item: ESGFDataNodeResultDTO): Promise<EsgfCatalogItem> {
        let {esgfid: id} = item;

        if (!this._cache.has(id)) {
            let result;
            try {
                result = await this._catalogService.fetch(item);
            } catch (e) {
                return Promise.reject();
            }
            this._cache.set(id, result);
        }

        return this._cache.get(id);
    }

}