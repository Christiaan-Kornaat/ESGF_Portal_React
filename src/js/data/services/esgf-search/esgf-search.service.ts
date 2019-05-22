import ESGFFilterPropertyDTO from "../../../model/dto/esgf-filter-property.dto";
import IAdagucUrlBuilder from "./adaguc-url.builder.interface";
import IESGFSearchService from "./esgf-search.service.interface";
import ESGFDataNodeResultDTO from "../../../model/dto/esgf-data-node-result.dto";
import ESGFSearchResultDTO from "../../../model/dto/esgf-search-result.dto";


export default class ESGFSearchService implements IESGFSearchService {
    private _urlBuilder: IAdagucUrlBuilder;

    constructor(urlBuilder: IAdagucUrlBuilder) {
        this._urlBuilder = urlBuilder;
    }

    async fetchAll() {
        return await this.fetch([]);
    }

    async fetch(properties: ESGFFilterPropertyDTO[]) {
        const url = this._urlBuilder.buildSearchUrl(properties);

        let requestResponse = await window.fetch(url.toString(), {method: "GET"});

        if (!requestResponse.ok) return Promise.reject();

        //TODO add ESGFQueryResult-class
        let {response} = await requestResponse.json();
        let {limit, numfound, query, results} = response;
        let resultDTOs = results.map(({id, esgfid, data_node, url}) => new ESGFDataNodeResultDTO(id, esgfid, data_node, url));

        return new ESGFSearchResultDTO(resultDTOs, query, numfound, limit);
    }
}