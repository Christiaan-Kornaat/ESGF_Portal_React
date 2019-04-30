import {firstToUpper} from "../../util/string.util";

class ESGFPropertyDTOFormatter {

    /**
     *
     * @param {ESGFFilterDTO} filterDTO
     */
    constructor(filterDTO) {
        this.filterDTO = filterDTO;
    }

    toHumanText() {
        return ESGFPropertyDTOFormatter.toHumanText(this.filterDTO);
    }


    static toHumanText(property) {

        /**
         *
         * @param {string} string
         * @return {string}
         */
        let formatString = string =>
            firstToUpper(string)
                .replace(/_/g, " ");

        return formatString(property);
    };
}


export default ESGFPropertyDTOFormatter;