import ESGFSearchResultDTO from "../../../model/dto/esgf-search-result.dto";

export class ESGFSearchServiceDemo {

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
}