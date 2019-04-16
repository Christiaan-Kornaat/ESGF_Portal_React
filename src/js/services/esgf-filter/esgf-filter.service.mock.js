import {ESGFFilterDTO} from "../../model/dto/ESGFFilterDTO";
import {range} from "../../util/array.util";

export class ESGFFilterServiceMock {

    /**
     *
     * @return {ESGFFilterDTO[]}
     */
    fetch() {
        return range(0, 5).map(number => new ESGFFilterDTO("test" + number, number ** 2));
    }
}