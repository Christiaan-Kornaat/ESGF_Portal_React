import ESGFDataNodeResultDTO from "../../model/dto/esgf-data-node-result.dto";
import AdagucUrlBuilder from "../adaguc-url.builder";
import ICatalogService from "./catalog.service.interface";
import EsgfCatalogItem from "../../model/dto/esgf-catalog-item.dto";

export default class CatalogService implements ICatalogService {
    private _urlBuilder: AdagucUrlBuilder;


    constructor(urlBuilder: AdagucUrlBuilder) {
        this._urlBuilder = urlBuilder;
    }

    private parseCatalogItem(json: any): EsgfCatalogItem {
        return EsgfCatalogItem.parse(json);
    }

    async fetch(node: ESGFDataNodeResultDTO): Promise<EsgfCatalogItem> {
        let url = this._urlBuilder.buildCatalogUrl(node);

        let response = await window.fetch(url.href);

        return this.parseCatalogItem(await response.json());
    }
}