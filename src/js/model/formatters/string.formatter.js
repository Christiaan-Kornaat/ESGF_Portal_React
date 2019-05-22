class StringFormatter {

    /**
     *
     * @param {ESGFFilterDTO} filterDTO
     */
    constructor(filterDTO) {
        this.string = filterDTO;
    }

    toHumanText() {
        return StringFormatter.toHumanText(this.string);
    }

    /**
     *
     * @param {string} string
     * @return {string}
     */
    static toHumanText(string) {

        /**
         *
         * @param {string} string
         * @return {string}
         */
        let formatString = string => string.replace(/_/g, " ");

        return formatString(string);
    };
}


export default StringFormatter;