import ESGFFilterFactory from "../../../model/factories/esgf-filter.factory";
import IESGFFilterService from "./esgf-filter.service.interface";
import {ESGFFilterDTO} from "../../../model/dto/esgf-filter.dto";

export class ESGFFilterServiceDemo implements IESGFFilterService {
    /**
     * @summary returns list of filters
     */
    async fetchList(): Promise<ESGFFilterDTO[]> {
        // const url = "https://json-server-esgf.herokuapp.com/query";
        const url = "http://localhost:3000/query";

        const facetFactory = new ESGFFilterFactory();

        const createDTOs = ({facets}) => Object.keys(facets)
                                               .map(facetName => facetFactory.create(facetName, Object.keys(facets[facetName])));

        return window.fetch(url, {method: "GET"})
                     .then(response => response.ok ? response.json() : Promise.reject())
                     .then(createDTOs);
    }
}