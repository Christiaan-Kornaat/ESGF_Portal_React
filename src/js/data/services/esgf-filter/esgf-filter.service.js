import {ESGFFilterDTO} from "../../../model/dto/ESGFFilterDTO";

export default class ESGFFilterService {

    createUrl() {
        const baseUrl = "http://jan-mouwes-2.knmi.nl:8080/esgfsearch/search";

        let postfix = "?service=search&request=getfacets&";

        return baseUrl + postfix;
    }


    /**
     *
     * @return {Promise<ESGFFilterDTO[]>}
     */
    fetch() {
        const url = this.createUrl();

        const createToDTO = resultSet => data => {
            let shortName = data;
            let properties = Object.keys(resultSet[data]);
            let itemCount = properties.length;

            return new ESGFFilterDTO(shortName, itemCount, properties);
        };

        return window.fetch(url, {
            method: "GET"
        })
                     .then(response => response.ok ? response.json() : Promise.reject())
                     .then(({facets}) => Object.keys(facets)
                                               .map(createToDTO(facets)));
    }
}