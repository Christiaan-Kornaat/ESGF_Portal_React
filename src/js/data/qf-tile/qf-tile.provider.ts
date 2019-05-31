import IQFTileService from "./qf-tile.service.interface";
import {QFFilterTileDTO} from "../../model/dto/qf-filter-tile.dto";

export class QFTileProvider {
    private readonly _tileService: IQFTileService;
    private readonly _tiles: Map<string, QFFilterTileDTO>;

    /**
     * @param {IQFTileService} tileService
     */
    constructor(tileService) {
        this._tileService = tileService;
        this._tiles = new Map();
    }

    /**
     * @return {Promise<QFFilterTileDTO>}
     */
    async provide(): Promise<QFFilterTileDTO[]> {
        if (this._tiles.size <= 0) {
            let setupTiles = async tiles => tiles.forEach(tile => this._tiles.set(tile.title, tile));

            await (this._tileService.fetchList().then(setupTiles));
        }

        return Array.from(this._tiles.values());
    }

    get tiles(): Array<QFFilterTileDTO> {
        return Array.from(this._tiles.values());
    }
}