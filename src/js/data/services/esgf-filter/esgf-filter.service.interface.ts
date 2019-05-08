import {ESGFFilterDTO} from "../../../model/dto/esgf-filter.dto";

export default interface IESGFFilterService {

    /** @return {Promise<ESGFFilterDTO[]>} */
    fetchList(): Promise<ESGFFilterDTO[]>
}