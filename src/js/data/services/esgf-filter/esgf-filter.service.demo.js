import {ESGFFilterDTO} from "../../../model/dto/ESGFFilterDTO";

export class ESGFFilterServiceDemo {

    /**
     *
     * @return {Promise<ESGFFilterDTO[]>}
     */
    fetch() {
        const url = "https://json-server-esgf.herokuapp.com/facets";

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
                     .then(result => Object.keys(result)
                                           .map(createToDTO(result)));
    }
}