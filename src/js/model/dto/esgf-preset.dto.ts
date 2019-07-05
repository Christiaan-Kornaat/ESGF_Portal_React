import ESGFFilterPropertyDTO from "./esgf-filter-property.dto";

export class PresetDTO {
    
    public title: string;
    public description: string;
    public properties: ESGFFilterPropertyDTO[];

    /**
     *
     * @param {string}title
     * @param {string}info
     * @param {ESGFFilterPropertyDTO[]}properties
     */
    constructor(title: string = undefined, info: string = undefined, properties: ESGFFilterPropertyDTO[] = []) {
        this.properties = properties;
        this.title = title;
        this.description = info;
    }
}