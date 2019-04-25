class QuickSelectManager {

    constructor() {
        this.tileInfo = [];
    }

    /**
     *
     * @param {Array}tileInfo
     */
    addTileInfo(tileInfo) {
        this.tileInfo.push(tileInfo);
    };


    getTileInfo() {
        return this.tileInfo;
    }
}

export default QuickSelectManager;