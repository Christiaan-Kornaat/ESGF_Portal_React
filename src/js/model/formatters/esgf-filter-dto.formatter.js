/**
 * @deprecated use (or make) ViewModel instead
 */
class ESGFFilterDTOFormatter {

    /**
     *
     * @param {ESGFFilterDTO} filterDTO
     */
    constructor(filterDTO) {
        this.filterDTO = filterDTO;
    }

    toHumanText() {
        return ESGFFilterDTOFormatter.toHumanText(this.filterDTO);
    }

    static toHumanText(filterDTO) {
        let {shortName} = filterDTO;

        /**
         *
         * @param {string} string
         * @return {string}
         */
        let formatString = string => string.replace(/_/g, " ");

        return {
            shortName: formatString(shortName)
        };
    };
}


export default ESGFFilterDTOFormatter;