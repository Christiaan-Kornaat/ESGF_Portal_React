import {QFFilterTileDTO} from "../../model/dto/qf-filter-tile.dto";

export default interface IQFTileService {

    /**
     * @summary provides a list of qf-tile-dtos
     *
     * @return {Promise<QFFilterTileDTO[]>}
     */
    fetchList(): Promise<QFFilterTileDTO[]>
}