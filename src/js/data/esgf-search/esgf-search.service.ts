import ESGFFilterPropertyDTO from "../../model/dto/esgf-filter-property.dto";
import IAdagucUrlBuilder from "../adaguc-url.builder.interface";
import IESGFSearchService from "./esgf-search.service.interface";
import ESGFDataNodeResultDTO from "../../model/dto/esgf-data-node-result.dto";
import ESGFSearchResultDTO from "../../model/dto/esgf-search-result.dto";
import {DefaultPageInfo} from "../adaguc-url.builder";


export default class ESGFSearchService implements IESGFSearchService {
    private readonly _urlBuilder: IAdagucUrlBuilder;
    private readonly _activeRequests: Map<string, Promise<Response>>;

    private isRequestActive(url: URL) {
        return this._activeRequests.has(url.toString());
    }

    private registerRequest(url: URL, promise: Promise<Response>) {
        return this._activeRequests.set(url.toString(), promise);
    }

    constructor(urlBuilder: IAdagucUrlBuilder) {
        this._urlBuilder = urlBuilder;
        this._activeRequests = new Map<string, Promise<Response>>();
    }

    async fetchAll(): Promise<ESGFSearchResultDTO> {
        return await this.fetch([]);
    }

    async fetch(properties: ESGFFilterPropertyDTO[], pageInfo = DefaultPageInfo): Promise<ESGFSearchResultDTO> {
        const url = this._urlBuilder.buildSearchUrl(properties, pageInfo);

        //  Register new request if not already sent
        if (!this.isRequestActive(url)) {
            let request = window.fetch(url.toString(), {method: "GET"});
            this.registerRequest(url, request);
        }

        let request = this._activeRequests.get(url.toString());
        let requestResponse = await request;

        if (!requestResponse.ok) return Promise.reject();

        let {response} = await requestResponse.json();
        let {limit, numfound, query, results} = response;
        let resultDTOs = results.map(({id, esgfid, data_node, url}) => new ESGFDataNodeResultDTO(id, esgfid, data_node, url));

        return new ESGFSearchResultDTO(resultDTOs, query, numfound, limit);
    }
}