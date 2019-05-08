import {ESGFFilterDTO} from "../../../model/dto/esgf-filter.dto";
import {range} from "../../../util/array.util";

export class ESGFSearchServiceMock {

    /**
     *
     * @return {Promise<ESGFFilterDTO[]>}
     */
    fetch() {
        let createRandomProperties = (number) => range(0, Math.ceil(Math.random() * 10)).map(item => "property" + item + " (test" + number + ")");
        let createFilter = number => new ESGFFilterDTO("test" + number, number ** 2, createRandomProperties(number));

        return new Promise(resolve => resolve(range(0, Math.ceil(Math.random() * 4) + 3).map(createFilter)));
    }
}