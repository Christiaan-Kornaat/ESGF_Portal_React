import ESGFFilterPropertyDTO from "../dto/esgf-filter-property.dto";

/**
 * @deprecated use (or make) a ViewModel instead
 */
class ESGFPropertyDTOFormatter {
    private readonly propertyDTO: ESGFFilterPropertyDTO;

    /**s
     *
     * @param {ESGFFilterPropertyDTO} propertyDTO
     */
    constructor(propertyDTO) {
        this.propertyDTO = propertyDTO;
    }

    toHumanText() {
        return ESGFPropertyDTOFormatter.toHumanText(this.propertyDTO);
    }

    /**
     *
     * @param {ESGFFilterPropertyDTO} property
     * @return {string}
     */
    static toHumanText(property) {

        /**
         *
         * @param {string} string
         * @return {string}
         */
        let formatString = string => string.replace(/_/g, " ");

        return {
            name: formatString(property.name)
        };
    };
}


export default ESGFPropertyDTOFormatter;