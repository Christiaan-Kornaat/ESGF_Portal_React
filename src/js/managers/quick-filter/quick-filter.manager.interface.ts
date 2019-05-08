import {QFFilterTileDTO} from "../../model/dto/qf-filter-tile.dto";

export default interface IQuickFilterManager {
    readonly tiles: QFFilterTileDTO;
}