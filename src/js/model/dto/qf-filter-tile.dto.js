export class QFFilterTileDTO {

    /**
     *
     * @param {string}title
     * @param {ESGFFilterPropertyDTO[]}properties
     * @param {string}color
     * @param {string}icon
     */
    constructor(title = undefined, color = undefined ,icon = undefined, properties=[]) {
        this.title = title;
        this.color = color;
        this.icon = icon;
        this.properties = properties
    }
}