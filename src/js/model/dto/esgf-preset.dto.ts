import ESGFFilterPropertyDTO from "./esgf-filter-property.dto";

export class PresetDTO {
    
    public title: string;
    public info: string;
    public properties: ESGFFilterPropertyDTO[];

    /**
     *
     * @param {string}title
     * @param {string}info
     * @param {ESGFFilterPropertyDTO[]}properties
     */
    constructor(title: string = undefined, info: string = undefined, properties=[]) {
        this.properties = properties;
        this.title = title;
        this.info = info;
    }
}