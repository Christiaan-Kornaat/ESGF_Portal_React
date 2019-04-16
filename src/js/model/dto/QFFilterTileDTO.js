export class QFFilterTileDTO {

    //NOTE temp class probably

    /**
     *
     * @param {string}title
     * @param {string[]}properties
     */
    constructor(title = undefined, color = undefined ,icon = undefined) {
        this.title = title;
        this.color = color;
        this.icon = icon;
    }
}