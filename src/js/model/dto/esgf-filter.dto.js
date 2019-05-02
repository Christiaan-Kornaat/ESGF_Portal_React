export class ESGFFilterDTO {

    //NOTE temp class probably

    /**
     * @param {string} shortName
     * @param {number} itemCount
     * @param {ESGFFilterPropertyDTO[]} properties
     */
    constructor(shortName = undefined, itemCount = undefined, properties = []) {
        this.shortName = shortName;
        this.propertyCount = itemCount;
        this.properties = properties;
    }
}