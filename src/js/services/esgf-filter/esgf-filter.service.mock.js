import {ESGFFilterDTO} from "../../model/dto/ESGFFilterDTO";
import {range} from "../../util/array.util";

export class ESGFFilterServiceMock {

    /**
     *
     * @return {ESGFFilterDTO[]}
     */
    fetch() {
        let createRandomProperties = (number) => range(0, Math.ceil(Math.random() * 10)).map(item => "property" + item + " (test" + number + ")");
        let createFilter = number => new ESGFFilterDTO("test" + number, number ** 2, createRandomProperties(number));

        return range(0, Math.ceil(Math.random() * 4) + 3).map(createFilter);
    }
}