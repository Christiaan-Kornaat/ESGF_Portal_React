import {QFFilterTileDTO} from "../../model/dto/qf-filter-tile.dto";
import IQFTileService from "./qf-tile.service.interface";

export default class QFTileServiceDemo implements IQFTileService {
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
    async fetchList(): Promise<QFFilterTileDTO[]> {
        let tileInfo = [
            {
                title: "access",
                colour: "#f9a718",
                icon: "fas fa-thermometer-three-quarters"
            },
            {
                title: "experiment",
                colour: "#14fc61",
                icon: "fas fa-wind"
            },
            {
                title: "time_frequency",
                colour: "#dd14fc",
                icon: "fas fa-tint"
            },
            {
                title: "domain",
                colour: "#f91634",
                icon: "fas fa-cloud-sun-rain"
            }
        ];

        /**
         *
         * @param {string} title
         * @param {string} colour
         * @param {string} icon
         * @param {ESGFFilterPropertyDTO[]} properties
         * @return {QFFilterTileDTO}
         */
        let tileDTOFactory = ({title, colour, icon}, {properties}) => new QFFilterTileDTO(title, colour, icon, properties.slice(0, 7));

        let fetchFilter = info => this._filterProvider.provide(info.title);

        return await Promise.all(tileInfo.map(info => fetchFilter(info)
            .then(filter => tileDTOFactory(info, filter))));
    }
}