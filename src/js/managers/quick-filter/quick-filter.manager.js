class QuickSelectManager {

    constructor() {
        this.tileInfo = [];
        this.addTileInfo = this.addTileInfo.bind(this);
    }

    /**
     * @param {Array}tileInfo
     */
    addTileInfo(tileInfo) {
        //TODO add checks like if empty etc
        this.tileInfo.push(tileInfo);
    };


    get TileInfo() {
        return this.tileInfo;
    }
}

export default QuickSelectManager;