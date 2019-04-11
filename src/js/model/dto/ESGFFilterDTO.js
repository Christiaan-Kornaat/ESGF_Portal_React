export class ESGFFilterDTO {

    //NOTE temp class probably

    /**
     *
     * @param {string}shortName
     * @param {number}itemCount
     */
    constructor(shortName = undefined, itemCount = undefined) {
        this.shortName = shortName;
        this.itemCount = itemCount;
    }
}