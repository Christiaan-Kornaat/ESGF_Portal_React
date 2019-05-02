export default class ESGFFilterPropertyDTO {
    /**
     * @param {string} name
     * @param {ESGFFilterDTO} esgfFilter
     */
    constructor(name, esgfFilter) {
        this.name = name;
        this.filter = esgfFilter;
    }

    toString() {
        return this.name;
    }

}