import {ESGFFilterDTO} from "../../model/dto/ESGFFilterDTO";

export class ESGFFilterProvider {

    /**
     *
     * @return {ESGFFilterDTO[]}
     */
    provide() {
        let filters = [];
        for (let i = 0; i < 5; i++) {
            filters.push(new ESGFFilterDTO("test" + i, i ** 2))
        }

        return filters;
    }
}