import ESGFFilterPropertyDTO from "../../../model/dto/esgf-filter-property.dto";
import {ESGFFilterDTO} from "../../../model/dto/esgf-filter.dto";
import ESGFSearchResultDTO from "../../../model/dto/esgf-search-result.dto";
import ESGFFilterFactory from "../../../model/factories/esgf-filter.factory";

export default class ESGFSearchService {


    constructor() {
        this._filterFactory = new ESGFFilterFactory();
    }

    createUrl() {
        const baseUrl = "http://jan-mouwes-2.knmi.nl:8080/esgfsearch/search";

        let url = new URL(baseUrl);

        url.searchParams.append("service", "search");
        url.searchParams.append("request", "getfacets");

        return url;
    }


    // /**
    //  * @return {Promise<ESGFFilterDTO[]>}
    //  */
    // fetchList() {
    //     /**
    //      *
    //      * @param {Object<number>}resultSet
    //      * @return {function(string): ESGFFilterDTO}
    //      */
    //     const createToDTO = resultSet => data => {
    //         let shortName = data;
    //         let properties = Object.keys(resultSet[data]);
    //
    //         return this._filterFactory.create(shortName, properties);
    //     };
    //
    //     const url = this.createUrl();
    //
    //     return window.fetch(url.toString(), {
    //         method: "GET"
    //     })
    //                  .then(response => response.ok ? response.json() : Promise.reject())
    //                  .then(({facets}) => Object.keys(facets)
    //                                            .map(createToDTO(facets)));
    // }

    /**
     *
     * @return {Promise<ESGFSearchResultDTO[]>}
     */
    fetchList(query) {
        console.log("IF YOU'RE SEEING THIS MESSAGE IN PRODUCTION, SOMETHING IS WRONG. THIS IS NOT INTENDED FOR PRODUCTION");
        // const url = "https://json-server-esgf.herokuapp.com/query";
        const url = "http://localhost:3000/query";

        const createDTOs = ({results}) => results.map(({id, esgfid, data_node, url}) => new ESGFSearchResultDTO(id, esgfid, data_node, url));

        return window.fetch(url, {
            method: "GET"
        })
                     .then(response => response.ok ? response.json() : Promise.reject())
                     .then(createDTOs);
    }

    fetch(id) {
        /**
         * @param {string} shortName
         * @param {Array<string>} properties
         *
         * @return {ESGFFilterDTO}
         */
        const createDTO = ({shortName, properties}) => {
            let filter = new ESGFFilterDTO(shortName, properties.length);
            filter.properties = properties.map(property => new ESGFFilterPropertyDTO(property, filter));
            return filter;
        };

        const url = this.createUrl();

        url.searchParams.append("facet_id", id);


        return window.fetch(url, {
            method: "GET"
        })
                     .then(response => response.ok ? response.json() : Promise.reject())
                     .then(createDTO);
    }
}