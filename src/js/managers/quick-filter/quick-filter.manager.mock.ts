import {QFFilterTileDTO} from "../../model/dto/qf-filter-tile.dto";
import IQuickFilterManager from "./quick-filter.manager.interface";

class QuickSelectManagerMock implements IQuickFilterManager {

    public tileInfo: QFFilterTileDTO[];

    private _tileProvider;

    /**
     *
     * @param {QFTileProvider}tileProvider
     */
    constructor(tileProvider) {

        this._tileProvider = tileProvider;
        /**
         *
         * @type {Array<QFFilterTileDTO>}
         */
        this.tileInfo = [];
    }

    /**
     *
     * @param {QFFilterTileDTO}tileInfo
     */
    addTileInfo(tileInfo) {
        this.tileInfo.push(tileInfo);
    };


    /**
     *
     * @return {Array<QFFilterTileDTO>}
     */
    get tiles() {
        return this._tileProvider.tiles;
    }
}

export default QuickSelectManagerMock;