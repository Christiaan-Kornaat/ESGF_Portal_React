import {QFFilterTileDTO} from "../../model/dto/qf-filter-tile.dto";
import IQFTileService from "./qf-tile.service.interface";

export class QFTileService implements IQFTileService {
    private _filterProvider: any;


    constructor(filterProvider) {
        /**
         * @private
         */
        this._filterProvider = filterProvider;
    }

    /**
     * @summary provides a list of qf-tile-dtos
     *
     * @return {Promise<QFFilterTileDTO[]>}
     */
    fetchList(): Promise<QFFilterTileDTO[]> {
        //TODO

        /**
         *
         * @param {string} title
         * @param {string} colour
         * @param {string} icon
         * @param {ESGFFilterPropertyDTO[]} properties
         * @return {QFFilterTileDTO}
         */
        // let tileDTOFactory = ({title, colour, icon}, {properties}) => new QFFilterTileDTO(title, colour, icon, properties);
        //
        // return new Promise(resolve => {
        //     let returnList = [];
        //     tileInfo.forEach(info => this._filterProvider.provide(info.title)
        //         .then(filter => tileDTOFactory(info, filter))
        //         .then(returnList.push));
        //
        //     resolve(returnList);
        // });

        return new Promise<QFFilterTileDTO[]>(resolve => resolve([]));
    }
}